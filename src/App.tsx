import * as React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import {
    TrendingUp, Users, DollarSign, ShoppingBag,
    ArrowUpRight, ArrowDownRight, LayoutDashboard,
    BarChart2, PieChart as PieChartIcon, Settings, LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';
import { salesData, stats } from './data';
import './index.css';

const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f59e0b'];

export default function App() {
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    return (
        <div className="min-h-screen flex bg-[#030303] text-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 p-6 hidden md:flex flex-col gap-8 bg-black/20 backdrop-blur-xl">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center">
                        <TrendingUp size={18} />
                    </div>
                    <span className="font-bold text-xl tracking-tight">SalesMetrics</span>
                </div>

                <nav className="flex flex-col gap-2">
                    {[
                        { icon: LayoutDashboard, label: 'Overview', active: true },
                        { icon: BarChart2, label: 'Analytics' },
                        { icon: Users, label: 'Customers' },
                        { icon: ShoppingBag, label: 'Products' },
                        { icon: Settings, label: 'Settings' },
                    ].map((item) => (
                        <button
                            key={item.label}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active
                                ? 'bg-white/10 text-white border border-white/10 shadow-lg'
                                : 'text-white/50 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="mt-auto">
                    <button className="flex items-center gap-3 px-4 py-3 text-white/50 hover:text-white w-full transition-colors">
                        <LogOut size={20} />
                        <span className="font-medium text-sm">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold gradient-text mb-1">Executive Dashboard</h1>
                        <p className="text-white/40 text-sm">Welcome back, here's what's happening today.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="px-5 py-2.5 glass-card text-sm font-medium flex items-center gap-2">
                            Jan 01, 2026 - Dec 31, 2026
                        </div>
                        <button className="px-6 py-2.5 primary-gradient rounded-xl font-semibold text-sm shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:scale-105 transition-transform">
                            Export PDF
                        </button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: 'Total Sales', value: formatCurrency(stats.totalSales), icon: DollarSign, trend: '+12.5%', isUp: true },
                        { label: 'Total Profit', value: formatCurrency(stats.totalProfit), icon: TrendingUp, trend: '+8.2%', isUp: true },
                        { label: 'Total Orders', value: stats.totalOrders.toLocaleString(), icon: ShoppingBag, trend: '-2.4%', isUp: false },
                        { label: 'Profit Margin', value: `${stats.avgProfitMargin}%`, icon: BarChart2, trend: '+1.2%', isUp: true },
                    ].map((stat, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={stat.label}
                            className="glass-card p-6 relative overflow-hidden group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2.5 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                                    <stat.icon size={22} className="text-indigo-400" />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.isUp ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'
                                    }`}>
                                    {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                    {stat.trend}
                                </div>
                            </div>
                            <h3 className="text-white/40 text-sm font-medium mb-1">{stat.label}</h3>
                            <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Area Chart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="lg:col-span-2 glass-card p-8"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <TrendingUp size={20} className="text-indigo-400" />
                                Revenue Performance
                            </h2>
                        </div>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={salesData}>
                                    <defs>
                                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis
                                        dataKey="orderDate"
                                        stroke="rgba(255,255,255,0.3)"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(val) => val.split('-')[1] + '/' + val.split('-')[2]}
                                    />
                                    <YAxis
                                        stroke="rgba(255,255,255,0.3)"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(val) => `$${val}`}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="#6366f1"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorSales)"
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Category Pie Chart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-8"
                    >
                        <h2 className="text-lg font-bold mb-8 flex items-center gap-2">
                            <PieChartIcon size={20} className="text-purple-400" />
                            Sales by Category
                        </h2>
                        <div className="h-[250px] w-full mb-8">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: 'Technology', value: 35 },
                                            { name: 'Furniture', value: 32 },
                                            { name: 'Office Supplies', value: 33 },
                                        ]}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={8}
                                        dataKey="value"
                                    >
                                        {[0, 1, 2].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-4">
                            {['Technology', 'Furniture', 'Office Supplies'].map((cat, i) => (
                                <div key={cat} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-white/60">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                        {cat}
                                    </div>
                                    <span className="text-sm font-bold">~33%</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
