import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Cloud } from 'lucide-react';

const AppCard = ({ app, index = 0 }) => {
  const launchEnabled = app.status !== 'coming-soon';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="relative flex flex-col p-6 rounded-3xl transition-all duration-300 group overflow-hidden cursor-pointer"
      style={{
        background: 'rgba(13,21,38,0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${app.hex}40`;
        e.currentTarget.style.boxShadow = `0 12px 40px ${app.hex}15`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Dynamic Glow */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle, ${app.hex}15, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />

      <div className="flex items-start justify-between mb-5 relative z-10">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
          style={{ background: `${app.hex}15`, border: `1px solid ${app.hex}30` }}
        >
          {app.emoji}
        </div>
        <div className="flex flex-col items-end gap-2">
          {app.status === 'active' && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan uppercase tracking-wider">
              Active
            </span>
          )}
          {app.status === 'beta' && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple uppercase tracking-wider">
              Beta
            </span>
          )}
          {app.status === 'coming-soon' && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 uppercase tracking-wider">
              Soon
            </span>
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 relative z-10">{app.name}</h3>
      <p className="text-sm text-slate-400 leading-relaxed min-h-[40px] mb-5 relative z-10">
        {app.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6 relative z-10">
        {app.tags?.map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2 py-1 rounded-md font-medium"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              color: '#94a3b8',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer / Launch Button */}
      <div className="mt-auto pt-4 flex items-center justify-between border-t border-[rgba(255,255,255,0.06)] relative z-10">
        <div className="flex items-center gap-1.5 opacity-60">
          {app.modes.includes('local') && <Lock className="w-3.5 h-3.5 text-neon-green" title="Local Supported" />}
          {app.modes.includes('account') && <Cloud className="w-3.5 h-3.5 text-electric-cyan" title="Cloud Supported" />}
        </div>

        {launchEnabled ? (
          <Link
            to={app.path}
            className="flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
            style={{ color: app.hex }}
          >
            Launch App
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <span className="text-xs font-semibold text-slate-600">In Development</span>
        )}
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100"
        style={{ background: `linear-gradient(90deg, transparent, ${app.hex}, transparent)` }}
      />
    </motion.article>
  );
};

export default AppCard;
