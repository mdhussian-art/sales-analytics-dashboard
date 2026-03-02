import * as React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    BarChart, Bar, Cell, ComposedChart, Line
} from 'recharts';
import {
    TrendingUp, TrendingDown, DollarSign, Package,
    ArrowUpRight, ArrowDownRight, LayoutDashboard,
    BarChart2, Users, Settings, LogOut,
    AlertCircle, ChevronRight, DownloadCloud
} from 'lucide-react';
import { motion } from 'framer-motion';
// @ts-ignore
import { rawDataStats, monthlyTrend, categoryDistribution } from './insights.ts';
import './index.css';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];

export default function App() {
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

    return (
        <div className="min-h-screen flex bg-[#fafafa] text-slate-900 font-sans">

            {/* Minimalist Sidebar */}
            <aside className="w-64 border-r border-slate-200 p-6 hidden lg:flex flex-col bg-white z-10">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
                        N
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-900">Nexus Data</span>
                </div>

                <nav className="flex flex-col gap-2">
                    {[
                        { icon: LayoutDashboard, label: 'Overview', active: true },
                        { icon: BarChart2, label: 'Reports' },
                        { icon: Users, label: 'Customers' },
                        { icon: Settings, label: 'Settings' },
                    ].map((item) => (
                        <button
                            key={item.label}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium ${item.active
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <item.icon size={18} className={item.active ? 'text-blue-600' : 'text-slate-400'} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-100">
                    <button className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-500 hover:text-slate-800 transition-colors w-full text-sm font-medium">
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 lg:p-10 overflow-y-auto max-w-7xl mx-auto w-full">

                {/* Header */}
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Executive Summary</h1>
                        <p className="text-slate-500 text-sm mt-1">Data from Superstore Dataset (All-time)</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">
                        <DownloadCloud size={16} /> Export CSV
                    </button>
                </header>

                {/* Real Data Insights Panel */}
                <div className="mb-10 bg-blue-50/50 border border-blue-100 rounded-xl p-5 md:p-6 flex flex-col md:flex-row gap-6 lg:gap-10 items-start md:items-center">
                    <div className="flex gap-4 items-start md:items-center max-w-lg">
                        <div className="bg-blue-100 p-2.5 rounded-full shrink-0 text-blue-700 mt-1 md:mt-0">
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 text-sm">Top Performing Segment</h3>
                            <p className="text-slate-600 text-sm mt-1 leading-relaxed text-balance">
                                <span className="font-medium text-slate-900">{rawDataStats.topProduct?.name || 'Copiers'}</span> generated the highest net profit ({formatCurrency(rawDataStats.topProduct?.profit || 0)}), despite not having the highest raw sales volume.
                            </p>
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-12 bg-blue-200 shrink-0"></div>

                    <div className="flex gap-4 items-start md:items-center max-w-lg">
                        <div className="bg-rose-100 p-2.5 rounded-full shrink-0 text-rose-700 mt-1 md:mt-0">
                            <AlertCircle size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 text-sm">Critical Margin Risk</h3>
                            <p className="text-slate-600 text-sm mt-1 leading-relaxed text-balance">
                                <span className="font-medium text-slate-900">{rawDataStats.worstProduct?.name || 'Tables'}</span> is operating at a severe loss ({formatCurrency(rawDataStats.worstProduct?.profit || 0)} defect). Immediate pricing review recommended.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Core Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
                    {[
                        { label: 'Total Gross Revenue', value: formatCurrency(rawDataStats.totalSales), icon: DollarSign, trend: '+14.5%', isUp: true },
                        { label: 'Total Net Profit', value: formatCurrency(rawDataStats.totalProfit), icon: TrendingUp, trend: '+8.2%', isUp: true },
                        { label: 'Total Orders Processed', value: rawDataStats.totalOrders.toLocaleString(), icon: Package, trend: '-2.4%', isUp: false },
                        { label: 'Average Profit Margin', value: `${rawDataStats.avgProfitMargin.toFixed(1)}%`, icon: BarChart2, trend: '+1.2%', isUp: true },
                    ].map((stat, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            key={stat.label}
                            className="clean-card p-5"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-slate-100 rounded-md text-slate-600">
                                    <stat.icon size={18} />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md ${stat.isUp ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'
                                    }`}>
                                    {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {stat.trend}
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-slate-900 metric-value">{stat.value}</p>
                            <h3 className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-1.5">{stat.label}</h3>
                        </motion.div>
                    ))}
                </div>

                {/* Clean Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">

                    {/* Main Trend Line */}
                    <div className="lg:col-span-2 clean-card p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-base font-bold text-slate-900">Revenue & Profit Trend</h2>
                            <div className="flex gap-4 text-xs font-medium">
                                <div className="flex items-center gap-1.5 text-slate-600"><div className="w-2.5 h-2.5 rounded-sm bg-blue-500"></div> Revenue</div>
                                <div className="flex items-center gap-1.5 text-slate-600"><div className="w-2.5 h-2.5 rounded-sm bg-slate-800"></div> Profit</div>
                            </div>
                        </div>
                        <div className="flex-1 min-h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#94a3b8"
                                        fontSize={11}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(val) => {
                                            if (!val) return '';
                                            const [y, m] = val.split('-');
                                            const d = new Date(parseInt(y), parseInt(m) - 1);
                                            return d.toLocaleString('en-US', { month: 'short', year: '2-digit' });
                                        }}
                                        minTickGap={20}
                                    />
                                    <YAxis
                                        stroke="#94a3b8"
                                        fontSize={11}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(val) => val >= 1000 ? `$${(val / 1000).toFixed(0)}k` : `$${val}`}
                                    />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                        itemStyle={{ color: '#0f172a', fontWeight: '600', fontSize: '13px' }}
                                        labelStyle={{ color: '#64748b', marginBottom: '4px', fontSize: '12px', fontWeight: '500' }}
                                        formatter={(val: number) => [formatCurrency(val), undefined]}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="sales"
                                        name="Revenue"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        fillOpacity={0.1}
                                        fill="#3b82f6"
                                        activeDot={{ r: 5, strokeWidth: 2, fill: '#fff', stroke: '#3b82f6' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="profit"
                                        name="Profit"
                                        stroke="#0f172a"
                                        strokeWidth={2}
                                        dot={false}
                                        activeDot={{ r: 5, fill: '#0f172a', stroke: '#fff', strokeWidth: 2 }}
                                    />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Category Distribution */}
                    <div className="clean-card p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-base font-bold text-slate-900">Category Sales</h2>
                            <button className="text-slate-400 hover:text-slate-600 transition-colors">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                        <div className="flex-1 min-h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={categoryDistribution} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={12} width={80} stroke="#64748b" fontWeight="500" />
                                    <RechartsTooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                        itemStyle={{ color: '#0f172a', fontWeight: '600', fontSize: '13px' }}
                                        formatter={(val: number) => [formatCurrency(val), 'Sales']}
                                    />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                                        {categoryDistribution.map((entry: any, index: number) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 hidden sm:block">
                            {categoryDistribution.map((cat: any, i: number) => (
                                <div key={i} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                                        <span className="text-slate-600">{cat.name || 'Unknown'}</span>
                                    </div>
                                    <span className="font-semibold text-slate-900">{formatCurrency(cat.value)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
