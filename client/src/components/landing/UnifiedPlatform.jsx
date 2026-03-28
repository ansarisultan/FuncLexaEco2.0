import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Cpu, Shield, Zap, ArrowRight, CheckCircle } from 'lucide-react';

const pillars = [
  {
    icon: Layers, hex: '#00E5FF', title: 'One Dashboard',
    desc: 'All your AI applications in a single, unified control panel. Launch, manage, and monitor everything from one place.',
    items: ['Unified app launcher', 'Real-time monitoring', 'Central settings', 'Cross-app data sharing'],
  },
  {
    icon: Cpu, hex: '#8B5CF6', title: 'AI-Powered Core',
    desc: 'Built on top of the most capable AI models with a custom orchestration layer that routes tasks intelligently.',
    items: ['Multi-model routing', 'Automatic failover', 'Cost optimization', 'Usage analytics'],
  },
  {
    icon: Shield, hex: '#22C55E', title: 'Security First',
    desc: 'Enterprise-grade security with end-to-end encryption, local-only mode, and SSO integration.',
    items: ['E2E encryption', 'Zero-knowledge local mode', 'SSO / OAuth2', 'Audit logging'],
  },
  {
    icon: Zap, hex: '#F472B6', title: 'Blazing Performance',
    desc: 'Sub-100ms response times with edge-cached infrastructure and intelligent pre-fetching.',
    items: ['Edge CDN', 'WebSocket streaming', 'Smart caching', 'Concurrent sessions'],
  },
];

const UnifiedPlatform = () => {
  const [active, setActive] = useState(0);
  const p = pillars[active];

  return (
    <section id="features" className="landing-section py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label mb-5 inline-flex">
            <Layers className="w-3 h-3" /> Platform
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mt-4 mb-4">
            <span className="text-gradient-cyber">Unified</span> by Design
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Four architectural pillars that make FuncLexa the most complete AI workspace for modern teams.
          </p>
        </motion.div>

        {/* Interactive pillars */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: tab cards */}
          <div className="space-y-3">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              const isActive = active === i;
              return (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  whileHover={{ x: 4 }}
                  className="w-full text-left rounded-2xl p-5 transition-all duration-300 flex items-center gap-4 cursor-pointer"
                  style={{
                    background: isActive ? `${pillar.hex}0F` : 'rgba(13,21,38,0.5)',
                    border: `1px solid ${isActive ? `${pillar.hex}35` : 'rgba(255,255,255,0.05)'}`,
                    boxShadow: isActive ? `0 0 30px ${pillar.hex}12` : 'none',
                  }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${pillar.hex}18`, border: `1px solid ${pillar.hex}30` }}>
                    <Icon className="w-5 h-5" style={{ color: pillar.hex }} />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm mb-0.5">{pillar.title}</div>
                    <div className="text-xs text-slate-500 line-clamp-1">{pillar.desc.slice(0, 60)}…</div>
                  </div>
                  {isActive && (
                    <motion.div className="ml-auto" layoutId="active-arrow">
                      <ArrowRight className="w-4 h-4" style={{ color: pillar.hex }} />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Right: detail panel */}
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl p-8 relative overflow-hidden"
            style={{
              background: 'rgba(13,21,38,0.7)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${p.hex}20`,
              boxShadow: `0 0 60px ${p.hex}10`,
            }}
          >
            {/* Glow blob */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, ${p.hex}20, transparent 70%)`, filter: 'blur(30px)' }} />

            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: `${p.hex}15`, border: `1px solid ${p.hex}30` }}>
              <p.icon className="w-7 h-7" style={{ color: p.hex }} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{p.title}</h3>
            <p className="text-slate-400 mb-7 leading-relaxed">{p.desc}</p>
            <ul className="space-y-3">
              {p.items.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <CheckCircle className="w-4 h-4 shrink-0" style={{ color: p.hex }} />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UnifiedPlatform;
