import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin signal-coloured bar pinned to the top of the viewport, tracking
 * how far the reader has scrolled through the page. */
export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.2 });

  return (
    <motion.div
      style={{ scaleX: width }}
      className="fixed inset-x-0 top-0 z-[130] h-[3px] origin-left bg-signal shadow-glow"
      aria-hidden="true"
    />
  );
}
