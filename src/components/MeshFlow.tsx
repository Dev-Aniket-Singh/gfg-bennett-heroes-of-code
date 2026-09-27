import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/useMediaQuery';

interface MeshPoint {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  energy: number;
}

export const MeshFlow: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMobile = useIsMobile();
  const pointerRef = useRef({
    targetX: -1000,
    targetY: -1000,
    x: -1000,
    y: -1000,
    vx: 0,
    vy: 0,
    speed: 0,
    activity: 0,
    active: false,
    lastEventAt: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let points: MeshPoint[] = [];
    let cols = 0;
    let rows = 0;
    let animId: number | null = null;
    let previousFrame = 0;
    const spacing = isMobile ? 90 : 54;

    const scheduleFrame = () => {
      if (animId === null) animId = requestAnimationFrame(render);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / spacing) + 1;
      rows = Math.ceil(height / spacing) + 1;
      points = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * spacing;
          const y = row * spacing;
          points.push({ x, y, originX: x, originY: y, vx: 0, vy: 0, energy: 0 });
        }
      }
      scheduleFrame();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const pointer = pointerRef.current;
      const now = performance.now();
      const elapsed = Math.max(8, now - (pointer.lastEventAt || now));
      const dx = event.clientX - pointer.targetX;
      const dy = event.clientY - pointer.targetY;

      if (Math.abs(pointer.targetX) < 900 || Math.abs(pointer.targetY) < 900) {
        const instantVx = Math.max(-2200, Math.min(2200, (dx / elapsed) * 1000));
        const instantVy = Math.max(-2200, Math.min(2200, (dy / elapsed) * 1000));
        pointer.vx = pointer.vx * 0.55 + instantVx * 0.45;
        pointer.vy = pointer.vy * 0.55 + instantVy * 0.45;
      } else {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
      }

      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      pointer.lastEventAt = now;
      pointer.activity = 1;
      pointer.active = true;
      scheduleFrame();
    };

    const onPointerLeave = () => {
      pointerRef.current.active = false;
      scheduleFrame();
    };

    const draw = (width: number, height: number, radius: number) => {
      ctx.clearRect(0, 0, width, height);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const point = points[row * cols + col];
          if (!point) continue;
          const localEnergy = point.energy;

          if (col < cols - 1) {
            const next = points[row * cols + col + 1];
            if (next) {
              const energy = (localEnergy + next.energy) * 0.5;
              ctx.strokeStyle = `rgba(${Math.round(155 + energy * 100)}, ${Math.round(42 + energy * 72)}, ${Math.round(58 + energy * 78)}, ${0.11 + energy * 0.22})`;
              ctx.lineWidth = 0.78 + energy * 0.85;
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(next.x, next.y);
              ctx.stroke();
            }
          }

          if (row < rows - 1) {
            const next = points[(row + 1) * cols + col];
            if (next) {
              const energy = (localEnergy + next.energy) * 0.5;
              ctx.strokeStyle = `rgba(${Math.round(155 + energy * 100)}, ${Math.round(42 + energy * 72)}, ${Math.round(58 + energy * 78)}, ${0.11 + energy * 0.22})`;
              ctx.lineWidth = 0.78 + energy * 0.85;
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(next.x, next.y);
              ctx.stroke();
            }
          }

          if (localEnergy > 0.04) {
            ctx.fillStyle = `rgba(250, ${Math.round(86 + localEnergy * 86)}, ${Math.round(104 + localEnergy * 75)}, ${0.15 + localEnergy * 0.38})`;
            ctx.shadowColor = 'rgba(232, 38, 58, 0.62)';
            ctx.shadowBlur = 2 + localEnergy * 8;
            ctx.beginPath();
            ctx.arc(point.x, point.y, 0.95 + localEnergy * 1.55, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            const pointIndex = row * cols + col;
            const accent = pointIndex % 31 === 0
              ? 'rgba(88, 202, 255, 0.64)'
              : pointIndex % 19 === 0
                ? 'rgba(200, 142, 255, 0.62)'
                : pointIndex % 13 === 0
                  ? 'rgba(255, 165, 86, 0.68)'
                  : 'rgba(255, 86, 107, 0.58)';
            ctx.fillStyle = accent;
            ctx.shadowColor = accent;
            ctx.shadowBlur = pointIndex % 13 === 0 ? 5 : 3.5;
            ctx.beginPath();
            ctx.arc(point.x, point.y, pointIndex % 13 === 0 ? 1.55 : 1.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      const pointer = pointerRef.current;
      if (pointer.activity > 0.02) {
        const glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, radius * 0.7);
        glow.addColorStop(0, `rgba(148, 38, 50, ${pointer.activity * 0.075})`);
        glow.addColorStop(1, 'rgba(92, 24, 34, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(pointer.x - radius * 0.7, pointer.y - radius * 0.7, radius * 1.4, radius * 1.4);
      }
    };

    function render(timestamp: number) {
      animId = null;
      const pointer = pointerRef.current;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const frameScale = Math.min(2, Math.max(0.5, (timestamp - (previousFrame || timestamp - 16.67)) / 16.67));
      previousFrame = timestamp;

      if (pointer.lastEventAt && timestamp - pointer.lastEventAt > 120) pointer.active = false;

      pointer.x += (pointer.targetX - pointer.x) * Math.min(0.32, 0.2 * frameScale);
      pointer.y += (pointer.targetY - pointer.y) * Math.min(0.32, 0.2 * frameScale);
      pointer.activity *= Math.pow(pointer.active ? 0.91 : 0.89, frameScale);
      pointer.vx *= Math.pow(0.82, frameScale);
      pointer.vy *= Math.pow(0.82, frameScale);
      pointer.speed = Math.hypot(pointer.vx, pointer.vy);

      const radius = isMobile ? 122 : 206;
      const speedStrength = Math.min(1, pointer.speed / 1500);
      const velocityLength = Math.max(1, pointer.speed);
      const velocityX = pointer.vx / velocityLength;
      const velocityY = pointer.vy / velocityLength;
      const normalizedX = (pointer.x - width / 2) / Math.max(1, width / 2);
      const normalizedY = (pointer.y - height / 2) / Math.max(1, height / 2);
      const edgeStrength = 0.38 + Math.min(1, Math.hypot(normalizedX, normalizedY) / Math.SQRT2) * 0.4;
      let pointsMoving = false;

      for (const point of points) {
        const dx = pointer.x - point.originX;
        const dy = pointer.y - point.originY;
        const distance = Math.hypot(dx, dy);
        const falloff = pointer.active && distance < radius ? Math.pow(1 - distance / radius, 2) : 0;
        const influence = falloff * pointer.activity;
        const towardX = distance > 0 ? dx / distance : 0;
        const towardY = distance > 0 ? dy / distance : 0;
        const radialPull = influence * edgeStrength * (1.5 + speedStrength * 8.5);
        const directionalDrag = influence * speedStrength * 7.5;
        const shear = influence * speedStrength * 2.8;
        const targetX = point.originX + towardX * radialPull + velocityX * directionalDrag - velocityY * shear;
        const targetY = point.originY + towardY * radialPull + velocityY * directionalDrag + velocityX * shear;
        const spring = Math.min(0.24, 0.115 * frameScale);
        const damping = Math.pow(0.83, frameScale);

        point.vx = (point.vx + (targetX - point.x) * spring) * damping;
        point.vy = (point.vy + (targetY - point.y) * spring) * damping;
        point.x += point.vx * frameScale;
        point.y += point.vy * frameScale;
        point.energy += (influence - point.energy) * Math.min(0.25, 0.12 * frameScale);
        if (Math.abs(point.vx) + Math.abs(point.vy) > 0.025) pointsMoving = true;
      }

      draw(width, height, radius);
      if (pointer.activity > 0.008 || pointsMoving) {
        scheduleFrame();
      }
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', onPointerLeave);
    document.addEventListener('mouseleave', onPointerLeave);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', onPointerLeave);
      document.removeEventListener('mouseleave', onPointerLeave);
      if (animId !== null) cancelAnimationFrame(animId);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-75 select-none"
      aria-hidden="true"
    />
  );
};
