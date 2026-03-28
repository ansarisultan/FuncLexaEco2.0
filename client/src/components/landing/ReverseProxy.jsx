import React from 'react';
import { motion } from 'framer-motion';
import { Server, Shield, Globe, Zap, Terminal, ArrowRight } from 'lucide-react';

const features = [
  { icon: Server, hex: '#00E5FF', title: 'Smart Routing', desc: 'Traffic is intelligently routed to the nearest healthy node with automatic failover and zero downtime.' },
  { icon: Shield, hex: '#8B5CF6', title: 'mTLS Security', desc: 'Mutual TLS authentication on every proxy hop. No unencrypted traffic ever leaves your perimeter.' },
  { icon: Globe, hex: '#22C55E', title: 'Global Edge', desc: 'Run your own edge nodes in any cloud or on-prem. FuncLexa orchestrates traffic across all of them.' },
  { icon: Zap, hex: '#F472B6', title: '<5ms Overhead', desc: 'Our proxy layer adds less than 5ms overhead thanks to kernel-bypass networking and eBPF acceleration.' },
];

const ReverseProxy = () => (
  <section id="how-it-works" className="landing-section py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <div className="absolute inset-0 dot-grid opacity-40" />
    <div className="absolute inset-y-0 right-0 w-1/2 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse 60% 50% at 90% 50%, rgba(0,229,255,0.06) 0%, transparent 70%)' }} />

    <div className="max-w-7xl mx-auto relative">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label mb-6 inline-flex"><Server className="w-3 h-3" /> Infrastructure</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-4 mb-5 leading-tight">
            Built-in <span className="text-gradient-cyber">Reverse Proxy</span><br />for every app
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            FuncLexa ships with a production-grade reverse proxy. Expose your AI apps to the internet securely,
            or keep them strictly internal — your call.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl p-5 transition-all duration-300 cursor-default"
                  style={{
                    background: 'rgba(13,21,38,0.6)',
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${f.hex}18`,
                  }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${f.hex}14`, border: `1px solid ${f.hex}28` }}>
                    <Icon className="w-4 h-4" style={{ color: f.hex }} />
                  </div>
                  <div className="text-sm font-bold text-white mb-1">{f.title}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{f.desc}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right: architecture diagram */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(3,6,13,0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,229,255,0.12)',
              boxShadow: '0 0 80px rgba(0,229,255,0.06)',
            }}
          >
            {/* Top bar */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[rgba(0,229,255,0.08)]"
              style={{ background: 'rgba(13,21,38,0.9)' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <Terminal className="w-3.5 h-3.5 text-slate-600 ml-3" />
              <span className="text-[11px] text-slate-600 font-mono">proxy.config.yml</span>
            </div>
            {/* Config preview */}
            <div className="p-6 font-mono text-xs space-y-2">
              {[
                { t: 'text-slate-600', v: '# FuncLexa Edge Proxy' },
                { t: 'text-electric-cyan', v: 'upstream:' },
                { t: 'text-slate-400', v: '  - name: lexachat' },
                { t: 'text-slate-500', v: '    host: 127.0.0.1:3001' },
                { t: 'text-slate-400', v: '  - name: aiStudio' },
                { t: 'text-slate-500', v: '    host: 127.0.0.1:3002' },
                { t: 'text-neon-purple', v: 'tls:' },
                { t: 'text-slate-400', v: '  enabled: true' },
                { t: 'text-slate-500', v: '  cert: /certs/funclexa.pem' },
                { t: 'text-neon-green', v: 'routing:' },
                { t: 'text-slate-400', v: '  strategy: least-connections' },
                { t: 'text-slate-500', v: '  retries: 3' },
                { t: 'text-electric-cyan', v: 'metrics:' },
                { t: 'text-slate-400', v: '  prometheus: true' },
              ].map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className={line.t}
                >
                  {line.v}
                </motion.div>
              ))}
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="text-electric-cyan"
              >█</motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ReverseProxy;
