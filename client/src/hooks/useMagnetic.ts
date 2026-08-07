import { useRef } from 'react';
import type { RefObject } from 'react';

/**
 * Magnetic attraction for interactive elements.
 * Returns a ref and mouse-offset handlers; the consumer applies
 * `transform` via framer-motion.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.32) {
  const ref = useRef<T | null>(null) as RefObject<T>;

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
  };

  return { ref, onMouseMove, onMouseLeave };
}
