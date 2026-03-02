import * as React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    PieChart, Pie, Cell, ComposedChart, Bar, Line, BarChart
} from 'recharts';
import {
    TrendingUp, Users, DollarSign, ShoppingBag,
    ArrowUpRight, ArrowDownRight, LayoutDashboard,
    BarChart2, PieChart as PieChartIcon, Settings, LogOut,
    Target, Sparkles, Activity, Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import { salesData, stats } from './data';
import './index.css';

const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];

export default function App() {
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

    return (
        <div className="min-h-screen flex bg-transparent text-white relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

            {/* Sidebar */}
            <aside className="w-20 lg:w-64 border-r border-white/5 p-4 lg:p-6 hidden md:flex flex-col gap-8 bg-black/40 backdrop-blur-2xl z-10">
                <div className="flex items-center justify-center lg:justify-start gap-4 px-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-violet-600 to-pink-600 shadow-lg shadow-violet-500/20">
                        <Activity className="text-white" size={22} />
                    </div>
                    <span className="font-bold text-2xl tracking-tight hidden lg:block text-gradient">Nexus</span>
                </div>

                <nav className="flex flex-col gap-3 mt-4">
                    {[
                        { icon: LayoutDashboard, label: 'Board', active: true },
                        { icon: BarChart2, label: 'Analytics' },
                        { icon: Users, label: 'Audience' },
                        { icon: Target, label: 'Goals' },
                        { icon: Settings, label: 'Config' },
                    ].map((item) => (
                        <button
                            key={item.label}
                            className={`flex items-center justify-center lg:justify-start gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${item.active
                                    ? 'bg-white/10 text-white border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                                    : 'text-white/40 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon size={22} className={`transition-transform duration-300 group-hover:scale-110 ${item.active ? 'text-violet-400' : ''}`} />
                            <span className="font-medium text-sm hidden lg:block">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="mt-auto">
                    <button className="flex items-center justify-center lg:justify-start gap-4 px-4 py-3.5 text-white/40 hover:text-rose-400 hover:bg-rose-400/10 w-full rounded-2xl transition-all duration-300 group">
                        <LogOut size={22} className="transition-transform duration-300 group-hover:-translate-x-1" />
                        <span className="font-medium text-sm hidden lg:block">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-10 overflow-y-auto relative z-10 w-full">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-gradient mb-2">Operation Highlights</h1>
                        <p className="text-white/50 text-sm font-medium flex items-center gap-2">
                            <Sparkles size={16} className="text-pink-400" /> Auto-generated AI insights from latest data cycle.
                        </p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="flex-1 md:flex-none px-6 py-3 glass-panel text-sm font-medium flex items-center justify-center gap-2 text-white/70">
                            Q1-Q4 2026 Forecast
                        </div>
                        <button className="px-6 py-3 bg-white text-black rounded-2xl font-bold text-sm shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform duration-300">
                            Download Report
                        </button>
                    </div>
                </header>

                {/* AI Insight Bar */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 glass-panel p-5 bg-gradient-to-r from-violet-600/10 to-pink-500/5 border-violet-500/20 flex flex-col sm:flex-row items-center gap-6"
                >
                    <div className="flex items-center gap-4 border-b sm:border-b-0 sm:border-r border-white/10 pb-4 sm:pb-0 sm:pr-6 w-full sm:w-auto">
                        <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center">
                            <Award className="text-violet-400" size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-white/50 font-medium tracking-wider uppercase mb-1">Top Performer</p>
                            <p className="text-lg font-bold text-white"><span className="text-pink-400">{stats.topRegion}</span> Region</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                            <TrendingUp className="text-pink-400" size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-white/50 font-medium tracking-wider uppercase mb-1">Highest Margin</p>
                            <p className="text-lg font-bold text-white">{stats.topProfitCat} <span className="text-violet-400">Products</span></p>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: 'Gross Revenue', value: formatCurrency(stats.totalSales), icon: DollarSign, trend: '+14.5%', isUp: true, color: 'text-violet-400', bg: 'bg-violet-400/10' },
                        { label: 'Net Profit', value: formatCurrency(stats.totalProfit), icon: TrendingUp, trend: '+18.2%', isUp: true, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                        { label: 'Sales Volume', value: stats.totalOrders.toLocaleString(), icon: ShoppingBag, trend: '-1.4%', isUp: false, color: 'text-pink-400', bg: 'bg-pink-400/10' },
                        { label: 'Avg Margin', value: `${stats.avgProfitMargin.toFixed(1)}%`, icon: Activity, trend: '+2.1%', isUp: true, color: 'text-amber-400', bg: 'bg-amber-400/10' },
                    ].map((stat, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={stat.label}
                            className="glass-panel p-6 glow-border group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-3 ${stat.bg} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                                    <stat.icon size={22} className={stat.color} />
                                </div>
                                <div className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md ${stat.isUp ? 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20' : 'text-rose-400 bg-rose-400/10 border border-rose-400/20'
                                    }`}>
                                    {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {stat.trend}
                                </div>
                            </div>
                            <h3 className="text-white/40 text-sm font-semibold mb-2 uppercase tracking-wider">{stat.label}</h3>
                            <p className="text-3xl font-bold tracking-tight metric-value">{stat.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
                    {/* Main Area Chart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="xl:col-span-2 glass-panel p-8"
                    >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                            <h2 className="text-xl font-bold flex items-center gap-3">
                                <div className="w-2 h-8 bg-violet-500 rounded-full"></div>
                                Revenue vs Profit Trajectory
                            </h2>
                            <div className="flex gap-4 text-sm font-medium">
                                <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer"><div className="w-3 h-3 rounded-full bg-violet-500"></div> Revenue</div>
                                <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer"><div className="w-3 h-3 rounded-full bg-pink-500"></div> Profit</div>
                            </div>
                        </div>
                        <div className="h-[400px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={salesData.filter((_, i) => i % 5 === 0)} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                    <XAxis
                                        dataKey="orderDate"
                                        stroke="rgba(255,255,255,0.2)"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(val) => {
                                            const d = new Date(val);
                                            return d.toLocaleString('en-US', { month: 'short' });
                                        }}
                                        minTickGap={30}
                                    />
                                    <YAxis
                                        stroke="rgba(255,255,255,0.2)"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(val) => val >= 1000 ? `$${(val / 1000).toFixed(1)}k` : `$${val}`}
                                    />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: 'rgba(15,15,20,0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                        labelStyle={{ color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}
                                        formatter={(val: number) => [formatCurrency(val), undefined]}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="sales"
                                        name="Revenue"
                                        stroke="#8b5cf6"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorSales)"
                                        activeDot={{ r: 8, strokeWidth: 0, fill: '#fff', style: { filter: 'drop-shadow(0 0 10px #8b5cf6)' } }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="profit"
                                        name="Profit"
                                        stroke="#ec4899"
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={{ r: 6, fill: '#ec4899', stroke: '#fff', strokeWidth: 2 }}
                                    />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Regional Performance Bar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="glass-panel p-8 flex flex-col"
                    >
                        <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                            <div className="w-2 h-8 bg-pink-500 rounded-full"></div>
                            Regional Dominance
                        </h2>
                        <div className="flex-1 min-h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.salesByRegion} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.03)" />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={14} width={80} stroke="rgba(255,255,255,0.5)" />
                                    <RechartsTooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{ backgroundColor: 'rgba(15,15,20,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                        formatter={(val: number) => [formatCurrency(val), 'Sales']}
                                    />
                                    <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                                        {stats.salesByRegion.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
