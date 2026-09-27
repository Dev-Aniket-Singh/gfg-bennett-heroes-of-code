import React, { useEffect, useRef } from 'react';
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useMediaQuery';

interface Star {
  x: number;
  y: number;
  z: number; // depth 0 (far) to 1 (near)
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

interface CosmicBackgroundProps {
  accentColor?: string;
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({
  accentColor = '#00DF81',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const starsCount = isMobile ? 120 : 320;
    let stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];

    const starPalettes = ['#FFFFFF', '#E6EEFF', '#FFECCC', '#D4E5FF', '#C4F0FF'];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      stars = [];
      for (let i = 0; i < starsCount; i++) {
        const z = Math.random();
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          size: (1 - z * 0.7) * (Math.random() * 1.5 + 0.6),
          baseAlpha: Math.random() * 0.6 + 0.2,
          twinkleSpeed: Math.random() * 0.03 + 0.008,
          twinklePhase: Math.random() * Math.PI * 2,
          color: starPalettes[Math.floor(Math.random() * starPalettes.length)],
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      const prevX = mouseRef.current.targetX;
      const prevY = mouseRef.current.targetY;
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.vx = e.clientX - prevX;
      mouseRef.current.vy = e.clientY - prevY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Periodically spawn shooting star
    const shootingStarInterval = setInterval(() => {
      if (prefersReduced) return;
      if (Math.random() > 0.45 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * width * 0.8 + width * 0.1,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 80 + 50,
          speed: Math.random() * 10 + 12,
          angle: (Math.random() * 25 + 35) * (Math.PI / 180),
          alpha: 1,
          active: true,
        });
      }
    }, 3500);

    let time = 0;

    const render = () => {
      time += 0.02;

      // Mouse lerp
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.08;
      m.y += (m.targetY - m.y) * 0.08;
      m.vx *= 0.92;
      m.vy *= 0.92;

      ctx.clearRect(0, 0, width, height);

      // Deep space base gradients
      const bgGrad = ctx.createRadialGradient(
        width * 0.5 + (m.x - width * 0.5) * 0.03,
        height * 0.4 + (m.y - height * 0.5) * 0.03,
        100,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8
      );
      bgGrad.addColorStop(0, 'rgba(10, 14, 22, 0.4)');
      bgGrad.addColorStop(0.5, 'rgba(5, 7, 10, 0.7)');
      bgGrad.addColorStop(1, 'rgba(2, 3, 5, 0.95)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle Cosmic Nebula Haze
      const nebulaGrad = ctx.createRadialGradient(
        width * 0.35 + (m.x - width * 0.5) * 0.05,
        height * 0.35 + (m.y - height * 0.5) * 0.05,
        30,
        width * 0.35,
        height * 0.35,
        width * 0.65
      );
      nebulaGrad.addColorStop(0, 'rgba(0, 223, 129, 0.03)');
      nebulaGrad.addColorStop(0.4, 'rgba(0, 210, 255, 0.02)');
      nebulaGrad.addColorStop(0.8, 'rgba(138, 43, 226, 0.015)');
      nebulaGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Multi-layer Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Parallax offset proportional to depth z
        const parallaxX = (m.x - width * 0.5) * (s.z * 0.04);
        const parallaxY = (m.y - height * 0.5) * (s.z * 0.04);

        let curX = s.x - parallaxX;
        let curY = s.y - parallaxY;

        // Wrap boundaries
        if (curX < 0) curX += width;
        if (curX > width) curX -= width;
        if (curY < 0) curY += height;
        if (curY > height) curY -= height;

        // Twinkle
        const twinkle = Math.sin(time * s.twinkleSpeed * 100 + s.twinklePhase) * 0.3;
        const alpha = Math.max(0.08, Math.min(0.95, s.baseAlpha + twinkle));

        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;

        // Draw star core
        ctx.beginPath();
        ctx.arc(curX, curY, s.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow for closer, larger stars
        if (s.size > 1.2 && !isMobile) {
          ctx.globalAlpha = alpha * 0.25;
          ctx.beginPath();
          ctx.arc(curX, curY, s.size * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Render Shooting Stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        if (!ss.active) continue;

        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.alpha -= 0.018;

        if (ss.alpha <= 0 || ss.x > width + 100 || ss.y > height + 100) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.4)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      clearInterval(shootingStarInterval);
      cancelAnimationFrame(animId);
    };
  }, [isMobile, prefersReduced, accentColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 select-none"
      aria-hidden="true"
    />
  );
};
