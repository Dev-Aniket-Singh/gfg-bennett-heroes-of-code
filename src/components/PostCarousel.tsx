import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Terminal, Users, Zap, ShieldCheck } from 'lucide-react';
import { useIsMobile } from '../hooks/useMediaQuery';
import { playCardSelectSound } from '../utils/uiSounds';

interface CarouselCard {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  stat: string;
  statLabel: string;
  badge: string;
  accentColor: string;
}

export const PostCarousel: React.FC = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const cards: CarouselCard[] = [
    {
      id: 'brief-1',
      tag: 'DIRECTIVE 01 // CONVERGENCE',
      title: 'THE ASSEMBLY',
      subtitle: 'Where India’s sharpest minds coalesce',
      description: 'A cross-disciplinary conclave of algorithmic wizards, UI architects, machine intelligence builders, and hardware pioneers uniting at Bennett University.',
      icon: <Users className="w-6 h-6 text-slate-200" />,
      stat: '500+ BUILDERS',
      statLabel: 'ELITE CANDIDATES',
      badge: 'OPEN SELECTION',
      accentColor: '#638BFF',
    },
    {
      id: 'brief-2',
      tag: 'DIRECTIVE 02 // GAUNTLET',
      title: 'THE 24-HOUR CRUCIBLE',
      subtitle: 'Unrestricted innovation at terminal velocity',
      description: 'Zero boilerplate. Direct execution. Build production-grade systems from blank canvases against relentless ticking clocks and high-stakes problem statements.',
      icon: <Zap className="w-6 h-6 text-slate-200" />,
      stat: '24 HOURS',
      statLabel: 'HIGH INTENSITY SPRINT',
      badge: 'UNINTERRUPTED COMPUTE',
      accentColor: '#A477FF',
    },
    {
      id: 'brief-3',
      tag: 'DIRECTIVE 03 // GENESIS',
      title: 'THE GENESIS NETWORK',
      subtitle: 'Mentorship from industry tech titans',
      description: 'Direct live code reviews, architecture critiques, and mentorship checkpoints with engineering leaders, venture scouts, and GFG community stalwarts.',
      icon: <Terminal className="w-6 h-6 text-slate-200" />,
      stat: '20+ MENTORS',
      statLabel: 'INDUSTRY ARCHITECTS',
      badge: 'LIVE PROTOCOLS',
      accentColor: '#42BDEB',
    },
    {
      id: 'brief-4',
      tag: 'DIRECTIVE 04 // DEFENSE',
      title: 'VIBRANIUM STANDARDS',
      subtitle: 'Engineered for resilience and real utility',
      description: 'We reward code that actually scales. Projects are judged on architectural integrity, algorithmic novelty, design polish, and measurable real-world viability.',
      icon: <ShieldCheck className="w-6 h-6 text-slate-200" />,
      stat: 'PRODUCTION READY',
      statLabel: 'EVALUATION BAR',
      badge: 'HIGH RIGOR',
      accentColor: '#C46AE8',
    },
  ];

  // Continuous pointer floating offset (floating point between 0 and cards.length - 1)
  const [activeFloatIndex, setActiveFloatIndex] = useState<number>(0);
  const pointerRef = useRef({
    currentOffset: 0,
    targetOffset: 0,
    tiltX: 0,
    tiltY: 0,
    targetTiltX: 0,
    targetTiltY: 0,
    isInteracting: false,
    prevX: 0,
    vx: 0,
  });

  const touchStartX = useRef<number>(0);

  // Desktop Pointer Movement listener directly on window/container
  useEffect(() => {
    if (isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      // Normalized coordinates relative to carousel center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const normX = (e.clientX - centerX) / (rect.width * 0.5);
      const normY = (e.clientY - centerY) / (rect.height * 0.5);

      // Clamp normX between -1.5 and 1.5
      const clampedX = Math.max(-1.5, Math.min(1.5, normX));
      const clampedY = Math.max(-1, Math.min(1, normY));

      const rawVx = e.clientX - pointerRef.current.prevX;
      pointerRef.current.prevX = e.clientX;
      pointerRef.current.vx = pointerRef.current.vx * 0.8 + rawVx * 0.2;

      // Mouse left (< 0) moves carousel left, mouse right (> 0) moves right
      // Base index mapped to cards.length
      const midCard = (cards.length - 1) / 2;
      pointerRef.current.targetOffset = midCard + clampedX * (midCard * 0.95);
      pointerRef.current.targetTiltX = -clampedY * 8; // vertical tilt in deg
      pointerRef.current.targetTiltY = clampedX * 8;
      pointerRef.current.isInteracting = true;
    };

    const handleMouseLeave = () => {
      pointerRef.current.isInteracting = false;
      // Gently settle to nearest card
      pointerRef.current.targetOffset = Math.round(pointerRef.current.currentOffset);
      pointerRef.current.targetTiltX = 0;
      pointerRef.current.targetTiltY = 0;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    let animId: number;
    const updateLoop = () => {
      const p = pointerRef.current;
      // Spring damping interpolation
      p.currentOffset += (p.targetOffset - p.currentOffset) * 0.08;
      p.tiltX += (p.targetTiltX - p.tiltX) * 0.08;
      p.tiltY += (p.targetTiltY - p.tiltY) * 0.08;

      setActiveFloatIndex(p.currentOffset);
      animId = requestAnimationFrame(updateLoop);
    };

    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isMobile, cards.length]);

  // Touch Swipe for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      playCardSelectSound();
      if (diff > 0) {
        pointerRef.current.targetOffset = Math.min(cards.length - 1, Math.round(activeFloatIndex) + 1);
      } else {
        pointerRef.current.targetOffset = Math.max(0, Math.round(activeFloatIndex) - 1);
      }
      setActiveFloatIndex(pointerRef.current.targetOffset);
    }
  };

  const prevFallback = () => {
    playCardSelectSound();
    const nextVal = Math.max(0, Math.round(activeFloatIndex) - 1);
    pointerRef.current.targetOffset = nextVal;
    setActiveFloatIndex(nextVal);
  };

  const nextFallback = () => {
    playCardSelectSound();
    const nextVal = Math.min(cards.length - 1, Math.round(activeFloatIndex) + 1);
    pointerRef.current.targetOffset = nextVal;
    setActiveFloatIndex(nextVal);
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full max-w-5xl mx-auto py-12 px-4 select-none perspective-1000"
    >
      {/* 3D Dynamic Card Stack Stage */}
      <div
        className="relative h-[460px] sm:h-[420px] flex items-center justify-center preserve-3d"
        style={{
          transform: `rotateX(${pointerRef.current.tiltX}deg) rotateY(${pointerRef.current.tiltY * 0.5}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {cards.map((card, idx) => {
          // Calculate continuous spatial difference from floating active index
          const diff = idx - activeFloatIndex;
          const absDiff = Math.abs(diff);

          // Card spatial positioning on curved 3D track
          const translateX = diff * 320;
          const translateZ = -absDiff * 140;
          const rotateY = -diff * 14;
          const scale = Math.max(0.75, 1 - absDiff * 0.14);
          const opacity = Math.max(0.2, 1 - absDiff * 0.42);
          const zIndex = Math.round(50 - absDiff * 10);
          const blur = Math.max(0, (absDiff - 0.4) * 3);
          const isActive = absDiff < 0.9;

          return (
            <div
              key={card.id}
              onClick={() => {
                playCardSelectSound();
                pointerRef.current.targetOffset = idx;
              }}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex,
                opacity,
                filter: `blur(${blur}px)`,
                pointerEvents: absDiff < 0.9 ? 'auto' : 'none',
                transition: 'filter 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                borderColor: isActive ? `${card.accentColor}E8` : `${card.accentColor}55`,
                borderWidth: isActive ? '2px' : '1px',
                boxShadow: isActive
                  ? `0 0 34px ${card.accentColor}CC, 0 0 92px ${card.accentColor}88, inset 0 0 56px ${card.accentColor}42, inset 0 0 18px ${card.accentColor}30, 0 28px 70px rgba(0,0,0,0.72)`
                  : `0 0 22px ${card.accentColor}60, inset 0 0 32px ${card.accentColor}18, 0 18px 46px rgba(0,0,0,0.62)`,
                backgroundColor: 'rgba(5, 7, 12, 0.98)',
                backgroundImage: `radial-gradient(ellipse at 18% 10%, ${card.accentColor}5A, transparent 58%), radial-gradient(ellipse at 86% 94%, ${card.accentColor}30, transparent 62%), radial-gradient(circle, rgba(203,213,225,0.06) 1px, transparent 1.5px)`,
                backgroundSize: 'auto, auto, 12px 12px',
              }}
              className="absolute w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-[#0A0D12]/94 backdrop-blur-xl border border-white/10 shadow-2xl cursor-grab active:cursor-grabbing preserve-3d group"
            >
              {/* Header HUD Tag */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="font-mono text-[11px] text-slate-400 tracking-widest uppercase">
                  {card.tag}
                </span>
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider font-semibold uppercase"
                  style={{
                    backgroundColor: `${card.accentColor}18`,
                    color: card.accentColor,
                    border: `1px solid ${card.accentColor}40`,
                  }}
                >
                  {card.badge}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="p-3 rounded-2xl border border-white/10 flex-shrink-0"
                  style={{ backgroundColor: `${card.accentColor}10` }}
                >
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
                    {card.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm font-body leading-relaxed mb-8">
                {card.description}
              </p>

              {/* Card Footer Stat */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                <div>
                  <div className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight">
                    {card.stat}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    {card.statLabel}
                  </div>
                </div>

                <div className="font-mono text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: card.accentColor }} />
                  <span>SECTOR BU</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fallback Accessibility / Visual Track Indicator */}
      <div className="flex items-center justify-between mt-6 max-w-md mx-auto">
        <button
          onClick={prevFallback}
          aria-label="Previous mission card (fallback)"
          className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-slate-400 hover:text-white transition-all interactive"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          {cards.map((c, idx) => {
            const isCur = Math.round(activeFloatIndex) === idx;
            return (
              <button
                key={c.id}
                onClick={() => {
                  playCardSelectSound();
                  pointerRef.current.targetOffset = idx;
                }}
                aria-label={`Go to ${c.title}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isCur ? 'w-8' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                style={isCur ? { backgroundColor: c.accentColor, boxShadow: `0 0 12px ${c.accentColor}66` } : undefined}
              />
            );
          })}
        </div>

        <button
          onClick={nextFallback}
          aria-label="Next mission card (fallback)"
          className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-slate-400 hover:text-white transition-all interactive"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Motion guidance hint */}
      <div className="text-center mt-3 text-[10px] font-mono text-slate-500 tracking-widest uppercase">
        <span>{isMobile ? 'SWIPE HORIZONTALLY TO TRAVERSE CARDS' : 'GLIDE CURSOR HORIZONTALLY TO TRAVERSE CARDS'}</span>
      </div>
    </div>
  );
};
