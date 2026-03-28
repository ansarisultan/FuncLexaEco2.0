import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, Github, Twitter, Linkedin, ArrowRight, Zap } from 'lucide-react';

const links = {
  Product: [{ label: 'Features', to: '/' }, { label: 'Pricing', to: '/pricing' }, { label: 'Apps', to: '/' }, { label: 'Changelog', to: '/' }],
  Developers: [{ label: 'Docs', to: '/' }, { label: 'API Reference', to: '/' }, { label: 'GitHub', to: '/' }, { label: 'Status', to: '/' }],
  Company: [{ label: 'About', to: '/' }, { label: 'Blog', to: '/' }, { label: 'Projects', to: '/projects' }, { label: 'Portfolio', to: '/portfolio' }],
};

const Footer = () => (
  <footer className="landing-section relative pt-16 md:pt-20 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden"
    style={{ background: 'rgba(3,6,13,0.98)', borderTop: '1px solid rgba(0,229,255,0.08)' }}>
    {/* Ambient glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

    <div className="max-w-7xl mx-auto relative">
      {/* CTA strip */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl p-10 md:p-14 mb-16 text-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(0,229,255,0.08), rgba(139,92,246,0.08))',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(0,229,255,0.15)',
        }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)' }} />
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 relative">
          Ready to <span className="text-gradient-cyber">ship smarter</span>?
        </h2>
        <p className="text-slate-400 text-lg mb-8 relative">Start for free. No credit card required.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
          <Link to="/auth/signup">
            <motion.button whileHover={{ scale: 1.05, y: -2 }} className="btn-cyber flex items-center gap-2">
              <Zap className="w-4 h-4" /> Get Started Free <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
          <Link to="/pricing">
            <motion.button whileHover={{ scale: 1.05, y: -2 }} className="btn-ghost flex items-center gap-2 text-sm">
              View Pricing
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #00E5FF22, #8B5CF622)', border: '1px solid rgba(0,229,255,0.25)' }}>
              <Cpu className="w-4 h-4 text-electric-cyan" />
            </div>
            <span className="text-white font-bold text-lg">FuncLexa</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-5">
            Unified AI workspace for modern teams. Local-first, cloud-ready.
          </p>
          <div className="flex gap-3">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(13,21,38,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Icon className="w-3.5 h-3.5 text-slate-500 hover:text-electric-cyan transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([group, items]) => (
          <div key={group}>
            <div className="text-xs text-slate-600 tracking-widest uppercase font-semibold mb-4">{group}</div>
            <ul className="space-y-2.5">
              {items.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-slate-500 hover:text-electric-cyan transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-slate-700">© {new Date().getFullYear()} FuncLexa. All rights reserved.</p>
        <div className="flex gap-4 text-xs text-slate-700">
          <a href="#" className="hover:text-slate-500 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-500 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-500 transition-colors">Security</a>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
          <span className="text-xs text-slate-700">All systems operational</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
