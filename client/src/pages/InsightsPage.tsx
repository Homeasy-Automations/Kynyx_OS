import { motion } from 'framer-motion';
import { useState } from 'react';
import { fadeUp, stagger } from '../animations/variants';
import { InsightCard } from '../components/cards/InsightCard';
import { PageHero } from '../components/ui/PageHero';
import { insights } from '../data/insights';
import { useSEO } from '../hooks/useSEO';
import { cn } from '../utils';

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
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[24rem]"
        >
          {filtered.map((insight, i) => {
            const featured = i === 0;
            return (
              <motion.div
                key={insight.slug}
                variants={fadeUp}
                custom={i}
                className={cn(featured && 'sm:col-span-2 lg:col-span-2 lg:row-span-2')}
              >
                <InsightCard insight={insight} index={i} featured={featured} className="h-full" />
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </>
  );
}
