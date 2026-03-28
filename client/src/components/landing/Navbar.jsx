import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Cpu, Menu, X, ArrowRight, Settings, Lock, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppMode } from '../../context/AppModeContext';

const navLinks = [
  { label: 'Home', to: '#home' },
  { label: 'Features', to: '#features' },
  { label: 'Apps', to: '#apps' },
  { label: 'How It Works', to: '#how-it-works' },
  { label: 'Security', to: '#security' },
  { label: 'Pricing', to: '/pricing' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { isAuthenticated, user } = useAuth();
  const { mode, setMode } = useAppMode();
  const loggedIn = isAuthenticated;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const element = document.getElementById(id);
    if (!element) return;
    const y = element.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, [location.hash]);

  const scrollToSection = (hash) => {
    const id = hash.replace('#', '');
    const element = document.getElementById(id);
    if (!element) return false;
    const y = element.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top: y, behavior: 'smooth' });
    return true;
  };

  const handleNavClick = (to) => {
    setMobileOpen(false);
    if (!to.startsWith('#')) {
      navigate(to);
      return;
    }
    if (location.pathname !== '/') {
      navigate(`/${to}`);
      setTimeout(() => {
        scrollToSection(to);
      }, 120);
      return;
    }
    scrollToSection(to);
  };

  const handleTryLocalMode = () => {
    setMode('local');
    navigate('/dashboard');
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={scrolled ? {
        background: 'rgba(3,6,13,0.88)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,229,255,0.08)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
      } : { background: 'transparent' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
              style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.2), rgba(139,92,246,0.2))', border: '1px solid rgba(0,229,255,0.3)' }}
            >
              <Cpu className="w-4 h-4 text-electric-cyan" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              Func<span className="text-gradient-cyber">Lexa</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, to }) => (
              <button
                key={label}
                onClick={() => handleNavClick(to)}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 font-medium"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {loggedIn ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 group mr-2 px-2 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer" title="Workspace Settings">
                  <div className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold transition-transform group-hover:scale-105"
                    style={{ background: mode === 'account' ? 'rgba(0,229,255,0.15)' : 'rgba(34,197,94,0.12)', color: mode === 'account' ? '#00E5FF' : '#22C55E', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {(user?.name || 'U')[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                    {user?.name || 'User'}
                  </span>
                  <Settings className="w-3.5 h-3.5 text-slate-500 ml-1 group-hover:text-slate-300 transition-colors" />
                </Link>

                <motion.button
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #00E5FF, #8B5CF6)',
                    boxShadow: '0 0 20px rgba(0,229,255,0.25)',
                  }}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  Open FuncLexa
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </>
            ) : (
              <>
                <button
                  onClick={handleTryLocalMode}
                  className="text-sm text-[#67f3ff] hover:text-white transition-colors px-4 py-2 font-medium cursor-pointer"
                >
                  Try Local Mode
                </button>
                <button
                  onClick={() => navigate('/auth/login')}
                  className="text-sm text-slate-400 hover:text-white transition-colors px-4 py-2 font-medium cursor-pointer"
                >
                  Login
                </button>
                <motion.button
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/auth/signup')}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #00E5FF, #8B5CF6)',
                    boxShadow: '0 0 20px rgba(0,229,255,0.25)',
                  }}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Signup
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </>
            )}
          </div>

          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer"
            style={{ background: 'rgba(13,21,38,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}
            onClick={() => setMobileOpen(o => !o)}
          >
            {mobileOpen ? <X className="w-5 h-5 text-slate-300" /> : <Menu className="w-5 h-5 text-slate-300" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(3,6,13,0.97)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(({ label, to }) => (
                <button key={label} onClick={() => handleNavClick(to)}
                  className="block px-4 py-2.5 text-slate-400 hover:text-white text-sm font-medium rounded-lg hover:bg-white/5 transition-all">
                  {label}
                </button>
              ))}
              <div className="pt-3 space-y-2">
                {loggedIn ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <div className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
                        style={{ background: 'rgba(0,229,255,0.15)', color: '#00E5FF' }}>
                        {(user?.name || 'U')[0].toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white">{user?.name || 'User'}</p>
                        <p className="text-xs text-slate-500 capitalize">Account Workspace</p>
                      </div>
                      <button onClick={() => { navigate('/profile'); setMobileOpen(false); }} className="p-2 bg-white/5 rounded-lg">
                        <Settings className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                    <button onClick={() => { navigate('/dashboard'); setMobileOpen(false); }}
                      className="w-full btn-cyber text-sm flex items-center justify-center gap-2">
                      <Cpu className="w-4 h-4" /> Open FuncLexa
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { handleTryLocalMode(); setMobileOpen(false); }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-[#67f3ff] bg-[rgba(0,229,255,0.08)] border border-[rgba(0,229,255,0.24)]">
                      <Lock className="w-4 h-4" /> Try Local Mode
                    </button>
                    <button onClick={() => { navigate('/auth/login'); setMobileOpen(false); }}
                      className="w-full btn-ghost text-sm flex items-center justify-center gap-2"><LogIn className="w-4 h-4" /> Login</button>
                    <button onClick={() => { navigate('/auth/signup'); setMobileOpen(false); }}
                      className="w-full btn-cyber text-sm flex items-center justify-center gap-2">
                      <UserPlus className="w-4 h-4" /> Signup
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
