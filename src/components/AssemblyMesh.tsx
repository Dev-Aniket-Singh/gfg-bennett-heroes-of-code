import React, { useEffect, useRef } from 'react';
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useMediaQuery';

interface Point { x: number; y: number; ox: number; oy: number; vx: number; vy: number }
interface Ember { x: number; y: number; speed: number; radius: number; alpha: number }

/** Low-cost green mesh used only by the assembly route. */
export const AssemblyMesh: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: true, desynchronized: true });
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let points: Point[] = [];
    let frame = 0;
    let lastFrame = 0;
    let time = 0;
    const pointer = { x: -1000, y: -1000, tx: -1000, ty: -1000, active: false, strength: 0 };
    const spacing = isMobile ? 104 : 64;
    const embers: Ember[] = Array.from({ length: isMobile ? 8 : 40 }, () => ({
      x: Math.random(), y: Math.random(), speed: 0.00008 + Math.random() * 0.00018,
      radius: 0.6 + Math.random() * 1.2, alpha: 0.12 + Math.random() * 0.28,
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.35);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / spacing) + 1;
      rows = Math.ceil(height / spacing) + 1;
      points = Array.from({ length: cols * rows }, (_, index) => {
        const x = (index % cols) * spacing;
        const y = Math.floor(index / cols) * spacing;
        return { x, y, ox: x, oy: y, vx: 0, vy: 0 };
      });
      draw();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion) return;
      if (event.pointerType === 'touch' && !pointer.active) return;
      pointer.tx = event.clientX;
      pointer.ty = event.clientY;
      pointer.active = true;
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => { pointer.active = false; schedule(); }, 120);
      if (!reducedMotion) schedule();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (reducedMotion) return;
      if (event.pointerType === 'touch') {
        window.clearTimeout(idleTimer);
        pointer.active = true;
        pointer.tx = event.clientX;
        pointer.ty = event.clientY;
        schedule();
      }
    };
    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType === 'touch') { pointer.active = false; schedule(); }
    };
    let idleTimer = 0;
    const onPointerLeave = () => { pointer.active = false; window.clearTimeout(idleTimer); schedule(); };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const basePath = new Path2D();
      const energizedPath = new Path2D();
      const radius = isMobile ? 120 : 190;
      let meshSettling = false;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const point = points[row * cols + col];
          if (!point) continue;
          const dx = pointer.x - point.ox;
          const dy = pointer.y - point.oy;
          const distance = Math.hypot(dx, dy);
          const pull = pointer.active && distance < radius ? Math.pow(1 - distance / radius, 2) * pointer.strength : 0;
          const targetX = point.ox + (distance ? dx / distance : 0) * pull * 13;
          const targetY = point.oy + (distance ? dy / distance : 0) * pull * 13;
          point.vx = (point.vx + (targetX - point.x) * 0.17) * 0.78;
          point.vy = (point.vy + (targetY - point.y) * 0.17) * 0.78;
          point.x += point.vx;
          point.y += point.vy;
          if (Math.abs(point.vx) + Math.abs(point.vy) > 0.08 || Math.abs(point.x - point.ox) + Math.abs(point.y - point.oy) > 0.16) meshSettling = true;

          if (col < cols - 1) {
            const right = points[row * cols + col + 1];
            if (right) (pull > 0.04 ? energizedPath : basePath).moveTo(point.x, point.y), (pull > 0.04 ? energizedPath : basePath).lineTo(right.x, right.y);
          }
          if (row < rows - 1) {
            const below = points[(row + 1) * cols + col];
            if (below) (pull > 0.04 ? energizedPath : basePath).moveTo(point.x, point.y), (pull > 0.04 ? energizedPath : basePath).lineTo(below.x, below.y);
          }
        }
      }

      ctx.lineWidth = 0.8;
      ctx.strokeStyle = 'rgba(48, 209, 105, 0.12)';
      ctx.stroke(basePath);
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'rgba(114, 255, 160, 0.46)';
      ctx.stroke(energizedPath);

      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        if (!point) continue;
        const dx = pointer.x - point.ox;
        const dy = pointer.y - point.oy;
        const energy = pointer.active ? Math.max(0, 1 - Math.hypot(dx, dy) / radius) * pointer.strength : 0;
        ctx.fillStyle = energy > 0.08 ? `rgba(178,255,197,${0.4 + energy * 0.5})` : 'rgba(93,238,136,0.37)';
        ctx.beginPath();
        ctx.arc(point.x, point.y, energy > 0.08 ? 1.3 + energy * 1.5 : 1.05, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reducedMotion) {
        for (const ember of embers) {
          ember.y -= ember.speed * 16;
          ember.x += Math.sin(time * 0.002 + ember.y * 11) * 0.0003;
          if (ember.y < -0.02) { ember.y = 1.02; ember.x = Math.random(); }
          ctx.fillStyle = `rgba(135,255,172,${ember.alpha})`;
          ctx.fillRect(ember.x * width, ember.y * height, ember.radius, ember.radius);
        }
      }
      return meshSettling;
    };

    function schedule() {
      if (!frame) frame = requestAnimationFrame(render);
    }

    function render(timestamp: number) {
      frame = 0;
      if (document.hidden) return;
      const targetFps = isMobile ? 20 : 30;
      if (timestamp - lastFrame < 1000 / targetFps) { schedule(); return; }
      lastFrame = timestamp;
      time += 1000 / targetFps;
      pointer.x += (pointer.tx - pointer.x) * 0.22;
      pointer.y += (pointer.ty - pointer.y) * 0.22;
      pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * 0.12;
      const meshSettling = draw();
      const settling = Math.abs(pointer.tx - pointer.x) + Math.abs(pointer.ty - pointer.y) > 0.8 || pointer.strength > 0.015 || meshSettling;
      if ((!isMobile && !reducedMotion) || settling) schedule();
    }

    const visibility = () => { if (!document.hidden && !reducedMotion) schedule(); };
    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('blur', onPointerLeave);
    document.addEventListener('visibilitychange', visibility);
    if (!reducedMotion) schedule();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('blur', onPointerLeave);
      window.clearTimeout(idleTimer);
      document.removeEventListener('visibilitychange', visibility);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isMobile, reducedMotion]);

  return <canvas ref={canvasRef} className="assembly-mesh fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />;
};
