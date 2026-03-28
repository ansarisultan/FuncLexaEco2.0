import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import Sidebar from '../../components/common/Sidebar';
import RecentActivity from '../../components/dashboard/RecentActivity';
import { getRecentUsage, getUsageSummary } from '../../services/usageService';
import { useAppMode } from '../../context/AppModeContext';
import { useSocket } from '../../context/SocketContext';
import BackgroundTheme from '../../components/common/BackgroundTheme';
import { Activity, Cpu, Zap, Box, TrendingUp, ArrowUpRight, Clock, Sparkles } from 'lucide-react';

const PRODUCT_COLORS = ['#00E5FF', '#F472B6', '#8B5CF6', '#22C55E', '#F59E0B', '#94A3B8'];

/* ─── Animated Counter ─── */
const useAnimatedCounter = (end, duration = 1000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (typeof end !== 'number' || end === 0) { setCount(end || 0); return; }
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return count;
};

/* ─── Circular Progress Ring ─── */
const StatRing = ({ value, max, label, hex, icon: Icon, delay }) => {
  const pct = Math.min((value / max) * 100, 100);
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (pct / 100) * circumference;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 20 }}
      className="glass-premium rounded-2xl p-5 flex flex-col items-center gap-3 group gradient-border-animated"
    >
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
          {/* Track */}
          <circle cx="48" cy="48" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
          {/* Fill */}
          <circle
            cx="48" cy="48" r="42" fill="none"
            stroke={hex} strokeWidth="4" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="animate-ring"
            style={{ filter: `drop-shadow(0 0 6px ${hex}60)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: hex }} />
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg font-extrabold text-white">{typeof value === 'number' ? value.toLocaleString() : value}</p>
        <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-[0.12em]">{label}</p>
      </div>
    </motion.div>
  );
};

/* ─── Premium Chart Tooltip ─── */
const PremiumTooltip = ({ active, payload, label, accentColor }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-premium-strong rounded-xl px-4 py-3 text-xs"
      style={{ border: `1px solid ${accentColor}30` }}>
      <p className="font-bold text-white mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-slate-300">
          <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ background: p.color || accentColor }} />
          {p.name}: <span className="font-bold text-white" style={{ color: p.color || accentColor }}>{p.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
};

const Usage = () => {
  const { mode } = useAppMode();
  const socket = useSocket();
  const [summary, setSummary] = useState({ totalActions: 0, activeApps: 0, todayActions: 0, dailySeries: [], productBreakdown: [] });
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dynamicChartData, setDynamicChartData] = useState([]);
  const breakdownData = (summary.productBreakdown || []).map((item, index) => ({
    ...item,
    color: PRODUCT_COLORS[index % PRODUCT_COLORS.length],
  }));

  useEffect(() => {
    const load = async () => {
      try {
        const [sumRes, recRes] = await Promise.all([
          getUsageSummary(),
          getRecentUsage()
        ]);
        const nextSummary = sumRes?.data || { totalActions: 0, activeApps: 0, todayActions: 0, dailySeries: [], productBreakdown: [] };
        setSummary(nextSummary);
        setDynamicChartData(nextSummary.dailySeries || []);
        setActivity(recRes?.data?.items || []);
      } catch (err) {
        console.error('Failed to load usage data', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [mode]);

  useEffect(() => {
    if (!socket) return;
    const handleNewUsage = (payload) => {
      setActivity(prev => {
        const next = [payload, ...prev];
        return next.slice(0, 15);
      });
      setSummary(prev => ({
        ...prev,
        totalActions: (prev.totalActions || 0) + 1,
        todayActions: (prev.todayActions || 0) + 1,
        productBreakdown: (() => {
          const list = Array.isArray(prev.productBreakdown) ? [...prev.productBreakdown] : [];
          const idx = list.findIndex((item) => item.name === payload.product);
          if (idx >= 0) {
            list[idx] = { ...list[idx], value: list[idx].value + 1 };
          } else {
            list.push({ name: payload.product, value: 1 });
          }
          return list.sort((a, b) => b.value - a.value).slice(0, 6);
        })()
      }));
      setDynamicChartData(prev => {
        const next = [...prev];
        if (next.length === 0) return next;
        const last = next[next.length - 1];
        next[next.length - 1] = { ...last, calls: (last.calls || 0) + 1 };
        return next;
      });
    };
    socket.on('new_usage_event', handleNewUsage);
    return () => { socket.off('new_usage_event', handleNewUsage); };
  }, [socket]);

  return (
    <div className="min-h-screen text-slate-300">
      <Sidebar />
      <main className="workspace-shell md:ml-64 pb-12">
        <BackgroundTheme variant="workspace" />

        <div className="workspace-container">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-premium"
                style={{ border: '1px solid rgba(139,92,246,0.15)' }}>
                <Activity className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.15em]">Analytics</span>
              </div>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Usage & <span className="text-gradient-premium">Analytics</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">Deep dive into your API calls, active apps, and token consumption.</p>
          </motion.div>

          {/* Stat Rings Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatRing label="Total API Calls" value={loading ? 0 : summary.totalActions} max={1000} icon={Activity} hex="#00E5FF" delay={0.08} />
            <StatRing label="Today Actions" value={loading ? 0 : summary.todayActions || 0} max={500} icon={Cpu} hex="#8B5CF6" delay={0.12} />
            <StatRing label="Recent Events" value={loading ? 0 : activity.length} max={50} icon={Zap} hex="#22C55E" delay={0.16} />
            <StatRing label="Apps Connected" value={loading ? 0 : summary.activeApps} max={10} icon={Box} hex="#F472B6" delay={0.2} />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">

            {/* Chart Column */}
            <div className="lg:col-span-2 space-y-6">

              {/* Token Consumption Chart */}
              <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="glass-premium-strong rounded-3xl p-6 noise-overlay">
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                      Realtime Activity Trend
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">Last 7 days of backend usage events</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E' }}>
                    <ArrowUpRight className="w-3 h-3" /> +12.5%
                  </div>
                </div>
                <div className="h-64 w-full relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dynamicChartData}>
                      <defs>
                        <linearGradient id="colorTokensPremium" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                          <stop offset="50%" stopColor="#8B5CF6" stopOpacity={0.1} />
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                      <XAxis dataKey="name" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip content={<PremiumTooltip accentColor="#8B5CF6" />} />
                      <Area type="monotone" dataKey="calls" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorTokensPremium)"
                        dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4, stroke: '#03060D' }}
                        activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2, fill: '#03060D' }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.section>

              {/* API Calls Chart */}
              <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="glass-premium-strong rounded-3xl p-6 noise-overlay">
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      API Calls Volume
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">Daily request distribution from server logs</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(0,229,255,0.1)', color: '#00E5FF' }}>
                    <ArrowUpRight className="w-3 h-3" /> +8.3%
                  </div>
                </div>
                <div className="h-64 w-full relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dynamicChartData}>
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00E5FF" stopOpacity={0.9} />
                          <stop offset="100%" stopColor="#00E5FF" stopOpacity={0.3} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                      <XAxis dataKey="name" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip content={<PremiumTooltip accentColor="#00E5FF" />}
                        cursor={{ fill: 'rgba(0,229,255,0.04)' }} />
                      <Bar dataKey="calls" fill="url(#barGradient)" radius={[6, 6, 0, 0]} barSize={28} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.section>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Usage Breakdown Donut */}
              <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
                className="glass-premium-strong rounded-3xl p-6 noise-overlay">
                <h3 className="text-sm font-bold text-white mb-4 relative z-10 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  Usage Breakdown
                </h3>
                <div className="h-48 w-full relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={breakdownData} cx="50%" cy="50%" innerRadius={50} outerRadius={72}
                        paddingAngle={4} dataKey="value" strokeWidth={0}>
                        {breakdownData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} style={{ filter: `drop-shadow(0 0 4px ${entry.color}40)` }} />
                        ))}
                      </Pie>
                      <Tooltip content={<PremiumTooltip accentColor="#8B5CF6" />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-3 relative z-10">
                  {breakdownData.length === 0 ? (
                    <p className="text-xs text-slate-500">No product activity yet.</p>
                  ) : breakdownData.map(d => (
                    <div key={d.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                        <span className="text-slate-400">{d.name}</span>
                      </div>
                      <span className="font-bold text-white">{d.value}</span>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Activity Feed */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
                className="glass-premium-strong rounded-3xl noise-overlay">
                <div className="relative z-10">
                  <RecentActivity activity={activity} />
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Usage;
