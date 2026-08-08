import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Insight } from '../../types';
import { cn, formatDate, readingTime } from '../../utils';
import { InsightCover } from '../visuals/InsightCover';

interface InsightCardProps {
  insight: Insight;
  index: number;
  featured?: boolean;
  className?: string;
}

/** Premium overlay-style insight card — cover art with a gradient scrim and
 * text laid over it. Used everywhere an insight is previewed. */
export function InsightCard({ insight, index, featured = false, className }: InsightCardProps) {
  const words = insight.body.join(' ').split(' ').length;

  return (
    <Link
      to={`/insights/${insight.slug}`}
      className={cn(
        'group relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-2xl border border-ink-line shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-signal/40 hover:shadow-glow',
        className,
      )}
    >
      {/* accent bar — sweeps in on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-20 h-[2px] origin-left scale-x-0 bg-signal transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      <div className="absolute inset-0">
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
          <InsightCover category={insight.category} palette={insight.palette} index={index} />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/10 transition-opacity duration-500 group-hover:from-ink group-hover:via-ink/90" />

      <div className="relative z-10 flex items-start justify-between p-6">
        <span className="font-mono text-[10px] uppercase tracking-widest text-mist/40">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="rounded-full border border-white/10 bg-ink/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-mist/90 backdrop-blur-sm transition-colors duration-300 group-hover:border-signal/30">
          {insight.category}
        </span>
      </div>

      <div className="relative z-10 p-6 pt-0">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ash">
          <span>{formatDate(insight.date)}</span>
          <span className="h-1 w-1 rounded-full bg-ash/50" aria-hidden="true" />
          <span>{readingTime(words)}</span>
        </div>
        <h3
          className={cn(
            'mt-3 font-display font-semibold leading-snug text-mist transition-colors duration-300 group-hover:text-signal',
            featured ? 'text-2xl md:text-3xl' : 'text-xl',
          )}
        >
          {insight.title}
        </h3>
        <p
          className={cn(
            'mt-3 text-sm leading-relaxed text-ash/90',
            featured ? 'max-w-lg' : 'line-clamp-2',
          )}
        >
          {insight.description}
        </p>
        <div className="mt-5 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-signal">
          Read article
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
