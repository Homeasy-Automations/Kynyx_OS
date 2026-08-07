import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type CursorState = 'default' | 'hover' | 'view' | 'drag';

/**
 * Desktop-only custom cursor: a small dot + trailing ring.
 * Expands over links, shows VIEW over projects, DRAG over draggable regions.
 * Automatically disabled on touch devices and for reduced-motion users.
 */
export function CustomCursor() {
  const isFine = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduced = usePrefersReducedMotion();
  const [state, setState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 250, damping: 24, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 250, damping: 24, mass: 0.5 });

  useEffect(() => {
    if (!isFine || reduced) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor="hover"]');
      const project = target.closest('[data-cursor="view"]');
      const draggable = target.closest('[data-cursor="drag"]');
      if (project) setState('view');
      else if (draggable) setState('drag');
      else if (interactive) setState('hover');
      else setState('default');
    };

    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, [isFine, reduced, x, y]);

  if (!isFine || reduced) return null;

  const ringSize = state === 'view' ? 96 : state === 'drag' ? 88 : 34;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-signal"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: visible ? 1 : 0, opacity: state === 'view' || state === 'drag' ? 0 : 1 }}
        aria-hidden="true"
      />
      {/* Ring / label */}
      <motion.div
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[199] flex items-center justify-center rounded-full border border-signal/60"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: ringSize,
          height: ringSize,
          scale: visible ? 1 : 0,
          backgroundColor:
            state === 'view' || state === 'drag' ? 'rgba(198,255,62,0.92)' : 'rgba(198,255,62,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        aria-hidden="true"
      >
        <span
          className="cursor-label select-none font-mono text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: state === 'view' || state === 'drag' ? '#08080b' : 'transparent' }}
        >
          {state === 'view' ? 'VIEW' : state === 'drag' ? 'DRAG' : ''}
        </span>
      </motion.div>
    </>
  );
}
