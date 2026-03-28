import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import { useAppMode } from '../../context/AppModeContext';
import { useAuth } from '../../context/AuthContext';
import BackgroundTheme from '../../components/common/BackgroundTheme';
import {
  Crown, Zap, Shield, Sparkles, Star, Check, ArrowRight,
  Infinity, Rocket, Globe, Brain, Lock, Gem,
  MessageSquare, Cpu, ImageIcon, Code, ChevronRight
} from 'lucide-react';

/* ─── Floating Premium Orbs ─── */
const PremiumOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[-15%] left-[20%] w-[600px] h-[600px] rounded-full animate-particle-1"
      style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)', filter: 'blur(100px)' }} />
    <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full animate-particle-2"
      style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.1), transparent 70%)', filter: 'blur(80px)' }} />
    <div className="absolute top-[30%] right-[15%] w-[350px] h-[350px] rounded-full animate-particle-3"
      style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.08), transparent 70%)', filter: 'blur(60px)' }} />
    <div className="absolute top-[60%] left-[-5%] w-[400px] h-[400px] rounded-full animate-orb"
      style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.06), transparent 70%)', filter: 'blur(80px)' }} />
  </div>
);

/* ─── Feature Item ─── */
const FeatureItem = ({ icon: Icon, title, description, hex, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, type: 'spring', stiffness: 180, damping: 20 }}
    className="glass-premium-strong rounded-2xl p-5 group gradient-border-animated noise-overlay cursor-default"
  >
    <div className="relative z-10">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
        style={{ background: `${hex}12`, border: `1px solid ${hex}25`, boxShadow: `0 4px 16px ${hex}10` }}>
        <Icon className="w-5 h-5" style={{ color: hex }} />
      </div>
      <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
      <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

/* ─── Pricing Card ─── */
const PricingCard = ({ plan, price, period, features, hex, popular, delay, onSelect }) => (
  <motion.div
    initial={{ opacity: 0, y: 24, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, type: 'spring', stiffness: 180, damping: 20 }}
    className={`relative rounded-3xl p-7 flex flex-col group overflow-hidden ${popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
    style={{
      background: popular ? 'rgba(139,92,246,0.08)' : 'rgba(10,17,32,0.7)',
      backdropFilter: 'blur(24px)',
      border: popular ? '1px solid rgba(139,92,246,0.3)' : '1px solid rgba(255,255,255,0.06)',
      boxShadow: popular ? '0 16px 64px rgba(139,92,246,0.15)' : 'none',
    }}
  >
    {/* Shimmer */}
    {popular && <div className="shimmer-effect absolute inset-0 rounded-3xl pointer-events-none" />}
    
    {/* Popular badge */}
    {popular && (
      <div className="absolute -top-px left-1/2 -translate-x-1/2">
        <div className="px-4 py-1 rounded-b-lg text-[10px] font-bold uppercase tracking-wider animate-badge-pulse"
          style={{ background: 'linear-gradient(135deg, #8B5CF6, #F472B6)', color: '#fff' }}>
          ✨ Most Popular
        </div>
      </div>
    )}

    <div className="relative z-10 flex flex-col flex-1">
      <h3 className="text-xl font-extrabold text-white mb-1">{plan}</h3>
      <div className="flex items-baseline gap-1 mb-1">
        <span className={`text-4xl font-extrabold ${popular ? 'text-gradient-premium' : 'text-white'}`}>{price}</span>
        {period && <span className="text-sm text-slate-500">/{period}</span>}
      </div>
      <p className="text-xs text-slate-500 mb-6">Billed {period === 'mo' ? 'monthly' : 'annually'}</p>

      <div className="space-y-3 flex-1 mb-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.05 * i }}
            className="flex items-start gap-2.5"
          >
            <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: `${hex}15`, border: `1px solid ${hex}25` }}>
              <Check className="w-2.5 h-2.5" style={{ color: hex }} />
            </div>
            <span className="text-xs text-slate-300 leading-relaxed">{f}</span>
          </motion.div>
        ))}
      </div>

      <button
        onClick={onSelect}
        className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${popular ? 'text-white hover:shadow-lg' : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'}`}
        style={popular ? {
          background: 'linear-gradient(135deg, #8B5CF6, #F472B6)',
          boxShadow: '0 8px 32px rgba(139,92,246,0.3)',
        } : {
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {popular ? 'Get Started Now' : 'Choose Plan'} <ArrowRight className="w-4 h-4 ml-1 inline" />
      </button>
    </div>
  </motion.div>
);

/* ─── Testimonial Card ─── */
const TestimonialCard = ({ name, role, quote, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass-premium rounded-2xl p-6 noise-overlay"
  >
    <div className="relative z-10">
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-sm text-slate-300 leading-relaxed mb-4 italic">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold"
          style={{ background: 'rgba(139,92,246,0.12)', color: '#8B5CF6' }}>
          {name[0]}
        </div>
        <div>
          <p className="text-sm font-bold text-white">{name}</p>
          <p className="text-[10px] text-slate-500">{role}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ─── MAIN PREMIUM PAGE ─── */
const Premium = () => {
  const { mode } = useAppMode();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const features = [
    { icon: Infinity, title: 'Unlimited AI Calls', description: 'No rate limits. Use GPT-4o, Claude, Gemini without restrictions.', hex: '#00E5FF' },
    { icon: Brain, title: 'Advanced AI Models', description: 'Access to latest frontier models including GPT-4 Turbo, Claude 3.5 Opus.', hex: '#8B5CF6' },
    { icon: Rocket, title: 'Priority Processing', description: 'Skip the queue with dedicated compute for blazing fast responses.', hex: '#F472B6' },
    { icon: Shield, title: 'Enterprise Security', description: 'End-to-end encryption, SOC2 compliance, and data isolation.', hex: '#22C55E' },
    { icon: Globe, title: 'Global CDN', description: 'Edge-optimized delivery for sub-50ms latency worldwide.', hex: '#FFD700' },
    { icon: Code, title: 'API Access', description: 'Full REST & WebSocket API with 99.9% uptime SLA.', hex: '#FB923C' },
  ];

  const plans = [
    {
      plan: 'Free',
      price: '$0',
      period: 'mo',
      hex: '#64748b',
      popular: false,
      features: [
        '100 AI calls/day',
        '2 apps included',
        'Basic models (GPT-3.5)',
        'Community support',
        'Local workspace storage',
      ],
    },
    {
      plan: 'Pro',
      price: billingCycle === 'monthly' ? '$19' : '$15',
      period: 'mo',
      hex: '#8B5CF6',
      popular: true,
      features: [
        'Unlimited AI calls',
        'All apps unlocked',
        'GPT-4o, Claude 3.5, Gemini Pro',
        'Priority processing queue',
        'Advanced analytics dashboard',
        'Email & chat support',
        'Custom integrations',
      ],
    },
    {
      plan: 'Enterprise',
      price: '$49',
      period: 'mo',
      hex: '#FFD700',
      popular: false,
      features: [
        'Everything in Pro',
        'Dedicated compute resources',
        'SOC2 & HIPAA compliance',
        'SSO & RBAC',
        'Custom model fine-tuning',
        'Dedicated account manager',
        '99.99% SLA guarantee',
      ],
    },
  ];

  const testimonials = [
    { name: 'Sarah Chen', role: 'CTO at TechFlow', quote: 'FuncLexa Pro transformed how our team builds with AI. The unlimited calls alone saved us thousands.' },
    { name: 'Marcus Rivera', role: 'Lead Developer', quote: 'Priority processing and advanced models make an incredible difference. Worth every penny.' },
    { name: 'Aisha Patel', role: 'AI Engineer', quote: 'The analytics dashboard and API access are game-changers for our production workloads.' },
  ];

  return (
    <div className="min-h-screen text-slate-300">
      <Sidebar />
      <main className="workspace-shell md:ml-64 pb-16">
        <BackgroundTheme variant="workspace" />
        <PremiumOrbs />

        <div className="workspace-container">

          {/* ───── HERO SECTION ───── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium mb-6 animate-badge-pulse"
              style={{ border: '1px solid rgba(139,92,246,0.3)' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Crown className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Premium Experience</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Unlock the Full Power of
              <br />
              <span className="text-gradient-premium">FuncLexa AI</span>
            </h1>

            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Supercharge your workflow with unlimited AI calls, advanced models,
              priority processing, and enterprise-grade security.
            </p>

            <div className="flex items-center justify-center gap-4 mb-2">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="btn-cyber text-base px-8 py-4 flex items-center gap-2"
              >
                <Rocket className="w-5 h-5" /> Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="btn-ghost text-base px-8 py-4 flex items-center gap-2"
              >
                Compare Plans <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* ───── FEATURES GRID ───── */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold text-white mb-2">
                Everything You Need to <span className="text-gradient-cyber">Build with AI</span>
              </h2>
              <p className="text-sm text-slate-500">Premium features designed for developers and teams</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <FeatureItem key={f.title} {...f} delay={0.25 + i * 0.06} />
              ))}
            </div>
          </motion.div>

          {/* ───── PRICING SECTION ───── */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold text-white mb-2">
                Simple, <span className="text-gradient-gold">Transparent</span> Pricing
              </h2>
              <p className="text-sm text-slate-500 mb-6">Choose the plan that fits your needs. Upgrade anytime.</p>

              {/* Billing toggle */}
              <div className="inline-flex items-center gap-1 p-1 rounded-xl glass-premium">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                  style={billingCycle === 'monthly' ? {
                    background: 'rgba(139,92,246,0.15)',
                    color: '#8B5CF6',
                    border: '1px solid rgba(139,92,246,0.25)',
                  } : { color: '#64748b' }}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className="px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
                  style={billingCycle === 'annual' ? {
                    background: 'rgba(139,92,246,0.15)',
                    color: '#8B5CF6',
                    border: '1px solid rgba(139,92,246,0.25)',
                  } : { color: '#64748b' }}
                >
                  Annual
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E' }}>
                    Save 20%
                  </span>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((p, i) => (
                <PricingCard key={p.plan} {...p} delay={0.35 + i * 0.08} onSelect={() => {}} />
              ))}
            </div>
          </motion.div>

          {/* ───── TESTIMONIALS ───── */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold text-white mb-2">
                Loved by <span className="text-gradient-premium">Developers</span>
              </h2>
              <p className="text-sm text-slate-500">Join thousands of teams building with FuncLexa</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <TestimonialCard key={t.name} {...t} delay={0.45 + i * 0.08} />
              ))}
            </div>
          </motion.div>

          {/* ───── FINAL CTA ───── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center rounded-3xl p-12 relative overflow-hidden mb-8"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(0,229,255,0.06), rgba(244,114,182,0.05))',
              border: '1px solid rgba(139,92,246,0.15)',
            }}
          >
            <div className="aurora-bg absolute inset-0 rounded-3xl pointer-events-none" />
            <div className="shimmer-effect absolute inset-0 rounded-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <motion.div
                animate={{ y: [-4, 4, -4], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block mb-4"
              >
                <Gem className="w-12 h-12 text-purple-400" style={{ filter: 'drop-shadow(0 0 12px rgba(139,92,246,0.5))' }} />
              </motion.div>
              <h2 className="text-3xl font-extrabold text-white mb-3">
                Ready to Go <span className="text-gradient-premium">Premium</span>?
              </h2>
              <p className="text-slate-400 mb-6 max-w-lg mx-auto">
                Start your 14-day free trial today. No credit card required. Cancel anytime.
              </p>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="btn-cyber text-base px-10 py-4 inline-flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" /> Start Free Trial
              </motion.button>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
};

export default Premium;
