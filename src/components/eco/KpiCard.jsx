import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function KpiCard({ label, value, unit, delta, icon: Icon, accent = "emerald", index = 0 }) {
    const positive = delta >= 0;
    const accentMap = {
        emerald: "from-emerald-500/15 to-emerald-500/5 text-emerald-600 dark:text-emerald-400",
        blue: "from-blue-500/15 to-blue-500/5 text-blue-600 dark:text-blue-400",
        violet: "from-violet-500/15 to-violet-500/5 text-violet-600 dark:text-violet-400",
        amber: "from-amber-500/15 to-amber-500/5 text-amber-600 dark:text-amber-400",
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="glass rounded-2xl p-5 hover:shadow-xl hover:shadow-emerald-500/5 transition-shadow group"
        >
            <div className="flex items-start justify-between">
                <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center", accentMap[accent])}>
                    {Icon && <Icon className="w-5 h-5" />}
                </div>
                <span
                    className={cn(
                        "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg",
                        positive ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-red-500/10 text-red-600 dark:text-red-400"
                    )}
                >
                    {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(delta)}%
                </span>
            </div>
            <p className="text-xs text-muted-foreground mt-4">{label}</p>
            <p className="text-2xl font-bold tracking-tight mt-1">
                {value} <span className="text-sm font-medium text-muted-foreground">{unit}</span>
            </p>
        </motion.div>
    );
}