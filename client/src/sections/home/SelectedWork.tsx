import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EASE } from '../../animations/variants';
import { ProjectVisual } from '../../components/visuals/ProjectVisual';
import { LiveSitePreview } from '../../components/visuals/LiveSitePreview';
import { projects } from '../../data/projects';
import { cn } from '../../utils';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const VARIANTS = ['fintech', 'recruitment', 'commerce', 'automation', 'healthcare', 'logistics'] as const;

/**
 * Featured work — alternating oversized project cards with masked image
 * entrances, image zoom, metadata reveal and a cursor-following VIEW label.
 */
export function SelectedWork() {
  return (
    <section className="mx-auto max-w-shell overflow-hidden px-5 py-28 md:px-8 md:py-40 lg:px-12" aria-label="Selected work">
      <div className="mb-20 flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-signal">
            <span className="h-px w-8 bg-signal/70" aria-hidden="true" />
            Our Work
          </p>
          <h2 className="fluid-h2 mt-6 font-display font-semibold text-mist">Selected Work</h2>
          <p className="mt-4 max-w-md text-base text-ash md:text-lg">
            Products we&rsquo;ve engineered for ambitious ideas.
          </p>
        </div>
        <Link
          to="/work"
          className="group inline-flex items-center gap-2 rounded-full border border-ink-line px-6 py-3 text-sm font-medium text-mist transition-colors hover:border-signal hover:text-signal"
        >
          All projects
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>

      <div className="flex flex-col gap-28 md:gap-40">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  flip,
}: {
  project: (typeof projects)[number];
  index: number;
  flip: boolean;
}) {
  const isFine = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduced = usePrefersReducedMotion();
  const [hovering, setHovering] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const labelX = useSpring(mx, { stiffness: 200, damping: 22 });
  const labelY = useSpring(my, { stiffness: 200, damping: 22 });

  const onMove = (e: React.MouseEvent) => {
    if (!isFine) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <article
      className={cn('group relative grid items-center gap-8 lg:grid-cols-12 lg:gap-12', flip && 'lg:[direction:rtl]')}
      data-cursor="view"
      onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Visual */}
      <motion.div
        initial={{ clipPath: 'inset(10% 6% 10% 6% round 16px)', opacity: 0.5 }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 0px)', opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: EASE }}
        className="relative overflow-hidden rounded-2xl border border-ink-line lg:col-span-7 lg:[direction:ltr]"
      >
        <div className="aspect-[3/2] overflow-hidden md:aspect-[16/10]">
          <div className="h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]">
            {project.liveUrl ? (
              <LiveSitePreview
                url={project.liveUrl}
                title={`${project.name} — live preview`}
                className="h-full w-full"
                fallback={<ProjectVisual variant={VARIANTS[index % VARIANTS.length]} palette={project.palette} />}
              />
            ) : (
              <ProjectVisual variant={VARIANTS[index % VARIANTS.length]} palette={project.palette} />
            )}
          </div>
        </div>
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
        <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-ink/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-mist/80 backdrop-blur-sm">
          {project.industry}
        </span>
        <span className="absolute right-5 top-5 rounded-full border border-white/10 bg-ink/60 px-3 py-1.5 font-mono text-[10px] tracking-widest text-mist/60 backdrop-blur-sm">
          {project.year}
        </span>
      </motion.div>

      {/* Meta */}
      <div className="lg:col-span-5 lg:[direction:ltr]">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ash">
          {String(index + 1).padStart(2, '0')} — {project.industry}
        </p>
        <h3 className="fluid-h3 mt-4 font-display font-semibold text-mist transition-colors duration-300 group-hover:text-signal">
          {project.name}
        </h3>
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
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
        </Link>
      </div>

      {/* Cursor-following label (desktop only) */}
      {isFine && !reduced && (
        <motion.span
          style={{ x: labelX, y: labelY }}
          className="pointer-events-none absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-widest text-ink md:block"
          animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.7 }}
          transition={{ duration: 0.25 }}
          aria-hidden="true"
        >
          View Project
        </motion.span>
      )}
    </article>
  );
}
