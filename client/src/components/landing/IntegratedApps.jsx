import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, ExternalLink, ArrowRight } from 'lucide-react';

const apps = [
  {
    emoji: '💬', name: 'LexaChat', hex: '#00E5FF',
    desc: 'Conversational AI with multi-model support and persistent memory.',
    tags: ['GPT-4o', 'Claude', 'Llama'],
  },
  {
    emoji: '🎤', name: 'Flexa Voice', hex: '#8B5CF6',
    desc: 'Real-time voice AI — transcription, synthesis, and voice agents.',
    tags: ['STT', 'TTS', 'Agents'],
  },
  {
    emoji: '🎨', name: 'AI Studio', hex: '#F472B6',
    desc: 'Generate, edit, and upscale images with state-of-the-art diffusion models.',
    tags: ['SDXL', 'DALL-E', 'ControlNet'],
  },
  {
    emoji: '💻', name: 'CodeLexa', hex: '#22C55E',
    desc: 'AI-powered code assistant with full IDE integration and PR reviews.',
    tags: ['Copilot', 'Explain', 'Debug'],
  },
  {
    emoji: '📄', name: 'DocLexa', hex: '#FB923C',
    desc: 'Summarise, chat with, and translate any document or PDF instantly.',
    tags: ['PDF', 'OCR', 'Q&A'],
  },
  {
    emoji: '🔍', name: 'SearchLexa', hex: '#00E5FF',
    desc: 'AI-enhanced semantic search across all your connected data sources.',
    tags: ['Semantic', 'RAG', 'Hybrid'],
  },
];

const AppCard = ({ emoji, name, hex, desc, tags, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group rounded-2xl p-6 cursor-pointer overflow-hidden transition-all duration-300"
      style={{
        background: hovered ? `${hex}0A` : 'rgba(13,21,38,0.6)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${hovered ? `${hex}30` : 'rgba(255,255,255,0.05)'}`,
        boxShadow: hovered ? `0 0 40px ${hex}14` : 'none',
        transform: hovered ? 'translateY(-5px) scale(1.01)' : 'none',
      }}
    >
      {/* Glow blob */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${hex}18, transparent 70%)`, opacity: hovered ? 1 : 0, filter: 'blur(20px)' }}
      />
      {/* Emoji badge */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300"
        style={{ background: `${hex}14`, border: `1px solid ${hex}28`, transform: hovered ? 'scale(1.1) rotate(-5deg)' : 'none' }}
      >
        {emoji}
      </div>
      <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
        {name}
        <ExternalLink
          className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: hex }}
        />
      </h3>
      <p className="text-xs text-slate-500 mb-4 leading-relaxed">{desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map(t => (
          <span key={t} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: `${hex}14`, color: hex, border: `1px solid ${hex}25` }}>
            {t}
          </span>
        ))}
      </div>
      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-all duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${hex}, transparent)`, opacity: hovered ? 1 : 0 }}
      />
    </motion.div>
  );
};

const IntegratedApps = () => (
  <section id="apps" className="landing-section py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <div className="absolute inset-0 cyber-grid opacity-25" />
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse 50% 30% at 50% 0%, rgba(0,229,255,0.08) 0%, transparent 70%)' }} />

    <div className="max-w-7xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="section-label mb-5 inline-flex"><Grid className="w-3 h-3" /> Apps</span>
        <h2 className="text-4xl md:text-6xl font-extrabold text-white mt-4 mb-4">
          Every AI Tool, <span className="text-gradient-cyber">One Hub</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          A growing ecosystem of specialised AI apps, all running under your unified FuncLexa dashboard.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {apps.map((app, i) => <AppCard key={i} {...app} index={i} />)}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <button className="btn-ghost inline-flex items-center gap-2 text-sm">
          View All Apps <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  </section>
);

export default IntegratedApps;
