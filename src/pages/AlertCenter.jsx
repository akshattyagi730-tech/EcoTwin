import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Flame, Zap, Activity, Clock, CheckCircle2 } from "lucide-react";
import { alerts as initialAlerts } from "@/lib/ecoData";
import { cn } from "@/lib/utils";

const severityConfig = {
    critical: { color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30", dot: "bg-red-500", label: "Critical" },
    high: { color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30", dot: "bg-orange-500", label: "High" },
    medium: { color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30", dot: "bg-amber-500", label: "Medium" },
    low: { color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30", dot: "bg-emerald-500", label: "Low" },
};

const typeIcon = {
    overheating: Flame, peak_load: Zap, abnormal: AlertTriangle, idle: Clock, efficiency: Activity,
};

export default function AlertCenter() {
    const [alerts, setAlerts] = useState(initialAlerts);
    const [filter, setFilter] = useState("all");

    const filtered = filter === "all" ? alerts : alerts.filter((a) => a.severity === filter);
    const counts = { all: alerts.length, critical: alerts.filter((a) => a.severity === "critical").length, high: alerts.filter((a) => a.severity === "high").length, medium: alerts.filter((a) => a.severity === "medium").length, low: alerts.filter((a) => a.severity === "low").length };

    const resolve = (id) => setAlerts((prev) => prev.filter((a) => a.id !== id));

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Alert Center</h1>
                <p className="text-sm text-muted-foreground mt-1">Real-time anomalies and warnings across your plant</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {["all", "critical", "high", "medium", "low"].map((s) => (
                    <button key={s} onClick={() => setFilter(s)} className={cn("glass rounded-xl p-4 text-left transition-all", filter === s && "ring-2 ring-emerald-500")}>
                        <p className="text-2xl font-bold capitalize">{counts[s]}</p>
                        <p className="text-xs text-muted-foreground capitalize">{s === "all" ? "Total alerts" : `${s} severity`}</p>
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                <AnimatePresence>
                    {filtered.map((a, i) => {
                        const cfg = severityConfig[a.severity];
                        const Icon = typeIcon[a.type] || AlertTriangle;
                        return (
                            <motion.div key={a.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ delay: i * 0.05 }} className={cn("glass rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4 border-l-4", cfg.color.split(" ")[2])}>
                                <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shrink-0", cfg.color)}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="font-semibold tracking-tight">{a.title}</h3>
                                        <span className={cn("text-[10px] font-bold uppercase px-2 py-0.5 rounded-full", cfg.color)}>{cfg.label}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">{a.desc}</p>
                                    <p className="text-xs text-muted-foreground/70 mt-1.5 flex items-center gap-2">
                                        <span className="font-medium">{a.machine}</span> · <Clock className="w-3 h-3" /> {a.time}
                                    </p>
                                </div>
                                <button onClick={() => resolve(a.id)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-foreground text-background hover:opacity-90 shrink-0">
                                    <CheckCircle2 className="w-4 h-4" /> Resolve
                                </button>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
                {filtered.length === 0 && (
                    <div className="glass rounded-2xl p-12 text-center">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                        <p className="font-semibold">All clear</p>
                        <p className="text-sm text-muted-foreground mt-1">No alerts in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}