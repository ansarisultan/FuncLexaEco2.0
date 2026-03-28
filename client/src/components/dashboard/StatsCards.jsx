import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Activity, Grid3X3, Zap, Lock, Cloud, TrendingUp } from 'lucide-react';

const AnimatedCount = ({ value }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    const target = Number(value) || 0;
    if (target === 0) { setCount(0); return; }
    const step = target / 40;
    let current = 0;
    const t = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(Math.round(current));
      if (current >= target) clearInterval(t);
    }, 20);
    return () => clearInterval(t);
  }, [inView, value]);

  return <span ref={ref}>{typeof value === 'number' ? count : value}</span>;
};

const StatCard = ({ label, value, icon: Icon, hex, suffix = '', index }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.07 }}
    whileHover={{ y: -4 }}
    className="relative rounded-2xl p-5 overflow-hidden cursor-default group transition-all duration-300"
    style={{
      background: 'rgba(13,21,38,0.6)',
      backdropFilter: 'blur(14px)',
      border: `1px solid ${hex}18`,
    }}
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{ background: `radial-gradient(circle at 0% 100%, ${hex}0C, transparent 70%)` }} />
    <div className="flex items-start justify-between mb-4">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${hex}12`, border: `1px solid ${hex}25` }}>
        <Icon className="w-4 h-4" style={{ color: hex }} />
      </div>
      <TrendingUp className="w-4 h-4 text-slate-700" />
    </div>
    <div className="text-2xl font-extrabold text-white mb-1">
      <AnimatedCount value={value} />{suffix}
    </div>
    <div className="text-xs text-slate-500 font-medium">{label}</div>
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-2/5 group-hover:w-3/4 transition-all duration-500"
      style={{ background: `linear-gradient(90deg, transparent, ${hex}, transparent)` }} />
  </motion.article>
);

const StatsCards = ({ mode, summary }) => {
  const cards = [
    { label: 'Current Mode', value: mode === 'account' ? 'Account' : 'Local', icon: mode === 'account' ? Cloud : Lock, hex: mode === 'account' ? '#00E5FF' : '#22C55E' },
    { label: 'Total Actions', value: summary?.totalActions ?? 0, icon: Activity, hex: '#8B5CF6', suffix: '' },
    { label: 'Active Apps', value: summary?.activeApps ?? 0, icon: Grid3X3, hex: '#00E5FF', suffix: '' },
    { label: 'Response Time', value: 48, icon: Zap, hex: '#22C55E', suffix: 'ms' },
    { label: 'Uptime', value: 99, icon: TrendingUp, hex: '#F472B6', suffix: '.9%' },
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card, i) => <StatCard key={card.label} {...card} index={i} />)}
    </section>
  );
};

export default StatsCards;
