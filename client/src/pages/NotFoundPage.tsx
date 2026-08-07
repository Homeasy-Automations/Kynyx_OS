import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useSEO } from '../hooks/useSEO';

export default function NotFoundPage() {
  useSEO('404', 'The page you are looking for does not exist.');

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-lines bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"
        aria-hidden="true"
      />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-display text-[clamp(6rem,22vw,16rem)] font-bold leading-none tracking-tightest text-outline"
        aria-hidden="true"
      >
        404
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="mt-4 font-display text-3xl font-semibold text-mist md:text-4xl"
      >
        This page got lost in the build.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-4 max-w-md text-ash"
      >
        The URL you followed doesn&rsquo;t exist — but the products we ship usually do.
        Let&rsquo;s get you back somewhere useful.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Button to="/" variant="primary" arrow>
          Back home
        </Button>
        <Button to="/work" variant="outline">
          See our work
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </motion.div>
    </section>
  );
}
