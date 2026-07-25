import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Calendar, Factory, Download, LineChart as LineIcon } from "lucide-react";
import ChartCard from "@/components/eco/ChartCard";
import { energy7Days, machineBar, carbonTrend, costTrend, factories } from "@/lib/ecoData";
import { cn } from "@/lib/utils";

const ranges = ["Weekly", "Monthly", "Yearly"];
const tabs = ["Energy", "Cost", "Carbon", "Machine"];

export default function Analytics() {
    const [range, setRange] = useState("Weekly");
    const [tab, setTab] = useState("Energy");
    const [factory, setFactory] = useState(factories[0].id);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
                <p className="text-sm text-muted-foreground mt-1">Deep-dive into energy, cost, carbon and machine metrics</p>
            </div>

            {/* Filters */}
            <div className="glass rounded-2xl p-4 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                    <Factory className="w-4 h-4 text-muted-foreground" />
                    <select value={factory} onChange={(e) => setFactory(e.target.value)} className="bg-transparent text-sm font-medium border border-border rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-emerald-500/40">
                        {factories.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <input type="date" defaultValue="2026-07-24" className="bg-transparent text-sm border border-border rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-emerald-500/40" />
                </div>
                <div className="flex rounded-lg border border-border p-0.5 ml-auto">
                    {ranges.map((r) => (
                        <button key={r} onClick={() => setRange(r)} className={cn("text-xs font-medium px-3 py-1.5 rounded-md transition-colors", range === r ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground")}>{r}</button>
                    ))}
                </div>
                <button className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg glass hover:bg-accent/10">
                    <Download className="w-3.5 h-3.5" /> Export
                </button>
            </div>

            {/* Metric tabs */}
            <div className="flex gap-1 border-b border-border">
                {tabs.map((t) => (
                    <button key={t} onClick={() => setTab(t)} className={cn("relative text-sm font-medium px-4 py-2.5 transition-colors", tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
                        {t} Analytics
                        {tab === t && <motion.div layoutId="atab" className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500" />}
                    </button>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
                {tab === "Energy" && (
                    <>
                        <ChartCard title={`${range} Energy`}>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={energy7Days} margin={{ left: -20, top: 10 }}>
                                    <defs><linearGradient id="aE" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="100%" stopColor="#10b981" stopOpacity={0} /></linearGradient></defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                                    <Area type="monotone" dataKey="actual" name="Energy (kWh)" stroke="#10b981" strokeWidth={2.5} fill="url(#aE)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </ChartCard>
                        <ChartCard title="Machine Energy Comparison">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={machineBar} margin={{ left: -20, top: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} cursor={{ fill: "hsl(var(--muted) / 0.3)" }} />
                                    <Bar dataKey="energy" name="kWh" radius={[8, 8, 0, 0]} fill="#3b82f6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartCard>
                    </>
                )}
                {tab === "Cost" && (
                    <>
                        <ChartCard title={`${range} Cost Trend`}>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={costTrend} margin={{ left: -10, top: 10 }}>
                                    <defs><linearGradient id="aC" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} /><stop offset="100%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient></defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                                    <Area type="monotone" dataKey="cost" name="Cost ₹" stroke="#3b82f6" strokeWidth={2.5} fill="url(#aC)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </ChartCard>
                        <ChartCard title="Cost by Machine">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={machineBar} margin={{ left: -10, top: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} cursor={{ fill: "hsl(var(--muted) / 0.3)" }} />
                                    <Bar dataKey="cost" name="Cost ₹" radius={[8, 8, 0, 0]} fill="#10b981" />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartCard>
                    </>
                )}
                {tab === "Carbon" && (
                    <ChartCard title={`${range} Carbon Trend`} className="lg:col-span-2">
                        <ResponsiveContainer width="100%" height={320}>
                            <LineChart data={carbonTrend} margin={{ left: -20, top: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                                <Line type="monotone" dataKey="co2" name="tCO₂" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartCard>
                )}
                {tab === "Machine" && (
                    <ChartCard title="Machine-wise Energy & Cost" className="lg:col-span-2">
                        <ResponsiveContainer width="100%" height={320}>
                            <BarChart data={machineBar} margin={{ left: -10, top: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} cursor={{ fill: "hsl(var(--muted) / 0.3)" }} />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                                <Bar dataKey="energy" name="Energy (kWh)" radius={[8, 8, 0, 0]} fill="#10b981" />
                                <Bar dataKey="cost" name="Cost (₹)" radius={[8, 8, 0, 0]} fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                )}
            </div>

            <div className="glass rounded-2xl p-5 flex items-center gap-3 text-sm text-muted-foreground">
                <LineIcon className="w-4 h-4 text-emerald-500" />
                Showing <span className="text-foreground font-medium">{range}</span> analytics for <span className="text-foreground font-medium">{factories.find((f) => f.id === factory)?.name}</span>.
            </div>
        </div>
    );
}