import React, { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Cpu, Bell, Key, Palette, Mail, Save, Plus, Trash2 } from "lucide-react";
import { machines } from "@/lib/ecoData";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const tabs = [
    { id: "company", label: "Company Profile", icon: Building2 },
    { id: "machines", label: "Machine Config", icon: Cpu },
    { id: "alerts", label: "Alert Thresholds", icon: Bell },
    { id: "api", label: "API Keys", icon: Key },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Mail },
];

function Field({ label, children }) {
    return (
        <div>
            <label className="text-xs font-medium text-muted-foreground">{label}</label>
            <div className="mt-1.5">{children}</div>
        </div>
    );
}

const inputCls = "w-full bg-background/60 border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/40";

export default function Settings() {
    const [tab, setTab] = useState("company");
    const [saved, setSaved] = useState(false);
    const { theme, setTheme } = useTheme();
    const [notif, setNotif] = useState({ email: true, push: true, anomaly: true, weekly: false });

    const save = () => { setSaved(true); setTimeout(() => setSaved(false), 1500); };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                <p className="text-sm text-muted-foreground mt-1">Manage your plant, machines & preferences</p>
            </div>

            <div className="grid lg:grid-cols-[220px_1fr] gap-6">
                <nav className="flex lg:flex-col gap-1 overflow-x-auto scrollbar-hide">
                    {tabs.map((t) => (
                        <button key={t.id} onClick={() => setTab(t.id)} className={cn("flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap", tab === t.id ? "bg-foreground text-background" : "text-muted-foreground hover:bg-accent/10 hover:text-foreground")}>
                            <t.icon className="w-4 h-4" /> {t.label}
                        </button>
                    ))}
                </nav>

                <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
                    {tab === "company" && (
                        <div className="space-y-5">
                            <h3 className="font-semibold">Company & Factory Details</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <Field label="Company Name"><input className={inputCls} defaultValue="Vertex Industries" /></Field>
                                <Field label="Industry"><input className={inputCls} defaultValue="Manufacturing" /></Field>
                                <Field label="Factory Name"><input className={inputCls} defaultValue="Plant Alpha — Pune" /></Field>
                                <Field label="Location"><input className={inputCls} defaultValue="Pune, Maharashtra" /></Field>
                                <Field label="Tariff Plan"><select className={inputCls}><option>Industrial TOU</option><option>Flat Rate</option></select></Field>
                                <Field label="Currency"><select className={inputCls}><option>INR (₹)</option><option>USD ($)</option></select></Field>
                            </div>
                        </div>
                    )}
                    {tab === "machines" && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between"><h3 className="font-semibold">Machine Configuration</h3><button className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg bg-foreground text-background"><Plus className="w-3.5 h-3.5" /> Add</button></div>
                            {machines.map((m) => (
                                <div key={m.id} className="flex items-center gap-3 p-4 rounded-xl bg-background/40 border border-border">
                                    <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400"><Cpu className="w-4 h-4" /></div>
                                    <div className="flex-1"><p className="text-sm font-medium">{m.name}</p><p className="text-xs text-muted-foreground">Rated {m.power} kW · {m.energyUsage} kWh/day</p></div>
                                    <button className="text-muted-foreground hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            ))}
                        </div>
                    )}
                    {tab === "alerts" && (
                        <div className="space-y-5">
                            <h3 className="font-semibold">Alert Thresholds</h3>
                            {[
                                { label: "Max Temperature (°C)", val: 75 },
                                { label: "Peak Demand (kW)", val: 320 },
                                { label: "Abnormal Consumption (%)", val: 25 },
                                { label: "Min Efficiency (%)", val: 70 },
                            ].map((t) => (
                                <div key={t.label}>
                                    <Field label={t.label}><input type="number" defaultValue={t.val} className={inputCls} /></Field>
                                </div>
                            ))}
                        </div>
                    )}
                    {tab === "api" && (
                        <div className="space-y-4">
                            <h3 className="font-semibold">API Keys</h3>
                            <p className="text-sm text-muted-foreground">Use these keys to integrate EcoTwin with your systems.</p>
                            {[
                                { name: "Production Key", key: "et_prod_••••••••••••3f9a" },
                                { name: "Sandbox Key", key: "et_test_••••••••••••7b2c" },
                            ].map((k) => (
                                <div key={k.name} className="flex items-center gap-3 p-4 rounded-xl bg-background/40 border border-border">
                                    <Key className="w-4 h-4 text-muted-foreground" />
                                    <div className="flex-1"><p className="text-sm font-medium">{k.name}</p><p className="text-xs text-muted-foreground font-mono">{k.key}</p></div>
                                    <button className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Reveal</button>
                                </div>
                            ))}
                            <button className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg bg-foreground text-background"><Plus className="w-3.5 h-3.5" /> Generate new key</button>
                        </div>
                    )}
                    {tab === "appearance" && (
                        <div className="space-y-5">
                            <h3 className="font-semibold">Theme Settings</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {["light", "dark"].map((t) => (
                                    <button key={t} onClick={() => setTheme(t)} className={cn("rounded-xl p-4 border-2 text-left capitalize", theme === t ? "border-emerald-500" : "border-border")}>
                                        <div className={cn("h-16 rounded-lg mb-2", t === "light" ? "bg-gradient-to-br from-white to-slate-100" : "bg-gradient-to-br from-slate-900 to-slate-800")} />
                                        {t} Mode
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {tab === "notifications" && (
                        <div className="space-y-4">
                            <h3 className="font-semibold">Notification Settings</h3>
                            {[
                                { id: "email", label: "Email notifications", desc: "Receive alerts via email" },
                                { id: "push", label: "Push notifications", desc: "Browser push alerts" },
                                { id: "anomaly", label: "Anomaly alerts", desc: "Get notified of detected anomalies" },
                                { id: "weekly", label: "Weekly digest", desc: "Summary report every Monday" },
                            ].map((n) => (
                                <div key={n.id} className="flex items-center justify-between p-4 rounded-xl bg-background/40 border border-border">
                                    <div><p className="text-sm font-medium">{n.label}</p><p className="text-xs text-muted-foreground">{n.desc}</p></div>
                                    <button onClick={() => setNotif((p) => ({ ...p, [n.id]: !p[n.id] }))} className={cn("w-11 h-6 rounded-full transition-colors relative", notif[n.id] ? "bg-emerald-500" : "bg-muted")}>
                                        <span className={cn("absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform", notif[n.id] ? "translate-x-5" : "translate-x-0.5")} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
                        <button onClick={save} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/25">
                            <Save className="w-4 h-4" /> {saved ? "Saved!" : "Save changes"}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}