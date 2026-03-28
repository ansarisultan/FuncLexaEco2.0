import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import { useAppMode } from '../../context/AppModeContext';
import { appRegistry } from '../../data/appRegistry';
import BackgroundTheme from '../../components/common/BackgroundTheme';
import {
  Search, Lock, Cloud, ArrowRight, Zap, ExternalLink,
  Sparkles, Star, Crown, TrendingUp, Filter
} from 'lucide-react';

/* ─── Animated Status Badge ─── */
const StatusBadge = ({ status }) => {
  const variants = {
    'active': { label: 'Live', bg: 'rgba(0,229,255,0.1)', border: 'rgba(0,229,255,0.25)', color: '#00E5FF', glow: true },
    'beta':   { label: 'Beta', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.25)', color: '#8B5CF6', glow: false },
    'coming-soon': { label: 'Soon', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.1)', color: '#64748b', glow: false },
  };
  const v = variants[status] || variants['coming-soon'];
  return (
    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 ${v.glow ? 'animate-pulse-glow' : ''}`}
      style={{ background: v.bg, border: `1px solid ${v.border}`, color: v.color }}>
      {v.glow && <span className="w-1.5 h-1.5 rounded-full status-dot-live" style={{ background: v.color }} />}
      {v.label}
    </span>
  );
};

/* ─── Featured App Hero Card (for LexaChat) ─── */
const FeaturedCard = ({ app }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      onClick={() => navigate(app.path)}
      className="relative rounded-3xl p-8 cursor-pointer group overflow-hidden mb-8"
      style={{
        background: 'linear-gradient(135deg, rgba(0,229,255,0.08), rgba(139,92,246,0.08), rgba(244,114,182,0.04))',
        border: '1px solid rgba(0,229,255,0.15)',
      }}
    >
      {/* Animated background */}
      <div className="aurora-bg absolute inset-0 rounded-3xl pointer-events-none" />
      <div className="shimmer-effect absolute inset-0 rounded-3xl pointer-events-none" />
      
      {/* Floating orb */}
      <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] rounded-full animate-particle-1 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.15), transparent 70%)', filter: 'blur(60px)' }} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 animate-float"
          style={{ background: `${app.hex}15`, border: `1px solid ${app.hex}30`, boxShadow: `0 8px 32px ${app.hex}20` }}>
          {app.emoji}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-extrabold text-white">{app.name}</h2>
            <StatusBadge status={app.status} />
            <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,215,0,0.1)', color: '#FFD700', border: '1px solid rgba(255,215,0,0.2)' }}>
              <Star className="w-3 h-3" /> Featured
            </span>
          </div>
          <p className="text-sm text-slate-300 mb-3 max-w-xl">{app.description}</p>
          <div className="flex flex-wrap gap-2">
            {app.tags?.map(tag => (
              <span key={tag} className="text-[10px] px-2.5 py-1 rounded-lg font-semibold"
                style={{ background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.12)', color: '#00E5FF' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button className="btn-cyber text-sm px-6 py-3 shrink-0">
          Launch Now <ArrowRight className="w-4 h-4 ml-1 inline" />
        </button>
      </div>
    </motion.div>
  );
};

/* ─── Premium App Card ─── */
const AppCard = ({ app, index }) => {
  const navigate = useNavigate();
  const isLive = app.status !== 'coming-soon';
  const isLexaChat = app.id === 'lexachat';

  return (
    <motion.article
      initial={{ opacity: 0, y: 28, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 180, damping: 20 }}
      onClick={() => isLive && navigate(app.path)}
      className={`relative flex flex-col p-6 rounded-3xl transition-all duration-300 group overflow-hidden gradient-border-animated ${isLive ? 'cursor-pointer' : 'opacity-50 cursor-default'}`}
      style={{ background: 'rgba(10,17,32,0.7)', backdropFilter: 'blur(24px)' }}
      whileHover={isLive ? { y: -8, scale: 1.02 } : {}}
    >
      {/* Noise texture */}
      <div className="noise-overlay absolute inset-0 rounded-3xl pointer-events-none" />
      
      {/* Inner glow on hover */}
      <div className="absolute top-0 right-0 w-56 h-56 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: `radial-gradient(circle, ${app.hex}15, transparent 70%)`, filter: 'blur(40px)' }} />

      {/* Shimmer */}
      {isLive && <div className="shimmer-effect absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />}

      {/* Header */}
      <div className="flex items-start justify-between mb-5 relative z-10">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
          style={{ background: `${app.hex}12`, border: `1px solid ${app.hex}25`, boxShadow: isLive ? `0 4px 20px ${app.hex}15` : 'none' }}>
          {app.emoji}
        </div>
        <StatusBadge status={app.status} />
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-white mb-2 relative z-10 group-hover:text-gradient-cyber transition-all">{app.name}</h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-5 relative z-10 flex-1">{app.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
        {app.tags?.map(tag => (
          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md font-medium transition-all"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#64748b' }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 relative z-10"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2">
          {app.modes.includes('local') && <Lock className="w-3.5 h-3.5 text-neon-green opacity-60" />}
          {app.modes.includes('account') && <Cloud className="w-3.5 h-3.5 text-electric-cyan opacity-60" />}
        </div>
        {isLive ? (
          <span className="flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
            style={{ color: app.hex }}>
            {isLexaChat ? (
              <><ExternalLink className="w-3.5 h-3.5" /> Open in FuncLexa</>
            ) : (
              <>Launch <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" /></>
            )}
          </span>
        ) : (
          <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Coming Soon
          </span>
        )}
      </div>

      {/* Bottom gradient bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
        style={{ background: `linear-gradient(90deg, transparent, ${app.hex}, transparent)` }} />
    </motion.article>
  );
};

const FILTER_OPTIONS = ['All', 'Active', 'Beta', 'Coming Soon'];

const Apps = () => {
  const { mode } = useAppMode();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredApps = useMemo(() => {
    let list = appRegistry.filter(app => app.modes.includes(mode || 'local'));
    if (filter !== 'All') {
      const statusMap = { 'Active': 'active', 'Beta': 'beta', 'Coming Soon': 'coming-soon' };
      list = list.filter(a => a.status === statusMap[filter]);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags?.some(t => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [mode, search, filter]);

  // Find LexaChat for featured card
  const featured = appRegistry.find(a => a.id === 'lexachat' && a.modes.includes(mode || 'local'));
  const nonFeatured = filteredApps.filter(a => a.id !== 'lexachat');

  return (
    <div className="min-h-screen text-slate-300">
      <Sidebar />
      <main className="workspace-shell md:ml-64 pb-16">
        <BackgroundTheme variant="workspace" />

        <div className="workspace-container">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-premium"
                style={{ border: '1px solid rgba(0,229,255,0.15)' }}>
                <Zap className="w-3.5 h-3.5 text-electric-cyan" />
                <span className="text-[10px] font-bold text-electric-cyan uppercase tracking-[0.15em]">App Marketplace</span>
              </div>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Your <span className="text-gradient-premium">AI Toolkit</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {filteredApps.length} app{filteredApps.length !== 1 ? 's' : ''} available in {mode === 'account' ? 'Account' : 'Local'} mode
            </p>
          </motion.div>

          {/* Search + Filter Bar */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-3 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search apps…"
                className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-700 focus:outline-none transition-all glass-premium"
                onFocus={e => {
                  e.target.style.borderColor = 'rgba(0,229,255,0.3)';
                  e.target.style.boxShadow = '0 0 20px rgba(0,229,255,0.08)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            {/* Status filters */}
            <div className="flex gap-2 flex-wrap">
              {FILTER_OPTIONS.map(opt => (
                <button key={opt} onClick={() => setFilter(opt)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
                  style={{
                    background: filter === opt ? 'rgba(0,229,255,0.1)' : 'rgba(10,17,32,0.8)',
                    border: filter === opt ? '1px solid rgba(0,229,255,0.3)' : '1px solid rgba(255,255,255,0.07)',
                    color: filter === opt ? '#00E5FF' : '#64748b',
                    boxShadow: filter === opt ? '0 0 16px rgba(0,229,255,0.1)' : 'none',
                  }}>
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Featured LexaChat Hero */}
          {featured && filter === 'All' && !search.trim() && (
            <FeaturedCard app={featured} />
          )}

          {/* Grid */}
          <AnimatePresence mode="wait">
            {(filter === 'All' && !search.trim() ? nonFeatured : filteredApps).length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 glass-premium">
                  <Search className="w-6 h-6 text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">No apps found</h3>
                <p className="text-slate-500 text-sm">Try adjusting your search or filter criteria</p>
              </motion.div>
            ) : (
              <motion.section key="grid"
                className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {(filter === 'All' && !search.trim() ? nonFeatured : filteredApps).map((app, i) => (
                  <AppCard key={app.id} app={app} index={i} />
                ))}
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Apps;
