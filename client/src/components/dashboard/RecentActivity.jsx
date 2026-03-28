import { motion } from 'framer-motion';
import { formatDateTime } from '../../utils/helpers';
import { Activity, Clock } from 'lucide-react';

const productColors = {
  core: '#00E5FF',
  analytics: '#8B5CF6',
  local: '#22C55E',
  dashboard: '#F472B6',
  default: '#64748b',
};

const RecentActivity = ({ activity = [] }) => (
  <section
    className="rounded-2xl p-5 flex flex-col"
    style={{
      background: 'rgba(13,21,38,0.6)',
      backdropFilter: 'blur(14px)',
      border: '1px solid rgba(255,255,255,0.05)',
    }}
  >
    <div className="flex items-center gap-2 mb-5">
      <Activity className="w-4 h-4 text-electric-cyan" />
      <h3 className="text-base font-bold text-white">Recent Activity</h3>
    </div>

    {activity.length === 0 ? (
      <div className="flex-1 flex flex-col items-center justify-center py-10 text-center">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <Activity className="w-5 h-5 text-slate-700" />
        </div>
        <p className="text-sm text-slate-600">No recent activity yet</p>
        <p className="text-xs text-slate-700 mt-1">Actions will appear here</p>
      </div>
    ) : (
      <ul className="space-y-2">
        {activity.map((item, i) => {
          const hex = productColors[item.product] || productColors.default;
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 p-3 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: hex, boxShadow: `0 0 6px ${hex}` }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-300">{item.action}</p>
                <p className="text-xs mt-0.5" style={{ color: `${hex}aa` }}>{item.product}</p>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-700 shrink-0">
                <Clock className="w-2.5 h-2.5" />
                {formatDateTime(item.timestamp)}
              </div>
            </motion.li>
          );
        })}
      </ul>
    )}
  </section>
);

export default RecentActivity;
