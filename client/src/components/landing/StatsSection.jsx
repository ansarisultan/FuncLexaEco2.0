import React from 'react';
import { Users, MessageSquare, Zap, Globe, Cpu, Database } from 'lucide-react';

const stats = [
  { value: 250000, suffix: '+', label: 'Active Users', icon: Users, hex: '#00E5FF' },
  { value: 10000000, suffix: '+', label: 'API Calls / Month', icon: MessageSquare, hex: '#8B5CF6' },
  { value: 50, suffix: 'ms', label: 'Avg Response Time', icon: Zap, hex: '#22C55E' },
  { value: 75, suffix: '+', label: 'Countries', icon: Globe, hex: '#F472B6' },
  { value: 20, suffix: '+', label: 'AI Models', icon: Cpu, hex: '#00E5FF' },
  { value: 50, suffix: 'M+', label: 'Data Points', icon: Database, hex: '#8B5CF6' },
];

const StatCard = ({ value, suffix, label, icon: Icon, hex, index }) => {
  return (
    <div
      className="landing-fade-up relative group cursor-default rounded-2xl p-6 text-center overflow-hidden"
      style={{
        animationDelay: `${index * 0.04}s`,
        background: 'rgba(13,21,38,0.6)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${hex}18`,
      }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 80%, ${hex}12, transparent 70%)` }}
      />
      {/* Icon ring */}
      <div
        className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
        style={{ background: `${hex}15`, border: `1px solid ${hex}30` }}
      >
        <Icon className="w-5 h-5" style={{ color: hex }} />
      </div>
      {/* Animated number */}
      <div className="text-3xl font-extrabold text-white mb-1">
        {value.toLocaleString()}{suffix}
      </div>
      <div className="text-xs text-slate-500 font-medium tracking-wide">{label}</div>
      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px transition-all duration-500 group-hover:w-3/4"
        style={{ width: '40%', background: `linear-gradient(90deg, transparent, ${hex}, transparent)` }}
      />
    </div>
  );
};

const StatsSection = () => (
  <section className="landing-section py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    {/* Faint divider lines */}
    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.15), transparent)' }} />
    <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.15), transparent)' }} />

    <div className="max-w-7xl mx-auto">
      <p className="landing-fade-up text-center text-xs text-slate-600 tracking-[0.25em] uppercase mb-8">
        Trusted by developers worldwide
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s, i) => <StatCard key={i} {...s} index={i} />)}
      </div>
    </div>
  </section>
);

export default StatsSection;
