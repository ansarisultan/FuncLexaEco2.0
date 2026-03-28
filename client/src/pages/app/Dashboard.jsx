import { useMemo, useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import { useAppMode } from '../../context/AppModeContext';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { getRecentUsage, getUsageSummary } from '../../services/usageService';
import { appRegistry } from '../../data/appRegistry';
import BackgroundTheme from '../../components/common/BackgroundTheme';
import {
  Zap, Grid3X3, ArrowRight, Activity, MessageSquare, Clock,
  TrendingUp, Cpu, Sparkles, Shield, Wifi, Crown, ChevronRight,
  BarChart3, ArrowUpRight, Star
} from 'lucide-react';

const getTimeGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
};

/* ─── Animated Counter Hook ─── */
const useAnimatedCounter = (end, duration = 1200) => {
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

/* ─── Floating Orbs ─── */
const FloatingOrbs = ({ mode }) => {
  const color1 = mode === 'account' ? 'rgba(0,229,255,0.12)' : 'rgba(34,197,94,0.12)';
  const color2 = 'rgba(139,92,246,0.10)';
  const color3 = 'rgba(244,114,182,0.08)';
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full animate-particle-1"
        style={{ background: `radial-gradient(circle, ${color1}, transparent 70%)`, filter: 'blur(80px)' }} />
      <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full animate-particle-2"
        style={{ background: `radial-gradient(circle, ${color2}, transparent 70%)`, filter: 'blur(100px)' }} />
      <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] rounded-full animate-particle-3"
        style={{ background: `radial-gradient(circle, ${color3}, transparent 70%)`, filter: 'blur(60px)' }} />
    </div>
  );
};

/* ─── Premium Stat Card ─── */
const StatCard = ({ label, value, icon: Icon, hex, delay, trend }) => {
  const animatedValue = useAnimatedCounter(typeof value === 'number' ? value : 0);
  const displayValue = typeof value === 'number' ? animatedValue.toLocaleString() : value;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 20 }}
      className="glass-premium rounded-2xl p-5 relative overflow-hidden group gradient-border-animated cursor-default"
    >
      {/* Shimmer overlay */}
      <div className="shimmer-effect absolute inset-0 rounded-2xl pointer-events-none" />
      
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: `radial-gradient(circle, ${hex}20, transparent 70%)`, filter: 'blur(30px)' }} />

      <div className="flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
          style={{ background: `${hex}12`, border: `1px solid ${hex}25`, boxShadow: `0 0 20px ${hex}10` }}>
          <Icon className="w-5 h-5" style={{ color: hex }} />
        </div>
        <div className="flex-1">
          <p className="text-2xl font-extrabold text-white tracking-tight animate-count-up">{displayValue}</p>
          <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-[0.15em] mt-0.5">{label}</p>
        </div>
        {trend && (
          <div className="flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E' }}>
            <ArrowUpRight className="w-3 h-3" /> {trend}
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ─── Quick App Button ─── */
const QuickAppButton = ({ app, index }) => {
  const navigate = useNavigate();
  return (
    <motion.button
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 + index * 0.06, type: 'spring', stiffness: 200 }}
      onClick={() => navigate(app.path)}
      className="flex items-center gap-3 p-3.5 rounded-xl w-full text-left transition-all group cursor-pointer gradient-border-animated"
      style={{ background: 'rgba(255,255,255,0.02)' }}
      whileHover={{ x: 4 }}
      onMouseEnter={e => {
        e.currentTarget.style.background = `${app.hex}06`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
      }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
        style={{ background: `${app.hex}12`, border: `1px solid ${app.hex}25`, boxShadow: `0 4px 16px ${app.hex}10` }}>
        {app.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white truncate">{app.name}</p>
        <p className="text-[10px] text-slate-500 truncate">{app.description}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-slate-400 transition-all group-hover:translate-x-1 shrink-0" />
    </motion.button>
  );
};

/* ─── Activity Row ─── */
const ActivityRow = ({ item, index }) => {
  const productColors = {
    lexachat: '#00E5FF', local: '#22C55E', core: '#8B5CF6', analytics: '#F472B6',
  };
  const color = productColors[item.product] || '#64748b';
  const timeAgo = (() => {
    const diff = Date.now() - new Date(item.timestamp).getTime();
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  })();

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 + index * 0.07 }}
      className="flex items-center gap-3 py-3 group"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
    >
      <div className="w-2 h-2 rounded-full shrink-0 status-dot-live" style={{ background: color }} />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white font-medium truncate group-hover:text-slate-200 transition-colors">{item.action}</p>
        <p className="text-[10px] text-slate-600 mt-0.5 capitalize">{item.product}</p>
      </div>
      <span className="text-[10px] text-slate-600 shrink-0">{timeAgo}</span>
    </motion.div>
  );
};

/* ─── System Status Card ─── */
const SystemStatus = ({ mode }) => {
  const statuses = [
    { label: 'API Gateway', status: 'operational', color: '#22C55E' },
    { label: 'Socket Server', status: 'operational', color: '#22C55E' },
    { label: 'AI Engine', status: 'operational', color: '#22C55E' },
    { label: 'Database', status: 'operational', color: '#22C55E' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="glass-premium rounded-2xl p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-green-500 status-dot-live" />
        <h3 className="text-sm font-bold text-white">System Status</h3>
        <span className="ml-auto text-[10px] text-green-400 font-semibold">All Systems Operational</span>
      </div>
      <div className="space-y-2.5">
        {statuses.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.05 }}
            className="flex items-center justify-between"
          >
            <span className="text-xs text-slate-400">{s.label}</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: `${s.color}15`, color: s.color }}>{s.status}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

/* ─── Quick Actions Grid ─── */
const QuickActions = ({ navigate, mode }) => {
  const actions = [
    { label: 'Analytics', icon: BarChart3, hex: '#8B5CF6', path: '/usage' },
    { label: 'Profile', icon: Shield, hex: '#22C55E', path: '/profile' },
    { label: 'Premium', icon: Crown, hex: '#FFD700', path: '/premium' },
    { label: 'Apps', icon: Grid3X3, hex: '#00E5FF', path: '/apps' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-premium rounded-2xl p-5"
    >
      <h3 className="text-sm font-bold text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((a, i) => (
          <motion.button
            key={a.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 + i * 0.06 }}
            onClick={() => navigate(a.path)}
            className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all cursor-pointer group"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `${a.hex}08`;
              e.currentTarget.style.borderColor = `${a.hex}25`;
              e.currentTarget.style.boxShadow = `0 4px 20px ${a.hex}15`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ background: `${a.hex}12`, border: `1px solid ${a.hex}25` }}>
              <a.icon className="w-4 h-4" style={{ color: a.hex }} />
            </div>
            <span className="text-[10px] font-semibold text-slate-400 group-hover:text-white transition-colors">{a.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

/* ─── MAIN DASHBOARD ─── */
const Dashboard = () => {
  const { mode } = useAppMode();
  const { user } = useAuth();
  const socket = useSocket();
  const navigate = useNavigate();
  const [greeting] = useState(getTimeGreeting);
  
  const [summary, setSummary] = useState({ totalActions: 0, activeApps: 0, todayActions: 0 });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);

  const availableApps = useMemo(
    () => appRegistry.filter(a => a.modes.includes(mode || 'local') && a.status !== 'coming-soon'),
    [mode]
  );

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [sumRes, recRes] = await Promise.all([
          getUsageSummary(),
          getRecentUsage()
        ]);
        setSummary(sumRes?.data || { totalActions: 0, activeApps: 0, todayActions: 0 });
        setRecentActivity(recRes?.data?.items || []);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setLoadingStats(false);
      }
    };
    loadDashboardData();
  }, [mode]);

  useEffect(() => {
    if (!socket) return;
    const handleNewUsage = (payload) => {
      setRecentActivity((prev) => {
        const next = [payload, ...prev];
        return next.slice(0, 10);
      });
      setSummary((prev) => ({
        ...prev,
        totalActions: prev.totalActions + 1,
        todayActions: (prev.todayActions || 0) + 1
      }));
    };
    socket.on('new_usage_event', handleNewUsage);
    return () => { socket.off('new_usage_event', handleNewUsage); };
  }, [socket]);

  const accentHex = mode === 'account' ? '#00E5FF' : '#22C55E';

  return (
    <div className="min-h-screen text-slate-300 font-sans">
      <Sidebar />
      <main className="workspace-shell md:ml-64 pb-16">
        <BackgroundTheme variant="workspace" />
        <FloatingOrbs mode={mode} />

        <div className="workspace-container">

          {/* ───── Welcome Banner ───── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-premium"
                style={{ border: `1px solid ${accentHex}25` }}>
                <Sparkles className="w-3.5 h-3.5" style={{ color: accentHex }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: accentHex }}>
                  {mode === 'account' ? 'Cloud Workspace' : 'Local Workspace'}
                </span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1 flex items-center gap-3 flex-wrap">
              {greeting},{' '}
              <span className="text-gradient-premium">{user?.name?.split(' ')[0] || 'Explorer'}</span>
              <motion.span 
                className="text-3xl"
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
              >👋</motion.span>
            </h1>
            <p className="text-slate-500 text-sm">
              {mode === 'account'
                ? `Signed in as ${user?.email || '—'} · ${availableApps.length} apps available`
                : `Running locally · ${availableApps.length} apps at your fingertips`
              }
            </p>
          </motion.div>

          {/* ───── Stats Row ───── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Apps Available" value={availableApps.length} icon={Grid3X3} hex="#00E5FF" delay={0.08} trend="+2" />
            <StatCard label="API Calls" value={loadingStats ? '...' : summary.totalActions} icon={Activity} hex="#8B5CF6" delay={0.12} trend="+12%" />
            <StatCard label="Connected" value={loadingStats ? '...' : summary.activeApps} icon={Zap} hex="#22C55E" delay={0.16} />
            <StatCard label="Today Events" value={loadingStats ? '...' : summary.todayActions || 0} icon={TrendingUp} hex="#F472B6" delay={0.2} />
          </div>

          {/* ───── Main Grid ───── */}
          <div className="grid gap-6 lg:grid-cols-12">

            {/* Left Column: Quick Launch */}
            <div className="lg:col-span-7 space-y-5">
              <motion.section initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 }}
                className="glass-premium-strong rounded-3xl p-6 noise-overlay">
                <div className="flex items-center justify-between mb-5 relative z-10">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Zap className="w-4 h-4 text-electric-cyan" />
                      Quick Launch
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">Your available apps this session</p>
                  </div>
                  <button onClick={() => navigate('/apps')}
                    className="text-xs font-semibold text-electric-cyan hover:text-white transition-colors flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-white/[0.04]">
                    View all <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-y-2 relative z-10">
                  {availableApps.slice(0, 5).map((app, i) => (
                    <QuickAppButton key={app.id} app={app} index={i} />
                  ))}
                </div>
              </motion.section>

              {/* Premium Upgrade CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="rounded-2xl p-5 relative overflow-hidden cursor-pointer group"
                onClick={() => navigate('/premium')}
                style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(244,114,182,0.08), rgba(0,229,255,0.08))',
                  border: '1px solid rgba(139,92,246,0.2)',
                }}
              >
                <div className="shimmer-effect absolute inset-0 rounded-2xl pointer-events-none" />
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center animate-float"
                    style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(244,114,182,0.2))', border: '1px solid rgba(139,92,246,0.3)' }}>
                    <Crown className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white">Upgrade to Premium</h3>
                    <p className="text-xs text-slate-400">Unlock unlimited AI power, priority support & exclusive features</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 flex flex-col gap-5">

              {/* Mode CTA — local mode only */}
              {mode === 'local' && (
                <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.22 }}
                  className="glass-premium rounded-2xl p-5 relative overflow-hidden"
                  style={{ border: '1px solid rgba(0,229,255,0.12)' }}>
                  <div className="aurora-bg absolute inset-0 rounded-2xl pointer-events-none" />
                  <div className="flex items-center gap-2 mb-2 relative z-10">
                    <MessageSquare className="w-4 h-4 text-electric-cyan" />
                    <span className="text-sm font-bold text-white">Try LexaChat</span>
                    <span className="ml-auto text-[9px] font-bold px-2 py-0.5 rounded-full animate-badge-pulse"
                      style={{ background: 'rgba(0,229,255,0.1)', color: '#00E5FF', border: '1px solid rgba(0,229,255,0.2)' }}>
                      ✨ NEW
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 relative z-10">Sign in or launch instantly via the proxy — your chat stays on FuncLexa.</p>
                  <button onClick={() => navigate('/apps/lexachat')}
                    className="w-full py-2.5 rounded-xl text-sm font-bold text-[#03060D] transition-all hover:opacity-90 hover:shadow-lg relative z-10"
                    style={{ background: 'linear-gradient(135deg, #00E5FF, #8B5CF6)' }}>
                    Open LexaChat →
                  </button>
                </motion.div>
              )}

              {/* Quick Actions */}
              <QuickActions navigate={navigate} mode={mode} />

              {/* Activity Feed */}
              <motion.section initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.26 }}
                className="glass-premium-strong rounded-3xl p-6 flex-1 noise-overlay">
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <h2 className="text-sm font-bold text-white">Recent Activity</h2>
                  <div className="ml-auto w-2 h-2 rounded-full bg-green-500 status-dot-live" />
                </div>
                <div className="relative z-10">
                  <AnimatePresence initial={false}>
                    {recentActivity.length === 0 && !loadingStats ? (
                      <div className="flex flex-col items-center py-8 text-center">
                        <Activity className="w-8 h-8 text-slate-700 mb-2" />
                        <p className="text-xs text-slate-500">No recent activity found.</p>
                        <p className="text-[10px] text-slate-600 mt-1">Start using apps to see activity here</p>
                      </div>
                    ) : (
                      recentActivity.map((item, i) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, height: 0, scale: 0.9 }}
                          animate={{ opacity: 1, height: 'auto', scale: 1 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 24, delay: i === 0 ? 0 : 0.05 * i }}
                        >
                          <ActivityRow item={item} index={i} />
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </motion.section>

              {/* System Status */}
              <SystemStatus mode={mode} />

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
