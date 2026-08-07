import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { EASE } from '../../animations/variants';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface LoaderProps {
  onDone: () => void;
}

/** Minimal first-load experience: wordmark + progress line, then curtain lift. */
export function Loader({ onDone }: LoaderProps) {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    const start = performance.now();
    const duration = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo-ish
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-ink"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.7, ease: EASE }}
      aria-hidden="true"
    >
      <div className="flex items-baseline gap-3 overflow-hidden">
        {['K', 'Y', 'N', 'Y', 'X'].map((letter, i) => (
          <motion.span
            key={i}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.08 * i, duration: 0.6, ease: EASE }}
            className="font-display text-5xl font-bold tracking-tight text-mist md:text-7xl"
          >
            {letter}
          </motion.span>
        ))}
      </div>

      <div className="mt-10 w-56">
        <div className="h-px w-full bg-ink-line">
          <motion.div
            className="h-px bg-signal"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-widest text-ash">
          <span>Loading experience</span>
          <span className="text-signal">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
