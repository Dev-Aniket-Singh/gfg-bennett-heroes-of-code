import React, { useState, useRef, useEffect } from 'react';
import { HIGHLIGHT_CATEGORIES } from '../data/highlights';
import type { HighlightCategory } from '../types';
import { Code, Brain, Globe, Cpu, Shield, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { useIsMobile } from '../hooks/useMediaQuery';
import { playCardSelectSound } from '../utils/uiSounds';

interface SpiralSliderProps {
  onCategorySelect?: (cat: HighlightCategory) => void;
}

export const SpiralSlider: React.FC<SpiralSliderProps> = ({ onCategorySelect }) => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Active rotation angle of the 3D helix in radians
  const [helixAngle, setHelixAngle] = useState<number>(0);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  const physicsRef = useRef({
    currentAngle: 0,
    targetAngle: 0,
    velocity: 0,
    pitchX: 0,
    targetPitchX: 0,
    prevMouseX: 0,
    prevMouseY: 0,
    isHovered: false,
  });

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'code':
        return <Code className="w-6 h-6 text-slate-200" />;
      case 'ai':
        return <Brain className="w-6 h-6 text-slate-200" />;
      case 'web':
        return <Globe className="w-6 h-6 text-slate-200" />;
      case 'build':
        return <Cpu className="w-6 h-6 text-slate-200" />;
      case 'compete':
        return <Shield className="w-6 h-6 text-slate-200" />;
      default:
        return <Zap className="w-6 h-6 text-white" />;
    }
  };

  const selectTrack = (index: number) => {
    playCardSelectSound();
    const targetAngle = -index * ((Math.PI * 2) / HIGHLIGHT_CATEGORIES.length);
    physicsRef.current.targetAngle = targetAngle;
    if (isMobile) {
      // Use a simple, discrete card switch on touch devices instead of a
      // perpetual 3D animation/render loop.
      physicsRef.current.currentAngle = targetAngle;
      physicsRef.current.velocity = 0;
      setHelixAngle(targetAngle);
      setActiveCategoryIndex(index);
    }
  };

  // Continuous Pointer Motion Engine for the 3D Spiral
  useEffect(() => {
    if (isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const normX = (e.clientX - centerX) / (rect.width * 0.5);
      const normY = (e.clientY - centerY) / (rect.height * 0.5);

      const rawVx = e.clientX - physicsRef.current.prevMouseX;
      physicsRef.current.prevMouseX = e.clientX;
      physicsRef.current.prevMouseY = e.clientY;

      // Pointer velocity adds rotational impulse
      const impulse = rawVx * 0.0018;
      physicsRef.current.velocity += impulse;

      // Cursor position steers the target rotation angle continuously
      physicsRef.current.targetAngle += normX * 0.045 + impulse;
      physicsRef.current.targetPitchX = -normY * 12; // vertical pitch tilt in degrees
      physicsRef.current.isHovered = true;
    };

    const handleWheel = (e: WheelEvent) => {
      // Allow mouse wheel to smoothly rotate spiral without hijacking page scroll
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        physicsRef.current.targetAngle += e.deltaX * 0.003;
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    container.addEventListener('wheel', handleWheel, { passive: true });

    let animId: number;
    const count = HIGHLIGHT_CATEGORIES.length;
    const stepAngle = (Math.PI * 2) / count;

    const updatePhysics = () => {
      const p = physicsRef.current;

      // Inertia & velocity decay
      p.velocity *= 0.92;
      p.targetAngle += p.velocity;

      // Spring damping towards target angle
      p.currentAngle += (p.targetAngle - p.currentAngle) * 0.09;
      p.pitchX += (p.targetPitchX - p.pitchX) * 0.08;

      setHelixAngle(p.currentAngle);

      // Determine which card is closest to camera front (z = max)
      // Normalize angle mod 2pi
      let closestIdx = 0;
      let maxZ = -Infinity;

      for (let i = 0; i < count; i++) {
        const phi = p.currentAngle + i * stepAngle;
        const z = Math.cos(phi);
        if (z > maxZ) {
          maxZ = z;
          closestIdx = i;
        }
      }

      setActiveCategoryIndex(closestIdx);

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(animId);
    };
  }, [isMobile]);

  useEffect(() => {
    if (onCategorySelect) {
      onCategorySelect(HIGHLIGHT_CATEGORIES[activeCategoryIndex]);
    }
  }, [activeCategoryIndex, onCategorySelect]);

  // Touch Swipe for mobile devices
  const touchStartX = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      const direction = diff > 0 ? 1 : -1;
      const next = (activeCategoryIndex + direction + HIGHLIGHT_CATEGORIES.length) % HIGHLIGHT_CATEGORIES.length;
      selectTrack(next);
    }
  };

  const stepForward = () => {
    selectTrack((activeCategoryIndex + 1) % HIGHLIGHT_CATEGORIES.length);
  };

  const stepBackward = () => {
    selectTrack((activeCategoryIndex - 1 + HIGHLIGHT_CATEGORIES.length) % HIGHLIGHT_CATEGORIES.length);
  };

  const count = HIGHLIGHT_CATEGORIES.length;
  const radiusX = isMobile ? 180 : 340; // horizontal spiral radius
  const radiusZ = isMobile ? 140 : 280; // depth spiral radius

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full py-8 select-none perspective-2000 overflow-hidden"
      aria-label="Challenge track guide"
    >
      {/* 3D Helix Stage Container */}
      <div
        className="relative h-[460px] sm:h-[480px] flex items-center justify-center preserve-3d"
        style={{
          transform: `rotateX(${physicsRef.current.pitchX}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {HIGHLIGHT_CATEGORIES.map((category, idx) => {
          const stepAngle = (Math.PI * 2) / count;
          const phi = helixAngle + idx * stepAngle;

          // True 3D Spiral Helix Coordinates in Space
          const x = Math.sin(phi) * radiusX;
          const z = Math.cos(phi) * radiusZ; // z: from -radiusZ (deep back) to +radiusZ (front)
          // Helical vertical displacement (spiral curve)
          const normZ = (z + radiusZ) / (2 * radiusZ); // 0 (back) to 1 (front)
          const y = -Math.sin(phi) * 35; // vertical wave curve
          const rotateY = -(phi * 180) / Math.PI; // keep the front track face-on to the reader
          const scale = isMobile ? 0.75 + normZ * 0.35 : 0.72 + normZ * 0.38;
          const opacity = Math.max(0.18, 0.25 + normZ * 0.75);
          const zIndex = Math.round(normZ * 50);
          const blur = Math.max(0, (1 - normZ) * 4);
          const isFront = isMobile ? idx === activeCategoryIndex : normZ > 0.88;

          return (
            <div
              key={category.id}
              onClick={() => {
                selectTrack(idx);
              }}
              style={{
                transform: isMobile ? 'translate(-50%, -50%)' : `translateX(${x}px) translateY(${y}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex,
                opacity: isMobile ? (isFront ? 1 : 0) : opacity,
                filter: isMobile ? 'none' : `blur(${blur}px)`,
                pointerEvents: isFront ? 'auto' : 'none',
                transition: 'filter 0.25s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                borderColor: isFront ? category.color : `${category.color}70`,
                borderWidth: isFront ? '2px' : '1px',
                boxShadow: isFront && isMobile
                  ? `0 0 22px ${category.color}85, inset 0 0 28px ${category.color}28, 0 18px 50px rgba(0,0,0,0.72)`
                  : isFront
                  ? `0 0 34px ${category.color}CC, 0 0 92px ${category.color}88, inset 0 0 56px ${category.color}42, inset 0 0 18px ${category.color}30, 0 24px 80px rgba(0,0,0,0.78)`
                  : `0 0 22px ${category.color}60, inset 0 0 32px ${category.color}18, 0 24px 80px rgba(0,0,0,0.72)`,
                backgroundColor: 'rgba(5, 7, 12, 0.98)',
                backgroundImage: `radial-gradient(ellipse at 14% 8%, ${category.color}5A, transparent 58%), radial-gradient(ellipse at 88% 96%, ${category.color}32, transparent 62%), linear-gradient(145deg, rgba(255,255,255,0.04), transparent 55%)`,
              }}
              className={`absolute w-[min(300px,calc(100vw-2.5rem))] sm:w-[350px] p-6 sm:p-7 rounded-3xl bg-[#0C1015]/94 ${isMobile ? 'left-1/2 top-1/2 backdrop-blur-sm' : 'backdrop-blur-xl'} border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.65)] cursor-pointer preserve-3d group`}
            >
              {/* Active Foreground Glowing Edge */}
              {isFront && (
                <div
                  className="absolute -inset-[2px] rounded-3xl pointer-events-none opacity-55 blur-[5px] transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${category.color}C0, rgba(255,255,255,0.11) 38%, transparent 76%)`,
                  }}
                />
              )}

              {/* Card Header Micro HUD */}
              <div className="relative z-10 flex items-center justify-between gap-3 mb-5">
                <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase">
                  {category.code}
                </span>
                <span
                  className="px-2 py-0.5 rounded-full font-mono text-[9px] font-semibold tracking-wider"
                  style={{
                    backgroundColor: `${category.color}20`,
                    color: category.color,
                    border: `1px solid ${category.color}40`,
                  }}
                >
                  {category.difficulty}
                </span>
              </div>

              {/* Icon & Category Title */}
              <div className="relative z-10 flex items-center gap-3.5 mb-3">
                <div
                  className="p-3 rounded-2xl border border-white/10 flex-shrink-0"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  {getCategoryIcon(category.id)}
                </div>
                <div>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
                    {category.title}
                  </h3>
                  <p className="font-mono text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {category.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="relative z-10 text-xs sm:text-sm text-slate-300 font-body leading-relaxed mb-6">
                {category.description}
              </p>

              {/* Tech Stack Chips */}
              <div className="relative z-10 flex flex-wrap gap-1.5 mb-6">
                {category.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.07] font-mono text-[10px] text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Footer Operative Tag */}
              <div className="relative z-10 flex items-center justify-between pt-3.5 border-t border-white/10 text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: category.color }} />
                  TRACK {String(idx + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                </span>
                <span className="text-slate-300">MISSION BRIEF</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Track selection and arrow controls */}
      <div className="flex flex-col items-center justify-center gap-3 mt-5">
        <div className="font-mono text-[10px] text-slate-300 tracking-[0.2em] uppercase">Select a challenge track</div>
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-5xl">
        <button
          onClick={stepBackward}
          aria-label="Previous challenge track"
          className="p-2 rounded-xl bg-[#0B0E12] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-all interactive"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

          {HIGHLIGHT_CATEGORIES.map((cat, idx) => {
            const isCur = activeCategoryIndex === idx;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  selectTrack(idx);
                }}
                aria-label={`Select ${cat.title}`}
                aria-pressed={isCur}
                className={`min-h-10 rounded-xl px-3 py-2 border font-mono text-[9px] sm:text-[10px] tracking-wide transition-all duration-300 interactive ${
                  isCur ? 'border-white/35 bg-white/[0.08] text-white shadow-[0_0_18px_rgba(203,213,225,0.08)]' : 'border-white/10 bg-black/35 text-slate-400 hover:border-white/25 hover:text-white'
                }`}
                style={{
                  borderColor: isCur ? `${cat.color}99` : undefined,
                }}
              >
                <span className="mr-1.5 text-slate-400">0{idx + 1}</span>{cat.title}
              </button>
            );
          })}

        <button
          onClick={stepForward}
          aria-label="Next challenge track"
          className="p-2 rounded-xl bg-[#0B0E12] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-all interactive"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        </div>
      </div>

      <div className="text-center mt-3 text-[10px] font-mono text-slate-500 tracking-widest uppercase">
        <span>{isMobile ? 'Choose a track or swipe the guide to rotate' : 'Use track buttons or arrows · Move the cursor horizontally to rotate'}</span>
      </div>
    </div>
  );
};
