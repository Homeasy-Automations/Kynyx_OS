import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: 'mist' | 'signal';
}

/**
 * Interactive particle constellation — the hero's background visual.
 * Cursor repels nearby nodes gently; connections form between close nodes.
 * Respects prefers-reduced-motion (renders one static frame).
 */
export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const LINK_DIST = 130;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width ?? window.innerWidth;
      height = rect?.height ?? window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(90, Math.max(42, Math.floor((width * height) / 16000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 0.6,
        hue: Math.random() > 0.82 ? 'signal' : 'mist',
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        // gentle drift
        n.x += n.vx;
        n.y += n.vy;
        // cursor repulsion
        const dx = n.x - mouse.current.x;
        const dy = n.y - mouse.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 160 && dist > 0.01) {
          const force = (160 - dist) / 160;
          n.x += (dx / dist) * force * 2.2;
          n.y += (dy / dist) * force * 2.2;
        }
        // wrap
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      // links
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.16;
            ctx.strokeStyle =
              a.hue === 'signal' || b.hue === 'signal'
                ? `rgba(198,255,62,${alpha})`
                : `rgba(244,244,241,${alpha * 0.7})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle =
          n.hue === 'signal' ? 'rgba(198,255,62,0.85)' : 'rgba(244,244,241,0.5)';
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('mouseout', onLeave);

    if (reduced) {
      // single static frame
      step();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseout', onLeave);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
