import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useAppMode } from '../../context/AppModeContext';
import BackgroundTheme from '../../components/common/BackgroundTheme';
import {
    Cpu, Mail, Lock, User, ArrowRight, Loader2,
    CheckCircle2, RefreshCw, Eye, EyeOff, ShieldCheck
} from 'lucide-react';

/* ── Password strength meter ── */
const calcStrength = (pw) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score; // 0-4
};
const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthColor = ['', '#ef4444', '#f59e0b', '#22c55e', '#00e5ff'];

const PasswordStrength = ({ password }) => {
    const score = calcStrength(password);
    if (!password) return null;
    return (
        <div className="mt-2 space-y-1">
            <div className="flex gap-1">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
                        style={{ background: i <= score ? strengthColor[score] : 'rgba(255,255,255,0.06)' }} />
                ))}
            </div>
            <p className="text-[11px] font-medium pl-0.5" style={{ color: strengthColor[score] }}>
                {strengthLabel[score]}
            </p>
        </div>
    );
};

/* ── Step indicator ── */
const StepDots = ({ current, total }) => (
    <div className="flex items-center gap-2 justify-center mb-8">
        {Array.from({ length: total }, (_, i) => (
            <div key={i} className="transition-all duration-400"
                style={{
                    width: i + 1 === current ? 24 : 8,
                    height: 8,
                    borderRadius: 999,
                    background: i + 1 <= current
                        ? (i + 1 === current ? 'linear-gradient(90deg, #00E5FF, #8B5CF6)' : '#3b4a6b')
                        : 'rgba(255,255,255,0.06)'
                }} />
        ))}
    </div>
);

const Signup = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

    const { signupFuncLexa, verifyOtp, sendOtp } = useAuth();
    const { setMode } = useAppMode();
    const navigate = useNavigate();
    const otpRefs = useRef([]);

    useEffect(() => {
        if (resendCooldown <= 0) return;
        const t = setTimeout(() => setResendCooldown(c => c - 1), 1000);
        return () => clearTimeout(t);
    }, [resendCooldown]);

    const update = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

    const handleOtpChange = (i, val) => {
        const v = val.replace(/\D/g, '').slice(-1);
        const next = [...otp];
        next[i] = v;
        setOtp(next);
        if (v && i < 5) otpRefs.current[i + 1]?.focus();
    };

    const handleOtpKeyDown = (i, e) => {
        if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
    };

    const handleOtpPaste = (e) => {
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (pasted.length === 6) {
            setOtp(pasted.split(''));
            otpRefs.current[5]?.focus();
        }
        e.preventDefault();
    };

    const handleStep1 = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await sendOtp(formData.name, formData.email);
            setResendCooldown(60);
            setStep(2);
        } catch (err) {
            setError(err.message || 'Failed to send OTP.');
        } finally { setLoading(false); }
    };

    const handleResendOtp = async () => {
        if (resendCooldown > 0) return;
        setError('');
        setLoading(true);
        try {
            await sendOtp(formData.name, formData.email);
            setResendCooldown(60);
            setOtp(['', '', '', '', '', '']);
            otpRefs.current[0]?.focus();
        } catch (err) {
            setError(err.message || 'Failed to resend OTP.');
        } finally { setLoading(false); }
    };

    const handleStep2 = async (e) => {
        e.preventDefault();
        const otpStr = otp.join('');
        if (otpStr.length !== 6) { setError('Please enter all 6 digits.'); return; }
        setError('');
        setLoading(true);
        try {
            await verifyOtp(formData.email, otpStr);
            setStep(3);
        } catch (err) {
            setError(err.message || 'Invalid code.');
        } finally { setLoading(false); }
    };

    const handleStep3 = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) { setError('Passwords do not match.'); return; }
        if (formData.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
        setError('');
        setLoading(true);
        try {
            await signupFuncLexa(formData.name, formData.email, formData.password);
            setMode('account');
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Failed to create account.');
        } finally { setLoading(false); }
    };

    const panelStyle = {
        background: 'rgba(10,17,32,0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.06)',
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden" style={{ background: '#03060D' }}>
            <BackgroundTheme variant="workspace" />

            <div className="relative z-10 w-full max-w-md">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center mb-8 text-center">
                    <Link to="/" className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 hover:scale-110 transition-transform"
                        style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(139,92,246,0.15))', border: '1px solid rgba(139,92,246,0.3)' }}>
                        <Cpu className="w-6 h-6 text-neon-purple" />
                    </Link>
                    <h1 className="text-2xl font-extrabold text-white tracking-tight mb-1">Create your account</h1>
                    <p className="text-slate-500 text-sm">Join FuncLexa and unify your workspace</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.08 }}
                    className="rounded-3xl p-6 sm:p-8" style={panelStyle}>

                    <StepDots current={step} total={3} />

                    <AnimatePresence mode="wait">
                        {/* ── Step 1: Info ── */}
                        {step === 1 && (
                            <motion.form key="s1" onSubmit={handleStep1}
                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                                className="space-y-4">
                                <div className="text-center mb-6">
                                    <h2 className="text-lg font-bold text-white">Your details</h2>
                                    <p className="text-xs text-slate-500 mt-1">We'll send a verification code to your email</p>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wide">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                        <input type="text" name="name" required value={formData.name} onChange={update}
                                            placeholder="John Doe"
                                            className="w-full rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-700 focus:outline-none transition-all font-medium"
                                            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
                                            onFocus={e => e.target.style.border = '1px solid rgba(139,92,246,0.4)'}
                                            onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.08)'} />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wide">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                        <input type="email" name="email" required value={formData.email} onChange={update}
                                            placeholder="you@example.com"
                                            className="w-full rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-700 focus:outline-none transition-all font-medium"
                                            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
                                            onFocus={e => e.target.style.border = '1px solid rgba(139,92,246,0.4)'}
                                            onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.08)'} />
                                    </div>
                                </div>

                                {error && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="text-xs text-red-400 font-medium">⚠ {error}</motion.p>
                                )}

                                <button type="submit" disabled={loading}
                                    className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-[#03060D] mt-2 transition-all hover:opacity-90 active:scale-[0.98]"
                                    style={{ background: 'linear-gradient(135deg, #8B5CF6, #00E5FF)', opacity: loading ? 0.7 : 1 }}>
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <>Continue <ArrowRight className="w-4 h-4" /></>}
                                </button>
                            </motion.form>
                        )}

                        {/* ── Step 2: OTP ── */}
                        {step === 2 && (
                            <motion.form key="s2" onSubmit={handleStep2}
                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                                className="space-y-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4"
                                        style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)' }}>
                                        <Mail className="w-7 h-7 text-neon-purple" />
                                    </div>
                                    <h2 className="text-lg font-bold text-white">Check your inbox</h2>
                                    <p className="text-xs text-slate-500 mt-1">
                                        We sent a 6-digit code to{' '}
                                        <span className="text-slate-300 font-medium">{formData.email}</span>
                                    </p>
                                </div>

                                {/* OTP digit inputs */}
                                <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
                                    {otp.map((digit, i) => (
                                        <input
                                            key={i}
                                            ref={el => otpRefs.current[i] = el}
                                            type="text" inputMode="numeric" maxLength={1}
                                            value={digit}
                                            onChange={e => handleOtpChange(i, e.target.value)}
                                            onKeyDown={e => handleOtpKeyDown(i, e)}
                                            className="w-11 h-14 text-center text-xl font-bold text-white rounded-xl focus:outline-none transition-all font-mono"
                                            style={{
                                                background: 'rgba(0,0,0,0.5)',
                                                border: digit ? '1px solid rgba(139,92,246,0.5)' : '1px solid rgba(255,255,255,0.08)',
                                                boxShadow: digit ? '0 0 12px rgba(139,92,246,0.15)' : 'none'
                                            }}
                                            onFocus={e => e.target.style.border = '1px solid rgba(139,92,246,0.5)'}
                                            onBlur={e => e.target.style.border = digit ? '1px solid rgba(139,92,246,0.5)' : '1px solid rgba(255,255,255,0.08)'}
                                        />
                                    ))}
                                </div>

                                {error && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="text-xs text-red-400 font-medium text-center">⚠ {error}</motion.p>
                                )}

                                <button type="submit" disabled={loading || otp.join('').length !== 6}
                                    className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-[#03060D] transition-all hover:opacity-90 active:scale-[0.98]"
                                    style={{ background: 'linear-gradient(135deg, #8B5CF6, #00E5FF)', opacity: (loading || otp.join('').length !== 6) ? 0.5 : 1 }}>
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <>Verify Code <ShieldCheck className="w-4 h-4" /></>}
                                </button>

                                <div className="flex items-center justify-between text-xs">
                                    <button type="button" onClick={() => { setStep(1); setError(''); }}
                                        className="text-slate-500 hover:text-white transition-colors">← Change email</button>
                                    <button type="button" onClick={handleResendOtp}
                                        disabled={resendCooldown > 0 || loading}
                                        className="flex items-center gap-1 text-slate-500 hover:text-neon-purple transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                                        <RefreshCw className="w-3 h-3" />
                                        {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend code'}
                                    </button>
                                </div>
                            </motion.form>
                        )}

                        {/* ── Step 3: Password ── */}
                        {step === 3 && (
                            <motion.form key="s3" onSubmit={handleStep3}
                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                                className="space-y-4">
                                <div className="flex items-center gap-2 p-3 rounded-xl mb-2"
                                    style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}>
                                    <CheckCircle2 className="w-4 h-4 text-neon-green shrink-0" />
                                    <span className="text-xs font-semibold text-neon-green">Email verified — {formData.email}</span>
                                </div>

                                <div className="text-center mb-4">
                                    <h2 className="text-lg font-bold text-white">Create your password</h2>
                                    <p className="text-xs text-slate-500 mt-1">Make it strong and memorable</p>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wide">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                        <input type={showPassword ? 'text' : 'password'} name="password" required
                                            value={formData.password} onChange={update} placeholder="Min. 8 characters"
                                            className="w-full rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-slate-700 focus:outline-none transition-all font-medium"
                                            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
                                            onFocus={e => e.target.style.border = '1px solid rgba(139,92,246,0.4)'}
                                            onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.08)'} />
                                        <button type="button" onClick={() => setShowPassword(s => !s)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors">
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <PasswordStrength password={formData.password} />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wide">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                        <input type={showConfirm ? 'text' : 'password'} name="confirmPassword" required
                                            value={formData.confirmPassword} onChange={update} placeholder="••••••••"
                                            className="w-full rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-slate-700 focus:outline-none transition-all font-medium"
                                            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
                                            onFocus={e => e.target.style.border = '1px solid rgba(139,92,246,0.4)'}
                                            onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.08)'} />
                                        <button type="button" onClick={() => setShowConfirm(s => !s)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors">
                                            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {error && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="text-xs text-red-400 font-medium">⚠ {error}</motion.p>
                                )}

                                <button type="submit" disabled={loading}
                                    className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-[#03060D] mt-2 transition-all hover:opacity-90 active:scale-[0.98]"
                                    style={{ background: 'linear-gradient(135deg, #00E5FF, #8B5CF6)', opacity: loading ? 0.7 : 1 }}>
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : <>Create Account ✦</>}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>

                <p className="text-center text-sm text-slate-600 mt-6">
                    Already have an account?{' '}
                    <Link to="/auth/login" className="text-electric-cyan font-semibold hover:text-white transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;

