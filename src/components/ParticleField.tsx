import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/useMediaQuery';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  baseVx: number;
  baseVy: number;
}

interface ParticleFieldProps {
  density?: number;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
    density = 36,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMobile = useIsMobile();
  const pointerRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, vx: 0, vy: 0, activity: 0, active: false, lastAt: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const count = isMobile ? Math.floor(density * 0.42) : density;

    const cosmicColors = ['#36171D', '#4B2029', '#642B36', '#8B4652', '#A3ABB7', '#CAD0D8'];

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const pointer = pointerRef.current;
      const now = performance.now();
      const elapsed = Math.max(8, now - (pointer.lastAt || now));
      const dx = event.clientX - pointer.targetX;
      const dy = event.clientY - pointer.targetY;
      if (pointer.lastAt > 0) {
        pointer.vx = pointer.vx * 0.55 + Math.max(-2200, Math.min(2200, (dx / elapsed) * 1000)) * 0.45;
        pointer.vy = pointer.vy * 0.55 + Math.max(-2200, Math.min(2200, (dy / elapsed) * 1000)) * 0.45;
      } else {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
      }
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      pointer.lastAt = now;
      pointer.active = true;
      pointer.activity = 1;
    };

    const onPointerLeave = () => {
      pointerRef.current.active = false;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      particles = [];
      for (let i = 0; i < count; i++) {
        const baseAlpha = Math.random() * 0.12 + 0.055;
        const baseVx = (Math.random() - 0.5) * 0.12;
        const baseVy = (Math.random() - 0.5) * 0.12 - 0.035;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.8 + 0.6,
          color: Math.random() < 0.13 ? '#E2E6EC' : cosmicColors[Math.floor(Math.random() * cosmicColors.length)],
          vx: baseVx,
          vy: baseVy,
          baseVx,
          baseVy,
          alpha: baseAlpha,
          baseAlpha,
          pulseSpeed: Math.random() * 0.02 + 0.005,
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', onPointerLeave);
    document.addEventListener('mouseleave', onPointerLeave);

    let time = 0;

    const render = () => {
      time += 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pointer = pointerRef.current;

      pointer.x += (pointer.targetX - pointer.x) * 0.16;
      pointer.y += (pointer.targetY - pointer.y) * 0.16;
      pointer.vx *= 0.86;
      pointer.vy *= 0.86;
      pointer.activity *= pointer.active ? 0.92 : 0.88;
      const speed = Math.min(1, Math.hypot(pointer.vx, pointer.vy) / 1450);
      const speedLength = Math.max(1, Math.hypot(pointer.vx, pointer.vy));
      const directionX = pointer.vx / speedLength;
      const directionY = pointer.vy / speedLength;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const radius = isMobile ? 115 : 185;
        const influence = pointer.active && distance < radius
          ? Math.pow(1 - distance / radius, 2) * pointer.activity * speed
          : 0;
        const inverseDistance = 1 / Math.max(1, distance);
        const pushX = influence * ((dx * inverseDistance * 0.55) + directionX * 1.2);
        const pushY = influence * ((dy * inverseDistance * 0.55) + directionY * 1.2);
        p.vx += ((p.baseVx + pushX) - p.vx) * 0.06;
        p.vy += ((p.baseVy + pushY) - p.vy) * 0.06;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen borders smoothly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle alpha pulsation
        p.alpha = p.baseAlpha + Math.sin(time * p.pulseSpeed) * 0.045;
        p.alpha = Math.max(0.025, Math.min(0.25, p.alpha));

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.radius * (p.color === '#E2E6EC' ? 1.8 : 2.2);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', onPointerLeave);
      document.removeEventListener('mouseleave', onPointerLeave);
      cancelAnimationFrame(animationId);
    };
  }, [density, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2] opacity-60"
      aria-hidden="true"
    />
  );
};
