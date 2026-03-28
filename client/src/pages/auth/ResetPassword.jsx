import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, Loader2, CheckCircle2, Eye, EyeOff, Cpu } from 'lucide-react';
import { resetPasswordAction } from '../../services/authService';
import { useAppMode } from '../../context/AppModeContext';
import BackgroundTheme from '../../components/common/BackgroundTheme';

const calcStrength = (pw) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
};
const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthColor = ['', '#ef4444', '#f59e0b', '#22c55e', '#00e5ff'];

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { setMode } = useAppMode();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const score = calcStrength(password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
        if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }

        setLoading(true);
        try {
            await resetPasswordAction(token, password);
            setSuccess(true);
            setMode('account');
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (err) {
            setError(err.message || 'Failed to reset password. The link may have expired.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
            style={{ background: '#03060D' }}>
            <BackgroundTheme variant="workspace" />

            <div className="relative z-10 w-full max-w-md">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center mb-8 text-center">
                    <Link to="/" className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 hover:scale-110 transition-transform"
                        style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(0,229,255,0.15))', border: '1px solid rgba(139,92,246,0.3)' }}>
                        <Cpu className="w-6 h-6 text-neon-purple" />
                    </Link>
                    <h1 className="text-2xl font-extrabold text-white tracking-tight mb-1">Create new password</h1>
                    <p className="text-slate-500 text-sm">Secure your account with a fresh password</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.08 }}
                    className="rounded-3xl p-6 sm:p-8"
                    style={{ background: 'rgba(10,17,32,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}>

                    <AnimatePresence mode="wait">
                        {!success ? (
                            <motion.form key="form" onSubmit={handleSubmit}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                                className="space-y-4">

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wide">New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                        <input type={showPw ? 'text' : 'password'} required
                                            value={password} onChange={e => setPassword(e.target.value)}
                                            placeholder="Min. 8 characters"
                                            className="w-full rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-slate-700 focus:outline-none transition-all font-medium"
                                            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
                                            onFocus={e => e.target.style.border = '1px solid rgba(139,92,246,0.4)'}
                                            onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.08)'} />
                                        <button type="button" onClick={() => setShowPw(s => !s)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors">
                                            {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    {/* Strength meter */}
                                    {password && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2">
                                            <div className="flex gap-1 mb-1">
                                                {[1, 2, 3, 4].map(i => (
                                                    <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
                                                        style={{ background: i <= score ? strengthColor[score] : 'rgba(255,255,255,0.06)' }} />
                                                ))}
                                            </div>
                                            <p className="text-[11px] font-medium" style={{ color: strengthColor[score] }}>
                                                {strengthLabel[score]}
                                            </p>
                                        </motion.div>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wide">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                        <input type={showConfirm ? 'text' : 'password'} required
                                            value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-slate-700 focus:outline-none transition-all font-medium"
                                            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
                                            onFocus={e => e.target.style.border = '1px solid rgba(139,92,246,0.4)'}
                                            onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.08)'} />
                                        <button type="button" onClick={() => setShowConfirm(s => !s)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors">
                                            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    {/* Match indicator */}
                                    {confirmPassword && (
                                        <p className="text-[11px] font-medium ml-1"
                                            style={{ color: confirmPassword === password ? '#22c55e' : '#ef4444' }}>
                                            {confirmPassword === password ? '✓ Passwords match' : '✗ Passwords do not match'}
                                        </p>
                                    )}
                                </div>

                                <AnimatePresence>
                                    {error && (
                                        <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                            className="text-xs text-red-400 font-medium">⚠ {error}</motion.p>
                                    )}
                                </AnimatePresence>

                                <button type="submit" disabled={loading}
                                    className="w-full py-3.5 flex items-center justify-center gap-2 text-sm font-bold text-[#03060D] rounded-xl mt-2 transition-all hover:opacity-90 active:scale-[0.98]"
                                    style={{ background: 'linear-gradient(135deg, #00E5FF, #8B5CF6)', opacity: loading ? 0.7 : 1 }}>
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                                    ) : (
                                        <>Set New Password <ArrowRight className="w-4 h-4" /></>
                                    )}
                                </button>
                            </motion.form>
                        ) : (
                            <motion.div key="success"
                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-5 py-4">
                                <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                                    className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
                                    style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}>
                                    <CheckCircle2 className="w-9 h-9 text-neon-green" />
                                </motion.div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Password secured!</h3>
                                    <p className="text-sm text-slate-400">
                                        Your password has been updated. Taking you to your dashboard…
                                    </p>
                                </div>
                                <div className="flex justify-center">
                                    <div className="w-6 h-6"><Loader2 className="w-6 h-6 text-electric-cyan animate-spin" /></div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default ResetPassword;

