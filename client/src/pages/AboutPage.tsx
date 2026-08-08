import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../animations/variants';
import { Button } from '../components/ui/Button';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useSEO } from '../hooks/useSEO';

const PRINCIPLES = [
  { title: 'Clarity over cleverness', text: 'If the team can\'t explain it, the product will confuse someone too.' },
  { title: 'Craft is a feature', text: 'The 2% details — easing, spacing, error states — are what people feel.' },
  { title: 'Ship weekly', text: 'Long cycles hide problems. Short cycles expose them early, when they\'re cheap.' },
  { title: 'Own the outcome', text: 'We measure success by your metrics, not our deliverables.' },
];

const TIMELINE = [
  { year: '2019', event: 'KYNYX founded as a two-person engineering studio in New Delhi.' },
  { year: '2021', event: 'First AI product shipped — a document intelligence pipeline for logistics.' },
  { year: '2023', event: 'Expanded into product design and growth engineering; 30+ products delivered.' },
  { year: '2025', event: 'AI-native studio: agents, RAG systems and automation across every engagement.' },
];

/** About — story, principles, timeline and a working-with-us section. */
export default function AboutPage() {
  useSEO(
    'About',
    'KYNYX is a digital engineering, AI and product studio building serious digital products for ambitious businesses.',
  );

  return (
    <>
      <PageHero
        eyebrow="About KYNYX"
        title={
          <>
            A studio built
            <br />
            <span className="text-signal">for serious builders.</span>
          </>
        }
        description="Digital Agency × AI Lab × Product Studio × Engineering Company. KYNYX exists for one reason: ideas are cheap, execution changes industries."
      />

      {/* Story */}
      <section className="mx-auto max-w-shell px-5 py-20 md:px-8 md:py-28 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-widest text-signal">The story</p>
            <h2 className="fluid-h2 mt-6 font-display font-semibold text-mist">
              From two engineers to a global team.
            </h2>
          </Reveal>
          <div className="space-y-6 lg:col-span-6">
            <Reveal>
              <p className="text-lg leading-relaxed text-mist/85">
                KYNYX started with a simple frustration: too much software is built to be
                demoed, not to be lived with. We wanted a studio where engineering
                discipline, design craft and AI fluency lived in the same room.
              </p>
            </Reveal>
            <Reveal delay={1}>
              <p className="text-lg leading-relaxed text-ash">
                Today we work with startups, scale-ups and enterprises across fintech,
                healthcare, commerce, logistics and SaaS. The work is global; the standard
                is singular. Complex technology, simple experiences.
              </p>
            </Reveal>
            <Reveal delay={2}>
              <p className="text-lg leading-relaxed text-ash">
                We stay deliberately small per project — senior people only, no factories.
                That is why the work holds up.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-y border-ink-line py-20 md:py-28" aria-label="Principles">
        <div className="mx-auto max-w-shell px-5 md:px-8 lg:px-12">
          <SectionHeading eyebrow="Principles" title="How we think." />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line md:grid-cols-2"
          >
            {PRINCIPLES.map((p, i) => (
              <motion.div key={p.title} variants={fadeUp} custom={i} className="group bg-ink-raised p-8 transition-colors duration-500 hover:bg-ink-panel">
                <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-mist transition-colors group-hover:text-signal">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ash">{p.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-shell px-5 py-20 md:px-8 md:py-28 lg:px-12" aria-label="Milestones">
        <SectionHeading eyebrow="Milestones" title="The road so far." />
        <ol className="mt-14 space-y-0">
          {TIMELINE.map((t, i) => (
            <motion.li
              key={t.year}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="group grid gap-2 border-b border-ink-line py-8 md:grid-cols-12 md:gap-8"
            >
              <span className="font-display text-2xl font-bold text-signal md:col-span-3">{t.year}</span>
              <p className="max-w-xl text-base text-mist/80 transition-colors group-hover:text-mist md:col-span-8">
                {t.event}
              </p>
              <span className="hidden font-mono text-[10px] uppercase tracking-widest text-ash-deep md:col-span-1 md:block">
                {String(i + 1).padStart(2, '0')}
              </span>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* Work with us */}
      <section className="mx-auto max-w-shell px-5 pb-28 md:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-signal/30 bg-signal-dim p-10 md:flex-row md:items-center md:p-14">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-mist md:text-4xl">
              Work with the studio.
            </h2>
            <p className="mt-3 max-w-lg text-ash">
              Tell us where you want to go. We&rsquo;ll show you the engineering that gets you there.
            </p>
          </div>
          <Button to="/contact" variant="primary" arrow className="shrink-0">
            Start a Project
          </Button>
        </div>
      </section>
    </>
  );
}
