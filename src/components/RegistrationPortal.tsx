import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { EVENT_CONFIG } from '../data/event';
import { CharacterArtwork } from './CharacterArtwork';

interface RegistrationPortalProps {
  onTransitionComplete: () => void;
}

export const RegistrationPortal: React.FC<RegistrationPortalProps> = ({ onTransitionComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const portalPointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const particles: {
      angle: number;
      dist: number;
      speed: number;
      size: number;
      color: string;
      alpha: number;
    }[] = [];

    const colors = ['#45252B', '#5A343D', '#79505A', '#AAB3C0', '#D4DAE2'];
    const count = window.innerWidth < 640 ? 48 : 84;

    for (let i = 0; i < count; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        dist: Math.random() * 140 + 40,
        speed: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 2 + 1,
        color: Math.random() < 0.035 ? '#FFFFFF' : colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.18 + 0.06,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2 + portalPointer.current.x * (isHovered ? 24 : 7);
      const centerY = height / 2 + portalPointer.current.y * (isHovered ? 24 : 7);
      const speedMultiplier = isActivating ? 4.5 : isHovered ? 2.2 : 1;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle += p.speed * speedMultiplier;

        if (isActivating) {
          p.dist = Math.max(10, p.dist * 0.96);
        }

        const x = centerX + Math.cos(p.angle) * p.dist;
        const y = centerY + Math.sin(p.angle) * p.dist;

        ctx.save();
        ctx.globalAlpha = p.alpha * (isHovered ? 1.12 : 0.76);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 4;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isHovered, isActivating]);

  const handlePortalClick = () => {
    if (isActivating) return;
    setIsActivating(true);

    setTimeout(() => {
      onTransitionComplete();
    }, 1100);
  };

  return (
    <section id="assemble" className="relative py-28 sm:py-32 overflow-hidden select-none bg-[#07090D]/74">
      <div
        className={`fixed inset-0 z-[9995] pointer-events-none ${isActivating ? 'portal-flash' : 'opacity-0'}`}
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <CharacterArtwork characterId="spiderman" opacity={0.09} className="w-[620px] sm:w-[850px] max-w-none" />
      </div>
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_50%_52%,rgba(101,25,37,0.09),transparent_55%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.035] border border-white/10 text-slate-300 font-mono text-[11px] tracking-widest uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          FINAL DIRECTIVE // ASSEMBLE
        </div>

        <h2 className="w-full max-w-full text-3xl sm:text-6xl md:text-7xl font-black font-display text-white tracking-[-0.035em] sm:tracking-tight leading-[1.05] mb-4">
          ASSEMBLE
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-500 ml-1 sm:ml-3">
            NOW.
          </span>
        </h2>

        <p className="w-full max-w-xl text-slate-400 text-sm sm:text-base font-body leading-relaxed mx-auto mb-16">
          Step across the threshold. The signal has reached your terminal. Register your operative credentials or link your engineering squad.
        </p>

        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            portalPointer.current.x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
            portalPointer.current.y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
          }}
          onClick={handlePortalClick}
          className={`portal-assembly-trigger relative w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] rounded-full flex items-center justify-center cursor-pointer group interactive ${isActivating ? 'portal-assembly-igniting' : ''}`}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-10"
          />
          <div className={`portal-sun-aura ${isHovered ? 'portal-sun-aura-hovered' : ''} ${isActivating ? 'portal-sun-aura-igniting' : ''}`} aria-hidden="true" />

          <div
            className={`absolute inset-0 rounded-full border border-white/20 transition-all duration-700 animate-spin-slow ${
              isHovered ? 'scale-105 border-white/35 shadow-[0_0_28px_rgba(164,174,188,0.12)]' : ''
            }`}
          />
          <div
            className={`absolute inset-3 rounded-full border border-dashed border-white/15 transition-all duration-700 animate-spin-reverse-slow ${
              isHovered ? 'scale-105 border-white/30' : ''
            }`}
          />
          <div
            className={`absolute inset-8 rounded-full border border-white/10 transition-all duration-500 ${
              isHovered ? 'border-white/25' : ''
            }`}
          />

          <div
            className={`relative z-20 w-[180px] sm:w-[220px] h-[180px] sm:h-[220px] rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(76,52,20,0.48),rgba(18,20,24,0.92)_53%,#050608_82%)] border border-amber-300/55 flex flex-col items-center justify-center p-6 text-center transition-all duration-500 shadow-2xl ${
              isHovered ? 'scale-105 border-amber-200/90 shadow-[0_0_42px_rgba(255,184,0,0.34)]' : ''
            } ${isActivating ? 'scale-150 brightness-200' : ''}`}
          >
            <div className="portal-sun-core" aria-hidden="true" />
            <div className="portal-sun-beacon" aria-hidden="true" />

            <span className="relative z-10 font-display font-black text-lg sm:text-xl text-white tracking-wider uppercase group-hover:text-amber-100 transition-colors">
              JOIN THE
              <span className="block text-amber-200">ASSEMBLY</span>
            </span>

            <div className="relative z-10 flex items-center gap-1.5 mt-2 font-mono text-[10px] text-slate-300 group-hover:text-white transition-colors">
              <span>INITIALIZE</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" />
            <span>PORTAL: <strong className="text-white">UNRESTRICTED</strong></span>
          </div>
          <div>•</div>
          <div>STATUS: <strong className="text-slate-200">{EVENT_CONFIG.registration.statusText}</strong></div>
          <div>•</div>
          <div>VENUE: <strong className="text-slate-200">{EVENT_CONFIG.venue}</strong></div>
        </div>
      </div>
    </section>
  );
};
