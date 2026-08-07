import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Reveal } from '../../components/ui/Reveal';

const STATEMENT = 'We don\u2019t just build software. We build digital advantages.';
const HIGHLIGHT = new Set(['build', 'digital', 'advantages.']);

/**
 * Editorial introduction — oversized statement where words transition from
 * muted grey to full brightness as the visitor scrolls.
 */
export function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45'],
  });

  return (
    <section ref={ref} className="relative mx-auto max-w-shell px-5 py-32 md:px-8 md:py-44 lg:px-12">
      <Reveal className="mb-10 font-mono text-[11px] uppercase tracking-widest text-signal">
        <span className="mr-3 inline-block h-px w-8 bg-signal/70 align-middle" aria-hidden="true" />
        The KYNYX stance
      </Reveal>

      <h2 className="fluid-h2 font-display font-semibold leading-[1.05] tracking-tight">
        {STATEMENT.split(' ').map((word, i) => (
          <WordHighlight key={`${word}-${i}`} word={word} index={i} progress={scrollYProgress} />
        ))}
      </h2>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        <Reveal delay={1}>
          <p className="max-w-md text-lg leading-relaxed text-ash">
            Software is table stakes. The advantage is in how it&rsquo;s engineered — the
            architecture that scales, the AI woven into the workflow, the design that makes
            complex systems feel simple.
          </p>
        </Reveal>
        <Reveal delay={2}>
          <p className="max-w-md text-lg leading-relaxed text-ash">
            That&rsquo;s what we build: not just products, but the competitive distance
            they create. Design it. Engineer it. Scale it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function WordHighlight({
  word,
  index,
  progress,
}: {
  word: string;
  index: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const start = index / 9;
  const end = (index + 1) / 9;
  // Color-only transition — dimmed words stay ≥ 4.5:1 on ink (WCAG AA).
  const color = useTransform(progress, [start, end], ['#8A8A94', HIGHLIGHT.has(word) ? '#C6FF3E' : '#F4F4F1']);

  return (
    <motion.span style={{ color }} className="inline-block pb-1">
      {word}
      {index < 9 ? '\u00A0' : ''}
    </motion.span>
  );
}
