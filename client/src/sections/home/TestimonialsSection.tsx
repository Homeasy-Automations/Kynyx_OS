import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { EASE } from '../../animations/variants';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { TESTIMONIALS } from '../../data/site';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Testimonials — large quotation typography with smooth horizontal
 * transitions. Drag is enabled on the quote card (desktop cursor shows DRAG).
 */
export function TestimonialsSection() {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const reduced = usePrefersReducedMotion();
  const total = TESTIMONIALS.length;

  const paginate = useCallback(
    (dir: number) => setIndex(([i]) => [(i + dir + total) % total, dir]),
    [total],
  );

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => paginate(1), 9000);
    return () => clearInterval(id);
  }, [paginate, reduced]);

  const t = TESTIMONIALS[index];

  const dragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -60) paginate(1);
    else if (info.offset.x > 60) paginate(-1);
  };

  return (
    <section className="relative overflow-hidden border-y border-ink-line py-28 md:py-36" aria-label="Client testimonials">
      <div className="mx-auto max-w-shell px-5 md:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow="Testimonials" title="Clients say it better than we can." />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-line text-mist transition-colors hover:border-signal hover:text-signal"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-line text-mist transition-colors hover:border-signal hover:text-signal"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-16" data-cursor="drag">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.figure
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 80 : -80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -80 : 80 }}
              transition={{ duration: 0.55, ease: EASE }}
              drag={reduced ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={dragEnd}
              className="cursor-grab active:cursor-grabbing"
            >
              <blockquote className="fluid-h3 max-w-4xl font-display font-medium leading-[1.15] tracking-tight text-mist">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="h-10 w-10 rounded-full bg-signal font-display text-sm font-bold text-ink flex items-center justify-center">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-mist">{t.name}</p>
                  <p className="text-xs text-ash">
                    {t.position} · {t.company}
                  </p>
                </div>
                <span className="ml-auto rounded-full border border-ink-line px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ash">
                  {t.projectType}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* progress dots */}
        <div className="mt-12 flex gap-2" aria-hidden="true">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex([i, i > index ? 1 : -1])}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                i === index ? 'w-8 bg-signal' : 'w-1.5 bg-ink-line'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
