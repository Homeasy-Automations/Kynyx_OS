import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { EASE } from '../../animations/variants';
import { services } from '../../data/services';
import { cn } from '../../utils';
import { getServiceIcon } from '../../utils/serviceIcons';

/**
 * Immersive services list. On desktop the left column sticks while the
 * right column scrolls through the eleven services; the sticky panel shows
 * the index of the service currently in view.
 */
export function ServicesSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const inView = useInView(listRef, { margin: '-40% 0px -40% 0px' });

  useEffect(() => {
    if (!inView) return;
    const elements = Array.from(
      listRef.current?.querySelectorAll<HTMLElement>('[data-service-index]') ?? [],
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.serviceIndex);
            setActive(idx);
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [inView]);

  return (
    <section className="relative mx-auto max-w-shell px-5 py-28 md:px-8 md:py-36 lg:px-12" aria-label="Services">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Sticky left column */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-signal">
              <span className="h-px w-8 bg-signal/70" aria-hidden="true" />
              What we do
            </p>
            <h2 className="fluid-h2 mt-6 font-display font-semibold text-mist">
              Services engineered for momentum.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ash md:text-lg">
              Eleven disciplines, one standard. Every engagement is led by senior engineers
              and designers — no hand-offs to juniors, no scope drift.
            </p>

            <div className="mt-10 hidden items-center gap-4 lg:flex" aria-hidden="true">
              <span className="font-display text-7xl font-bold text-signal">
                {services[active]?.number ?? '01'}
              </span>
              <span className="h-px flex-1 bg-ink-line" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-ash">
                {active + 1} / {services.length}
              </span>
            </div>

            <div className="mt-10 hidden lg:block">
              <ActiveServiceMeta service={services[active]} />
            </div>
          </div>
        </div>

        {/* Right column — service rows */}
        <div ref={listRef} className="lg:col-span-7">
          <ol className="flex flex-col">
            {services.map((service, i) => (
              <ServiceRow key={service.slug} service={service} index={i} active={active === i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ActiveServiceMeta({ service }: { service: (typeof services)[number] }) {
  const Icon = getServiceIcon(service.icon);
  return (
    <motion.div
      key={service.slug}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="flex items-start gap-4"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-signal/30 bg-signal-dim text-signal">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <p className="font-display text-lg font-medium text-mist">{service.name}</p>
        <p className="mt-1 text-sm leading-relaxed text-ash">{service.short}</p>
      </div>
    </motion.div>
  );
}

function ServiceRow({
  service,
  index,
  active,
}: {
  service: (typeof services)[number];
  index: number;
  active: boolean;
}) {
  return (
    <li
      data-service-index={index}
      className="border-b border-ink-line transition-colors duration-500 first:border-t"
    >
      <Link
        to={`/services/${service.slug}`}
        className="group relative block px-1 py-10 transition-transform duration-150 active:scale-[0.995] md:px-4 md:py-12"
        aria-label={`${service.name} — view service`}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-5 md:gap-7">
            <span
              className={cn(
                'mt-1 font-mono text-xs tracking-widest transition-colors duration-500',
                active ? 'text-signal' : 'text-ash-deep',
              )}
            >
              {service.number}
            </span>
            <div>
              <h3 className="fluid-h3 font-display font-semibold text-mist transition-transform duration-500 group-hover:translate-x-2">
                {service.name}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-ash md:text-base">
                {service.short}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-ink-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-mist/50 transition-colors duration-300 group-hover:border-signal/40 group-hover:text-signal/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-line text-ash transition-all duration-500 group-hover:rotate-45 group-hover:border-signal group-hover:bg-signal group-hover:text-ink md:h-12 md:w-12">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
            <span
              className={cn(
                'hidden h-1.5 w-1.5 rounded-full transition-opacity duration-300 md:block',
                active ? 'bg-signal opacity-100' : 'bg-ink-line opacity-0',
              )}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Hover wash */}
        <span
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-signal/[0.05] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
      </Link>
    </li>
  );
}
