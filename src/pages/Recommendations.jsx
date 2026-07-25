import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, IndianRupee, Cloud, Sparkles, Check, RefreshCw } from "lucide-react";
import { recommendations as initialRecs } from "@/lib/ecoData";
import { cn } from "@/lib/utils";

const impactColor = { high: "bg-red-500/10 text-red-600 dark:text-red-400", medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400", low: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" };

export default function Recommendations() {
    const [recs, setRecs] = useState(initialRecs);
    const [generating, setGenerating] = useState(false);
    const [applied, setApplied] = useState([]);

    const generate = () => {
        setGenerating(true);
        setTimeout(() => {
            setRecs([...initialRecs].sort(() => Math.random() - 0.5));
            setGenerating(false);
        }, 1500);
    };

    const apply = (id) => setApplied((p) => [...p, id]);

    const totalSavings = recs.reduce((s, r) => s + r.savings, 0);
    const totalCarbon = recs.reduce((s, r) => s + r.carbon_reduction, 0);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Smart Recommendations</h1>
                    <p className="text-sm text-muted-foreground mt-1">AI-generated actions to cut cost & carbon</p>
                </div>
                <button onClick={generate} disabled={generating} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/25 disabled:opacity-60">
                    {generating ? <><RefreshCw className="w-4 h-4 animate-spin" /> Analyzing...</> : <><Sparkles className="w-4 h-4" /> Generate recommendations</>}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400"><IndianRupee className="w-6 h-6" /></div>
                    <div>
                        <p className="text-xs text-muted-foreground">Expected Savings</p>
                        <p className="text-2xl font-bold">₹{totalSavings.toLocaleString()}<span className="text-sm text-muted-foreground">/week</span></p>
                    </div>
                </div>
                <div className="glass rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-600 dark:text-blue-400"><Cloud className="w-6 h-6" /></div>
                    <div>
                        <p className="text-xs text-muted-foreground">Carbon Reduction</p>
                        <p className="text-2xl font-bold">{totalCarbon.toFixed(2)}<span className="text-sm text-muted-foreground">tCO₂/wk</span></p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {recs.map((r, i) => (
                    <motion.div key={r.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/15 to-blue-500/15 flex items-center justify-center shrink-0">
                            <Lightbulb className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold tracking-tight">{r.title}</h3>
                                <span className={cn("text-[10px] font-bold uppercase px-2 py-0.5 rounded-full", impactColor[r.impact])}>{r.impact} impact</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{r.reason}</p>
                            <div className="flex gap-4 mt-2 text-xs">
                                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Save ₹{r.savings}/wk</span>
                                <span className="text-blue-600 dark:text-blue-400 font-medium">−{r.carbon_reduction} tCO₂</span>
                            </div>
                        </div>
                        <button
                            onClick={() => apply(r.id)}
                            disabled={applied.includes(r.id)}
                            className={cn(
                                "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0",
                                applied.includes(r.id) ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-foreground text-background hover:opacity-90"
                            )}
                        >
                            {applied.includes(r.id) ? <><Check className="w-4 h-4" /> Applied</> : "Apply"}
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}