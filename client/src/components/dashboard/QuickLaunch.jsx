import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

const QuickLaunch = ({ apps }) => (
  <section
    className="rounded-2xl p-5 flex flex-col"
    style={{
      background: 'rgba(13,21,38,0.6)',
      backdropFilter: 'blur(14px)',
      border: '1px solid rgba(255,255,255,0.05)',
    }}
  >
    <div className="flex items-center justify-between mb-5">
      <h3 className="text-base font-bold text-white">Quick Launch</h3>
      <Link
        to="/apps"
        className="text-xs font-semibold flex items-center gap-1 text-slate-500 hover:text-electric-cyan transition-colors"
      >
        View all <ArrowRight className="w-3 h-3" />
      </Link>
    </div>

    <div className="space-y-3">
      {apps.map((app, i) => (
        <motion.div
          key={app.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.07 }}
          whileHover={{ x: 4 }}
        >
          <Link
            to={app.status !== 'coming-soon' ? app.path : '#'}
            className="flex items-center gap-4 p-3.5 rounded-xl transition-all duration-300 group"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${app.hex}08`; e.currentTarget.style.borderColor = `${app.hex}25`; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'; }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
              style={{ background: `${app.hex}12`, border: `1px solid ${app.hex}25` }}
            >
              {app.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">{app.name}</p>
              <p className="text-xs text-slate-600 truncate">{app.description.slice(0, 50)}…</p>
            </div>
            {app.status !== 'coming-soon' ? (
              <ExternalLink className="w-3.5 h-3.5 text-slate-700 group-hover:text-electric-cyan transition-colors shrink-0" />
            ) : (
              <span className="text-[10px] text-slate-700 shrink-0">Soon</span>
            )}
          </Link>
        </motion.div>
      ))}
    </div>
  </section>
);

export default QuickLaunch;
