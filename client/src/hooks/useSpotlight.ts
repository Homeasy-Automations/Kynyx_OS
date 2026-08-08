import { useRef } from 'react';
import type { MouseEvent } from 'react';

/**
 * Tracks pointer position within an element and writes it to CSS custom
 * properties (--spot-x / --spot-y), which the `.spotlight` utility class
 * (see index.css) uses to paint a cursor-following radial glow on hover.
 *
 * Mutates the DOM directly via the ref instead of React state, so the glow
 * tracks at full mousemove frequency with zero re-renders.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onMouseMove = (e: MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  return { ref, onMouseMove };
}
