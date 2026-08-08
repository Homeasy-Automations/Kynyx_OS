import type { Variants } from 'framer-motion';

/** Easing used across the site — expensive, buttery, deliberate. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Fade + rise. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: i * 0.08 },
  }),
};

/** Fade only. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut', delay: i * 0.08 },
  }),
};

/** Stagger container. */
export const stagger: Variants = {
  hidden: {},
  visible: (i: number = 0) => ({
    transition: { staggerChildren: 0.09, delayChildren: i * 0.1 },
  }),
};

/** Clip-path reveal (masked image entrance). */
export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(12% 8% 12% 8% round 12px)', opacity: 0.4 },
  visible: {
    clipPath: 'inset(0% 0% 0% 0% round 0px)',
    opacity: 1,
    transition: { duration: 1.1, ease: EASE },
  },
};

/** Per-word mask reveal (overflow hidden + y translate). */
export const wordReveal: Variants = {
  hidden: { y: '110%' },
  visible: (i: number = 0) => ({
    y: '0%',
    transition: { duration: 0.85, ease: EASE, delay: i * 0.055 },
  }),
};

/** Line mask reveal. */
export const lineReveal: Variants = {
  hidden: { y: '120%' },
  visible: (i: number = 0) => ({
    y: '0%',
    transition: { duration: 0.9, ease: EASE, delay: i * 0.09 },
  }),
};

/** Scale-in for UI chips/pills. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: EASE, delay: i * 0.05 },
  }),
};

/** Page enter/exit used by PageTransition. */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 14, filter: 'blur(4px)' },
  enter: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: 'blur(4px)',
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};
