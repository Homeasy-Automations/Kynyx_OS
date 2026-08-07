import { motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EASE } from '../../animations/variants';
import { CONTACT, NAV_LINKS, SOCIAL_LINKS } from '../../data/site';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Fullscreen mobile navigation — staggered link entrance, animated accent
 * panel, contact CTA and social links.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[150] lg:hidden"
      initial={{ pointerEvents: 'none' }}
      animate={{ pointerEvents: open ? 'auto' : 'none' }}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-ink-deep"
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 0.96 : 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
      />
      {/* Accent panel sweep */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1.5 bg-signal"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: open ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ transformOrigin: 'top' }}
      />

      <div
        className={`relative flex h-full flex-col px-6 pt-6 pb-10 transition-opacity duration-500 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-bold tracking-tight text-mist">
            KYNYX
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-line text-mist transition-colors hover:border-signal hover:text-signal"
          >
            <motion.span
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </motion.span>
          </button>
        </div>

        <nav aria-label="Mobile" className="mt-14 flex flex-1 flex-col gap-1">
          {NAV_LINKS.map((link, i) => (
            <motion.div
              key={link.to}
              initial={{ y: 40, opacity: 0 }}
              animate={open ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
              transition={{ delay: open ? 0.15 + i * 0.08 : 0, duration: 0.55, ease: EASE }}
            >
              <Link
                to={link.to}
                onClick={onClose}
                className="group flex items-center justify-between border-b border-ink-line py-4"
              >
                <span className="font-display text-4xl font-semibold tracking-tight text-mist transition-colors group-hover:text-signal">
                  {link.label}
                </span>
                <ArrowUpRight
                  className="h-6 w-6 text-ash transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-signal"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={open ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ delay: open ? 0.6 : 0, duration: 0.5, ease: EASE }}
          className="flex flex-col gap-5"
        >
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-signal px-6 py-3.5 text-sm font-semibold text-ink"
          >
            Start a Project
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <div className="flex flex-wrap items-center gap-4">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[11px] uppercase tracking-widest text-ash transition-colors hover:text-signal"
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
