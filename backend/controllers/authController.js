import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import axios from 'axios';

// Helper to sign JWT
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET || 'ecotwin_jwt_super_secret_key_2026',
        { expiresIn: '30d' }
    );
};

// @desc    Register a new user (with mock OTP verification step)
// @route   POST /api/v1/auth/signup
// @access  Public
export const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Generate a simple 6-digit OTP code: "123456" for ease of testing, or randomized
        const otpCode = '123456';
        const otpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        user = await User.create({
            email,
            password,
            otpCode,
            otpExpire,
            isVerified: false
        });

        res.status(201).json({
            success: true,
            message: 'Registration successful. Verification OTP sent.',
            email: user.email
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error during signup'
        });
    }
};

// @desc    Verify OTP for email verification
// @route   POST /api/v1/auth/verify-otp
// @access  Public
export const verifyOtp = async (req, res) => {
    const { email, otpCode } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Allow '123456' as standard fallback OTP for ease of testing
        if (user.otpCode !== otpCode && otpCode !== '123456') {
            return res.status(400).json({
                success: false,
                message: 'Invalid verification code'
            });
        }

        user.isVerified = true;
        user.otpCode = undefined;
        user.otpExpire = undefined;
        await user.save();

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            access_token: token,
            token_type: 'Bearer',
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error during OTP verification'
        });
    }
};

// @desc    Resend verification OTP
// @route   POST /api/v1/auth/resend-otp
// @access  Public
export const resendOtp = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const otpCode = '123456';
        user.otpCode = otpCode;
        user.otpExpire = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        res.status(200).json({
            success: true,
            message: 'New verification OTP sent'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error during OTP resend'
        });
    }
};

// @desc    Login user & get token
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check if verified
        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                message: 'Please verify your email first',
                unverified: true
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            access_token: token,
            token_type: 'Bearer',
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error during login'
        });
    }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            id: user._id,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error retrieving current user'
        });
    }
};

// @desc    Forgot password (request token)
// @route   POST /api/v1/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No user found with that email'
            });
        }

        // Generate simulated reset token: standard "reset-token-12345"
        const resetToken = 'reset-token-12345';
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password reset code/token simulated.',
            reset_token: resetToken
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error during forgot password'
        });
    }
};

// @desc    Reset password using token
// @route   POST /api/v1/auth/reset-password
// @access  Public
export const resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: resetToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        // For testing, allow any resetToken if it matches reset-token-12345
        let testUser = user;
        if (!testUser && resetToken === 'reset-token-12345') {
            testUser = await User.findOne({}); // Grab any user for mock reset
        }

        if (!testUser) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired password reset token'
            });
        }

        testUser.password = newPassword;
        testUser.resetPasswordToken = undefined;
        testUser.resetPasswordExpire = undefined;
        await testUser.save();

        res.status(200).json({
            success: true,
            message: 'Password reset successful'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server error resetting password'
        });
    }
};

// @desc    Logout (Clear/Revoke Token server side - mock)
// @route   POST /api/v1/auth/logout
// @access  Private
export const logout = async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
};

// @desc    Google login / signup
// @route   POST /api/v1/auth/google
// @access  Public
export const googleLogin = async (req, res) => {
    const { credential } = req.body;

    if (!credential) {
        return res.status(400).json({
            success: false,
            message: 'Credential token is required'
        });
    }

    try {
        // Verify Google token with Google's tokeninfo API
        const googleRes = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
        
        const { email, email_verified, name } = googleRes.data;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Google token payload (email missing)'
            });
        }

        if (email_verified !== 'true' && email_verified !== true) {
            return res.status(400).json({
                success: false,
                message: 'Google email is not verified'
            });
        }

        // Find or create user
        let user = await User.findOne({ email });

        if (!user) {
            // Generate a random strong password for the user record
            const randomPassword = Math.random().toString(36).slice(-10) + 'A1!';
            user = await User.create({
                email,
                password: randomPassword,
                role: 'operator',
                isVerified: true
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            access_token: token,
            token_type: 'Bearer',
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.response?.data?.error_description || error.message || 'Google authentication failed'
        });
    }
};
