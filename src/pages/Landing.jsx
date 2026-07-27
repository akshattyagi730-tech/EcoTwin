import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Leaf, Zap, Brain, ArrowRight, BarChart3, ShieldCheck, Cpu, LineChart,
    Check, Star,
} from "lucide-react";
import { stats, testimonials, pricing, faqs, trustedCompanies,
} from "@/lib/ecoData";
import { useTheme } from "next-themes";

const features = [
    { icon: Brain, title: "AI Predictions", desc: "Forecast tomorrow's energy, cost & carbon with 90%+ accuracy using LSTM/XGBoost models." },
    { icon: Cpu, title: "Digital Twin", desc: "Live factory layout mirroring every machine's status, temperature & health in real time." },
    { icon: ShieldCheck, title: "Anomaly Detection", desc: "Isolation Forest flags abnormal consumption before it drains your budget." },
    { icon: LineChart, title: "Smart Analytics", desc: "Energy, cost & carbon analytics with weekly, monthly and yearly breakdowns." },
    { icon: Zap, title: "Smart Scheduling", desc: "AI recommendations shift load to off-peak hours, cutting bills by up to 22%." },
    { icon: BarChart3, title: "Reports & Alerts", desc: "Auto-generated PDF/Excel reports and a real-time alert center for your team." },
];

function Nav() {
    const { theme, setTheme } = useTheme();
    return (
        <header className="fixed top-0 inset-x-0 z-50 glass-strong border-b border-border">
            <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold tracking-tight text-lg">EcoTwin AI</span>
                </div>
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <a href="#features" className="hover:text-foreground transition-colors">Features</a>
                    <a href="#stats" className="hover:text-foreground transition-colors">Stats</a>
                    <a href="#testimonials" className="hover:text-foreground transition-colors">Customers</a>
                    <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
                    <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
                </nav>
                <div className="flex items-center gap-3">
                    <Link to="/dashboard" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity">
                        Launch Dashboard <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </header>
    );
}

function Hero() {
    return (
        <section className="relative pt-36 pb-24 overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute top-20 -left-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
            <div className="absolute top-40 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="relative max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-12 items-center">
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full glass border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> AI-Powered Energy Intelligence
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                        AI-Powered Digital Twin<br />
                        <span className="gradient-text">for Smart Energy Optimization</span>
                    </h1>
                    <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
                        Reduce electricity costs, predict future consumption, detect anomalies and optimize machine schedules using Artificial Intelligence.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link to="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-shadow">
                            Launch Dashboard <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a href="#pricing" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass font-semibold hover:bg-accent/10 transition-colors">
                            Book Demo
                        </a>
                    </div>
                    <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> No hardware required</span>
                        <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Setup in minutes</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                >
                    <div className="glass rounded-3xl p-6 shadow-2xl shadow-emerald-500/10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Brain className="w-4 h-4 text-emerald-500" />
                                <span className="text-sm font-semibold">Live Energy Twin</span>
                            </div>
                            <span className="text-xs text-emerald-500 font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Real-time
                            </span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {[
                                { label: "Today's Energy", value: "4,820", unit: "kWh", c: "text-emerald-500" },
                                { label: "Est. Savings", value: "₹1,840", unit: "", c: "text-blue-500" },
                                { label: "Efficiency", value: "87", unit: "%", c: "text-violet-500" },
                            ].map((s) => (
                                <div key={s.label} className="rounded-xl bg-background/50 p-3 border border-border">
                                    <p className="text-[10px] text-muted-foreground">{s.label}</p>
                                    <p className={`font-bold text-lg ${s.c}`}>{s.value}<span className="text-xs">{s.unit}</span></p>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-end gap-1.5 h-28">
                            {[40, 65, 45, 80, 55, 90, 70, 100, 60, 75].map((h, i) => (
                                <motion.div
                                    key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                                    className="flex-1 rounded-t-md bg-gradient-to-t from-emerald-500 to-blue-400"
                                />
                            ))}
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
                        className="absolute -left-4 top-1/3 glass rounded-xl p-3 shadow-lg flex items-center gap-2"
                    >
                        <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-500"><Zap className="w-4 h-4" /></div>
                        <div>
                            <p className="text-[10px] text-muted-foreground">Peak Demand</p>
                            <p className="text-sm font-bold">312 kW</p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
                        className="absolute -right-4 bottom-8 glass rounded-xl p-3 shadow-lg flex items-center gap-2"
                    >
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-500"><ShieldCheck className="w-4 h-4" /></div>
                        <div>
                            <p className="text-[10px] text-muted-foreground">Anomaly Detected</p>
                            <p className="text-sm font-bold text-amber-500">Machine B</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

function Trusted() {
    return (
        <section className="py-12 border-y border-border bg-card/30">
            <div className="max-w-7xl mx-auto px-5">
                <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">Trusted by forward-thinking factories</p>
                <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-14">
                    {trustedCompanies.map((c) => (
                        <span key={c} className="text-xl font-bold text-muted-foreground/60 hover:text-foreground transition-colors">{c}</span>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Features() {
    return (
        <section id="features" className="py-24">
            <div className="max-w-7xl mx-auto px-5">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Capabilities</span>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3">Everything you need to optimize energy</h2>
                    <p className="text-muted-foreground mt-4">One platform from monitoring to prediction — built for MSMEs and factories.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                            className="glass rounded-2xl p-6 hover:shadow-xl hover:shadow-emerald-500/5 transition-shadow group"
                        >
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/15 to-blue-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                                <f.icon className="w-5 h-5" />
                            </div>
                            <h3 className="font-semibold tracking-tight">{f.title}</h3>
                            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Stats() {
    return (
        <section id="stats" className="py-20">
            <div className="max-w-7xl mx-auto px-5">
                <div className="glass rounded-3xl p-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {stats.map((s, i) => (
                        <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                            <p className="text-4xl font-bold gradient-text">{s.value}</p>
                            <p className="text-sm text-muted-foreground mt-2">{s.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Testimonials() {
    return (
        <section id="testimonials" className="py-24">
            <div className="max-w-7xl mx-auto px-5">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Testimonials</span>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3">Loved by energy teams</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-5">
                    {testimonials.map((t, i) => (
                        <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-2xl p-6">
                            <div className="flex gap-0.5 mb-4">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                            <p className="text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
                            <div className="flex items-center gap-3 mt-5">
                                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                                <div>
                                    <p className="text-sm font-semibold">{t.name}</p>
                                    <p className="text-xs text-muted-foreground">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Pricing() {
    return (
        <section id="pricing" className="py-24">
            <div className="max-w-7xl mx-auto px-5">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Pricing</span>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3">Simple, transparent pricing</h2>
                    <p className="text-muted-foreground mt-4">Start free. Scale as you grow.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                    {pricing.map((p, i) => (
                        <motion.div
                            key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                            className={`relative glass rounded-2xl p-7 ${p.highlight ? "ring-2 ring-emerald-500 shadow-2xl shadow-emerald-500/10" : ""}`}
                        >
                            {p.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white">Most Popular</span>}
                            <p className="font-semibold">{p.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
                            <p className="mt-4 text-4xl font-bold tracking-tight">{p.price}<span className="text-sm font-medium text-muted-foreground">{p.period}</span></p>
                            <ul className="mt-6 space-y-3 text-sm">
                                {p.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2 text-muted-foreground"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> {f}</li>
                                ))}
                            </ul>
                            <Link to="/dashboard" className={`mt-7 w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${p.highlight ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg shadow-emerald-500/25" : "glass hover:bg-accent/10"}`}>
                                {p.cta}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQ() {
    const [open, setOpen] = React.useState(0);
    return (
        <section id="faq" className="py-24">
            <div className="max-w-3xl mx-auto px-5">
                <div className="text-center mb-12">
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">FAQ</span>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3">Frequently asked questions</h2>
                </div>
                <div className="space-y-3">
                    {faqs.map((f, i) => (
                        <div key={i} className="glass rounded-xl overflow-hidden">
                            <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between p-5 text-left font-medium">
                                {f.q}
                                <span className={`transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
                            </button>
                            <motion.div initial={false} animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }} className="overflow-hidden">
                                <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="border-t border-border py-12">
            <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center">
                        <Leaf className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold tracking-tight">EcoTwin AI</span>
                </div>
                <p className="text-xs text-muted-foreground">© 2026 EcoTwin AI. Built for the energy transition.</p>
            </div>
        </footer>
    );
}

export default function Landing() {
    return (
        <div className="min-h-screen bg-background">
            <Nav />
            <Hero />
            <Trusted />
            <Features />
            <Stats />
            <Testimonials />
            <Pricing />
            <FAQ />
            <Footer />
        </div>
    );
}