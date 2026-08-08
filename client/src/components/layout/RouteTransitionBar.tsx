import { AnimatePresence, motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Thin accent bar that sweeps left-to-right across the top of the viewport
 * on every route change, then fades — a quick "loading the next page" cue
 * that reinforces the page transition without a real network wait.
 */
export function RouteTransitionBar({ routeKey }: { routeKey: string }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={routeKey}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: [1, 1, 0] }}
        transition={{ duration: 0.7, times: [0, 0.6, 1], ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'left' }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[140] h-[2px] bg-signal shadow-glow"
        aria-hidden="true"
      />
    </AnimatePresence>
  );
}
