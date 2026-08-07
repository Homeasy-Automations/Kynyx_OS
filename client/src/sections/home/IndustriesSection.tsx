import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeUp, stagger } from '../../animations/variants';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { INDUSTRIES } from '../../data/site';

/**
 * Industries — an interactive typography grid. Rows expand on hover to
 * reveal the blurb; oversized wordmark rows keep the editorial feel.
 */
export function IndustriesSection() {
  return (
    <section className="mx-auto max-w-shell px-5 py-28 md:px-8 md:py-40 lg:px-12" aria-label="Industries we serve">
      <SectionHeading
        eyebrow="Industries"
        title="Domain depth, zero dogma."
        description="We bring engineering and design rigor to ten sectors — and the same curiosity to the ones we haven't listed."
      />

      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="mt-16"
      >
        {INDUSTRIES.map((industry, i) => (
          <motion.li key={industry.name} variants={fadeUp}>
            <Link
              to="/work"
              className="group grid grid-cols-12 items-baseline gap-4 border-b border-ink-line py-6 md:py-7"
            >
              <span className="col-span-2 font-mono text-[10px] tracking-widest text-ash-deep md:col-span-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="col-span-8 font-display text-3xl font-semibold tracking-tight text-mist transition-all duration-500 group-hover:translate-x-3 group-hover:text-signal md:col-span-6 md:text-5xl">
                {industry.name}
              </span>
              <span className="col-span-2 text-right md:col-span-4 md:text-left">
                <span className="hidden text-sm text-ash opacity-0 transition-all duration-500 group-hover:opacity-100 md:block">
                  {industry.blurb}
                </span>
                <ArrowUpRight
                  className="ml-auto h-5 w-5 text-ash transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal md:hidden"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
