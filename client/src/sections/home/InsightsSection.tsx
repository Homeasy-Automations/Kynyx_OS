import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeUp, stagger } from '../../animations/variants';
import { InsightCard } from '../../components/cards/InsightCard';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { insights } from '../../data/insights';

/** Home preview of the latest three insights. */
export function InsightsSection() {
  const latest = insights.slice(0, 3);

  return (
    <section className="mx-auto max-w-shell px-5 py-28 md:px-8 md:py-40 lg:px-12" aria-label="Insights">
      <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          eyebrow="Insights"
          title="Thinking in public."
          description="Notes on AI, engineering, design and growth from the team building the work."
        />
        <Link
          to="/insights"
          className="group inline-flex items-center gap-2 rounded-full border border-ink-line px-6 py-3 text-sm font-medium text-mist transition-colors hover:border-signal hover:text-signal"
        >
          All insights
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid gap-6 md:grid-cols-3"
      >
        {latest.map((insight, i) => (
          <motion.div key={insight.slug} variants={fadeUp} custom={i}>
            <InsightCard insight={insight} index={i} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
