import React, { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';
import shieldArt from '../assets/captain-shield.png';

interface OpeningSequenceProps {
  onComplete: () => void;
}

export const OpeningSequence: React.FC<OpeningSequenceProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const onCompleteRef = useRef(onComplete);
  const finishTimerRef = useRef<number | null>(null);
  const skipRef = useRef<() => void>(() => undefined);
  onCompleteRef.current = onComplete;

  const skipIntro = () => {
    setIsLeaving(true);
    if (finishTimerRef.current !== null) window.clearTimeout(finishTimerRef.current);
    finishTimerRef.current = window.setTimeout(() => onCompleteRef.current(), 420);
  };
  skipRef.current = skipIntro;

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase(3);
      const fade = window.setTimeout(() => setIsLeaving(true), 450);
      finishTimerRef.current = window.setTimeout(() => onCompleteRef.current(), 850);
      return () => {
        window.clearTimeout(fade);
        if (finishTimerRef.current !== null) window.clearTimeout(finishTimerRef.current);
      };
    }

    const first = window.setTimeout(() => setPhase(1), 420);
    const energy = window.setTimeout(() => setPhase(2), 1550);
    const signal = window.setTimeout(() => setPhase(3), 2580);
    const exit = window.setTimeout(() => {
      setIsLeaving(true);
      finishTimerRef.current = window.setTimeout(() => onCompleteRef.current(), 500);
    }, 4150);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === ' ') skipRef.current();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(energy);
      window.clearTimeout(signal);
      window.clearTimeout(exit);
      if (finishTimerRef.current !== null) window.clearTimeout(finishTimerRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let frame = 0;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const particles = Array.from({ length: window.innerWidth < 640 ? 34 : 58 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 90 + Math.random() * Math.min(width, height) * 0.5;
      return {
        x: width / 2 + Math.cos(angle) * distance,
        y: height / 2 + Math.sin(angle) * distance,
        vx: 0,
        vy: 0,
        radius: 0.6 + Math.random() * 1.4,
        alpha: 0.16 + Math.random() * 0.32,
        color: Math.random() > 0.94 ? '#fff4f3' : Math.random() > 0.5 ? '#ff4b52' : '#d88791',
      };
    });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const particle of particles) {
        const dx = width / 2 - particle.x;
        const dy = height / 2 - particle.y;
        const distance = Math.max(1, Math.hypot(dx, dy));
        particle.vx += (dx / distance) * 0.009 - (dy / distance) * 0.007;
        particle.vy += (dy / distance) * 0.009 + (dx / distance) * 0.007;
        particle.vx *= 0.986;
        particle.vy *= 0.986;
        particle.x += particle.vx;
        particle.y += particle.vy;
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      frame = window.requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      className={`shield-intro fixed inset-0 z-[9995] flex flex-col items-center justify-center overflow-hidden bg-[#020403] select-none transition-opacity duration-500 ${isLeaving ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      aria-label="Cinematic shield introduction"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className={`shield-intro-aura ${phase >= 2 ? 'shield-intro-aura-active' : ''}`} aria-hidden="true" />
      <div className={`shield-intro-ring shield-intro-ring-one ${phase >= 2 ? 'shield-intro-ring-active' : ''}`} aria-hidden="true" />
      <div className={`shield-intro-ring shield-intro-ring-two ${phase >= 2 ? 'shield-intro-ring-active' : ''}`} aria-hidden="true" />

      <div className="shield-intro-composition relative z-10 min-h-[100svh] w-full text-center">
        <div className={`shield-intro-brand absolute left-1/2 top-[7%] z-30 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-full border border-emerald-400/30 bg-black/60 px-4 py-2 font-mono text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.2em] text-emerald-200 transition-all duration-700 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          GEEKSFORGEEKS × BENNETT UNIVERSITY
        </div>

        <div className={`shield-intro-object absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${phase >= 2 ? 'shield-intro-object-powered' : ''}`}>
          <div className="shield-intro-core-glow" aria-hidden="true" />
          <img src={shieldArt} alt="Metallic red, white, and blue superhero shield" className="shield-intro-image relative z-10 w-[min(96vw,640px)] aspect-square object-contain" />
          <div className={`shield-intro-flash ${phase >= 3 ? 'shield-intro-flash-active' : ''}`} aria-hidden="true" />
        </div>

        <h1 className={`shield-intro-title absolute left-1/2 top-1/2 z-20 w-full max-w-full -translate-x-1/2 -translate-y-1/2 px-3 font-display text-4xl sm:text-6xl md:text-7xl font-black leading-[0.94] tracking-tight text-white transition-all duration-700 ${phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          HEROES <span className="block text-slate-100">OF CODE</span>
        </h1>

        <div className={`absolute bottom-[16%] left-1/2 flex -translate-x-1/2 items-center justify-center gap-2.5 whitespace-nowrap font-mono text-[11px] sm:text-sm tracking-[0.18em] sm:tracking-[0.25em] text-emerald-200 uppercase transition-all duration-500 ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <span className="signal-status-dot" aria-hidden="true" />
          <span className="signal-live-glow">SIGNAL IS LIVE</span>
        </div>
      </div>

      <button
        type="button"
        onClick={skipIntro}
        className="absolute bottom-6 right-5 sm:bottom-8 sm:right-8 z-20 rounded-full border border-white/15 bg-black/45 px-4 py-2 font-mono text-[10px] tracking-[0.18em] text-white/65 hover:text-white hover:border-white/35 transition-colors"
        aria-label="Skip intro"
      >
        SKIP INTRO <span className="ml-2 text-white/35">[ESC]</span>
      </button>
    </div>
  );
};
