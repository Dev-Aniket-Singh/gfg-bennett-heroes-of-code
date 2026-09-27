import { useState, useEffect, useRef } from 'react';

export interface PointerState {
  x: number;
  y: number;
  smoothX: number;
  smoothY: number;
  normX: number; // -1 to 1
  normY: number; // -1 to 1
  vx: number;    // velocity X
  vy: number;    // velocity Y
  speed: number; // magnitude of velocity
  angle: number; // movement angle in radians
  isInside: boolean;
  isDown: boolean;
}

export const usePointerPhysics = (damping: number = 0.12): PointerState => {
  const [state, setState] = useState<PointerState>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
    smoothX: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    smoothY: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
    normX: 0,
    normY: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    angle: 0,
    isInside: false,
    isDown: false,
  });

  const mouse = useRef({
    targetX: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    targetY: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
    currentX: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    currentY: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
    prevX: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    prevY: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
    vx: 0,
    vy: 0,
    isInside: false,
    isDown: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Touch layouts do not render the custom pointer parallax. Avoid running
    // a permanent animation loop (and React state updates) on phones/tablets.
    if (window.matchMedia('(max-width: 768px), (pointer: coarse)').matches) return;

    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = e.clientX;
      mouse.current.targetY = e.clientY;
      mouse.current.isInside = true;
    };

    const onMouseDown = () => {
      mouse.current.isDown = true;
    };

    const onMouseUp = () => {
      mouse.current.isDown = false;
    };

    const onMouseLeave = () => {
      mouse.current.isInside = false;
    };

    const onMouseEnter = () => {
      mouse.current.isInside = true;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const updateLoop = () => {
      const m = mouse.current;
      const w = window.innerWidth || 1000;
      const h = window.innerHeight || 800;

      // Calculate instantaneous raw velocity
      const rawVx = m.targetX - m.prevX;
      const rawVy = m.targetY - m.prevY;
      m.prevX = m.targetX;
      m.prevY = m.targetY;

      // Smooth velocity decay
      m.vx = m.vx * 0.82 + rawVx * 0.18;
      m.vy = m.vy * 0.82 + rawVy * 0.18;

      // Interpolate smoothed coordinates with spring/damping
      m.currentX += (m.targetX - m.currentX) * damping;
      m.currentY += (m.targetY - m.currentY) * damping;

      const speed = Math.hypot(m.vx, m.vy);
      const angle = Math.atan2(m.vy, m.vx);

      setState({
        x: m.targetX,
        y: m.targetY,
        smoothX: m.currentX,
        smoothY: m.currentY,
        normX: (m.currentX / w) * 2 - 1,
        normY: (m.currentY / h) * 2 - 1,
        vx: m.vx,
        vy: m.vy,
        speed,
        angle,
        isInside: m.isInside,
        isDown: m.isDown,
      });

      animId = requestAnimationFrame(updateLoop);
    };

    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [damping]);

  return state;
};
