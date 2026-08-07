import { motion, useScroll } from 'framer-motion';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../../data/site';
import { cn } from '../../utils';
import { Button } from '../ui/Button';
import { Logo } from './Logo';

interface NavbarProps {
  onMenuOpen: () => void;
}

/**
 * Overlay navbar. Unscrolled: transparent, large. Scrolled: reduced height,
 * translucent blur, hairline border.
 */
export function Navbar({ onMenuOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (v) => setScrolled(v > 40));
    return unsubscribe;
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={cn(
        'fixed inset-x-0 top-0 z-[120] transition-all duration-500',
        scrolled
          ? 'border-b border-ink-line bg-ink/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-shell items-center justify-between px-5 transition-all duration-500 md:px-8 lg:px-12',
          scrolled ? 'h-16' : 'h-[84px]',
        )}
      >
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <LinkItem key={link.to} to={link.to} label={link.label} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button to="/contact" variant="primary" arrow className="hidden md:inline-flex">
            Start a Project
          </Button>
          <button
            type="button"
            onClick={onMenuOpen}
            aria-label="Open menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-line text-mist transition-colors hover:border-signal hover:text-signal lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}

function LinkItem({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="group relative py-2 text-sm font-medium text-mist/80 transition-colors hover:text-mist"
    >
      <span className="relative">
        {label}
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-signal transition-all duration-300 group-hover:w-full" />
      </span>
    </Link>
  );
}
