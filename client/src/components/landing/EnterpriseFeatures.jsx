import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, BarChart3, Lock, Key, Activity, Bell, GitBranch } from 'lucide-react';

const tiles = [
  { icon: ShieldCheck, hex: '#00E5FF', title: 'SOC 2 Type II', desc: 'Fully audited security controls with quarterly pen-tests and continuous compliance monitoring.' },
  { icon: Users, hex: '#8B5CF6', title: 'RBAC', desc: 'Fine-grained role-based access control. Grant exactly what each team member needs — nothing more.' },
  { icon: BarChart3, hex: '#22C55E', title: 'Usage Analytics', desc: 'Real-time dashboards for API usage, cost attribution, and performance across every team.' },
  { icon: Lock, hex: '#F472B6', title: 'Data Residency', desc: 'Choose where your data lives. EU, US, APAC, or fully on-prem — compliance your way.' },
  { icon: Key, hex: '#FB923C', title: 'API Key Mgmt', desc: 'Rotate, scope, and revoke API keys without downtime. Per-app, per-user granularity.' },
  { icon: Activity, hex: '#00E5FF', title: '99.99% SLA', desc: 'Enterprise SLA with credits for downtime. Active health checks every 10 seconds globally.' },
  { icon: Bell, hex: '#8B5CF6', title: 'Alerting', desc: 'Slack, email, PagerDuty — get notified the moment anything looks off. Zero noise, high signal.' },
  { icon: GitBranch, hex: '#22C55E', title: 'CI/CD Integration', desc: 'Native GitHub Actions, GitLab CI, and Terraform provider. Deploy AI infra like software.' },
];

const EnterpriseFeatures = () => (
  <section id="security" className="landing-section py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <div className="absolute inset-0 cyber-grid opacity-25" />
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 50%, rgba(139,92,246,0.07) 0%, transparent 70%)' }} />

    <div className="max-w-7xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="section-label mb-5 inline-flex"><ShieldCheck className="w-3 h-3" /> Enterprise</span>
        <h2 className="text-4xl md:text-6xl font-extrabold text-white mt-4 mb-4">
          Enterprise-<span className="text-gradient-purple">Grade</span> Security
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          The security, compliance, and management tools that large organisations need to ship AI with confidence.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map((t, i) => {
          const Icon = t.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="rounded-2xl p-5 cursor-default group transition-all duration-300 relative overflow-hidden"
              style={{
                background: 'rgba(13,21,38,0.6)',
                backdropFilter: 'blur(14px)',
                border: `1px solid ${t.hex}14`,
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(circle at 0% 100%, ${t.hex}0C, transparent 70%)` }} />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ background: `${t.hex}12`, border: `1px solid ${t.hex}25` }}>
                <Icon className="w-5 h-5" style={{ color: t.hex }} />
              </div>
              <div className="text-sm font-bold text-white mb-1.5">{t.title}</div>
              <div className="text-xs text-slate-500 leading-relaxed">{t.desc}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default EnterpriseFeatures;
