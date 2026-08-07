import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeUp, stagger } from '../../animations/variants';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { WHY_POINTS } from '../../data/site';

/**
 * Why KYNYX — a modular editorial grid rather than standard cards.
 * Each cell is a bordered block; the last cell is a CTA.
 */
export function WhyKynyx() {
  return (
    <section className="mx-auto max-w-shell px-5 py-28 md:px-8 md:py-40 lg:px-12" aria-label="Why KYNYX">
      <SectionHeading
        eyebrow="Why KYNYX"
        title="Built different. On purpose."
        description="Seven commitments that shape every engagement — not marketing claims, operating principles."
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-4"
      >
        {WHY_POINTS.map((point) => (
          <motion.div
            key={point.number}
            variants={fadeUp}
            className="group relative flex min-h-[220px] flex-col justify-between bg-ink-raised p-7 transition-colors duration-500 hover:bg-ink-panel"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-xs text-ash-deep">{point.number}</span>
              <span className="rounded-full border border-ink-line px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-ash transition-colors duration-300 group-hover:border-signal/50 group-hover:text-signal">
                {point.tag}
              </span>
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold leading-snug text-mist transition-colors duration-300 group-hover:text-signal">
                {point.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ash">{point.description}</p>
            </div>
            <span
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-signal transition-transform duration-500 group-hover:scale-x-100"
              aria-hidden="true"
            />
          </motion.div>
        ))}

        {/* CTA cell */}
        <motion.div
          variants={fadeUp}
          className="relative flex min-h-[220px] flex-col justify-between bg-signal p-7"
        >
          <span className="font-mono text-xs font-bold text-ink/60">08</span>
          <div>
            <h3 className="font-display text-xl font-semibold leading-snug text-ink">
              Your project could be next.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Tell us where you want to go — we&rsquo;ll show you the architecture that gets there.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-signal transition-transform duration-300 hover:translate-x-1"
          >
            Start a Project
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
