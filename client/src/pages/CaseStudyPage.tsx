import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Quote } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { fadeUp, stagger } from '../animations/variants';
import { ProjectVisual } from '../components/visuals/ProjectVisual';
import { LiveSitePreview } from '../components/visuals/LiveSitePreview';
import { getProject, projects } from '../data/projects';
import { useSEO } from '../hooks/useSEO';

const VARIANTS = ['fintech', 'recruitment', 'commerce', 'automation', 'healthcare', 'logistics'] as const;

/** Immersive case study: hero, overview, challenge, solution, process,
 *  screenshots, results, stats, testimonial, next-project navigation. */
export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;
  useSEO(project ? `${project.name} — Case Study` : 'Case Study', project?.result);

  if (!project) return <Navigate to="/404" replace />;

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      {/* Immersive hero */}
      <section className="relative overflow-hidden border-b border-ink-line">
        <motion.div
          initial={{ scale: 1.12, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <ProjectVisual variant={VARIANTS[index % VARIANTS.length]} palette={project.palette} />
          {project.liveUrl && (
            <LiveSitePreview
              url={project.liveUrl}
              title={`${project.name} — live preview`}
              className="absolute inset-0 h-full w-full"
              fallback={<></>}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
        </motion.div>

        <div className="relative mx-auto max-w-shell px-5 pb-16 pt-44 md:px-8 md:pb-24 md:pt-56 lg:px-12">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-signal">
              <span className="h-px w-8 bg-signal/70" aria-hidden="true" />
              Case study — {project.industry}
            </motion.p>
            <motion.h1 variants={fadeUp} className="fluid-hero mt-6 max-w-[14ch] font-display font-bold text-mist">
              {project.name}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-relaxed text-mist/80">
              {project.summary}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-2">
              {project.services.map((s) => (
                <span key={s} className="rounded-full border border-white/15 bg-ink/40 px-3 py-1.5 text-xs text-mist/80 backdrop-blur-sm">
                  {s}
                </span>
              ))}
            </motion.div>
            {project.liveUrl && (
              <motion.a
                variants={fadeUp}
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                Visit Live Site
                <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </motion.a>
            )}
          </motion.div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="border-b border-ink-line bg-ink-deep" aria-label="Project facts">
        <div className="mx-auto grid max-w-shell grid-cols-2 gap-px bg-ink-line lg:grid-cols-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="bg-ink-deep px-6 py-8 md:px-10">
              <p className="font-mono text-[10px] uppercase tracking-widest text-ash">{m.label}</p>
              <p className="mt-2 font-display text-2xl font-semibold text-mist">{m.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Narrative */}
      <section className="mx-auto max-w-shell px-5 py-20 md:px-8 md:py-28 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="space-y-20 lg:col-span-8">
            <NarrativeBlock eyebrow="Overview" title="The project">
              <p className="text-base leading-relaxed text-ash md:text-lg">{project.overview}</p>
            </NarrativeBlock>

            <NarrativeBlock eyebrow="Challenge" title="The problem">
              <p className="text-base leading-relaxed text-ash md:text-lg">{project.challenge}</p>
            </NarrativeBlock>

            <NarrativeBlock eyebrow="Solution" title="What we built">
              <p className="text-base leading-relaxed text-ash md:text-lg">{project.solution}</p>
            </NarrativeBlock>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-[10px] uppercase tracking-widest text-ash">Technology</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li key={t} className="rounded-full border border-ink-line px-3.5 py-1.5 font-mono text-xs text-mist/70">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-10 border-l-2 border-signal pl-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-ash">Headline result</p>
                <p className="mt-2 font-display text-2xl font-semibold text-signal">{project.result}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Design & development process */}
      <section className="border-y border-ink-line bg-ink-deep py-20 md:py-28" aria-label="Process">
        <div className="mx-auto max-w-shell px-5 md:px-8 lg:px-12">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-signal">
            <span className="h-px w-8 bg-signal/70" aria-hidden="true" />
            Process
          </p>
          <h2 className="fluid-h2 mt-6 font-display font-semibold text-mist">
            From brief to build.
          </h2>
          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line md:grid-cols-2"
          >
            {project.process.map((step, i) => (
              <motion.li key={step.title} variants={fadeUp} custom={i} className="bg-ink-raised p-8">
                <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-display text-xl font-semibold text-mist">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ash">{step.text}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* Screenshots */}
      <section className="mx-auto max-w-shell px-5 py-20 md:px-8 md:py-28 lg:px-12" aria-label="Screens">
        <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-signal">
          <span className="h-px w-8 bg-signal/70" aria-hidden="true" />
          Screens
        </p>
        <h2 className="fluid-h2 mt-6 font-display font-semibold text-mist">The product.</h2>
        <div className="mt-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="overflow-hidden rounded-2xl border border-ink-line"
          >
            <div className="aspect-[21/9]">
              {project.liveUrl ? (
                <LiveSitePreview
                  url={project.liveUrl}
                  title={`${project.name} — main screen`}
                  className="h-full w-full"
                  fallback={<ProjectVisual variant={VARIANTS[index % VARIANTS.length]} palette={project.palette} />}
                />
              ) : (
                <ProjectVisual variant={VARIANTS[index % VARIANTS.length]} palette={project.palette} />
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results + stats */}
      <section className="border-y border-ink-line bg-ink-deep py-20 md:py-28" aria-label="Results">
        <div className="mx-auto max-w-shell px-5 md:px-8 lg:px-12">
          <div className="grid items-end gap-10 lg:grid-cols-2">
            <div>
              <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-signal">
                <span className="h-px w-8 bg-signal/70" aria-hidden="true" />
                Results
              </p>
              <h2 className="fluid-h2 mt-6 font-display font-semibold text-mist">
                Measured, not claimed.
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line">
              {project.stats.map((stat) => (
                <div key={stat.label} className="bg-ink-raised p-6 md:p-8">
                  <p className="font-display text-3xl font-bold text-signal md:text-4xl">{stat.value}</p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ash">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {project.testimonial && (
        <section className="mx-auto max-w-shell px-5 py-20 md:px-8 md:py-28 lg:px-12" aria-label="Testimonial">
          <motion.figure
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mx-auto max-w-3xl text-center"
          >
            <Quote className="mx-auto h-8 w-8 text-signal" aria-hidden="true" />
            <blockquote className="mt-6 font-display text-2xl font-medium leading-snug tracking-tight text-mist md:text-3xl">
              &ldquo;{project.testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8">
              <p className="text-sm font-semibold text-mist">{project.testimonial.name}</p>
              <p className="text-xs text-ash">{project.testimonial.position}</p>
            </figcaption>
          </motion.figure>
        </section>
      )}

      {/* Next project */}
      <section className="border-t border-ink-line">
        <Link to={`/work/${next.slug}`} className="group block">
          <div className="mx-auto max-w-shell px-5 py-16 md:px-8 md:py-24 lg:px-12">
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-ash">Next case study</p>
                <p className="mt-3 font-display text-4xl font-semibold tracking-tight text-mist transition-colors duration-300 group-hover:text-signal md:text-6xl">
                  {next.name}
                </p>
              </div>
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-ink-line text-mist transition-all duration-500 group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
                <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </div>
        </Link>
      </section>

      <Link to="/work" className="mx-auto mb-16 flex w-fit items-center gap-2 px-5 text-sm text-ash transition-colors hover:text-signal">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to all work
      </Link>
    </>
  );
}

function NarrativeBlock({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
      <p className="font-mono text-[10px] uppercase tracking-widest text-signal">{eyebrow}</p>
      <h2 className="mt-3 font-display text-2xl font-semibold text-mist md:text-3xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </motion.div>
  );
}
