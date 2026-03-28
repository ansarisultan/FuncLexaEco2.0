import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Cloud, ArrowLeftRight, Check } from 'lucide-react';

const modes = [
  {
    id: 'local', icon: Lock, hex: '#22C55E', label: 'Local Mode',
    tagline: 'Privacy-First AI. On Your Machine.',
    desc: 'All AI computation happens on your local hardware. No data leaves your device. Perfect for sensitive workloads or air-gapped environments.',
    features: [
      'Zero cloud dependency',
      'Offline capability',
      'Local LLM models',
      'No API keys needed',
      'Full data sovereignty',
    ],
    preview: ['◉ LexaChat — local', '◉ Image Gen — local', '◉ Code Assistant — local'],
  },
  {
    id: 'account', icon: Cloud, hex: '#8B5CF6', label: 'Account Mode',
    tagline: 'Cloud-Powered AI. Anywhere.',
    desc: 'Sync your AI workspace across all devices with a single SSO login. Enterprise-grade access control and team collaboration built-in.',
    features: [
      'SSO / OAuth2 login',
      'Multi-device sync',
      'Team workspaces',
      'Cloud model access',
      'Enterprise controls',
    ],
    preview: ['◎ LexaChat — cloud', '◎ Image Gen — cloud', '◎ Code Assistant — cloud'],
  },
];

const ModeShowcase = () => {
  const [active, setActive] = useState('local');
  const mode = modes.find(m => m.id === active);

  return (
    <section className="landing-section py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 40% at 50% 100%, ${mode.hex}10 0%, transparent 70%)`, transition: 'background 0.8s ease' }} />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-label mb-5 inline-flex">
            <ArrowLeftRight className="w-3 h-3" /> Dual Mode
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mt-4 mb-4">
            Two Modes, <span className="text-gradient-cyber">One Platform</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Switch between privacy-first local and cloud-powered team mode with a single click.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex p-1.5 rounded-2xl"
            style={{ background: 'rgba(13,21,38,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {modes.map(m => {
              const Icon = m.icon;
              const isActive = active === m.id;
              return (
                <motion.button
                  key={m.id}
                  onClick={() => setActive(m.id)}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2.5 px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer"
                  style={isActive ? {
                    background: `${m.hex}15`,
                    border: `1px solid ${m.hex}40`,
                    color: m.hex,
                    boxShadow: `0 0 20px ${m.hex}20`,
                  } : { color: '#64748b', border: '1px solid transparent' }}
                >
                  <Icon className="w-4 h-4" />
                  {m.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Left info */}
            <div className="rounded-3xl p-8 relative overflow-hidden"
              style={{
                background: 'rgba(13,21,38,0.7)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${mode.hex}20`,
              }}>
              <div className="absolute top-0 left-0 w-60 h-60 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${mode.hex}14, transparent 70%)`, filter: 'blur(40px)' }} />

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: `${mode.hex}18`, border: `1px solid ${mode.hex}35` }}>
                <mode.icon className="w-6 h-6" style={{ color: mode.hex }} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{mode.tagline}</h3>
              <p className="text-slate-400 leading-relaxed mb-8">{mode.desc}</p>
              <ul className="space-y-3.5">
                {mode.features.map((f, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <Check className="w-4 h-4 shrink-0" style={{ color: mode.hex }} />
                    {f}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right: mock terminal/preview */}
            <div className="rounded-3xl overflow-hidden relative"
              style={{
                background: 'rgba(3,6,13,0.9)',
                backdropFilter: 'blur(16px)',
                border: `1px solid ${mode.hex}18`,
              }}>
              {/* Terminal header bar */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b"
                style={{ borderColor: `${mode.hex}18`, background: 'rgba(13,21,38,0.8)' }}>
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-[11px] text-slate-500 font-mono">funclexa — {mode.label.toLowerCase()}</span>
              </div>
              {/* Terminal body */}
              <div className="p-6 font-mono text-sm space-y-3 min-h-[280px]">
                <div className="text-slate-500">$ funclexa start --mode {mode.id}</div>
                {mode.preview.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.12 }}
                    style={{ color: mode.hex }}
                  >
                    {line}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-slate-400"
                >
                  ✓ {mode.label} active. All apps ready.
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ delay: 1, duration: 1, repeat: Infinity }}
                  className="text-slate-600"
                >
                  █
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ModeShowcase;
