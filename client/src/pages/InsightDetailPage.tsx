import { ArrowLeft } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../animations/variants';
import { PageHero } from '../components/ui/PageHero';
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

  return (
    <>
      <PageHero
        eyebrow={`${insight.category} / ${formatDate(insight.date)} / ${readingTime(wordCount)}`}
        title={insight.title}
        description={insight.description}
      />

      <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
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
      </article>

      {/* Related */}
      <section className="border-t border-ink-line bg-ink-deep py-16 md:py-24" aria-label="Related insights">
        <div className="mx-auto max-w-shell px-5 md:px-8 lg:px-12">
          <h2 className="font-display text-2xl font-semibold text-mist md:text-3xl">Keep reading</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/insights/${r.slug}`}
                className="group rounded-2xl border border-ink-line bg-ink-raised p-8 transition-colors duration-500 hover:border-signal/40"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-signal">{r.category}</p>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-mist transition-colors group-hover:text-signal">
                  {r.title}
                </h3>
                <p className="mt-3 text-sm text-ash">{r.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
