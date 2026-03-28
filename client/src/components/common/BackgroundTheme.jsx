import React, { useEffect, useRef, useState } from 'react';

const StarCanvas = ({ density = 26 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawStaticStars = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < density; i += 1) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = Math.random() * 1.4 + 0.3;
        const a = Math.random() * 0.45 + 0.2;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(2)})`;
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    drawStaticStars();
    window.addEventListener('resize', drawStaticStars);

    return () => {
      window.removeEventListener('resize', drawStaticStars);
    };
  }, [density]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.38 }} />;
};

const BackgroundTheme = () => {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    const onResize = () => setIsLowEnd(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="theme-backdrop absolute inset-0 pointer-events-none" style={{ isolation: 'isolate', overflow: 'hidden' }}>
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #050B14 0%, #0B1220 55%, #050B14 100%)',
        }}
      />

      <div
        className="absolute"
        style={{
          top: '-16%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(320px, 48vw, 820px)',
          height: 'clamp(220px, 34vw, 560px)',
          background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.14), rgba(139,92,246,0.08), transparent 68%)',
          filter: 'blur(40px)',
          opacity: 0.72,
        }}
      />

      {!isLowEnd && <StarCanvas density={24} />}
    </div>
  );
};

export default BackgroundTheme;
