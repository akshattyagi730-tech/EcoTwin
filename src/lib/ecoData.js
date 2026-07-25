// EcoTwin AI — Central dummy data layer
// Structured so real AI models / FastAPI backend can be plugged in later.

export const kpis = {
    today_energy: { value: 4820, unit: "kWh", delta: -3.4 },
    electricity_cost: { value: 12850, unit: "₹", delta: -2.1 },
    estimated_savings: { value: 1840, unit: "₹", delta: 12.6 },
    carbon_emission: { value: 2.34, unit: "tCO₂", delta: -4.2 },
    efficiency_score: { value: 87, unit: "%", delta: 1.8 },
    peak_demand: { value: 312, unit: "kW", delta: -1.2 },
    prediction_accuracy: { value: 94.2, unit: "%", delta: 0.6 },
    machine_health: { value: 91, unit: "%", delta: 0.4 },
};

export const energy7Days = [
    { day: "Mon", actual: 4200, predicted: 4150 },
    { day: "Tue", actual: 4380, predicted: 4300 },
    { day: "Wed", actual: 4520, predicted: 4480 },
    { day: "Thu", actual: 4100, predicted: 4200 },
    { day: "Fri", actual: 4820, predicted: 4750 },
    { day: "Sat", actual: 3900, predicted: 3950 },
    { day: "Sun", actual: 3500, predicted: 3520 },
];

export const machineBar = [
    { name: "Machine A", energy: 1240, cost: 3200 },
    { name: "Machine B", energy: 1580, cost: 4100 },
    { name: "Machine C", energy: 980, cost: 2550 },
    { name: "Machine D", energy: 620, cost: 1600 },
    { name: "Machine E", energy: 400, cost: 1000 },
];

export const carbonTrend = [
    { month: "Jan", co2: 2.8 },
    { month: "Feb", co2: 2.6 },
    { month: "Mar", co2: 2.9 },
    { month: "Apr", co2: 2.4 },
    { month: "May", co2: 2.3 },
    { month: "Jun", co2: 2.1 },
    { month: "Jul", co2: 2.34 },
];

export const costTrend = [
    { month: "Jan", cost: 15200 },
    { month: "Feb", cost: 14100 },
    { month: "Mar", cost: 15800 },
    { month: "Apr", cost: 13400 },
    { month: "May", cost: 12900 },
    { month: "Jun", cost: 12100 },
    { month: "Jul", cost: 12850 },
];

export const energyPie = [
    { name: "Machine A", value: 1240, color: "#10b981" },
    { name: "Machine B", value: 1580, color: "#3b82f6" },
    { name: "Machine C", value: 980, color: "#8b5cf6" },
    { name: "Machine D", value: 620, color: "#f59e0b" },
    { name: "Machine E", value: 400, color: "#ef4444" },
];

// 0 (low) - 100 (peak) heatmap for the month
export const monthlyHeatmap = Array.from({ length: 7 }, (_, day) =>
    Array.from({ length: 24 }, (_, h) => {
        const base = 30 + Math.sin((h - 6) / 24 * Math.PI * 2) * 25 + (day > 4 ? -10 : 0);
        return Math.max(8, Math.min(98, Math.round(base + (Math.random() * 14 - 7))));
    })
);

export const machines = [
    {
        id: "A",
        name: "Machine A",
        status: "running",
        temperature: 62,
        power: 42,
        health: 96,
        runningTime: "18h 24m",
        energyUsage: 1240,
        anomaly: false,
    },
    {
        id: "B",
        name: "Machine B",
        status: "running",
        temperature: 78,
        power: 58,
        health: 82,
        runningTime: "21h 02m",
        energyUsage: 1580,
        anomaly: true,
    },
    {
        id: "C",
        name: "Machine C",
        status: "idle",
        temperature: 41,
        power: 12,
        health: 94,
        runningTime: "9h 15m",
        energyUsage: 980,
        anomaly: false,
    },
];

export const forecast = [
    { hour: "00", predicted: 180 },
    { hour: "02", predicted: 150 },
    { hour: "04", predicted: 130 },
    { hour: "06", predicted: 190 },
    { hour: "08", predicted: 260 },
    { hour: "10", predicted: 310 },
    { hour: "12", predicted: 340 },
    { hour: "14", predicted: 330 },
    { hour: "16", predicted: 300 },
    { hour: "18", predicted: 280 },
    { hour: "20", predicted: 240 },
    { hour: "22", predicted: 200 },
];

export const predictions = {
    tomorrow_energy: { value: 4610, unit: "kWh", confidence: 94.2 },
    predicted_cost: { value: 12340, unit: "₹" },
    predicted_carbon: { value: 2.21, unit: "tCO₂" },
    peak_hours: ["10:00 – 12:00", "14:00 – 16:00"],
    future_demand: { value: 298, unit: "kW" },
};

export const aiInsights = [
    "Energy consumption is expected to drop 4.3% tomorrow due to scheduled Machine C downtime.",
    "Machine B anomaly detected — 78°C exceeds baseline by 16°C. Recommend maintenance within 48h.",
    "Shifting Machine B load to after 6 PM could save an estimated ₹1,240/week.",
    "Prediction accuracy improved to 94.2% after the latest model retrain.",
];

export const recommendations = [
    {
        id: 1,
        title: "Run Machine B after 6 PM",
        reason: "Off-peak tariff reduces unit cost by 22%.",
        savings: 1240,
        carbon_reduction: 0.18,
        impact: "high",
    },
    {
        id: 2,
        title: "Reduce idle time on Machine C",
        reason: "Detected 4.2h of idle draw daily.",
        savings: 680,
        carbon_reduction: 0.09,
        impact: "medium",
    },
    {
        id: 3,
        title: "Schedule maintenance for Machine B",
        reason: "Temperature trending 16°C above baseline.",
        savings: 950,
        carbon_reduction: 0.12,
        impact: "high",
    },
    {
        id: 4,
        title: "Optimize HVAC setpoint by 1°C",
        reason: "Minor comfort trade-off for measurable savings.",
        savings: 420,
        carbon_reduction: 0.05,
        impact: "low",
    },
];

export const alerts = [
    { id: 1, title: "Machine B overheating", type: "overheating", severity: "critical", machine: "Machine B", time: "2 min ago", desc: "Temperature 78°C, 16°C above baseline." },
    { id: 2, title: "Peak load reached", type: "peak_load", severity: "high", machine: "Plant", time: "14 min ago", desc: "Peak demand hit 312 kW." },
    { id: 3, title: "Abnormal consumption", type: "abnormal", severity: "high", machine: "Machine D", time: "38 min ago", desc: "Energy draw 28% above expected." },
    { id: 4, title: "Machine A idle draw", type: "idle", severity: "medium", machine: "Machine A", time: "1h ago", desc: "Idle power draw detected." },
    { id: 5, title: "Low efficiency zone", type: "efficiency", severity: "low", machine: "Machine E", time: "2h ago", desc: "Efficiency dropped to 71%." },
];

export const factories = [
    { id: "f1", name: "Plant Alpha — Pune" },
    { id: "f2", name: "Plant Beta — Chennai" },
    { id: "f3", name: "Plant Gamma — Noida" },
];

export const testimonials = [
    { name: "Rahul Mehta", role: "Plant Head, Vertex Industries", quote: "EcoTwin AI cut our monthly electricity bill by 14% in the first quarter.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop" },
    { name: "Sara Khan", role: "Energy Manager, LuminaTech", quote: "The anomaly detection flagged a failing motor before it cost us a shutdown.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" },
    { name: "Arjun Nair", role: "COO, ForgeWorks", quote: "Finally a dashboard the whole team understands. The AI recommendations are spot on.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" },
];

export const pricing = [
    { name: "Starter", price: "₹4,999", period: "/mo", desc: "For small MSMEs", features: ["1 Factory", "Up to 5 machines", "7-day analytics", "Email alerts"], cta: "Start free", highlight: false },
    { name: "Growth", price: "₹14,999", period: "/mo", desc: "For scaling factories", features: ["3 Factories", "Unlimited machines", "AI predictions", "Anomaly detection", "PDF reports", "Chatbot"], cta: "Start free", highlight: true },
    { name: "Enterprise", price: "Custom", period: "", desc: "For large operations", features: ["Unlimited factories", "Custom AI models", "API access", "Dedicated support", "SLA 99.9%"], cta: "Contact sales", highlight: false },
];

export const faqs = [
    { q: "How does EcoTwin AI predict consumption?", a: "We use time-series ML models (LSTM/XGBoost) trained on your historical energy data, weather, and production schedules to forecast demand with 90%+ accuracy." },
    { q: "Do I need extra hardware?", a: "No. EcoTwin connects to your existing smart meters and SCADA systems. A digital twin is created from your machine configurations." },
    { q: "Is my data secure?", a: "Yes. All data is encrypted in transit and at rest. You control access with role-based permissions and API keys." },
    { q: "How fast can I see savings?", a: "Most customers see actionable recommendations within the first week and measurable savings within 30 days." },
];

export const stats = [
    { value: "14%", label: "Avg. energy savings" },
    { value: "90%+", label: "Prediction accuracy" },
    { value: "2.1M", label: "kWh optimized" },
    { value: "320+", label: "Factories connected" },
];

export const trustedCompanies = ["Vertex", "LuminaTech", "ForgeWorks", "Nimbus", "Quantum", "Helios"];

export function getBotResponse(question) {
    const q = question.toLowerCase();
    if (q.includes("increase") || q.includes("yesterday")) {
        return "**Energy increased 8.2% yesterday** primarily due to:\n\n- Machine B ran 3.1h longer than scheduled (overtime batch)\n- Ambient temperature rose 4°C, increasing HVAC load by ~18%\n- An abnormal spike on Machine D between 14:00–16:00 (+28%)\n\n*Suggested action:* Review the Machine D anomaly alert and reschedule overtime to off-peak hours.";
    }
    if (q.includes("waste") || q.includes("most electricity")) {
        return "**Machine B** currently consumes the most electricity — **1,580 kWh/day** (33% of total).\n\nIt also has the lowest health score (82%) and an active overheating anomaly. Prioritizing its maintenance could recover ~₹950/week in wasted draw.";
    }
    if (q.includes("save") || q.includes("money") || q.includes("savings")) {
        return "Based on current recommendations you can save an estimated **₹3,290/week** (~₹14,100/month):\n\n| Action | Weekly savings |\n|---|---|\n| Shift Machine B to after 6 PM | ₹1,240 |\n| Reduce Machine C idle time | ₹680 |\n| Machine B maintenance | ₹950 |\n| HVAC setpoint optimization | ₹420 |\n\nCombined CO₂ reduction: **~0.44 tCO₂/week**.";
    }
    if (q.includes("maintenance") || q.includes("suggest")) {
        return "**Maintenance suggestions:**\n\n1. **Machine B** — overheating anomaly (78°C). Inspect cooling system & bearings within 48h.\n2. **Machine D** — abnormal consumption, check motor alignment.\n3. **Machine E** — efficiency dropping (71%), consider lubrication & filter cleaning.\n\n> Proactive maintenance on these could prevent an estimated ₹45,000 in downtime costs.";
    }
    return "I'm EcoTwin's energy assistant. Ask me about:\n- *Why did energy increase yesterday?*\n- *Which machine wastes the most electricity?*\n- *How much money can I save?*\n- *Give maintenance suggestions.*";
}