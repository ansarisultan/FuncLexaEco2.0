import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import BackgroundTheme from '../../components/common/BackgroundTheme';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Pick up the persisted destination, default to dashboard
      const redirectTarget = localStorage.getItem('redirect_after_sso') || '/dashboard';
      localStorage.removeItem('redirect_after_sso');
      navigate(redirectTarget, { replace: true });
    }, 1200);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: '#03060D' }}>
      <BackgroundTheme variant="workspace" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-full border-2 border-transparent"
            style={{ borderTopColor: '#00E5FF', borderRightColor: '#8B5CF6' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Cpu className="w-6 h-6 text-electric-cyan" />
          </div>
        </div>
        <h1 className="text-xl font-bold text-white mb-2">Almost there…</h1>
        <p className="text-sm text-slate-500">Setting up your workspace</p>

        {/* Progress bar */}
        <div className="mt-8 w-48 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #00E5FF, #8B5CF6)' }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default AuthCallback;

