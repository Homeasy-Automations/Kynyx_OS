import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../../animations/variants';

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
}

/** Interior page hero — consistent editorial header for sub-pages. */
export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-ink-line pt-40 pb-20 md:pt-48 md:pb-28">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-lines bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(198,255,62,0.12), transparent 65%)' }}
        aria-hidden="true"
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-shell px-5 md:px-8 lg:px-12"
      >
        <motion.p
          variants={fadeUp}
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-signal"
        >
          <span className="h-px w-8 bg-signal/70" aria-hidden="true" />
          {eyebrow}
        </motion.p>
        <motion.h1 variants={fadeUp} className="fluid-hero mt-6 max-w-[16ch] font-display font-bold text-mist">
          {title}
        </motion.h1>
        {description && (
          <motion.p variants={fadeUp} className="mt-7 max-w-xl text-lg leading-relaxed text-ash">
            {description}
          </motion.p>
        )}
        {children}
      </motion.div>
    </section>
  );
}
