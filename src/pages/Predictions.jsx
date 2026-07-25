import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { Brain, Zap, IndianRupee, Cloud, Activity, Clock, TrendingUp, Sparkles } from "lucide-react";
import KpiCard from "@/components/eco/KpiCard";
import ChartCard, { SkeletonCard } from "@/components/eco/ChartCard";
import { predictions, forecast, aiInsights } from "@/lib/ecoData";

export default function Predictions() {
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    useEffect(() => { const t = setTimeout(() => setLoading(false), 700); return () => clearTimeout(t); }, []);

    if (loading) return <div className="grid lg:grid-cols-4 gap-4">{Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}</div>;

    const runPrediction = () => {
        setGenerating(true);
        setTimeout(() => setGenerating(false), 1800);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">AI Predictions</h1>
                    <p className="text-sm text-muted-foreground mt-1">Forecast tomorrow's energy, cost & carbon</p>
                </div>
                <button onClick={runPrediction} disabled={generating} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/25 disabled:opacity-60">
                    {generating ? <><Sparkles className="w-4 h-4 animate-spin" /> Generating...</> : <><Brain className="w-4 h-4" /> Re-run model</>}
                </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard label="Tomorrow's Energy" value={predictions.tomorrow_energy.value.toLocaleString()} unit="kWh" delta={-4.3} icon={Zap} accent="emerald" index={0} />
                <KpiCard label="Predicted Cost" value={`₹${predictions.predicted_cost.value.toLocaleString()}`} unit="" delta={-4.0} icon={IndianRupee} accent="blue" index={1} />
                <KpiCard label="Predicted Carbon" value={predictions.predicted_carbon.value} unit="tCO₂" delta={-5.6} icon={Cloud} accent="violet" index={2} />
                <KpiCard label="Confidence Score" value={predictions.tomorrow_energy.confidence} unit="%" delta={0.6} icon={Activity} accent="amber" index={3} />
            </div>

            <ChartCard title="24-Hour Forecast Graph" subtitle="Predicted kWh by hour">
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={forecast} margin={{ left: -20, top: 10, right: 10 }}>
                        <defs><linearGradient id="gFc" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} /><stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} /></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                        <ReferenceLine x="12" stroke="#ef4444" strokeDasharray="5 4" label={{ value: "Peak", fill: "#ef4444", fontSize: 11 }} />
                        <Area type="monotone" dataKey="predicted" name="Predicted kWh" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#gFc)" />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartCard>

            <div className="grid lg:grid-cols-2 gap-4">
                <ChartCard title="Peak Hours" subtitle="Expected high-demand windows">
                    <div className="space-y-3">
                        {predictions.peak_hours.map((h) => (
                            <div key={h} className="flex items-center justify-between p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                                <span className="flex items-center gap-2 text-sm font-medium"><Clock className="w-4 h-4 text-red-500" /> {h}</span>
                                <span className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> High demand</span>
                            </div>
                        ))}
                        <div className="flex items-center justify-between p-4 rounded-xl bg-background/40 border border-border">
                            <span className="flex items-center gap-2 text-sm font-medium"><Activity className="w-4 h-4 text-blue-500" /> Future Demand</span>
                            <span className="text-sm font-bold">{predictions.future_demand.value} kW</span>
                        </div>
                    </div>
                </ChartCard>

                <ChartCard title="AI Insights" subtitle="Generated by EcoTwin model">
                    <div className="space-y-3">
                        {aiInsights.map((ins, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex gap-3 p-3 rounded-xl bg-background/40 border border-border">
                                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500/15 to-blue-500/15 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                                </div>
                                <p className="text-sm leading-relaxed">{ins}</p>
                            </motion.div>
                        ))}
                    </div>
                </ChartCard>
            </div>
        </div>
    );
}