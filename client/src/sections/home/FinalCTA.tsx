import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { WordReveal } from '../../components/ui/WordReveal';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Final CTA — oversized statement over a cursor-reactive radial glow.
 */
export function FinalCTA() {
  const reduced = usePrefersReducedMotion();
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const gx = useSpring(mx, { stiffness: 60, damping: 18 });
  const gy = useSpring(my, { stiffness: 60, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <section
      onMouseMove={onMove}
      className="relative overflow-hidden py-36 md:py-52"
      aria-label="Start a project"
    >
      {/* Cursor-reactive glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(600px circle at ${gx}% ${gy}%, rgba(198,255,62,0.12), transparent 65%)`,
          }}
        />
      </div>

      {/* static grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid-lines bg-[size:64px_64px] opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-shell flex-col items-center px-5 text-center md:px-8 lg:px-12">
        <p className="font-mono text-[11px] uppercase tracking-widest text-signal">
          <span className="mr-3 inline-block h-px w-8 bg-signal/70 align-middle" aria-hidden="true" />
          Let&rsquo;s build
          <span className="ml-3 inline-block h-px w-8 bg-signal/70 align-middle" aria-hidden="true" />
        </p>

        <h2 className="fluid-hero mt-8 font-display font-bold text-mist">
          <WordReveal text="Have an idea" delay={0.1} />
          <br />
          <WordReveal text="worth building?" delay={0.35} accentWords={['building?']} />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-6 max-w-md text-lg text-ash"
        >
          Let&rsquo;s turn it into something people remember.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-10"
        >
          <Button to="/contact" variant="primary" arrow className="px-9 py-4 text-base">
            Start a Project
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
