import { motion } from 'framer-motion';
import { wordReveal } from '../../animations/variants';
import { cn } from '../../utils';

interface WordRevealProps {
  text: string;
  className?: string;
  accentWords?: string[];
  delay?: number;
}

/**
 * Per-word masked reveal. Words listed in accentWords render in signal.
 * Renders a span — the parent heading carries the semantics.
 */
export function WordReveal({ text, className, accentWords = [], delay = 0 }: WordRevealProps) {
  const words = text.split(' ');
  return (
    <span className={cn('inline', className)}>
      {words.map((word, i) => {
        const isAccent = accentWords.includes(word.replace(/[.,]/g, ''));
        return (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden pb-[0.12em] align-bottom"
          >
            <motion.span
              custom={delay + i * 0.05}
              variants={wordReveal}
              initial="hidden"
              animate="visible"
              className={cn(
                'inline-block will-change-transform',
                isAccent && 'text-signal',
              )}
            >
              {word}
              {i < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
