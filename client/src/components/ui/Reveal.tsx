import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { fadeUp } from '../../animations/variants';
import { cn } from '../../utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  as?: 'div' | 'section' | 'span' | 'li' | 'p';
  once?: boolean;
}

/** Scroll-triggered reveal wrapper. */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as = 'div',
  once = true,
}: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={cn(className)}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
    >
      {children}
    </Component>
  );
}
