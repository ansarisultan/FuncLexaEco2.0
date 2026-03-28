import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../../components/common/Sidebar';
import { useAppMode } from '../../context/AppModeContext';
import { useAuth } from '../../context/AuthContext';
import BackgroundTheme from '../../components/common/BackgroundTheme';
import {
  Camera, Shield, Mail, Key, LogOut, Smartphone,
  CheckCircle2, Copy, User, Lock, Zap, Crown, Upload, Download, Database,
  Star, Award, Target, Flame, Sparkles, ArrowRight
} from 'lucide-react';
import { formatDateTime } from '../../utils/helpers';
import { readWorkspace, writeWorkspace } from '../../services/localWorkspace';

const InfoRow = ({ label, value, subtext, icon: Icon }) => (
  <div className="flex items-start justify-between py-3.5 group"
    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
    <div className="flex items-start gap-3">
      {Icon && (
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <Icon className="w-3.5 h-3.5 text-slate-500" />
        </div>
      )}
      <div>
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.12em] mb-0.5">{label}</p>
        <p className="text-sm font-medium text-white">{value}</p>
        {subtext && <p className="text-xs text-slate-600 mt-0.5">{subtext}</p>}
      </div>
    </div>
  </div>
);

/* ─── Achievement Badge ─── */
const AchievementBadge = ({ icon: Icon, label, earned, hex, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: 'spring', stiffness: 200, damping: 18 }}
    className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all group ${earned ? 'cursor-default' : 'opacity-40'}`}
    style={{
      background: earned ? `${hex}08` : 'rgba(255,255,255,0.02)',
      border: earned ? `1px solid ${hex}20` : '1px solid rgba(255,255,255,0.04)',
    }}
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${earned ? 'animate-float' : ''}`}
      style={{
        background: earned ? `${hex}15` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${earned ? `${hex}30` : 'rgba(255,255,255,0.06)'}`,
        boxShadow: earned ? `0 4px 16px ${hex}15` : 'none',
      }}>
      <Icon className="w-4 h-4" style={{ color: earned ? hex : '#475569' }} />
    </div>
    <span className="text-[9px] font-bold text-slate-400 text-center uppercase tracking-wider">{label}</span>
  </motion.div>
);

const Profile = () => {
  const { mode, setMode } = useAppMode();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const apiKey = isAuthenticated ? 'flx_live_9a8b7c6d5e4f3a2b1c0d' : 'flx_local_00000000000000000000';

  const handleLogout = async () => {
    await logout();
    setMode('local');
    navigate('/');
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fileInputRef = useRef(null);

  const handleExport = () => {
    const ws = readWorkspace();
    const blob = new Blob([JSON.stringify(ws, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `funclexa_workspace_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        writeWorkspace(data);
        alert('Workspace imported successfully!');
        window.location.reload();
      } catch (err) {
        alert('Invalid workspace file.');
      }
    };
    reader.readAsText(file);
  };

  const mockSessions = [
    { id: 1, device: 'MacBook Pro 16"', browser: 'Chrome 123', location: 'Mumbai, IN', time: formatDateTime(new Date().toISOString()), current: true },
    { id: 2, device: 'iPhone 15 Pro', browser: 'Safari Mobile', location: 'Mumbai, IN', time: formatDateTime(new Date(Date.now() - 86400000).toISOString()), current: false },
  ];

  const achievements = [
    { icon: Star, label: 'First Login', earned: true, hex: '#FFD700' },
    { icon: Flame, label: '7-Day Streak', earned: true, hex: '#F472B6' },
    { icon: Target, label: '100 API Calls', earned: true, hex: '#00E5FF' },
    { icon: Award, label: 'Power User', earned: false, hex: '#8B5CF6' },
  ];

  const accentColor = mode === 'account' ? '#00E5FF' : '#22C55E';
  const accentBg = mode === 'account' ? 'rgba(0,229,255,0.12)' : 'rgba(34,197,94,0.12)';

  return (
    <div className="min-h-screen text-slate-300">
      <Sidebar />
      <main className="workspace-shell md:ml-64 pb-16">
        <BackgroundTheme variant="workspace" />

        <div className="workspace-container">

          {/* Page header */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-premium"
                style={{ border: `1px solid ${accentColor}20` }}>
                <User className="w-3.5 h-3.5" style={{ color: accentColor }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: accentColor }}>
                  Your Account
                </span>
              </div>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Profile & <span className="text-gradient-premium">Settings</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">Manage your identity, credentials, and active sessions</p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-6">

            {/* ── Left Column ── */}
            <div className="lg:col-span-4 space-y-5">

              {/* Avatar Card */}
              <motion.section initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.08 }}
                className="glass-premium-strong rounded-3xl overflow-hidden relative noise-overlay">
                {/* Animated gradient banner */}
                <div className="h-24 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${accentColor}18, rgba(139,92,246,0.15), rgba(244,114,182,0.08))` }}>
                  <div className="absolute inset-0 aurora-bg" />
                  <div className="absolute inset-0 cyber-grid opacity-20" />
                  {/* Floating sparkles */}
                  <motion.div
                    className="absolute top-3 right-6"
                    animate={{ y: [-4, 4, -4], rotate: [0, 180, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Sparkles className="w-4 h-4 text-white/20" />
                  </motion.div>
                  <motion.div
                    className="absolute top-8 right-14"
                    animate={{ y: [3, -5, 3], rotate: [360, 180, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  >
                    <Star className="w-3 h-3 text-white/15" />
                  </motion.div>
                </div>

                <div className="px-6 pb-6 -mt-12 relative z-10">
                  {/* Avatar with animated ring */}
                  <div className="relative w-fit mb-4">
                    <div className="absolute inset-[-4px] rounded-2xl animate-spin-slow"
                      style={{
                        background: `linear-gradient(135deg, ${accentColor}, #8B5CF6, #F472B6, ${accentColor})`,
                        backgroundSize: '200% 200%',
                        opacity: 0.6,
                        filter: 'blur(3px)',
                      }} />
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-extrabold relative"
                      style={{
                        background: '#0a1120',
                        color: accentColor,
                        border: `3px solid #03060D`,
                      }}>
                      {(user?.name || 'L')[0].toUpperCase()}
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity glass-premium"
                      style={{ border: '2px solid #03060D' }}>
                      <Camera className="w-3.5 h-3.5 text-slate-300" />
                    </button>
                  </div>

                  <h2 className="text-xl font-extrabold text-white mb-1">{user?.name || 'Local User'}</h2>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                    <Mail className="w-3 h-3" />
                    {user?.email || 'local@browser.env'}
                  </div>

                  {/* Plan badge */}
                  <motion.div
                    className="flex items-center gap-2 mb-5 p-3.5 rounded-xl cursor-pointer group"
                    onClick={() => navigate('/premium')}
                    style={{
                      background: user?.plan === 'pro' ? 'rgba(139,92,246,0.1)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${user?.plan === 'pro' ? 'rgba(139,92,246,0.25)' : 'rgba(255,255,255,0.06)'}`,
                    }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <Crown className="w-4 h-4" style={{ color: user?.plan === 'pro' ? '#8B5CF6' : '#64748b' }} />
                    <span className="text-sm font-bold capitalize" style={{ color: user?.plan === 'pro' ? '#8B5CF6' : '#64748b' }}>
                      {user?.plan || 'Free'} Plan
                    </span>
                    {user?.plan !== 'pro' && (
                      <span className="ml-auto text-[10px] font-bold text-purple-400 group-hover:text-purple-300 transition-colors flex items-center gap-1">
                        Upgrade <ArrowRight className="w-3 h-3" />
                      </span>
                    )}
                  </motion.div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <button onClick={() => { setMode('local'); navigate('/dashboard'); }}
                      className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-white/[0.04] glass-premium"
                      style={{ color: '#94a3b8' }}>
                      Switch Mode
                    </button>
                    {isAuthenticated && (
                      <button onClick={handleLogout}
                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-80"
                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
                        <LogOut className="w-4 h-4" /> Sign out
                      </button>
                    )}
                  </div>
                </div>
              </motion.section>

              {/* API Key Card */}
              <motion.section initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}
                className="glass-premium-strong rounded-3xl p-6 noise-overlay">
                <div className="flex items-center gap-2 mb-1 relative z-10">
                  <Key className="w-4 h-4 text-electric-cyan" />
                  <h3 className="font-bold text-white text-sm">API Credentials</h3>
                </div>
                <p className="text-xs text-slate-500 mb-4 relative z-10">Use this key to authenticate FuncLexa proxy requests</p>
                <div onClick={copyApiKey}
                  className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all group relative z-10 glass-premium"
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,229,255,0.2)';
                    e.currentTarget.style.boxShadow = '0 0 16px rgba(0,229,255,0.06)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                  <code className="text-xs text-slate-300 font-mono tracking-wider truncate mr-2">{apiKey}</code>
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <CheckCircle2 className="w-4 h-4 text-neon-green shrink-0" />
                      </motion.div>
                    ) : (
                      <motion.div key="copy">
                        <Copy className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors shrink-0" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.section>

              {/* Achievements */}
              <motion.section initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.22 }}
                className="glass-premium-strong rounded-3xl p-6 noise-overlay">
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <h3 className="font-bold text-white text-sm">Achievements</h3>
                  <span className="ml-auto text-[10px] text-slate-600">3/4 earned</span>
                </div>
                <div className="grid grid-cols-2 gap-2 relative z-10">
                  {achievements.map((a, i) => (
                    <AchievementBadge key={a.label} {...a} delay={0.25 + i * 0.06} />
                  ))}
                </div>
              </motion.section>
            </div>

            {/* ── Right Column ── */}
            <div className="lg:col-span-8 space-y-5">

              {/* Account Info */}
              <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 }}
                className="glass-premium-strong rounded-3xl p-6 noise-overlay">
                <div className="flex items-center gap-2 mb-5 relative z-10">
                  <Lock className="w-4 h-4 text-neon-purple" />
                  <h3 className="font-bold text-white">Account Information</h3>
                </div>
                <div className="relative z-10">
                  <InfoRow label="Display Name" value={user?.name || '—'} icon={User} />
                  <InfoRow label="Email Address" value={user?.email || '—'} subtext={user?.emailVerified ? '✓ Verified' : 'Not verified'} icon={Mail} />
                  <InfoRow label="Auth Provider" value={user?.authProvider === 'local' ? 'FuncLexa (Local)' : user?.authProvider === 'lexachat' ? 'LexaChat SSO' : 'Local Mode'} icon={Shield} />
                  <InfoRow label="Plan" value={user?.plan ? (user.plan.charAt(0).toUpperCase() + user.plan.slice(1)) : 'Free'} icon={Crown} />
                  {user?.lastLogin && (
                    <InfoRow label="Last Login" value={formatDateTime(user.lastLogin)} />
                  )}
                </div>
              </motion.section>

              {/* Local Workspace Data */}
              <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.22 }}
                className="glass-premium-strong rounded-3xl p-6 noise-overlay">
                <div className="flex items-center gap-2 mb-3 relative z-10">
                  <Database className="w-4 h-4 text-electric-cyan" />
                  <h3 className="font-bold text-white text-sm">Local Workspace Data</h3>
                </div>
                <p className="text-xs text-slate-400 mb-5 relative z-10">Export your workspace configuration to back it up, or import a previously saved configuration.</p>
                <div className="flex gap-3 relative z-10">
                  <input
                    type="file"
                    accept=".json"
                    ref={fileInputRef}
                    onChange={handleImport}
                    className="hidden"
                  />
                  <button onClick={() => fileInputRef.current?.click()}
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all hover:bg-white/[0.04] flex items-center justify-center gap-2 glass-premium"
                    style={{ color: '#94a3b8' }}>
                    <Download className="w-4 h-4" /> Import JSON
                  </button>
                  <button onClick={handleExport}
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-80"
                    style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)', color: '#00E5FF' }}>
                    <Upload className="w-4 h-4" /> Export config
                  </button>
                </div>
              </motion.section>

              {/* Sessions */}
              <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
                className="glass-premium-strong rounded-3xl p-6 noise-overlay">
                <div className="flex items-center gap-2 mb-5 relative z-10">
                  <Shield className="w-4 h-4 text-neon-green" />
                  <h3 className="font-bold text-white">Active Sessions</h3>
                  <span className="ml-auto text-xs text-slate-600">{mockSessions.length} devices</span>
                </div>

                <div className="space-y-3 relative z-10">
                  {mockSessions.map((session, i) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.06 }}
                      className="flex items-start justify-between p-4 rounded-2xl transition-all group glass-premium gradient-border-animated"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: session.current ? `${accentColor}10` : 'rgba(255,255,255,0.04)', border: `1px solid ${session.current ? `${accentColor}20` : 'rgba(255,255,255,0.06)'}` }}>
                          <Smartphone className="w-4 h-4" style={{ color: session.current ? accentColor : '#64748b' }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-sm font-bold text-white">{session.device}</p>
                            {session.current && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider animate-pulse-glow-green"
                                style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22C55E' }}>
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500">{session.browser} · {session.location}</p>
                          <p className="text-[10px] text-slate-600 mt-0.5">Last seen: {session.time}</p>
                        </div>
                      </div>
                      {!session.current && (
                        <button className="text-[10px] font-semibold px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', color: '#f87171' }}>
                          Revoke
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Danger zone */}
              <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.32 }}
                className="rounded-3xl p-6 relative overflow-hidden"
                style={{ background: 'rgba(10,17,32,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(239,68,68,0.12)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-red-500" />
                  <h3 className="font-bold text-red-400 text-sm">Danger Zone</h3>
                </div>
                <p className="text-xs text-slate-500 mb-4">These actions are permanent and cannot be undone.</p>
                <button className="text-xs font-semibold px-4 py-2 rounded-xl transition-all hover:opacity-80"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
                  Delete Account
                </button>
              </motion.section>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
