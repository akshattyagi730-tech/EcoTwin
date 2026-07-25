import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import {
    LayoutDashboard, Factory, BarChart3, Brain, Lightbulb, Bell,
    MessageSquare, FileText, Settings, Leaf, Menu, X, Sun, Moon, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Digital Twin", path: "/digital-twin", icon: Factory },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "AI Predictions", path: "/predictions", icon: Brain },
    { name: "Recommendations", path: "/recommendations", icon: Lightbulb },
    { name: "Alert Center", path: "/alerts", icon: Bell, badge: 3 },
    { name: "AI Chatbot", path: "/chatbot", icon: MessageSquare },
    { name: "Reports", path: "/reports", icon: FileText },
    { name: "Settings", path: "/settings", icon: Settings },
];

function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return <div className="w-9 h-9" />;
    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-accent/10 transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
    );
}

export default function Layout() {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed lg:sticky top-0 z-50 h-screen w-64 shrink-0 transition-transform duration-300",
                    "bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col",
                    open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                <div className="h-16 flex items-center gap-2.5 px-5 border-b border-sidebar-border">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="font-semibold tracking-tight leading-none">EcoTwin AI</p>
                        <p className="text-[10px] text-sidebar-foreground/50 mt-0.5">Digital Energy Twin</p>
                    </div>
                    <button className="ml-auto lg:hidden text-sidebar-foreground/60" onClick={() => setOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
                    {nav.map((item) => {
                        const active = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                className={cn(
                                    "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                                    active
                                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-emerald-500/20"
                                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                                )}
                            >
                                <item.icon className="w-[18px] h-[18px] shrink-0" />
                                <span>{item.name}</span>
                                {item.badge && (
                                    <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-3 border-t border-sidebar-border">
                    <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors">
                        <ChevronRight className="w-3 h-3 rotate-180" /> Back to landing
                    </Link>
                </div>
            </aside>

            {open && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}

            {/* Main */}
            <div className="flex-1 min-w-0 flex flex-col">
                <header className="sticky top-0 z-30 h-16 glass-strong border-b border-border flex items-center gap-3 px-4 lg:px-8">
                    <button className="lg:hidden text-foreground" onClick={() => setOpen(true)}>
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Plant Alpha — Pune</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs">Live</span>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <ThemeToggle />
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                            AM
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}