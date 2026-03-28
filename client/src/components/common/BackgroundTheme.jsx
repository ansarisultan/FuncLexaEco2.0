import React, { useEffect, useRef, useMemo } from 'react';

/* ═══════════════════════════════════════════════════
   NEBULA CORE — Deep-Space Background Engine
   ═══════════════════════════════════════════════════
   Variants: "landing" (full-bleed) | "workspace" (toned-down)
   Pure CSS + SVG + Canvas star particles.
   All colours use CSS variables from index.css.
   ═════════════════════════════════════════════════ */

/* ─── Canvas Star Particle System ─── */
const StarCanvas = ({ density = 120, speed = 0.3, variant }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initStars();
    };

    const colors = [
      'rgba(255,255,255,',
      'rgba(0,229,255,',
      'rgba(139,92,246,',
      'rgba(34,197,94,',
      'rgba(244,114,182,',
    ];

    const initStars = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const count = variant === 'landing' ? density : Math.floor(density * 0.7);
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * speed * 0.3,
        driftY: (Math.random() - 0.5) * speed * 0.15 - speed * 0.05,
      }));
    };

    const draw = (time) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      starsRef.current.forEach((s) => {
        const twinkle = Math.sin(time * s.twinkleSpeed + s.twinklePhase) * 0.3 + 0.7;
        const a = s.alpha * twinkle;

        // Glow
        ctx.beginPath();
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
        grad.addColorStop(0, `${s.color}${(a * 0.3).toFixed(2)})`);
        grad.addColorStop(1, `${s.color}0)`);
        ctx.fillStyle = grad;
        ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.fillStyle = `${s.color}${a.toFixed(2)})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        // Drift
        s.x += s.driftX;
        s.y += s.driftY;
        if (s.x < -10) s.x = w + 10;
        if (s.x > w + 10) s.x = -10;
        if (s.y < -10) s.y = h + 10;
        if (s.y > h + 10) s.y = -10;
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    rafRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [density, speed, variant]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: variant === 'landing' ? 0.9 : 0.65, pointerEvents: 'none' }}
    />
  );
};

/* ─── Floating Nebula Orb ─── */
const NebulaOrb = ({ color, size, top, left, right, bottom, blur, animClass, opacity = 1 }) => (
  <div
    className={`absolute rounded-full pointer-events-none ${animClass}`}
    style={{
      top, left, right, bottom,
      width: size,
      height: size,
      background: `radial-gradient(circle, ${color}, transparent 70%)`,
      filter: `blur(${blur})`,
      opacity,
      willChange: 'transform',
    }}
  />
);

/* ─── Warp-Speed Lines (landing only) ─── */
const WarpLines = () => {
  const lines = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      delay: Math.random() * 8,
      duration: 4 + Math.random() * 6,
      height: `${40 + Math.random() * 120}px`,
      opacity: 0.06 + Math.random() * 0.1,
      color: i % 3 === 0 ? '#00E5FF' : i % 3 === 1 ? '#8B5CF6' : '#22C55E',
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: 0.5 }}>
      {lines.map((l) => (
        <div
          key={l.id}
          className="absolute"
          style={{
            left: l.left,
            top: '50%',
            width: '1px',
            height: l.height,
            background: `linear-gradient(to bottom, transparent, ${l.color}, transparent)`,
            opacity: l.opacity,
            animation: `warp-line ${l.duration}s ease-in-out ${l.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

/* ─── Horizontal Scan Line ─── */
const ScanLine = ({ speed = 6, color = '#00E5FF' }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: 0.12 }}>
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        height: '1px',
        background: `linear-gradient(90deg, transparent 5%, ${color}80 30%, ${color} 50%, ${color}80 70%, transparent 95%)`,
        boxShadow: `0 0 20px ${color}60, 0 0 60px ${color}20`,
        animation: `scan ${speed}s linear infinite`,
      }}
    />
  </div>
);

/* ─── Aurora Ribbon ─── */
const AuroraRibbon = ({ variant }) => (
  <div
    className="absolute inset-0 pointer-events-none aurora-bg"
    style={{
      opacity: variant === 'landing' ? 0.55 : 0.35,
      mixBlendMode: 'screen',
    }}
  />
);

/* ─── Hexagon Grid Pattern (SVG, very subtle) ─── */
const HexGrid = ({ opacity = 0.04 }) => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ opacity }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="hex-pattern" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(1)">
        <path
          d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
          fill="none"
          stroke="rgba(0,229,255,0.12)"
          strokeWidth="0.5"
        />
        <path
          d="M28 0L56 16L56 50L28 66L0 50L0 16Z"
          fill="none"
          stroke="rgba(139,92,246,0.06)"
          strokeWidth="0.3"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hex-pattern)" />
  </svg>
);

/* ─── Noise Film Grain ─── */
const NoiseOverlay = ({ opacity = 0.03 }) => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      opacity,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      mixBlendMode: 'overlay',
    }}
  />
);

/* ─── Radial Depth Layers ─── */
const DepthLayers = ({ variant }) => {
  const isLanding = variant === 'landing';
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top-left cyan nebula */}
      <div
        className="absolute"
        style={{
          top: '-10%',
          left: '-8%',
          width: isLanding ? 'clamp(400px, 50vw, 900px)' : 'clamp(300px, 40vw, 700px)',
          height: isLanding ? 'clamp(300px, 35vw, 600px)' : 'clamp(250px, 30vw, 500px)',
          background: `radial-gradient(ellipse at 40% 40%, rgba(0,229,255,${isLanding ? 0.16 : 0.10}), transparent 65%)`,
          animation: 'nebula-pan 18s ease-in-out infinite',
        }}
      />
      {/* Top-right purple nebula */}
      <div
        className="absolute"
        style={{
          top: '-14%',
          right: '-6%',
          width: isLanding ? 'clamp(400px, 48vw, 860px)' : 'clamp(300px, 38vw, 660px)',
          height: isLanding ? 'clamp(350px, 38vw, 650px)' : 'clamp(280px, 32vw, 560px)',
          background: `radial-gradient(ellipse at 60% 35%, rgba(139,92,246,${isLanding ? 0.18 : 0.12}), transparent 60%)`,
          animation: 'nebula-pan 22s ease-in-out 3s infinite',
        }}
      />
      {/* Bottom-center green nebula */}
      <div
        className="absolute"
        style={{
          bottom: '-12%',
          left: '20%',
          width: isLanding ? 'clamp(350px, 42vw, 780px)' : 'clamp(260px, 34vw, 580px)',
          height: isLanding ? 'clamp(280px, 30vw, 500px)' : 'clamp(220px, 26vw, 420px)',
          background: `radial-gradient(ellipse at 50% 70%, rgba(34,197,94,${isLanding ? 0.12 : 0.07}), transparent 65%)`,
          animation: 'nebula-pan 24s ease-in-out 6s infinite',
        }}
      />
      {/* Center diagonal aurora streak */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, 
            rgba(0,229,255,${isLanding ? 0.06 : 0.03}) 0%, 
            transparent 25%, 
            rgba(139,92,246,${isLanding ? 0.05 : 0.025}) 50%, 
            transparent 75%, 
            rgba(34,197,94,${isLanding ? 0.04 : 0.02}) 100%)`,
          animation: 'gradient-shift 16s ease-in-out infinite',
          opacity: 0.7,
        }}
      />
      {/* Pink accent bloom for premium feel */}
      <div
        className="absolute"
        style={{
          top: '35%',
          right: '10%',
          width: 'clamp(200px, 20vw, 400px)',
          height: 'clamp(200px, 20vw, 400px)',
          background: `radial-gradient(circle, rgba(244,114,182,${isLanding ? 0.08 : 0.04}), transparent 60%)`,
          animation: 'nebula-pan 20s ease-in-out 10s infinite',
        }}
      />
    </div>
  );
};

/* ─── Floating Energy Ring (decorative) ─── */
const EnergyRing = ({ size, top, left, color, delay = 0, duration = 20 }) => (
  <div
    className="absolute pointer-events-none"
    style={{
      top, left,
      width: size,
      height: size,
      border: `1px solid ${color}20`,
      borderRadius: '50%',
      animation: `spin-slow ${duration}s linear ${delay}s infinite`,
      boxShadow: `0 0 20px ${color}08, inset 0 0 20px ${color}05`,
    }}
  />
);

/* ─── Pulsating Core (center glow) ─── */
const PulsatingCore = ({ variant }) => (
  <div
    className="absolute pointer-events-none"
    style={{
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: variant === 'landing' ? 'clamp(400px, 40vw, 800px)' : 'clamp(300px, 30vw, 600px)',
      height: variant === 'landing' ? 'clamp(400px, 40vw, 800px)' : 'clamp(300px, 30vw, 600px)',
      background: `radial-gradient(circle, 
        rgba(0,229,255,${variant === 'landing' ? 0.04 : 0.02}) 0%, 
        rgba(139,92,246,${variant === 'landing' ? 0.03 : 0.015}) 30%, 
        transparent 70%)`,
      animation: 'pulse-glow 6s ease-in-out infinite',
      borderRadius: '50%',
    }}
  />
);

/* ═══════════════════════════════════════════════════
   MAIN EXPORT — <BackgroundTheme>
   ═══════════════════════════════════════════════════ */
const BackgroundTheme = ({ variant = 'workspace' }) => {
  const isLanding = variant === 'landing';

  return (
    <div
      className="theme-backdrop absolute inset-0 pointer-events-none"
      style={{ isolation: 'isolate', overflow: 'hidden' }}
    >
      {/* ═ Layer 0 — Solid deep-space gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            #050B14 0%, 
            #0B1220 35%, 
            #080E1A 65%, 
            #050B14 100%)`,
        }}
      />

      {/* ═ Layer 1 — Radial depth nebula clouds */}
      <DepthLayers variant={variant} />

      {/* ═ Layer 2 — Canvas star particles */}
      <StarCanvas
        density={isLanding ? 160 : 100}
        speed={isLanding ? 0.35 : 0.2}
        variant={variant}
      />

      {/* ═ Layer 3 — CSS star-field (fallback / extra density) */}
      <div className="star-field" style={{ opacity: isLanding ? 0.5 : 0.3 }} />

      {/* ═ Layer 4 — 3D perspective grid floor */}
      <div className="grid-3d-floor" style={{ opacity: isLanding ? 0.35 : 0.2 }} />

      {/* ═ Layer 5 — Cyber grid overlay */}
      <div className="absolute inset-0 cyber-grid" style={{ opacity: isLanding ? 0.07 : 0.04 }} />

      {/* ═ Layer 6 — Hex grid (adds sci-fi depth) */}
      <HexGrid opacity={isLanding ? 0.05 : 0.03} />

      {/* ═ Layer 7 — Floating nebula orbs */}
      <NebulaOrb
        color="rgba(0,229,255,0.18)"
        size={isLanding ? 'clamp(280px, 40vw, 650px)' : 'clamp(220px, 32vw, 500px)'}
        top="-12%"
        left="-6%"
        blur={isLanding ? '100px' : '80px'}
        animClass="animate-particle-1"
        opacity={isLanding ? 0.8 : 0.5}
      />
      <NebulaOrb
        color="rgba(139,92,246,0.2)"
        size={isLanding ? 'clamp(300px, 42vw, 700px)' : 'clamp(240px, 34vw, 550px)'}
        top="-16%"
        right="-4%"
        blur={isLanding ? '110px' : '90px'}
        animClass="animate-particle-2"
        opacity={isLanding ? 0.75 : 0.45}
      />
      <NebulaOrb
        color="rgba(34,197,94,0.14)"
        size={isLanding ? 'clamp(260px, 35vw, 580px)' : 'clamp(200px, 28vw, 440px)'}
        bottom="-14%"
        left="22%"
        blur={isLanding ? '100px' : '85px'}
        animClass="animate-particle-3"
        opacity={isLanding ? 0.7 : 0.4}
      />
      {/* Extra pink orb for premium atmosphere */}
      <NebulaOrb
        color="rgba(244,114,182,0.1)"
        size="clamp(160px, 18vw, 320px)"
        top="45%"
        right="8%"
        blur="70px"
        animClass="animate-orb"
        opacity={isLanding ? 0.6 : 0.3}
      />
      {/* Gold accent orb (subtle) */}
      <NebulaOrb
        color="rgba(255,215,0,0.06)"
        size="clamp(140px, 16vw, 280px)"
        bottom="20%"
        left="5%"
        blur="60px"
        animClass="animate-orb-delay"
        opacity={isLanding ? 0.5 : 0.25}
      />

      {/* ═ Layer 8 — Energy rings (decorative orbits) */}
      {isLanding && (
        <>
          <EnergyRing size="clamp(300px, 30vw, 600px)" top="10%" left="5%" color="#00E5FF" delay={0} duration={30} />
          <EnergyRing size="clamp(200px, 20vw, 400px)" top="40%" left="60%" color="#8B5CF6" delay={5} duration={25} />
          <EnergyRing size="clamp(180px, 16vw, 320px)" top="60%" left="15%" color="#22C55E" delay={10} duration={35} />
        </>
      )}

      {/* ═ Layer 9 — Aurora ribbon */}
      <AuroraRibbon variant={variant} />

      {/* ═ Layer 10 — Warp lines (landing only) */}
      {isLanding && <WarpLines />}

      {/* ═ Layer 11 — Scan line */}
      <ScanLine speed={isLanding ? 5 : 8} color={isLanding ? '#00E5FF' : '#8B5CF6'} />

      {/* ═ Layer 12 — Pulsating core */}
      <PulsatingCore variant={variant} />

      {/* ═ Layer 13 — Noise texture film grain */}
      <NoiseOverlay opacity={isLanding ? 0.035 : 0.025} />

      {/* ═ Layer 14 — Top vignette edge fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 75% 60% at 50% 50%, transparent 40%, rgba(5,11,20,${isLanding ? 0.5 : 0.6}) 100%)`,
        }}
      />

      {/* ═ Layer 15 — Bottom gradient fade (readability) */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '30%',
          background: 'linear-gradient(to top, rgba(5,11,20,0.6), transparent)',
        }}
      />
    </div>
  );
};

export default BackgroundTheme;