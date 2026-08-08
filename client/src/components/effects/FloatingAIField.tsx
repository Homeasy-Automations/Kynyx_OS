import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Bot, BrainCircuit, Cpu, Database, Network, Sparkles } from 'lucide-react';
import { type MutableRefObject, type RefObject, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { cn } from '../../utils';

type Item =
  | { id: string; kind: 'icon'; icon: typeof Bot; x: number; y: number; size: 'sm' | 'md'; duration: number; drift: number; delay: number }
  | { id: string; kind: 'label'; label: string; x: number; y: number; size: 'sm' | 'md'; duration: number; drift: number; delay: number };

/** Spread across the whole hero, clear of the dead-center headline column. */
const ITEMS: Item[] = [
  { id: 'ai', kind: 'label', label: 'AI', x: 8, y: 20, size: 'sm', duration: 7, drift: 16, delay: 0 },
  { id: 'data', kind: 'label', label: 'DATA', x: 88, y: 16, size: 'sm', duration: 8.5, drift: 14, delay: 0.3 },
  { id: 'llm', kind: 'label', label: 'LLM', x: 91, y: 46, size: 'sm', duration: 7.6, drift: 18, delay: 0.6 },
  { id: 'rag', kind: 'label', label: 'RAG', x: 10, y: 62, size: 'sm', duration: 9, drift: 12, delay: 0.15 },
  { id: 'api', kind: 'label', label: 'API', x: 90, y: 78, size: 'sm', duration: 7.2, drift: 15, delay: 0.9 },
  { id: 'ml', kind: 'label', label: 'ML', x: 6, y: 84, size: 'sm', duration: 8.1, drift: 13, delay: 0.45 },
  { id: 'bot', kind: 'icon', icon: Bot, x: 16, y: 40, size: 'md', duration: 9.4, drift: 20, delay: 0.2 },
  { id: 'brain', kind: 'icon', icon: BrainCircuit, x: 82, y: 30, size: 'md', duration: 8.8, drift: 18, delay: 0.75 },
  { id: 'cpu', kind: 'icon', icon: Cpu, x: 20, y: 86, size: 'sm', duration: 7.8, drift: 15, delay: 1.1 },
  { id: 'database', kind: 'icon', icon: Database, x: 78, y: 90, size: 'sm', duration: 8.3, drift: 16, delay: 0.5 },
  { id: 'network', kind: 'icon', icon: Network, x: 5, y: 8, size: 'sm', duration: 9.6, drift: 14, delay: 1.3 },
  { id: 'sparkles', kind: 'icon', icon: Sparkles, x: 94, y: 62, size: 'sm', duration: 7.4, drift: 17, delay: 0.05 },
];

function OrbContent({ item }: { item: Item }) {
  const dims = item.size === 'md' ? 'h-12 w-12' : 'h-10 w-10';
  const iconSize = item.size === 'md' ? 'h-5 w-5' : 'h-4 w-4';

  if (item.kind === 'label') {
    return (
      <span className="hidden select-none rounded-full border border-ink-line bg-ink-raised/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-mist/60 backdrop-blur-sm md:inline-block">
        {item.label}
      </span>
    );
  }
  const Icon = item.icon;
  return (
    <span
      className={cn(
        'hidden select-none items-center justify-center rounded-full border border-ink-line bg-ink-raised/70 text-signal/80 backdrop-blur-sm md:flex',
        dims,
      )}
    >
      <Icon className={iconSize} aria-hidden="true" />
    </span>
  );
}

interface OrbProps {
  item: Item;
  containerRef: RefObject<HTMLDivElement>;
  mouseRef: MutableRefObject<{ x: number; y: number }>;
}

/** One floating element: idle drift on its own timer, plus a spring-driven
 * repulsion offset recomputed every frame from cursor distance. */
function FloatingOrb({ item, containerRef, mouseRef }: OrbProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 130, damping: 12, mass: 0.5 });
  const sy = useSpring(ry, { stiffness: 130, damping: 12, mass: 0.5 });

  useEffect(() => {
    const RADIUS = 130;
    const STRENGTH = 50;
    let raf = 0;

    const loop = () => {
      const inner = innerRef.current;
      const container = containerRef.current;
      if (inner && container) {
        const ir = inner.getBoundingClientRect();
        const cr = container.getBoundingClientRect();
        const cx = ir.left - cr.left + ir.width / 2;
        const cy = ir.top - cr.top + ir.height / 2;
        const dx = cx - mouseRef.current.x;
        const dy = cy - mouseRef.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist < RADIUS && dist > 0.01) {
          const force = (1 - dist / RADIUS) * STRENGTH;
          rx.set((dx / dist) * force);
          ry.set((dy / dist) * force);
        } else {
          rx.set(0);
          ry.set(0);
        }
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [containerRef, mouseRef, rx, ry]);

  return (
    <motion.div
      style={{ left: `${item.x}%`, top: `${item.y}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: [0, item.drift, 0, -item.drift, 0],
        y: [0, -item.drift * 0.8, 0, item.drift * 0.8, 0],
      }}
      transition={{
        opacity: { duration: 0.7, delay: 1.4 + item.delay },
        scale: { duration: 0.7, delay: 1.4 + item.delay },
        x: { duration: item.duration, repeat: Infinity, ease: 'easeInOut', delay: item.delay },
        y: { duration: item.duration * 1.15, repeat: Infinity, ease: 'easeInOut', delay: item.delay },
      }}
    >
      <motion.div ref={innerRef} style={{ x: sx, y: sy }}>
        <OrbContent item={item} />
      </motion.div>
    </motion.div>
  );
}

interface FloatingAIFieldProps {
  className?: string;
}

/**
 * Decorative AI/data motif for the hero — icons and label chips drifting
 * freely across the whole section, each nudged away when the cursor gets
 * close. Falls back to a static, non-animated layout for reduced motion.
 */
export function FloatingAIField({ className }: FloatingAIFieldProps) {
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (reduced) return;
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseout', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
    };
  }, [reduced]);

  return (
    <div ref={containerRef} className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      {ITEMS.map((item) =>
        reduced ? (
          <div
            key={item.id}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <OrbContent item={item} />
          </div>
        ) : (
          <FloatingOrb key={item.id} item={item} containerRef={containerRef} mouseRef={mouseRef} />
        ),
      )}
    </div>
  );
}
