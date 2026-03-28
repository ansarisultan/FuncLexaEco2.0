import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen', role: 'CTO @ Nexus AI', avatar: 'SC', hex: '#00E5FF',
    rating: 5,
    quote: 'FuncLexa completely replaced our patchwork of AI tools. Everything under one roof, with zero compromise on security. The local mode is a game-changer for our compliance team.',
  },
  {
    name: 'Marcus Rivera', role: 'Lead Engineer @ DeepStack', avatar: 'MR', hex: '#8B5CF6',
    rating: 5,
    quote: 'The reverse proxy setup took 10 minutes. We went from a hacky nginx config to a production-grade proxy with mTLS and Prometheus metrics out of the box. Incredible.',
  },
  {
    name: 'Priya Mehta', role: 'AI Product Lead @ Orbit', avatar: 'PM', hex: '#22C55E',
    rating: 5,
    quote: 'Our team switched from 6 different AI tools to just FuncLexa. Productivity is up 40%, API costs dropped 60% thanks to smart routing. Best SaaS investment this year.',
  },
  {
    name: 'Jordan Kim', role: 'Founder @ DataFlow', avatar: 'JK', hex: '#F472B6',
    rating: 5,
    quote: 'The SSO integration was seamless. We had 200 engineers onboarded in an afternoon. The audit logs alone saved us weeks of compliance work during our SOC 2 audit.',
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  const prev = () => setIndex(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex(i => (i + 1) % testimonials.length);

  return (
    <section className="landing-section py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 40% at 50% 50%, ${t.hex}08 0%, transparent 70%)`, transition: 'background 0.8s ease' }} />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label mb-5 inline-flex"><Star className="w-3 h-3" /> Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-4">
            Teams <span className="text-gradient-cyber">Love FuncLexa</span>
          </h2>
        </motion.div>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-3xl p-10 mb-8"
            style={{
              background: 'rgba(13,21,38,0.7)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${t.hex}20`,
              boxShadow: `0 0 60px ${t.hex}0A`,
            }}
          >
            {/* Quote icon */}
            <Quote className="w-10 h-10 mb-6 opacity-20" style={{ color: t.hex }} />
            <p className="text-xl text-slate-300 leading-relaxed mb-8 italic">"{t.quote}"</p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm"
                style={{ background: `${t.hex}20`, border: `2px solid ${t.hex}40`, color: t.hex }}
              >
                {t.avatar}
              </div>
              <div>
                <div className="text-white font-semibold">{t.name}</div>
                <div className="text-xs text-slate-500">{t.role}</div>
              </div>
              <div className="ml-auto flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" style={{ color: t.hex }} />
                ))}
              </div>
            </div>

            {/* Top accent line */}
            <div className="absolute top-0 left-8 right-8 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${t.hex}40, transparent)` }} />
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          <button onClick={prev}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
            style={{ background: 'rgba(13,21,38,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <ChevronLeft className="w-5 h-5 text-slate-400" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="transition-all duration-300 rounded-full cursor-pointer"
                style={{
                  width: i === index ? 24 : 8, height: 8,
                  background: i === index ? t.hex : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>
          <button onClick={next}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
            style={{ background: 'rgba(13,21,38,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
