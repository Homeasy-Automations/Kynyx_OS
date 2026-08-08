import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { EASE } from '../../animations/variants';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface LoaderProps {
  onDone: () => void;
}

export function Loader({ onDone }: LoaderProps) {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }

    const start = performance.now();

    // Increase loader duration
    const duration = 4000;

    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);

      // Ease Out Expo
      const eased =
        t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

      setProgress(eased * 100);

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          onDone();
        }, 800);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [reduced, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-ink"
      exit={{ y: "-100%" }}
      transition={{
        duration: 1,
        ease: EASE,
      }}
      aria-hidden="true"
    >
      {/* Logo */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.95, 1, 0.95],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex"
      >
        {["K", "Y", "N", "Y", "X"].map((letter, i) => (
          <motion.span
            key={letter + i}
            initial={{
              y: 70,
              opacity: 0,
              filter: "blur(12px)",
            }}
            animate={{
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
            }}
            transition={{
              delay: i * 0.12,
              duration: 0.8,
              ease: EASE,
            }}
            className="font-display text-5xl font-bold tracking-tight text-mist md:text-7xl"
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      {/* Progress */}
      <div className="mt-12 w-72">
        <div className="h-[2px] w-full overflow-hidden rounded-full bg-ink-line">
          <motion.div
            className="h-full rounded-full bg-signal"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="mt-4 flex justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-ash">
          <span>Loading Experience</span>

          <span className="text-signal">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}