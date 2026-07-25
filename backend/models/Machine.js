import mongoose from 'mongoose';

const machineSchema = new mongoose.Schema({
    machineId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['running', 'idle', 'stopped'],
        default: 'running'
    },
    temperature: {
        type: Number,
        required: true
    },
    power: {
        type: Number,
        required: true
    },
    health: {
        type: Number,
        required: true
    },
    runningTime: {
        type: String,
        required: true
    },
    energyUsage: {
        type: Number,
        required: true
    },
    anomaly: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export const Machine = mongoose.model('Machine', machineSchema);
