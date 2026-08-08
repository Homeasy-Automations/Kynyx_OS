import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { EASE, fadeUp, stagger } from '../../animations/variants';
import { Button } from '../../components/ui/Button';
import { WordReveal } from '../../components/ui/WordReveal';

/**
 * Hero — 100vh. Oversized headline and a sequenced entrance:
 * 1 navbar (handled by AppShell) 2 headline words 3 description 4 CTAs
 * 5 scroll indicator.
 *
 * The grid lines, gradient glow, particle constellation and floating
 * AI/data motif used to live here, scoped to just this section. They now
 * live in <AmbientBackground /> (mounted in AppShell, fixed to the
 * viewport, home route only) so the same background runs behind every
 * section on the page instead of scrolling away after the hero.
 */
export function Hero() {
  const { scrollY } = useScroll();
  const yFg = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Content */}
      <motion.div
        style={{ y: yFg, opacity }}
        className="relative z-10 mx-auto w-full max-w-shell px-5 pb-24 pt-40 md:px-8 lg:px-12"
      >
        <motion.p
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-widest text-ash md:text-xs"
        >
          {['Web', 'Mobile', 'AI', 'Design', 'Growth'].map((item, i) => (
            <motion.span key={item} variants={fadeUp} className="flex items-center gap-3">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-signal" aria-hidden="true" />}
              {item}
            </motion.span>
          ))}
        </motion.p>

        <h1 className="fluid-hero font-display font-bold text-mist">
          <WordReveal text="We engineer digital" delay={0.25} />
          <br />
          <WordReveal text="experiences that move" delay={0.5} />
          <br />
          <WordReveal text="businesses forward." delay={0.75} accentWords={['forward.']} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.7, ease: EASE }}
          className="mt-8 max-w-xl text-base leading-relaxed text-ash md:text-lg"
        >
          KYNYX designs and engineers digital products, intelligent systems and scalable
          technology for ambitious businesses — from seed-stage startups to global enterprises.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button to="/contact" variant="primary" arrow>
            Start a Project
          </Button>
          <Button to="/work" variant="outline" arrow>
            Explore Our Work
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        aria-label="Scroll to content"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ash transition-colors hover:text-signal"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </motion.span>
      </motion.button>
    </section>
  );
}
