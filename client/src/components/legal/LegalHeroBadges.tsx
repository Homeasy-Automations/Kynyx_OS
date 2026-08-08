import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { fadeUp } from '../../animations/variants';

interface Badge {
  icon: LucideIcon;
  label: string;
}

/** Row of small trust pills shown beneath a legal page's hero description. */
export function LegalHeroBadges({ badges }: { badges: Badge[] }) {
  return (
    <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
      {badges.map(({ icon: Icon, label }) => (
        <span
          key={label}
          className="flex items-center gap-2 rounded-full border border-ink-line bg-ink-raised/60 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-ash"
        >
          <Icon className="h-3.5 w-3.5 text-signal" aria-hidden="true" />
          {label}
        </span>
      ))}
    </motion.div>
  );
}
