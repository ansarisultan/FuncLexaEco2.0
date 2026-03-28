import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, Loader2, CheckCircle2, AlertCircle, Cpu } from 'lucide-react';
import { forgotPasswordAction } from '../../services/authService';
import BackgroundTheme from '../../components/common/BackgroundTheme';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await forgotPasswordAction(email);
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Failed to send reset link.');
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
                        style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(139,92,246,0.15))', border: '1px solid rgba(0,229,255,0.25)' }}>
                        <Cpu className="w-6 h-6 text-electric-cyan" />
                    </Link>
                    <h1 className="text-2xl font-extrabold text-white tracking-tight mb-1">Forgot your password?</h1>
                    <p className="text-slate-500 text-sm">No worries — we'll email you a recovery link</p>
                </motion.div>

                {/* Card */}
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.08 }}
                    className="rounded-3xl p-6 sm:p-8"
                    style={{ background: 'rgba(10,17,32,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}>

                    <AnimatePresence mode="wait">
                        {!success ? (
                            <motion.form key="form" onSubmit={handleSubmit}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                                className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wide">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                        <input
                                            type="email" required
                                            value={email} onChange={e => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            className="w-full rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-700 focus:outline-none transition-all font-medium"
                                            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
                                            onFocus={e => e.target.style.border = '1px solid rgba(0,229,255,0.4)'}
                                            onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.08)'}
                                        />
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {error && (
                                        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                            className="flex items-center gap-2 p-3 rounded-xl text-xs"
                                            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)', color: '#f87171' }}>
                                            <AlertCircle className="w-4 h-4 shrink-0" />
                                            {error}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button type="submit" disabled={loading}
                                    className="w-full py-3.5 flex items-center justify-center gap-2 text-sm font-bold text-[#03060D] rounded-xl transition-all hover:opacity-90 active:scale-[0.98]"
                                    style={{ background: 'linear-gradient(135deg, #00E5FF, #8B5CF6)', opacity: loading ? 0.7 : 1 }}>
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                                    ) : (
                                        <>Send Recovery Link <ArrowRight className="w-4 h-4" /></>
                                    )}
                                </button>
                            </motion.form>
                        ) : (
                            <motion.div key="success"
                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-5 py-4">
                                <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                                    className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
                                    style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.25)' }}>
                                    <CheckCircle2 className="w-9 h-9 text-electric-cyan" />
                                </motion.div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Check your inbox</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        If an account exists for{' '}
                                        <span className="text-white font-medium">{email}</span>,
                                        we've sent a password reset link. Check your spam folder if you don't see it.
                                    </p>
                                </div>
                                <button onClick={() => { setSuccess(false); setEmail(''); }}
                                    className="text-xs text-slate-500 hover:text-white transition-colors">
                                    Try a different email
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <p className="text-center text-sm text-slate-600 mt-6">
                    Remember your password?{' '}
                    <Link to="/auth/login" className="text-electric-cyan font-semibold hover:text-white transition-colors">
                        Back to Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;

