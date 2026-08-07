import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeUp, stagger } from '../animations/variants';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/ui/Reveal';
import { services } from '../data/services';
import { useSEO } from '../hooks/useSEO';

export default function ServicesPage() {
  useSEO(
    'Services',
    'Eleven engineering disciplines — web, mobile, AI, automation, data and design — delivered to one premium standard by KYNYX.',
  );

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Eighteen disciplines.
            <br />
            <span className="text-signal">One standard.</span>
          </>
        }
        description="Every service is led by senior engineers and designers. No hand-offs to juniors, no scope drift, no surprises on the invoice."
      />

      <section className="mx-auto max-w-shell px-5 py-20 md:px-8 md:py-28 lg:px-12" aria-label="All services">
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.li key={service.slug} variants={fadeUp} className="bg-ink-raised">
              <Link
                to={`/services/${service.slug}`}
                className="group flex h-full flex-col gap-6 p-8 transition-colors duration-500 hover:bg-ink-panel"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-signal">{service.number}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-line text-ash transition-all duration-500 group-hover:rotate-45 group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold leading-tight text-mist transition-colors duration-300 group-hover:text-signal">
                    {service.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ash">{service.short}</p>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {service.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-ink-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-mist/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        <Reveal className="mt-20 flex flex-col items-start justify-between gap-6 rounded-2xl border border-signal/30 bg-signal-dim p-8 md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="font-display text-2xl font-semibold text-mist md:text-3xl">
              Not sure which service you need?
            </h2>
            <p className="mt-2 max-w-xl text-ash">
              Tell us the outcome you&rsquo;re after — we&rsquo;ll map it to the right
              combination of disciplines.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-signal px-7 py-3.5 text-sm font-semibold text-ink transition-transform duration-300 hover:translate-x-1"
          >
            Start a Project
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
