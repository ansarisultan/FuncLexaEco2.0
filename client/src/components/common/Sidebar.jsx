import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useAppMode } from '../../context/AppModeContext';
import {
  LayoutDashboard, Grid3X3, BarChart3, User, Cpu,
  Lock, Cloud, LogOut, Menu, X, ChevronRight, Crown
} from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/apps', label: 'Apps', icon: Grid3X3 },
  { to: '/usage', label: 'Usage', icon: BarChart3 },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/premium', label: 'Premium', icon: Crown, premium: true },
];

const NavItem = ({ to, label, icon: Icon, premium }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
        ? 'text-white'
        : premium
          ? 'text-purple-400/70 hover:text-purple-300 hover:bg-purple-500/[0.06]'
          : 'text-slate-500 hover:text-slate-200 hover:bg-white/[0.04]'
      }`
    }
    style={({ isActive }) => isActive ? {
      background: premium
        ? 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(244,114,182,0.08))'
        : 'linear-gradient(135deg, rgba(0,229,255,0.12), rgba(139,92,246,0.08))',
      border: premium
        ? '1px solid rgba(139,92,246,0.25)'
        : '1px solid rgba(0,229,255,0.2)',
      boxShadow: premium
        ? '0 0 20px rgba(139,92,246,0.08)'
        : '0 0 20px rgba(0,229,255,0.06)',
    } : {}}
  >
    {({ isActive }) => (
      <>
        <Icon className={`w-4 h-4 shrink-0 transition-colors ${
          isActive
            ? premium ? 'text-purple-400' : 'text-electric-cyan'
            : premium ? 'text-purple-500/60' : 'text-slate-600 group-hover:text-slate-400'
        }`} />
        <span>{label}</span>
        {premium && !isActive && (
          <span className="ml-auto text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider"
            style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(244,114,182,0.15))', color: '#c084fc', border: '1px solid rgba(139,92,246,0.25)' }}>
            PRO
          </span>
        )}
        {isActive && <ChevronRight className={`w-3 h-3 ml-auto opacity-60 ${premium ? 'text-purple-400' : 'text-electric-cyan'}`} />}
      </>
    )}
  </NavLink>
);

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { mode, setMode } = useAppMode();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    setMode('local');
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 py-4 mb-4">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.2), rgba(139,92,246,0.2))', border: '1px solid rgba(0,229,255,0.25)' }}>
          <Cpu className="w-4 h-4 text-electric-cyan" />
        </div>
        <div>
          <span className="text-white font-extrabold text-base tracking-tight">
            Func<span className="text-gradient-cyber">Lexa</span>
          </span>
          <span className="block text-[10px] text-slate-600 tracking-widest uppercase">Workspace</span>
        </div>
      </div>

      {/* Mode pill */}
      <div className="px-3 mb-5">
        <div className="flex items-center gap-1.5 p-1 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <button
            onClick={() => setMode('local')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${mode === 'local' ? '' : 'text-slate-600'}`}
            style={mode === 'local' ? { background: 'rgba(34,197,94,0.12)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.2)' } : {}}
          >
            <Lock className="w-3 h-3" /> Local
          </button>
          <button
            onClick={() => { if (mode !== 'account') navigate('/auth/login'); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${mode === 'account' ? '' : 'text-slate-600'}`}
            style={mode === 'account' ? { background: 'rgba(0,229,255,0.10)', color: '#00E5FF', border: '1px solid rgba(0,229,255,0.2)' } : {}}
          >
            <Cloud className="w-3 h-3" /> Account
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {links.map(link => <NavItem key={link.to} {...link} />)}
      </nav>

      {/* User section */}
      <div className="px-3 pt-4 mt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
            style={{ background: mode === 'account' ? 'rgba(0,229,255,0.15)' : 'rgba(34,197,94,0.12)', color: mode === 'account' ? '#00E5FF' : '#22C55E' }}>
            {(user?.name || 'L')[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-300 truncate">{user?.name || 'Local User'}</p>
            <p className="text-[10px] text-slate-600 truncate">{user?.email || 'local@browser'}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Logout / Go to landing"
            className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-slate-600 hover:text-red-400 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 z-40"
        style={{
          background: 'rgba(5,11,20,0.96)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile: top bar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14"
        style={{ background: 'rgba(5,8,18,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-electric-cyan" />
          <span className="text-white font-bold">Func<span className="text-gradient-cyber">Lexa</span></span>
        </div>
        <button
          onClick={() => setMobileOpen(o => !o)}
          className="w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {mobileOpen ? <X className="w-4 h-4 text-slate-300" /> : <Menu className="w-4 h-4 text-slate-300" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed left-0 top-0 bottom-0 z-50 w-[85vw] max-w-72 py-4"
              style={{ background: 'rgba(5,8,18,0.98)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
            >
              <button
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.05)' }}
                onClick={() => setMobileOpen(false)}
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
