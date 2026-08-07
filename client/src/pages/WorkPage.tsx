import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeUp } from '../animations/variants';
import { PageHero } from '../components/ui/PageHero';
import { ProjectVisual } from '../components/visuals/ProjectVisual';
import { LiveSitePreview } from '../components/visuals/LiveSitePreview';
import { projects } from '../data/projects';
import { useSEO } from '../hooks/useSEO';

const VARIANTS = ['fintech', 'recruitment', 'commerce', 'automation', 'healthcare', 'logistics'] as const;

/** Full portfolio — editorial alternating grid of every case study. */
export default function WorkPage() {
  useSEO(
    'Work',
    'Selected products engineered by KYNYX — fintech platforms, AI systems, commerce experiences and automation layers.',
  );

  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title={
          <>
            Work that
            <br />
            <span className="text-signal">moves businesses.</span>
          </>
        }
        description="A selection of platforms, products and systems we've engineered for ambitious ideas. Every project shipped on time, measured, and built to scale."
      />

      <section className="mx-auto max-w-shell px-5 py-16 md:px-8 md:py-24 lg:px-12" aria-label="Projects">
        <div className="flex flex-col gap-24 md:gap-36">
          {projects.map((project, i) => (
            <motion.article
              key={project.slug}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <Link
                to={`/work/${project.slug}`}
                className={`relative block overflow-hidden rounded-2xl border border-ink-line lg:col-span-7 ${
                  i % 2 === 1 ? 'lg:order-2' : ''
                }`}
                data-cursor="view"
                aria-label={`${project.name} case study`}
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <div className="h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]">
                    {project.liveUrl ? (
                      <LiveSitePreview
                        url={project.liveUrl}
                        title={`${project.name} — live preview`}
                        className="h-full w-full"
                        fallback={<ProjectVisual variant={VARIANTS[i % VARIANTS.length]} palette={project.palette} />}
                      />
                    ) : (
                      <ProjectVisual variant={VARIANTS[i % VARIANTS.length]} palette={project.palette} />
                    )}
                  </div>
                </div>
                <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-ink/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-mist/80 backdrop-blur-sm">
                  {project.industry}
                </span>
                <span className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-signal text-ink opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </Link>

              <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <p className="font-mono text-[10px] uppercase tracking-widest text-ash">
                  {String(i + 1).padStart(2, '0')} — {project.year}
                </p>
                <h2 className="fluid-h3 mt-4 font-display font-semibold text-mist transition-colors duration-300 group-hover:text-signal">
                  {project.name}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ash">{project.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <span key={s} className="rounded-full border border-ink-line px-3 py-1 text-xs text-mist/60">
                      {s}
                    </span>
                  ))}
                </div>
                <p className="mt-6 border-l-2 border-signal pl-4 text-sm font-medium text-mist/80">
                  {project.result}
                </p>
                <Link
                  to={`/work/${project.slug}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-signal transition-opacity hover:opacity-80"
                >
                  View Case Study
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
