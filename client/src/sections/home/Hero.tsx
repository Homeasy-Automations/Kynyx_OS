import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { EASE, fadeUp, stagger } from '../../animations/variants';
import { FloatingAIField } from '../../components/effects/FloatingAIField';
import { ParticleField } from '../../components/effects/ParticleField';
import { Button } from '../../components/ui/Button';
import { WordReveal } from '../../components/ui/WordReveal';
import { useAppReady } from '../../context/AppReadyContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Hero — 100vh. Particle constellation, floating AI/data motif, oversized
 * headline and a sequenced entrance:
 * 1 navbar (handled by AppShell) 2 headline words 3 description 4 CTAs
 * 5 background activates 6 scroll indicator.
 */
export function Hero() {
  const reduced = usePrefersReducedMotion();
  const ready = useAppReady();
  const { scrollY } = useScroll();
  const yFg = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid-lines bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_40%,black,transparent)]" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 70% 20%, rgba(198,255,62,0.07), transparent 60%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(110,168,255,0.05), transparent 60%)',
        }}
        aria-hidden="true"
      />
      <ParticleField className="absolute inset-0 h-full w-full opacity-70" />

      {/* Free-floating AI/data motif — drifts on its own, recoils from the cursor.
          Gated on `ready` (loader finished) so its entrance plays visibly on first
          load too, instead of running out unseen underneath the loader. */}
      {!reduced && ready && <FloatingAIField />}

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
