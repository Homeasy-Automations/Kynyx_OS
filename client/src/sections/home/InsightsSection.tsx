import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InsightCover } from '../../components/visuals/InsightCover';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { insights } from '../../data/insights';
import { formatDate, readingTime } from '../../utils';

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

      <div className="grid gap-8 md:grid-cols-3">
        {latest.map((insight, i) => (
          <Link
            key={insight.slug}
            to={`/insights/${insight.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-ink-line bg-ink-raised transition-colors duration-500 hover:border-signal/40"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                <InsightCover category={insight.category} palette={insight.palette} index={i} />
              </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-signal">
                  {insight.category}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-ash">
                  {readingTime(insight.body.join(' ').split(' ').length)}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-mist transition-colors duration-300 group-hover:text-signal">
                {insight.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ash">{insight.description}</p>
              <div className="mt-6 flex items-center justify-between border-t border-ink-line pt-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ash">
                  {formatDate(insight.date)}
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-ash transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal"
                  aria-hidden="true"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
