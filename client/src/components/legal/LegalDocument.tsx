import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { EASE } from '../../animations/variants';
import { cn } from '../../utils';

export interface LegalSection {
  id: string;
  title: string;
  body: string;
  icon: LucideIcon;
  /** Optional extra content rendered below `body` — used by the contact
   *  section to show individual office cards instead of a wall of text. */
  render?: () => ReactNode;
}

interface LegalDocumentProps {
  sections: LegalSection[];
  lastUpdated: string;
}

/**
 * Premium legal-document layout shared by the Terms and Privacy pages.
 * Sticky, scrollspy'd table of contents on desktop; icon-badged, numbered
 * cards for each clause. Content (title/body) is passed in untouched —
 * this only changes presentation.
 */
export function LegalDocument({ sections, lastUpdated }: LegalDocumentProps) {
  const [active, setActive] = useState(sections[0]?.id ?? '');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>('[data-legal-section]') ?? [],
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive((entry.target as HTMLElement).id);
          }
        }
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="mx-auto max-w-shell px-5 py-16 md:px-8 md:py-24 lg:px-12">
      <div className="grid gap-14 lg:grid-cols-[240px_1fr] lg:gap-16">
        {/* Sticky sidebar TOC — desktop only */}
        <aside className="hidden lg:block">
          <div className="sticky top-32 flex flex-col gap-4">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ash-deep">On this page</p>
            <nav className="flex flex-col gap-1 border-l border-ink-line pl-4">
              {sections.map((s, i) => {
                const isActive = active === s.id;
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={cn(
                      '-ml-4 flex items-start gap-3 border-l-2 py-2 pl-4 text-sm leading-snug transition-colors duration-300',
                      isActive
                        ? 'border-signal text-mist'
                        : 'border-transparent text-ash hover:border-ink-line hover:text-mist',
                    )}
                  >
                    <span className={cn('font-mono text-[10px]', isActive ? 'text-signal' : 'text-ash-deep')}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{s.title}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div ref={containerRef} className="min-w-0 space-y-5">
          {sections.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id}
                id={s.id}
                data-legal-section
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: EASE, delay: Math.min(i, 6) * 0.05 }}
                className="group scroll-mt-32 rounded-2xl border border-ink-line bg-ink-raised/60 p-6 transition-colors duration-500 hover:border-signal/30 md:p-8"
              >
                <div className="flex items-start gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-line bg-ink-panel text-signal transition-colors duration-500 group-hover:border-signal/50">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display text-xl font-semibold text-mist md:text-2xl">
                      <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, '0')}</span>
                      {s.title}
                    </h2>
                    <p className="mt-4 leading-relaxed text-ash">{s.body}</p>
                    {s.render?.()}
                  </div>
                </div>
              </motion.div>
            );
          })}

          <div className="flex flex-wrap items-center gap-2 border-t border-ink-line pt-8 font-mono text-xs text-ash-deep">
            <Clock className="h-3.5 w-3.5 text-signal" aria-hidden="true" />
            Last updated: {lastUpdated}
          </div>
        </div>
      </div>
    </section>
  );
}
