import { Machine } from '../models/Machine.js';
import { Alert } from '../models/Alert.js';

// Fallback static data in case MongoDB isn't seeded yet
const fallbackKPIs = {
    today_energy: { value: 4820, unit: "kWh", delta: -3.4 },
    electricity_cost: { value: 12850, unit: "₹", delta: -2.1 },
    estimated_savings: { value: 1840, unit: "₹", delta: 12.6 },
    carbon_emission: { value: 2.34, unit: "tCO₂", delta: -4.2 },
    efficiency_score: { value: 87, unit: "%", delta: 1.8 },
    peak_demand: { value: 312, unit: "kW", delta: -1.2 },
    prediction_accuracy: { value: 94.2, unit: "%", delta: 0.6 },
    machine_health: { value: 91, unit: "%", delta: 0.4 },
};

const fallbackEnergy7Days = [
    { day: "Mon", actual: 4200, predicted: 4150 },
    { day: "Tue", actual: 4380, predicted: 4300 },
    { day: "Wed", actual: 4520, predicted: 4480 },
    { day: "Thu", actual: 4100, predicted: 4200 },
    { day: "Fri", actual: 4820, predicted: 4750 },
    { day: "Sat", actual: 3900, predicted: 3950 },
    { day: "Sun", actual: 3500, predicted: 3520 },
];

const fallbackMachineBar = [
    { name: "Machine A", energy: 1240, cost: 3200 },
    { name: "Machine B", energy: 1580, cost: 4100 },
    { name: "Machine C", energy: 980, cost: 2550 },
    { name: "Machine D", energy: 620, cost: 1600 },
    { name: "Machine E", energy: 400, cost: 1000 },
];

const fallbackCarbonTrend = [
    { month: "Jan", co2: 2.8 },
    { month: "Feb", co2: 2.6 },
    { month: "Mar", co2: 2.9 },
    { month: "Apr", co2: 2.4 },
    { month: "May", co2: 2.3 },
    { month: "Jun", co2: 2.1 },
    { month: "Jul", co2: 2.34 },
];

const fallbackCostTrend = [
    { month: "Jan", cost: 15200 },
    { month: "Feb", cost: 14100 },
    { month: "Mar", cost: 15800 },
    { month: "Apr", cost: 13400 },
    { month: "May", cost: 12900 },
    { month: "Jun", cost: 12100 },
    { month: "Jul", cost: 12850 },
];

const fallbackEnergyPie = [
    { name: "Machine A", value: 1240, color: "#10b981" },
    { name: "Machine B", value: 1580, color: "#3b82f6" },
    { name: "Machine C", value: 980, color: "#8b5cf6" },
    { name: "Machine D", value: 620, color: "#f59e0b" },
    { name: "Machine E", value: 400, color: "#ef4444" },
];

// @desc    Get dashboard metrics & trends
// @route   GET /api/v1/dashboard/:factory_id
// @access  Private
export const getDashboard = async (req, res) => {
    try {
        const machinesCount = await Machine.countDocuments();
        const activeAlerts = await Alert.countDocuments({ isResolved: false });
        
        let kpis = { ...fallbackKPIs };
        let machineBar = [...fallbackMachineBar];

        if (machinesCount > 0) {
            const dbMachines = await Machine.find({});
            // Compute real-time values from MongoDB state
            const totalEnergy = dbMachines.reduce((acc, curr) => acc + curr.energyUsage, 0);
            const avgHealth = Math.round(dbMachines.reduce((acc, curr) => acc + curr.health, 0) / dbMachines.length);
            
            kpis.today_energy.value = totalEnergy;
            kpis.machine_health.value = avgHealth;
            
            machineBar = dbMachines.map(m => ({
                name: m.name,
                energy: m.energyUsage,
                cost: Math.round(m.energyUsage * 2.6) // simple cost estimation multiplier
            }));
        }

        res.status(200).json({
            success: true,
            kpis,
            energy7Days: fallbackEnergy7Days,
            machineBar,
            carbonTrend: fallbackCarbonTrend,
            costTrend: fallbackCostTrend,
            energyPie: fallbackEnergyPie,
            activeAlertsCount: activeAlerts
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get system analytics
// @route   GET /api/v1/analytics
// @access  Private
export const getAnalytics = async (req, res) => {
    res.status(200).json({
        success: true,
        energy7Days: fallbackEnergy7Days,
        machineBar: fallbackMachineBar,
        carbonTrend: fallbackCarbonTrend,
        costTrend: fallbackCostTrend
    });
};

// @desc    Get all machines
// @route   GET /api/v1/machines
// @access  Private
export const getMachines = async (req, res) => {
    try {
        let dbMachines = await Machine.find({});
        if (dbMachines.length === 0) {
            // fallback mock seed output
            dbMachines = [
                { machineId: 'A', name: 'Machine A', status: 'running', temperature: 62, power: 42, health: 96, runningTime: '18h 24m', energyUsage: 1240, anomaly: false },
                { machineId: 'B', name: 'Machine B', status: 'running', temperature: 78, power: 58, health: 82, runningTime: '21h 02m', energyUsage: 1580, anomaly: true },
                { machineId: 'C', name: 'Machine C', status: 'idle', temperature: 41, power: 12, health: 94, runningTime: '9h 15m', energyUsage: 980, anomaly: false }
            ];
        }
        res.status(200).json({
            success: true,
            data: dbMachines
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all alerts
// @route   GET /api/v1/alerts
// @access  Private
export const getAlerts = async (req, res) => {
    const { severity } = req.query;
    try {
        const query = {};
        if (severity && severity !== 'all') {
            query.severity = severity;
        }

        let dbAlerts = await Alert.find(query).sort({ createdAt: -1 });
        if (dbAlerts.length === 0 && (!severity || severity === 'all')) {
            dbAlerts = [
                { _id: '1', title: "Machine B overheating", type: "overheating", severity: "critical", machine: "Machine B", time: "2 min ago", desc: "Temperature 78°C, 16°C above baseline.", isResolved: false },
                { _id: '2', title: "Peak load reached", type: "peak_load", severity: "high", machine: "Plant", time: "14 min ago", desc: "Peak demand hit 312 kW.", isResolved: false },
                { _id: '3', title: "Abnormal consumption", type: "abnormal", severity: "high", machine: "Machine D", time: "38 min ago", desc: "Energy draw 28% above expected.", isResolved: false }
            ];
        }
        res.status(200).json({
            success: true,
            data: dbAlerts
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Resolve an alert
// @route   POST /api/v1/alerts/:id/resolve
// @access  Private
export const resolveAlert = async (req, res) => {
    const { id } = req.params;
    try {
        let alert = await Alert.findById(id);
        
        if (!alert) {
            // Check if it's a numeric code alert (from fallback mock data)
            alert = await Alert.findOne({ title: new RegExp(id, 'i') });
        }

        if (!alert) {
            // Check if we can mock resolve it
            return res.status(200).json({
                success: true,
                message: 'Alert resolved (Mock mode)'
            });
        }

        alert.isResolved = true;
        await alert.save();

        res.status(200).json({
            success: true,
            message: 'Alert resolved successfully',
            data: alert
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get future prediction forecast metrics
// @route   GET /api/v1/predictions
// @access  Private
export const getPredictions = async (req, res) => {
    res.status(200).json({
        success: true,
        tomorrow_energy: { value: 4610, unit: "kWh", confidence: 94.2 },
        predicted_cost: { value: 12340, unit: "₹" },
        predicted_carbon: { value: 2.21, unit: "tCO₂" },
        peak_hours: ["10:00 – 12:00", "14:00 – 16:00"],
        future_demand: { value: 298, unit: "kW" },
        aiInsights: [
            "Energy consumption is expected to drop 4.3% tomorrow due to scheduled Machine C downtime.",
            "Machine B anomaly detected — 78°C exceeds baseline by 16°C. Recommend maintenance within 48h.",
            "Shifting Machine B load to after 6 PM could save an estimated ₹1,240/week.",
            "Prediction accuracy improved to 94.2% after the latest model retrain."
        ]
    });
};

// @desc    Get recommendations
// @route   GET /api/v1/recommendations
// @access  Private
export const getRecommendations = async (req, res) => {
    res.status(200).json({
        success: true,
        data: [
            { id: 1, title: "Run Machine B after 6 PM", reason: "Off-peak tariff reduces unit cost by 22%.", savings: 1240, carbon_reduction: 0.18, impact: "high" },
            { id: 2, title: "Reduce idle time on Machine C", reason: "Detected 4.2h of idle draw daily.", savings: 680, carbon_reduction: 0.09, impact: "medium" },
            { id: 3, title: "Schedule maintenance for Machine B", reason: "Temperature trending 16°C above baseline.", savings: 950, carbon_reduction: 0.12, impact: "high" },
            { id: 4, title: "Optimize HVAC setpoint by 1°C", reason: "Minor comfort trade-off for measurable savings.", savings: 420, carbon_reduction: 0.05, impact: "low" }
        ]
    });
};

// @desc    Post to chat assistant
// @route   POST /api/v1/chat
// @access  Private
export const handleChat = async (req, res) => {
    const { message } = req.body;
    
    // Simulate chat response based on input keywords
    let response = "I'm sorry, I didn't understand that. You can ask me about energy savings, overheating machines, or daily forecasts.";
    const lowercaseMsg = message.toLowerCase();
    
    if (lowercaseMsg.includes('save') || lowercaseMsg.includes('savings') || lowercaseMsg.includes('money')) {
        response = "Based on current off-peak tariffs, you can save an estimated **₹1,240/week** by running Machine B after 6 PM. Additionally, reducing Machine C's daily idle time of 4.2 hours will save **₹680/week**.";
    } else if (lowercaseMsg.includes('overheat') || lowercaseMsg.includes('hot') || lowercaseMsg.includes('machine b')) {
        response = "Machine B's temperature is currently **78°C**, which exceeds the baseline by **16°C**. I suggest scheduling a maintenance check within the next 48 hours to prevent motor failure.";
    } else if (lowercaseMsg.includes('energy') || lowercaseMsg.includes('consumption') || lowercaseMsg.includes('forecast')) {
        response = "Tomorrow's predicted energy consumption is **4,610 kWh** (with 94.2% confidence). Peak usage will likely hit around 10:00–12:00 and 14:00–16:00.";
    }

    res.status(200).json({
        success: true,
        message: response,
        role: "bot",
        conversation_id: req.body.conversation_id || "conv-" + Date.now()
    });
};

// @desc    Generate reports
// @route   POST /api/v1/reports
// @access  Private
export const generateReport = async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Report generation started successfully',
        report_url: '/mock-downloads/report.pdf'
    });
};

// @desc    Get alert settings configurations
// @route   GET /api/v1/settings
// @access  Private
export const getSettings = async (req, res) => {
    res.status(200).json({
        success: true,
        thresholds: {
            temperature_limit: 75,
            idle_power_limit: 15,
            peak_demand_limit: 300
        }
    });
};
