import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppMode } from '../../context/AppModeContext';
import { useAuth } from '../../context/AuthContext';
import { Lock, Cloud, ArrowRight, Cpu, MessageSquare, Shield, Globe, Sparkles, LogIn, UserPlus } from 'lucide-react';

const floatingApps = [
  {
    label: 'LexaChat',
    icon: MessageSquare,
    className: 'top-[18%] left-[7%] md:left-[11%]',
    style: {
      background: 'rgba(8,16,30,0.72)',
      border: '1px solid rgba(0,229,255,0.16)',
      boxShadow: '0 0 24px rgba(0,229,255,0.08)',
      color: '#00E5FF',
    },
  },
  {
    label: 'Flexa AI Cloud',
    icon: Cloud,
    className: 'top-[18%] right-[7%] md:right-[11%]',
    style: {
      background: 'rgba(8,16,30,0.72)',
      border: '1px solid rgba(139,92,246,0.16)',
      boxShadow: '0 0 24px rgba(139,92,246,0.08)',
      color: '#8B5CF6',
    },
  },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const { setMode } = useAppMode();
  const { isAuthenticated } = useAuth();
  const headlineWords = ['Experience', 'the', 'Future', 'of', 'Conversation'];
  const superLabels = ['Shift AI', 'LexaChat', 'Flexa Cloud', 'Unified Core'];
  const premiumFloatPills = [
    { label: 'LexaChat', tone: 'cyan', className: 'hero-chip--one' },
    { label: 'Flexa Cloud', tone: 'purple', className: 'hero-chip--two' },
    { label: 'Agent Studio', tone: 'green', className: 'hero-chip--three' },
  ];

  return (
    <section id="home" className="landing-section relative min-h-screen flex items-center justify-center overflow-hidden pt-18 md:pt-20">
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-atmosphere__beam hero-atmosphere__beam--left" />
        <div className="hero-atmosphere__beam hero-atmosphere__beam--right" />
        <div className="hero-atmosphere__halo hero-atmosphere__halo--one" />
        <div className="hero-atmosphere__halo hero-atmosphere__halo--two" />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 58% 42% at 50% 4%, rgba(0,229,255,0.12) 0%, transparent 72%)',
        }}
      />

      <div className="hidden md:block absolute inset-0 pointer-events-none">
        {floatingApps.map(({ label, icon: Icon, className, style }) => (
          <div key={label} className={`absolute ${className}`}>
            <div className="flex items-center gap-2 rounded-2xl px-4 py-3 backdrop-blur-xl" style={style}>
              <Icon className="w-4 h-4" />
              <span className="text-xs font-semibold tracking-[0.12em] uppercase">{label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-premium-graphics" aria-hidden="true">
        <div className="hero-premium-ring hero-premium-ring--cyan" />
        <div className="hero-premium-ring hero-premium-ring--purple" />
        <div className="hero-premium-dots" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-18 -mt-6 md:-mt-8 text-center">
        <div
          className="landing-fade-up"
          style={{ animationDelay: '0.05s' }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-[rgba(8,16,30,0.7)] border border-[rgba(0,229,255,0.16)] text-electric-cyan backdrop-blur-xl"
          >
            <Cpu className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-widest uppercase">
              FuncLexa v2.0 - Unified AI Workspace
            </span>
            <Sparkles className="w-4 h-4 text-neon-purple" />
          </div>
        </div>

        <div
          className="landing-fade-up relative inline-flex flex-col items-center mb-6"
          style={{ animationDelay: '0.12s' }}
        >
          <div className="relative px-6 py-4 md:px-8 md:py-4 rounded-[24px] hero-wordmark-frame hero-wordmark-frame--landing">
            <span className="hero-superscript">
              {superLabels.map((label, index) => (
                <span key={label} className="hero-superscript__item">
                  {label}
                  {index < superLabels.length - 1 ? <span className="hero-superscript__dot" /> : null}
                </span>
              ))}
            </span>
            <span className="hero-wordmark-text text-gradient-cyber text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold leading-none tracking-tight">
              FuncLexa
            </span>
          </div>
          <span className="hero-sub-label mt-3">
            Unified Workspace
          </span>

          <div className="hidden md:flex items-center justify-center gap-3 mt-4 pointer-events-none">
            {premiumFloatPills.map((pill, index) => (
              <span
                key={pill.label}
                className={`hero-chip ${pill.className} hero-chip--${pill.tone}`}
                style={{ animationDelay: `${0.4 + index * 0.18}s` }}
              >
                {pill.label}
              </span>
            ))}
          </div>
        </div>

        <div className="landing-fade-up" style={{ animationDelay: '0.18s' }}>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-[1.02] mb-6 tracking-tight max-w-5xl mx-auto">
            {headlineWords.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className={`hero-word-reveal ${index === 2 ? 'hero-word-reveal--accent' : 'hero-word-reveal--bright'}`}
                style={{ animationDelay: `${0.22 + index * 0.08}s` }}
              >
                {word}
              </span>
            ))}
          </h1>
        </div>

        <div className="landing-fade-up" style={{ animationDelay: '0.24s' }}>
          <p className="text-base sm:text-lg md:text-xl text-[#9ca3af] mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed">
            Unleash the power of next-generation AI with <span className="text-electric-cyan font-semibold">local privacy</span> or{' '}
            <span className="text-neon-purple font-semibold">cloud sync</span>. A premium AI workspace designed to feel
            futuristic, clean, and unified.
          </p>
          <div className="mt-[-10px] mb-8">
            <button
              onClick={() => navigate('/portfolio')}
              className="text-sm text-slate-400 hover:text-cyan-300 transition-colors"
            >
              Built by the developer. View portfolio
            </button>
          </div>
        </div>

        <div
          className="landing-fade-up"
          style={{ animationDelay: '0.28s' }}
        >
          <div
          className="inline-flex flex-col sm:flex-row items-center gap-1 p-1.5 rounded-2xl border border-white/[0.06] mb-10 w-full max-w-[340px] sm:max-w-none sm:w-auto mx-auto bg-[rgba(8,16,30,0.72)] backdrop-blur-xl"
        >
          {[
            { icon: Lock, label: 'Local Mode', tag: 'Privacy First', active: true, hex: '#00E5FF' },
            { icon: Cloud, label: 'Account Mode', tag: 'SSO', active: false, hex: '#8B5CF6' },
          ].map(({ icon: Icon, label, tag, active, hex }) => (
            <div
              key={label}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl transition-opacity duration-300 ${active ? '' : 'opacity-40'}`}
              style={active ? {
                background: `${hex}12`,
                border: `1px solid ${hex}35`,
                color: hex,
              } : { color: '#94a3b8' }}
            >
              <Icon className="w-4 h-4" />
              <span className="font-semibold text-sm">{label}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${hex}20`, color: hex }}>
                {tag}
              </span>
            </div>
          ))}
          </div>
        </div>

        <div className="landing-fade-up" style={{ animationDelay: '0.32s' }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={() => {
                setMode('local');
                navigate('/dashboard');
              }}
              className="btn-cyber flex items-center gap-2 text-base"
            >
              <Lock className="w-5 h-5" />
              Try Local Mode
              <ArrowRight className="w-4 h-4" />
            </button>

            {isAuthenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base transition-all duration-300 hover:border-cyan-400/30"
                style={{
                  background: 'rgba(8,16,30,0.72)',
                  color: '#00E5FF',
                  border: '1px solid rgba(0,229,255,0.20)',
                  boxShadow: '0 0 40px rgba(0,229,255,0.10)'
                }}
              >
                <Cpu className="w-5 h-5" />
                Open FuncLexa
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/auth/login')}
                  className="btn-ghost flex items-center gap-2 text-base"
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </button>
                <button
                  onClick={() => navigate('/auth/signup')}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(139,92,246,0.18)',
                    color: '#e9ddff',
                    border: '1px solid rgba(139,92,246,0.40)',
                    boxShadow: '0 0 35px rgba(139,92,246,0.16)'
                  }}
                >
                  <UserPlus className="w-5 h-5" />
                  Signup
                </button>
              </>
            )}
          </div>
        </div>

        <div className="landing-fade-up" style={{ animationDelay: '0.36s' }}>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[#9ca3af]">
            {[
              { label: 'Enterprise Security', icon: Shield, color: '#22C55E' },
              { label: 'Global Infrastructure', icon: Globe, color: '#00E5FF' },
              { label: '99.9% Uptime', icon: Sparkles, color: '#8B5CF6' },
            ].map(({ label, icon: Icon, color }) => (
              <div key={label} className="flex items-center gap-2 text-sm">
                <Icon className="w-4 h-4" style={{ color }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
