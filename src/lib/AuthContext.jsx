import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
    const [authError, setAuthError] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        checkUserAuth();
    }, []);

    const checkUserAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoadingAuth(false);
            setIsAuthenticated(false);
            setAuthChecked(true);
            return;
        }

        try {
            setIsLoadingAuth(true);
            setAuthError(null);

            const res = await axios.get('/api/v1/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUser(res.data);
            setIsAuthenticated(true);
            setIsLoadingAuth(false);
            setAuthChecked(true);
        } catch (error) {
            console.error('User auth check failed:', error);
            localStorage.removeItem('token');
            setUser(null);
            setIsAuthenticated(false);
            setIsLoadingAuth(false);
            setAuthChecked(true);

            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                setAuthError({
                    type: 'auth_required',
                    message: 'Authentication required'
                });
            } else {
                setAuthError({
                    type: 'unknown',
                    message: error.message || 'Authentication check failed'
                });
            }
        }
    };

    const logout = async (shouldRedirect = true) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // Optional backend call to notify logout
                await axios.post('/api/v1/auth/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } catch (err) {
                console.error('Logout request failed:', err);
            }
        }

        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);

        if (shouldRedirect) {
            window.location.href = '/login';
        }
    };

    const navigateToLogin = () => {
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            isLoadingAuth,
            isLoadingPublicSettings: false, // mock to true if needed, but not required since settings are local
            authError,
            appPublicSettings: { id: "local-app", public_settings: {} },
            authChecked,
            logout,
            navigateToLogin,
            checkUserAuth,
            checkAppState: async () => {} // no-op since app state check is not required locally
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

