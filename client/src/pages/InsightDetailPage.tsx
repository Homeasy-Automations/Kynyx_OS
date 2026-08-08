import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Quote, Users } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { clipReveal, fadeUp, stagger } from '../animations/variants';
import { BackToTop } from '../components/insights/BackToTop';
import { ReadingProgressBar } from '../components/insights/ReadingProgressBar';
import { ShareRow } from '../components/insights/ShareRow';
import { InsightCard } from '../components/cards/InsightCard';
import { Button } from '../components/ui/Button';
import { PageHero } from '../components/ui/PageHero';
import { InsightCover } from '../components/visuals/InsightCover';
import { getInsight, insights } from '../data/insights';
import { useSEO } from '../hooks/useSEO';
import { formatDate, readingTime } from '../utils';

export default function InsightDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const insight = slug ? getInsight(slug) : undefined;
  useSEO(insight ? insight.title : 'Insight', insight?.description);

  if (!insight) return <Navigate to="/404" replace />;

  const wordCount = insight.body.join(' ').split(' ').length;
  const related = insights.filter((i) => i.slug !== insight.slug).slice(0, 2);

  // Pull-quote: the first sentence of the middle paragraph, re-presented as
  // a decorative highlight. Same original text, just re-emphasised — no new copy.
  const quoteParagraphIndex = Math.floor(insight.body.length / 2);
  const pullQuote = insight.body[quoteParagraphIndex]?.split('. ')[0]?.replace(/\.$/, '');

  return (
    <>
      <ReadingProgressBar />

      <PageHero eyebrow={insight.category} title={insight.title} description={insight.description} />

      <div className="mx-auto max-w-4xl px-5 md:px-8">
        {/* Hero cover */}
        <motion.div
          variants={clipReveal}
          initial="hidden"
          animate="visible"
          className="-mt-8 aspect-[21/9] overflow-hidden rounded-2xl border border-ink-line shadow-card md:-mt-12"
        >
          <InsightCover category={insight.category} palette={insight.palette} index={insights.indexOf(insight)} />
        </motion.div>

        {/* Meta strip */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-ink-line pb-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-ash">
            <span className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-signal" aria-hidden="true" />
              {formatDate(insight.date)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-signal" aria-hidden="true" />
              {readingTime(wordCount)}
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5 text-signal" aria-hidden="true" />
              The KYNYX team
            </span>
          </div>
          <ShareRow title={insight.title} />
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="space-y-8"
        >
          {insight.body.map((paragraph, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              custom={i}
              className="text-lg leading-relaxed text-mist/80 first:first-letter:float-left first:first-letter:mr-3 first:first-letter:font-display first:first-letter:text-6xl first:first-letter:font-bold first:first-letter:text-signal"
            >
              {paragraph}
            </motion.p>
          ))}

          {pullQuote && (
            <motion.blockquote
              variants={fadeUp}
              className="relative border-l-2 border-signal py-2 pl-8"
            >
              <Quote className="absolute -left-[15px] top-0 h-7 w-7 rotate-180 text-signal" aria-hidden="true" />
              <p className="font-display text-2xl font-medium leading-snug text-mist md:text-3xl">
                {pullQuote}.
              </p>
            </motion.blockquote>
          )}
        </motion.div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-ink-line pt-8">
          <Link to="/insights" className="inline-flex items-center gap-2 text-sm text-ash transition-colors hover:text-signal">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All insights
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ash">
            KYNYX — {insight.category}
          </span>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-ink-line bg-ink-raised p-8 text-center md:p-12">
          <h2 className="font-display text-2xl font-semibold text-mist md:text-3xl">
            Enjoyed this? Let&rsquo;s build something.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ash">
            Tell us about the product or system you have in mind — we reply personally, within one business day.
          </p>
          <Button to="/contact" variant="primary" arrow className="mt-6">
            Start a Project
          </Button>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-ink-line bg-ink-deep py-16 md:py-24" aria-label="Related insights">
          <div className="mx-auto max-w-shell px-5 md:px-8 lg:px-12">
            <h2 className="font-display text-2xl font-semibold text-mist md:text-3xl">Keep reading</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {related.map((r) => (
                <InsightCard key={r.slug} insight={r} index={insights.indexOf(r)} className="min-h-[20rem]" />
              ))}
            </div>
          </div>
        </section>
      )}

      <BackToTop />
    </>
  );
}
