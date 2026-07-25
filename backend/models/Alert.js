import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    machine: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        enum: ['critical', 'high', 'medium', 'low'],
        required: true
    },
    type: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    isResolved: {
        type: Boolean,
        default: false
    },
    factoryId: {
        type: String,
        default: 'alpha'
    }
}, {
    timestamps: true
});

export const Alert = mongoose.model('Alert', alertSchema);
