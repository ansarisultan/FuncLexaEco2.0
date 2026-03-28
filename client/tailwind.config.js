/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* NEBULA CORE / DEEP SPACE palette */
        'deep-space':    '#050B14',
        'dark-nebula':   '#0B1220',
        'void-card':     '#0F172A',
        'glass-card':    'rgba(15,23,42,0.7)',

        /* Light mode remnants — kept for auth/dashboard */
        base:    '#f6f2ea',
        surface: '#fff9ef',
        ink:     '#1f2a2e',
        muted:   '#5d6c72',
        brand: { DEFAULT: '#0f766e', dark: '#0b5d57', light: '#ccf5ee' },
        accent: { DEFAULT: '#b45309', soft: '#ffe8d2' },

        /* Neon accent palette */
        'electric-cyan':  '#00E5FF',
        'neon-purple':    '#8B5CF6',
        'neon-green':     '#22C55E',
        'neon-pink':      '#F472B6',
        'neon-orange':    '#FB923C',
        'primary-bg':     '#050B14',
        'card-bg':        '#0F172A',
      },
      backgroundImage: {
        'cyber-flow':    'linear-gradient(135deg, #00E5FF, #8B5CF6)',
        'neon-pulse':    'linear-gradient(135deg, #8B5CF6, #00E5FF)',
        'quantum-glow':  'linear-gradient(135deg, #00E5FF, #22C55E)',
        'hero-radial':   'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(139,92,246,0.35) 0%, transparent 70%)',
        'grid-pattern':  `
          linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)
        `,
      },
      boxShadow: {
        soft:          '0 10px 25px rgba(15,118,110,0.08)',
        subtle:        '0 10px 25px rgba(0,229,255,0.08)',
        'glow-cyan':   '0 0 40px rgba(0,229,255,0.4)',
        'glow-purple': '0 0 40px rgba(139,92,246,0.4)',
        'glow-green':  '0 0 40px rgba(34,197,94,0.4)',
        'card-glow':   '0 8px 32px rgba(0,229,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Segoe UI', 'sans-serif'],
      },
      animation: {
        float:         'float 6s ease-in-out infinite',
        'float-slow':  'float 9s ease-in-out infinite',
        'pulse-slow':  'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        grid:          'grid 20s linear infinite',
        shimmer:       'shimmer 2.5s linear infinite',
        'spin-slow':   'spin 12s linear infinite',
        'orb-drift':   'orbDrift 20s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-20px)' },
        },
        grid: {
          '0%':   { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(40px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        orbDrift: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(30px,-30px) scale(1.05)' },
          '66%':     { transform: 'translate(-20px,20px) scale(0.95)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
    },
  },
  plugins: [],
};
