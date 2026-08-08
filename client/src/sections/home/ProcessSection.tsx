import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { EASE, fadeUp } from '../../animations/variants';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { PROCESS_STEPS } from '../../data/site';
import { cn } from '../../utils';

/**
 * Process — an animated horizontal timeline. A progress line fills as the
 * section scrolls; each stage reveals its supporting content on hover/focus.
 */
export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.35'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section ref={ref} className="relative border-y border-ink-line py-28 md:py-36" aria-label="Our process">
      <div className="mx-auto max-w-shell px-5 md:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Process"
          title="How we turn ideas into products."
          description="Six stages, one continuous thread. Every step has an owner, an output and a definition of done."
        />

        <div className="mt-20">
          {/* Progress line */}
          <div className="relative h-px w-full bg-ink-line">
            <motion.div
              className="absolute inset-y-0 left-0 bg-signal"
              style={{ scaleX: progress, transformOrigin: 'left' }}
              aria-hidden="true"
            />
            <div className="absolute -top-[5px] left-0 flex w-full justify-between" aria-hidden="true">
              {PROCESS_STEPS.map((step, i) => (
                <span
                  key={step.number}
                  className={cn(
                    'h-[11px] w-[11px] rounded-full border-2 transition-colors duration-300',
                    i <= active ? 'border-signal bg-signal' : 'border-ink-line bg-ink-deep',
                  )}
                />
              ))}
            </div>
          </div>

          {/* Stage list */}
          <ol className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {PROCESS_STEPS.map((step, i) => (
              <motion.li key={step.number} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onMouseLeave={() => setActive(0)}
                  onBlur={() => setActive(0)}
                  className={cn(
                    'group flex h-full w-full flex-col items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-500',
                    active === i
                      ? 'border-signal/50 bg-signal-dim'
                      : 'border-ink-line bg-ink-raised hover:border-signal/30',
                  )}
                  aria-pressed={active === i}
                >
                  <span
                    className={cn(
                      'font-display text-3xl font-bold transition-colors duration-300',
                      active === i ? 'text-signal' : 'text-ash-deep',
                    )}
                  >
                    {step.number}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-mist">{step.title}</h3>
                  <motion.p
                    className="text-sm leading-relaxed text-ash"
                    animate={{ opacity: active === i ? 1 : 0.92, y: active === i ? 0 : 4 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    {step.description}
                  </motion.p>
                  <span className="mt-auto inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-signal/80">
                    <span className="h-1 w-1 rounded-full bg-signal" aria-hidden="true" />
                    {step.output}
                  </span>
                </button>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
