import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    RadialBarChart, RadialBar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
    Zap, IndianRupee, PiggyBank, Cloud, Gauge, Activity, Target, Heart, Calendar,
} from "lucide-react";
import KpiCard from "@/components/eco/KpiCard";
import ChartCard, { SkeletonCard } from "@/components/eco/ChartCard";
import { kpis, energy7Days, machineBar, carbonTrend, costTrend, energyPie, monthlyHeatmap } from "@/lib/ecoData";

const heatColor = (v) => {
    if (v < 25) return "bg-emerald-500/30";
    if (v < 50) return "bg-emerald-500/55";
    if (v < 70) return "bg-amber-500/60";
    if (v < 85) return "bg-orange-500/70";
    return "bg-red-500/80";
};

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    useEffect(() => { const t = setTimeout(() => setLoading(false), 700); return () => clearTimeout(t); }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Energy Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1">Real-time overview of Plant Alpha — updated just now</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard label="Today's Energy" value={kpis.today_energy.value.toLocaleString()} unit="kWh" delta={kpis.today_energy.delta} icon={Zap} accent="emerald" index={0} />
                <KpiCard label="Electricity Cost" value={`₹${kpis.electricity_cost.value.toLocaleString()}`} unit="" delta={kpis.electricity_cost.delta} icon={IndianRupee} accent="blue" index={1} />
                <KpiCard label="Estimated Savings" value={`₹${kpis.estimated_savings.value.toLocaleString()}`} unit="" delta={kpis.estimated_savings.delta} icon={PiggyBank} accent="violet" index={2} />
                <KpiCard label="Carbon Emission" value={kpis.carbon_emission.value} unit="tCO₂" delta={kpis.carbon_emission.delta} icon={Cloud} accent="emerald" index={3} />
                <KpiCard label="Efficiency Score" value={kpis.efficiency_score.value} unit="%" delta={kpis.efficiency_score.delta} icon={Gauge} accent="blue" index={4} />
                <KpiCard label="Peak Demand" value={kpis.peak_demand.value} unit="kW" delta={kpis.peak_demand.delta} icon={Activity} accent="amber" index={5} />
                <KpiCard label="Prediction Accuracy" value={kpis.prediction_accuracy.value} unit="%" delta={kpis.prediction_accuracy.delta} icon={Target} accent="violet" index={6} />
                <KpiCard label="Machine Health" value={kpis.machine_health.value} unit="%" delta={kpis.machine_health.delta} icon={Heart} accent="emerald" index={7} />
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
                <ChartCard title="7-Day Energy Consumption" subtitle="Actual vs AI predicted" className="lg:col-span-2">
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={energy7Days} margin={{ left: -20, right: 10, top: 10 }}>
                            <defs>
                                <linearGradient id="gActual" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="gPred" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                            <Area type="monotone" dataKey="actual" name="Actual" stroke="#10b981" strokeWidth={2.5} fill="url(#gActual)" />
                            <Area type="monotone" dataKey="predicted" name="Predicted" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 4" fill="url(#gPred)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Energy Distribution" subtitle="By machine today">
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie data={energyPie} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3}>
                                {energyPie.map((e) => <Cell key={e.name} fill={e.color} />)}
                            </Pie>
                            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
                <ChartCard title="Machine-wise Consumption" subtitle="kWh today">
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={machineBar} margin={{ left: -20, top: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} cursor={{ fill: "hsl(var(--muted) / 0.3)" }} />
                            <Bar dataKey="energy" name="Energy (kWh)" radius={[8, 8, 0, 0]}>
                                {machineBar.map((_, i) => <Cell key={i} fill={["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"][i]} />)}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Carbon Trend" subtitle="Monthly tCO₂">
                    <ResponsiveContainer width="100%" height={260}>
                        <LineChart data={carbonTrend} margin={{ left: -20, top: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                            <Line type="monotone" dataKey="co2" name="tCO₂" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Real-time Efficiency" subtitle="Live gauge">
                    <div className="flex flex-col items-center justify-center h-[260px]">
                        <ResponsiveContainer width="100%" height={200}>
                            <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ name: "eff", value: 87, fill: "#10b981" }]} startAngle={220} endAngle={-40}>
                                <RadialBar background dataKey="value" cornerRadius={20} />
                            </RadialBarChart>
                        </ResponsiveContainer>
                        <p className="text-3xl font-bold -mt-28">87<span className="text-base">%</span></p>
                        <p className="text-xs text-muted-foreground mt-20">Operating efficiency</p>
                    </div>
                </ChartCard>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
                <ChartCard title="Electricity Cost Trend" subtitle="Monthly ₹" className="lg:col-span-2">
                    <ResponsiveContainer width="100%" height={260}>
                        <AreaChart data={costTrend} margin={{ left: -10, top: 10 }}>
                            <defs>
                                <linearGradient id="gCost" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                            <Area type="monotone" dataKey="cost" name="Cost ₹" stroke="#3b82f6" strokeWidth={2.5} fill="url(#gCost)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Monthly Heatmap" subtitle="Hour × day intensity" action={<Calendar className="w-4 h-4 text-muted-foreground" />}>
                    <div className="space-y-1">
                        {monthlyHeatmap.slice(0, 7).map((row, d) => (
                            <div key={d} className="flex gap-1">
                                {row.map((v, h) => (
                                    <div key={h} className={`flex-1 h-4 rounded-sm ${heatColor(v)}`} title={`${h}:00 — ${v}%`} />
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-[10px] text-muted-foreground">
                        <span>Low</span>
                        <div className="flex gap-0.5">
                            <div className="w-3 h-3 rounded-sm bg-emerald-500/30" />
                            <div className="w-3 h-3 rounded-sm bg-emerald-500/55" />
                            <div className="w-3 h-3 rounded-sm bg-amber-500/60" />
                            <div className="w-3 h-3 rounded-sm bg-orange-500/70" />
                            <div className="w-3 h-3 rounded-sm bg-red-500/80" />
                        </div>
                        <span>High</span>
                    </div>
                </ChartCard>
            </div>
        </div>
    );
}