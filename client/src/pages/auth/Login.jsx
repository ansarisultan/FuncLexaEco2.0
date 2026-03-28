import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useAppMode } from '../../context/AppModeContext';
import BackgroundTheme from '../../components/common/BackgroundTheme';
import {
    Cpu, Mail, Lock, MessageSquare, ArrowRight,
    Loader2, Eye, EyeOff, Zap, Shield, Globe
} from 'lucide-react';

const FeatureItem = ({ icon: Icon, text }) => (
    <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)' }}>
            <Icon className="w-4 h-4 text-electric-cyan" />
        </div>
        <span className="text-sm text-slate-400">{text}</span>
    </div>
);

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loadingFor, setLoadingFor] = useState('');
    const [error, setError] = useState('');

    const { loginFuncLexa, continueWithAccount } = useAuth();
    const { setMode } = useAppMode();
    const navigate = useNavigate();
    const location = useLocation();

    // Determine return URL if coming from a protected route
    const from = location.state?.from?.pathname || '/dashboard';

    const handleFuncLexaLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoadingFor('funclexa');
        try {
            await loginFuncLexa(email, password);
            setMode('account');
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'Invalid credentials.');
            setLoadingFor('');
        }
    };

    const handleLexaChatSSO = () => {
        // Persist intended destination across the external SSO jump
        localStorage.setItem('redirect_after_sso', from);
        window.location.href = 'https://lexachat.online/login';
    };

    const handleLocal = () => {
        setLoadingFor('local');
        setMode('local');
        setTimeout(() => navigate(from, { replace: true }), 800);
    };

    return (
        <div className="min-h-screen flex relative overflow-hidden" style={{ background: '#03060D' }}>
            <BackgroundTheme variant="auth" />

            {/* Left branding panel — desktop only */}
            <div className="hidden lg:flex flex-col justify-between w-[480px] shrink-0 p-12 relative z-10"
                style={{ borderRight: '1px solid rgba(255,255,255,0.04)' }}>
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 w-fit group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.2), rgba(139,92,246,0.2))', border: '1px solid rgba(0,229,255,0.25)' }}>
                        <Cpu className="w-5 h-5 text-electric-cyan" />
                    </div>
                    <span className="text-white font-extrabold text-lg tracking-tight">
                        Func<span className="text-gradient-cyber">Lexa</span>
                    </span>
                </Link>

                {/* Hero text */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
                            Your unified<br />
                            <span className="text-gradient-cyber">AI workspace</span><br />
                            awaits.
                        </h2>
                        <p className="text-slate-400 text-base leading-relaxed">
                            One account. Every tool. Access LexaChat, analytics, and your entire ecosystem seamlessly.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <FeatureItem icon={Zap} text="Launch apps in a single click" />
                        <FeatureItem icon={Shield} text="Secure local & cloud modes" />
                        <FeatureItem icon={Globe} text="LexaChat embedded on your domain" />
                    </div>
                </div>

                {/* Bottom badge */}
                <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                    All systems operational
                </div>
            </div>

            {/* Right form panel */}
            <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center mb-8 lg:hidden">
                        <Link to="/" className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform hover:scale-110"
                            style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.2), rgba(139,92,246,0.2))', border: '1px solid rgba(0,229,255,0.3)' }}>
                            <Cpu className="w-6 h-6 text-electric-cyan" />
                        </Link>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight mb-1">Welcome back</h1>
                        <p className="text-slate-400 text-sm">Sign in to your FuncLexa account</p>
                    </motion.div>

                    {/* Desktop heading */}
                    <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
                        className="mb-8 hidden lg:block">
                        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Welcome back</h1>
                        <p className="text-slate-500 text-sm">Sign in to continue to your workspace</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
                        className="rounded-3xl p-6 sm:p-8"
                        style={{ background: 'rgba(10,17,32,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                        <form onSubmit={handleFuncLexaLogin} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wide">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                    <input
                                        type="email" required autoComplete="username"
                                        value={email} onChange={e => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-700 focus:outline-none transition-all font-medium"
                                        style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
                                        onFocus={e => e.target.style.border = '1px solid rgba(0,229,255,0.4)'}
                                        onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.08)'}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wide">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                    <input
                                        type={showPassword ? 'text' : 'password'} required autoComplete="current-password"
                                        value={password} onChange={e => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-slate-700 focus:outline-none transition-all font-medium"
                                        style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
                                        onFocus={e => e.target.style.border = '1px solid rgba(0,229,255,0.4)'}
                                        onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.08)'}
                                    />
                                    <button type="button" onClick={() => setShowPassword(s => !s)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors">
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-0.5 px-0.5">
                                <AnimatePresence>
                                    {error && (
                                        <motion.p initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                                            className="text-xs text-red-400 font-medium flex-1 mr-4">
                                            ⚠ {error}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                                <Link to="/auth/forgot-password"
                                    className="text-xs font-semibold text-slate-500 hover:text-electric-cyan transition-colors ml-auto whitespace-nowrap">
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit" disabled={!!loadingFor}
                                className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-[#03060D] mt-2 transition-all hover:opacity-90 active:scale-[0.98]"
                                style={{ background: 'linear-gradient(135deg, #00E5FF, #8B5CF6)', opacity: loadingFor && loadingFor !== 'funclexa' ? 0.5 : 1 }}>
                                {loadingFor === 'funclexa'
                                    ? <Loader2 className="w-5 h-5 animate-spin text-white" />
                                    : <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-3 my-6">
                            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
                            <span className="text-[11px] text-slate-600 font-medium uppercase tracking-wider">or continue with</span>
                            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
                        </div>

                        <div className="space-y-3">
                            <button onClick={handleLexaChatSSO} type="button" disabled={!!loadingFor}
                                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl transition-all group cursor-pointer"
                                style={{ background: 'rgba(0,229,255,0.04)', border: '1px solid rgba(0,229,255,0.12)' }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,229,255,0.08)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,229,255,0.04)'}>
                                {loadingFor === 'lexachat' ? (
                                    <Loader2 className="w-5 h-5 text-electric-cyan animate-spin" />
                                ) : (
                                    <>
                                        <MessageSquare className="w-4 h-4 text-electric-cyan" />
                                        <span className="text-sm font-semibold text-slate-300">Continue with LexaChat Account</span>
                                    </>
                                )}
                            </button>

                            <button onClick={handleLocal} type="button" disabled={!!loadingFor}
                                className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group cursor-pointer"
                                style={{ background: 'rgba(34,197,94,0.03)', border: '1px solid rgba(34,197,94,0.1)' }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(34,197,94,0.07)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(34,197,94,0.03)'}>
                                {loadingFor === 'local' ? (
                                    <div className="w-full flex justify-center">
                                        <Loader2 className="w-5 h-5 text-neon-green animate-spin" />
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-3">
                                            <Lock className="w-4 h-4 text-neon-green/70" />
                                            <span className="text-sm font-semibold text-slate-400">Use Locally — No Account Needed</span>
                                        </div>
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded"
                                            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22C55E' }}>
                                            FREE
                                        </span>
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>

                    <p className="text-center text-sm text-slate-600 mt-6">
                        Don't have an account?{' '}
                        <Link to="/auth/signup" className="text-electric-cyan font-semibold hover:text-white transition-colors">
                            Create one free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
