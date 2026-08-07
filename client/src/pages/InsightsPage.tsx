import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fadeUp, stagger } from '../animations/variants';
import { PageHero } from '../components/ui/PageHero';
import { InsightCover } from '../components/visuals/InsightCover';
import { insights } from '../data/insights';
import { useSEO } from '../hooks/useSEO';
import { formatDate, readingTime, cn } from '../utils';

const CATEGORIES = ['All', 'AI', 'Engineering', 'Design', 'Growth', 'Technology'];

export default function InsightsPage() {
  useSEO(
    'Insights',
    'Notes on AI, engineering, design and growth from the KYNYX team building the work.',
  );
  const [category, setCategory] = useState('All');

  const filtered = category === 'All' ? insights : insights.filter((i) => i.category === category);

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Thinking
            <br />
            <span className="text-signal">in public.</span>
          </>
        }
        description="Notes on AI, engineering, design and growth — written by the people building the work, not a content team."
      />

      <section className="mx-auto max-w-shell px-5 py-16 md:px-8 md:py-24 lg:px-12" aria-label="Articles">
        {/* Category filter */}
        <div className="mb-14 flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                'rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-all duration-300',
                category === c
                  ? 'border-signal bg-signal text-ink'
                  : 'border-ink-line text-ash hover:border-signal/50 hover:text-mist',
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div
          key={category}
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((insight, i) => (
            <motion.article key={insight.slug} variants={fadeUp} custom={i}>
              <Link
                to={`/insights/${insight.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-line bg-ink-raised shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-signal/40 hover:shadow-glow"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                    <InsightCover category={insight.category} palette={insight.palette} index={i} />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-raised via-ink-raised/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-ink/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-mist/90 backdrop-blur-sm">
                    {insight.category}
                  </span>
                  <span className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-signal text-ink opacity-0 shadow-glow transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ash">
                      {formatDate(insight.date)}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ash">
                      {readingTime(insight.body.join(' ').split(' ').length)}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-xl font-semibold leading-snug text-mist transition-colors duration-300 group-hover:text-signal">
                    {insight.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ash">{insight.description}</p>
                  <div className="mt-6 flex items-center gap-2 border-t border-ink-line pt-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-signal">
                    Read article
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </>
  );
}
