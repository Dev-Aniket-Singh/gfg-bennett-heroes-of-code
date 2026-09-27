import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '../hooks/useMediaQuery';

interface CustomCursorProps {
  currentTheme?: 'red-amber' | 'red-blue' | 'blue-violet' | 'green' | 'blue-red' | 'default';
}

export const CustomCursor: React.FC<CustomCursorProps> = () => {
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);
  const [cursorState, setCursorState] = useState<'normal' | 'interactive' | 'drag' | 'portal'>('normal');

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({
    x: -100,
    y: -100,
    ringX: -100,
    ringY: -100,
    vx: 0,
    vy: 0,
    prevX: -100,
    prevY: -100,
    angle: 0,
  });

  const themeColors = {
    dot: '#D8DEE8',
    ring: 'rgba(178, 188, 203, 0.14)',
    border: 'rgba(210, 218, 229, 0.52)',
  };

  useEffect(() => {
    if (isMobile || typeof window === 'undefined') return;

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    document.body.classList.add('custom-cursor-active');

    const onMouseMove = (e: MouseEvent) => {
      setVisible(true);
      const p = pos.current;
      p.vx = e.clientX - p.prevX;
      p.vy = e.clientY - p.prevY;
      p.prevX = e.clientX;
      p.prevY = e.clientY;
      p.x = e.clientX;
      p.y = e.clientY;
      p.angle = Math.atan2(p.vy, p.vx);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const checkHoverTarget = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const portalElement = target.closest('#assemble, [data-cursor="portal"]');
      const dragElement = target.closest('[data-cursor="drag"], .drag-target');
      const interactiveElement = target.closest('a, button, input, textarea, select, [role="button"], .interactive');

      if (portalElement) {
        setCursorState('portal');
      } else if (dragElement) {
        setCursorState('drag');
      } else if (interactiveElement) {
        setCursorState('interactive');
      } else {
        setCursorState('normal');
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', checkHoverTarget, { passive: true });

    let animId: number;
    const animateRing = () => {
      const p = pos.current;
      // Spring interpolation
      p.ringX += (p.x - p.ringX) * 0.16;
      p.ringY += (p.y - p.ringY) * 0.16;

      const speed = Math.hypot(p.vx, p.vy);
      const stretch = Math.min(0.3, speed * 0.008);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${p.ringX}px, ${p.ringY}px, 0) translate(-50%, -50%) rotate(${p.angle}rad) scale(${1 + stretch}, ${1 - stretch * 0.5})`;
      }

      animId = requestAnimationFrame(animateRing);
    };

    animId = requestAnimationFrame(animateRing);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', checkHoverTarget);
      cancelAnimationFrame(animId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Central Core Indicator ◉ */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full transition-transform duration-75"
        style={{
          backgroundColor: themeColors.dot,
          boxShadow: `0 0 12px ${themeColors.dot}`,
          transform: 'translate(-100px, -100px)',
        }}
      />

      {/* Outer Spring Reactive Ring ⊕ / Portal / Drag */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full transition-all duration-300 ease-out flex items-center justify-center"
        style={{
          width: cursorState === 'interactive' ? '46px' : cursorState === 'portal' ? '54px' : cursorState === 'drag' ? '50px' : '32px',
          height: cursorState === 'interactive' ? '46px' : cursorState === 'portal' ? '54px' : cursorState === 'drag' ? '50px' : '32px',
          borderColor: themeColors.border,
          borderWidth: cursorState === 'normal' ? '1px' : '1.5px',
          borderStyle: cursorState === 'portal' ? 'dashed' : 'solid',
          backgroundColor: cursorState !== 'normal' ? themeColors.ring : 'transparent',
          boxShadow: cursorState !== 'normal' ? `0 0 24px ${themeColors.ring}` : 'none',
          transform: 'translate(-100px, -100px)',
        }}
      >
        {cursorState === 'interactive' && (
          <div
            className="w-1.5 h-1.5 rounded-full animate-ping"
            style={{ backgroundColor: themeColors.dot }}
          />
        )}

        {cursorState === 'portal' && (
          <div
            className="w-2.5 h-2.5 rounded-full border border-slate-200 animate-spin-slow"
          />
        )}
      </div>
    </div>
  );
};
