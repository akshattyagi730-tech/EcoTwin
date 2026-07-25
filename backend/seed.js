import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User.js';
import { Machine } from './models/Machine.js';
import { Alert } from './models/Alert.js';

dotenv.config();

const seedData = async () => {
    try {
        console.log('Connecting to database for seeding...');
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecotwin');
        console.log('Connected to MongoDB.');

        // 1. Clear existing data
        console.log('Clearing existing database entries...');
        await User.deleteMany();
        await Machine.deleteMany();
        await Alert.deleteMany();

        // 2. Seed Users
        console.log('Seeding users...');
        const adminUser = new User({
            email: 'admin@ecotwin.ai',
            password: 'admin12345',
            role: 'admin',
            isVerified: true
        });
        await adminUser.save();

        const operatorUser = new User({
            email: 'operator@ecotwin.ai',
            password: 'operator12345',
            role: 'operator',
            isVerified: true
        });
        await operatorUser.save();

        console.log('Users seeded successfully:');
        console.log('  Admin: admin@ecotwin.ai / admin12345');
        console.log('  Operator: operator@ecotwin.ai / operator12345');

        // 3. Seed Machines
        console.log('Seeding machines...');
        const machines = [
            {
                machineId: 'A',
                name: 'Machine A',
                status: 'running',
                temperature: 62,
                power: 42,
                health: 96,
                runningTime: '18h 24m',
                energyUsage: 1240,
                anomaly: false
            },
            {
                machineId: 'B',
                name: 'Machine B',
                status: 'running',
                temperature: 78,
                power: 58,
                health: 82,
                runningTime: '21h 02m',
                energyUsage: 1580,
                anomaly: true
            },
            {
                machineId: 'C',
                name: 'Machine C',
                status: 'idle',
                temperature: 41,
                power: 12,
                health: 94,
                runningTime: '9h 15m',
                energyUsage: 980,
                anomaly: false
            }
        ];
        await Machine.insertMany(machines);
        console.log('Machines seeded.');

        // 4. Seed Alerts
        console.log('Seeding alerts...');
        const alerts = [
            {
                title: 'Machine B overheating',
                type: 'overheating',
                severity: 'critical',
                machine: 'Machine B',
                time: '2 min ago',
                desc: 'Temperature 78°C, 16°C above baseline.',
                isResolved: false,
                factoryId: 'alpha'
            },
            {
                title: 'Peak load reached',
                type: 'peak_load',
                severity: 'high',
                machine: 'Plant',
                time: '14 min ago',
                desc: 'Peak demand hit 312 kW.',
                isResolved: false,
                factoryId: 'alpha'
            },
            {
                title: 'Abnormal consumption',
                type: 'abnormal',
                severity: 'high',
                machine: 'Machine D',
                time: '38 min ago',
                desc: 'Energy draw 28% above expected.',
                isResolved: false,
                factoryId: 'alpha'
            },
            {
                title: 'Machine A idle draw',
                type: 'idle',
                severity: 'medium',
                machine: 'Machine A',
                time: '1h ago',
                desc: 'Idle power draw detected.',
                isResolved: false,
                factoryId: 'alpha'
            },
            {
                title: 'Low efficiency zone',
                type: 'efficiency',
                severity: 'low',
                machine: 'Machine E',
                time: '2h ago',
                desc: 'Efficiency dropped to 71%',
                isResolved: false,
                factoryId: 'alpha'
            }
        ];
        await Alert.insertMany(alerts);
        console.log('Alerts seeded.');

        console.log('Database seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
