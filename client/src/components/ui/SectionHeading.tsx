import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../../animations/variants';
import { cn } from '../../utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Editorial section heading: numbered eyebrow, oversized display title,
 * optional supporting description.
 */
export function SectionHeading({ eyebrow, title, description, align = 'left', className }: SectionHeadingProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={cn(
        'flex flex-col gap-6',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <motion.p
        variants={fadeUp}
        className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-signal"
      >
        <span className="h-px w-8 bg-signal/70" aria-hidden="true" />
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className="fluid-h2 font-display font-semibold text-mist max-w-[18ch]"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className="max-w-xl text-base leading-relaxed text-ash md:text-lg"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
