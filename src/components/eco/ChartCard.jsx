import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ChartCard({ title, subtitle, action, children, className }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn("glass rounded-2xl p-5", className)}
        >
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="font-semibold tracking-tight">{title}</h3>
                    {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
                </div>
                {action}
            </div>
            {children}
        </motion.div>
    );
}

export function SkeletonCard({ className }) {
    return (
        <div className={cn("glass rounded-2xl p-5 animate-pulse", className)}>
            <div className="h-4 w-24 bg-muted rounded mb-4" />
            <div className="h-32 bg-muted/60 rounded-lg" />
        </div>
    );
}