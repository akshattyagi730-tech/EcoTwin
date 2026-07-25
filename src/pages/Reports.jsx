import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Mail, Zap, IndianRupee, Cloud, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const reportTypes = [
    { id: "weekly", name: "Weekly Report", period: "Jul 18 – Jul 24", energy: 3340, cost: 89000, co2: 1.62, saved: 4200 },
    { id: "monthly", name: "Monthly Report", period: "July 2026", energy: 14200, cost: 378000, co2: 6.84, saved: 18400 },
    { id: "yearly", name: "Yearly Report", period: "2026 YTD", energy: 168000, cost: 4.42e6, co2: 81.4, saved: 218000 },
];

const fmt = (n) => n >= 1e6 ? `${(n / 1e6).toFixed(2)}M` : n.toLocaleString();

export default function Reports() {
    const [active, setActive] = useState("weekly");
    const [emailed, setEmailed] = useState(false);
    const r = reportTypes.find((x) => x.id === active);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
                <p className="text-sm text-muted-foreground mt-1">Generate and export energy performance reports</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {reportTypes.map((rt) => (
                    <button key={rt.id} onClick={() => setActive(rt.id)} className={cn("glass rounded-2xl p-5 text-left transition-all", active === rt.id ? "ring-2 ring-emerald-500" : "hover:bg-accent/5")}>
                        <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-4 h-4 text-emerald-500" />
                            <span className="font-semibold">{rt.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> {rt.period}</p>
                    </button>
                ))}
            </div>

            <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                    <div>
                        <h2 className="text-lg font-bold">{r.name}</h2>
                        <p className="text-sm text-muted-foreground">{r.period} · Plant Alpha — Pune</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg glass hover:bg-accent/10"><Download className="w-3.5 h-3.5" /> PDF</button>
                        <button className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg glass hover:bg-accent/10"><Download className="w-3.5 h-3.5" /> Excel</button>
                        <button onClick={() => { setEmailed(true); setTimeout(() => setEmailed(false), 2000); }} className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg bg-foreground text-background hover:opacity-90"><Mail className="w-3.5 h-3.5" /> {emailed ? "Sent!" : "Email"}</button>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { icon: Zap, label: "Total Energy", value: `${fmt(r.energy)}`, unit: "kWh", c: "text-emerald-500" },
                        { icon: IndianRupee, label: "Total Cost", value: `₹${fmt(r.cost)}`, unit: "", c: "text-blue-500" },
                        { icon: Cloud, label: "CO₂ Emission", value: r.co2, unit: "tCO₂", c: "text-violet-500" },
                        { icon: IndianRupee, label: "Energy Saved", value: `₹${fmt(r.saved)}`, unit: "", c: "text-emerald-500" },
                    ].map((s) => (
                        <div key={s.label} className="rounded-xl bg-background/40 border border-border p-4">
                            <div className={cn("w-9 h-9 rounded-lg bg-muted/40 flex items-center justify-center mb-3", s.c)}><s.icon className="w-4 h-4" /></div>
                            <p className="text-xs text-muted-foreground">{s.label}</p>
                            <p className={cn("text-xl font-bold mt-0.5", s.c)}>{s.value}<span className="text-xs text-muted-foreground ml-0.5">{s.unit}</span></p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 space-y-2 text-sm">
                    <div className="flex items-center justify-between py-2 border-b border-border"><span className="text-muted-foreground">Avg. daily consumption</span><span className="font-medium">{(r.energy / 7).toFixed(0)} kWh</span></div>
                    <div className="flex items-center justify-between py-2 border-b border-border"><span className="text-muted-foreground">Avg. daily cost</span><span className="font-medium">₹{Math.round(r.cost / 7).toLocaleString()}</span></div>
                    <div className="flex items-center justify-between py-2 border-b border-border"><span className="text-muted-foreground">Cost reduction vs prev. period</span><span className="font-medium text-emerald-500">−4.3%</span></div>
                    <div className="flex items-center justify-between py-2"><span className="text-muted-foreground">Anomalies detected</span><span className="font-medium">3</span></div>
                </div>
            </motion.div>
        </div>
    );
}