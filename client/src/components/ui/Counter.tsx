import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/** Animated number counter that runs when scrolled into view. */
export function Counter({ value, suffix = '', prefix = '', duration = 1.8, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = usePrefersReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: reduced ? 0.01 : duration, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
    });
    return unsubscribe;
  }, [spring, prefix, suffix]);

  if (reduced) {
    return (
      <span ref={ref} className={className}>
        {prefix}
        {value}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
