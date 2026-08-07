import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, PenTool, Rocket, Search, Wrench } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { EASE, fadeUp, stagger } from '../animations/variants';
import { Accordion } from '../components/ui/Accordion';
import { Button } from '../components/ui/Button';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ProjectVisual } from '../components/visuals/ProjectVisual';
import { getService, services } from '../data/services';
import { projects } from '../data/projects';
import { useSEO } from '../hooks/useSEO';
import { getServiceIcon } from '../utils/serviceIcons';

const VISUAL_VARIANTS = ['fintech', 'recruitment', 'commerce', 'automation', 'healthcare', 'logistics'] as const;

const PROCESS_STEPS = [
  {
    icon: Search,
    title: 'Discover',
    text: 'A short discovery sprint to scope the real problem, audit what exists and agree on success metrics before anything is built.',
  },
  {
    icon: PenTool,
    title: 'Design & Plan',
    text: 'Architecture, milestones and risk areas get mapped and documented — you see the plan before we touch a line of code.',
  },
  {
    icon: Wrench,
    title: 'Build & Test',
    text: 'Senior engineers ship in weekly increments with live demos, code review and testing built into every cycle, not bolted on after.',
  },
  {
    icon: Rocket,
    title: 'Launch & Support',
    text: 'We deploy, monitor and stay close after go-live — most engagements roll straight into ongoing support or an AMC.',
  },
];

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getService(slug) : undefined;
  useSEO(service ? service.name : 'Service', service?.short);

  if (!service) return <Navigate to="/404" replace />;

  const Icon = getServiceIcon(service.icon);
  const next = services[(services.findIndex((s) => s.slug === service.slug) + 1) % services.length];

  // Related case studies — matched by exact service tag, falling back to a
  // shared technology, so the section only appears when it's genuinely relevant.
  const relatedProjects = projects
    .filter(
      (p) =>
        p.services.some((s) => s.toLowerCase() === service.name.toLowerCase()) ||
        p.tech.some((t) => service.tech.some((st) => st.toLowerCase() === t.toLowerCase())),
    )
    .slice(0, 3);

  const faqs = [
    {
      question: `How long does a typical ${service.name.toLowerCase()} engagement take?`,
      answer:
        'It depends on scope — every engagement starts with a discovery sprint that turns into a concrete timeline before you commit to anything. Smaller builds can ship in weeks; platform-level work is scoped in phases with milestones you sign off on.',
    },
    {
      question: `What exactly is included?`,
      answer: `The core deliverables are ${service.deliverables.join(', ').toLowerCase()}. Exact scope is tailored to your product during discovery, and you get weekly demos plus a live roadmap for the full duration of the engagement.`,
    },
    {
      question: 'Do you work alongside our existing team, or run it end-to-end?',
      answer: 'Both — we slot in as an embedded team next to your engineers, or own the engagement end-to-end. Whichever gets your product shipped with less friction.',
    },
    {
      question: 'What happens after launch?',
      answer: 'Most engagements move into ongoing support — monitoring, fixes and iteration — so the product keeps improving after ship day instead of being left alone.',
    },
  ];

  return (
    <>
      <PageHero eyebrow={`Service ${service.number}`} title={service.name} description={service.short}>
        <motion.div variants={fadeUp} className="mt-8 flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-signal/30 bg-signal-dim text-signal">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-ash">
            {String(services.length).padStart(2, '0')} disciplines · senior engineers only · no hand-offs
          </span>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="visible" className="mt-8 flex flex-wrap gap-3">
          {service.tech.map((t, i) => (
            <motion.span
              key={t}
              variants={fadeUp}
              custom={i}
              className="rounded-full border border-ink-line px-4 py-2 font-mono text-xs text-mist/70"
            >
              {t}
            </motion.span>
          ))}
        </motion.div>
      </PageHero>

      <section className="mx-auto max-w-shell px-5 py-20 md:px-8 md:py-28 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-2xl text-lg leading-relaxed text-mist/90 md:text-xl"
            >
              {service.description}
            </motion.p>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="mt-14"
            >
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-signal">
                What you get
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {service.deliverables.map((item, i) => (
                  <motion.li key={item} variants={fadeUp} custom={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/15 text-signal">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    <span className="text-sm text-mist/80">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Process timeline */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="mt-14"
            >
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-signal">How we work</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {PROCESS_STEPS.map((step, i) => (
                  <motion.div
                    key={step.title}
                    variants={fadeUp}
                    custom={i}
                    className="group relative overflow-hidden rounded-2xl border border-ink-line bg-ink-raised p-6 transition-colors duration-300 hover:border-signal/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink-line bg-ink text-signal transition-colors duration-300 group-hover:border-signal/40">
                        <step.icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[10px] text-ash-deep">0{i + 1}</span>
                    </div>
                    <h3 className="mt-5 font-display text-base font-semibold text-mist">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ash">{step.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* FAQ */}
            <div className="mt-14">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-signal">
                Frequently asked
              </h2>
              <div className="mt-6">
                <Accordion items={faqs} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-2xl border border-ink-line bg-ink-raised p-8">
                <h2 className="font-display text-xl font-semibold text-mist">
                  Ready to talk about {service.name.toLowerCase()}?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ash">
                  Tell us about the product or system you have in mind. We&rsquo;ll come
                  back within one business day with initial thoughts.
                </p>
                <Button to="/contact" variant="primary" arrow className="mt-6 w-full">
                  Start a Project
                </Button>
              </div>

              <nav aria-label="All services" className="mt-6 rounded-2xl border border-ink-line">
                <p className="border-b border-ink-line px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-ash">
                  All services
                </p>
                <ul>
                  {services.map((s) => (
                    <li key={s.slug} className="border-b border-ink-line last:border-0">
                      <Link
                        to={`/services/${s.slug}`}
                        className="group flex items-center justify-between px-6 py-3.5 text-sm text-mist/70 transition-colors hover:bg-ink-panel hover:text-signal"
                      >
                        <span className="flex items-center gap-3">
                          <span className="font-mono text-[10px] text-ash-deep">{s.number}</span>
                          {s.name}
                        </span>
                        {s.slug === service.slug && (
                          <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>

        {/* Related work */}
        {relatedProjects.length > 0 && (
          <div className="mt-24 border-t border-ink-line pt-16">
            <SectionHeading
              eyebrow="Related work"
              title="Where this has shipped."
              description={`A few products where ${service.name.toLowerCase()} was part of the build.`}
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                >
                  <Link
                    to={`/work/${project.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-ink-line transition-colors duration-300 hover:border-signal/40"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]">
                        <ProjectVisual
                          variant={VISUAL_VARIANTS[i % VISUAL_VARIANTS.length]}
                          palette={project.palette}
                        />
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-ash">
                        {project.industry}
                      </p>
                      <h3 className="mt-2 flex items-center justify-between gap-3 font-display text-lg font-semibold text-mist transition-colors duration-300 group-hover:text-signal">
                        {project.name}
                        <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ash">{project.result}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Next service */}
        <div className="mt-24 border-t border-ink-line pt-10">
          <Link
            to={`/services/${next.slug}`}
            className="group flex flex-wrap items-center justify-between gap-6"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-ash">Next service</p>
              <p className="mt-2 font-display text-2xl font-semibold text-mist transition-colors group-hover:text-signal md:text-4xl">
                {next.name}
              </p>
            </div>
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ink-line text-mist transition-all duration-500 group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </div>

        <Link to="/services" className="mt-10 inline-flex items-center gap-2 text-sm text-ash transition-colors hover:text-signal">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to all services
        </Link>
      </section>
    </>
  );
}
