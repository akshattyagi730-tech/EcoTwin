import React, { useState } from "react";
import { motion } from "framer-motion";
import { Thermometer, Zap, Heart, Clock, Activity, AlertTriangle, Cpu } from "lucide-react";
import { machines } from "@/lib/ecoData";
import { cn } from "@/lib/utils";

function Gauge({ value, max, color }) {
    const pct = Math.min(100, (value / max) * 100);
    return (
        <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8 }} className={cn("h-full rounded-full", color)} />
        </div>
    );
}

function MachineCard({ machine, index }) {
    const statusColor = machine.status === "running" ? "emerald" : machine.status === "idle" ? "amber" : "red";
    const statusBg = { emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400", red: "bg-red-500/10 text-red-600 dark:text-red-400" }[statusColor];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
            className={cn("glass rounded-2xl p-6 relative overflow-hidden", machine.anomaly && "ring-2 ring-amber-500/50")}
        >
            {machine.anomaly && (
                <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Anomaly
                </div>
            )}
            <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/15 to-blue-500/15 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                    <h3 className="font-semibold tracking-tight">{machine.name}</h3>
                    <span className={cn("inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full capitalize mt-1", statusBg)}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", machine.status === "running" ? "bg-emerald-500 animate-pulse" : machine.status === "idle" ? "bg-amber-500" : "bg-red-500")} />
                        {machine.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="rounded-xl bg-background/40 p-3 border border-border">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1"><Thermometer className="w-3.5 h-3.5" /> Temperature</div>
                    <p className="text-lg font-bold">{machine.temperature}<span className="text-xs">°C</span></p>
                    <div className="mt-2"><Gauge value={machine.temperature} max={100} color={machine.temperature > 70 ? "bg-amber-500" : "bg-emerald-500"} /></div>
                </div>
                <div className="rounded-xl bg-background/40 p-3 border border-border">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1"><Zap className="w-3.5 h-3.5" /> Power</div>
                    <p className="text-lg font-bold">{machine.power}<span className="text-xs">kW</span></p>
                    <div className="mt-2"><Gauge value={machine.power} max={80} color="bg-blue-500" /></div>
                </div>
            </div>

            <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-muted-foreground"><Heart className="w-4 h-4" /> Health</span>
                    <span className="font-semibold">{machine.health}%</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-muted-foreground"><Clock className="w-4 h-4" /> Running Time</span>
                    <span className="font-semibold">{machine.runningTime}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-muted-foreground"><Activity className="w-4 h-4" /> Energy Usage</span>
                    <span className="font-semibold">{machine.energyUsage} kWh</span>
                </div>
            </div>
        </motion.div>
    );
}

export default function DigitalTwin() {
    const [selected, setSelected] = useState(null);
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Digital Twin</h1>
                    <p className="text-sm text-muted-foreground mt-1">Interactive factory floor — live machine telemetry</p>
                </div>
                <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full glass">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Synced 2s ago
                </span>
            </div>

            {/* Factory layout */}
            <div className="glass rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold tracking-tight">Plant Alpha — Floor Layout</h3>
                        <span className="text-xs text-muted-foreground">Tap a machine for details</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {machines.map((m, i) => (
                            <button
                                key={m.id}
                                onClick={() => setSelected(m)}
                                className={cn(
                                    "relative rounded-2xl p-5 border text-left transition-all hover:scale-[1.02]",
                                    m.anomaly ? "border-amber-500/50 bg-amber-500/5" : "border-border bg-background/40 hover:border-emerald-500/50",
                                    selected?.id === m.id && "ring-2 ring-emerald-500"
                                )}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <Cpu className={cn("w-7 h-7", m.anomaly ? "text-amber-500" : "text-emerald-500")} />
                                    <span className={cn("w-2.5 h-2.5 rounded-full", m.status === "running" ? "bg-emerald-500 animate-pulse" : "bg-amber-500")} />
                                </div>
                                <p className="font-semibold">{m.name}</p>
                                <p className="text-xs text-muted-foreground capitalize">{m.status}</p>
                                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                                    <span>{m.temperature}°C</span><span>·</span><span>{m.power} kW</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* connection lines decoration */}
                    <div className="hidden md:flex items-center justify-center mt-6 text-xs text-muted-foreground">
                        <span className="flex items-center gap-2"><span className="w-8 h-px bg-border" /> Power bus <span className="w-8 h-px bg-border" /></span>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                {machines.map((m, i) => <MachineCard key={m.id} machine={m} index={i} />)}
            </div>

            {selected && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelected(null)}>
                    <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} className="glass-strong rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-lg">{selected.name}</h3>
                            <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">×</button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">Live telemetry snapshot for {selected.name}.</p>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="rounded-lg bg-background/40 p-3"><p className="text-xs text-muted-foreground">Temperature</p><p className="font-bold">{selected.temperature}°C</p></div>
                            <div className="rounded-lg bg-background/40 p-3"><p className="text-xs text-muted-foreground">Power</p><p className="font-bold">{selected.power} kW</p></div>
                            <div className="rounded-lg bg-background/40 p-3"><p className="text-xs text-muted-foreground">Health</p><p className="font-bold">{selected.health}%</p></div>
                            <div className="rounded-lg bg-background/40 p-3"><p className="text-xs text-muted-foreground">Energy</p><p className="font-bold">{selected.energyUsage} kWh</p></div>
                        </div>
                        {selected.anomaly && <p className="mt-4 text-sm text-amber-600 dark:text-amber-400 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Anomaly detected — maintenance recommended.</p>}
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}