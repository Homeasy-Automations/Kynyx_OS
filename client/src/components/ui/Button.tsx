import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type Variant = 'primary' | 'outline' | 'ghost';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 select-none cursor-pointer';

const variants: Record<Variant, string> = {
  primary:
    'bg-signal text-ink hover:bg-signal-soft shadow-[0_0_0_1px_rgba(198,255,62,0.0)] hover:shadow-glow',
  outline:
    'border border-line text-mist hover:border-mist/60 hover:text-signal',
  ghost: 'text-mist hover:text-signal px-4 py-2',
};

/**
 * Premium magnetic button. Wraps Link for internal routes, <a> for external
 * hrefs, and <button> otherwise. Supports keyboard activation natively.
 */
export function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  className,
  arrow = false,
  disabled = false,
  ariaLabel,
}: ButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 180, damping: 14, mass: 0.4 });
  const [hovered, setHovered] = useState(false);

  const handleMouse = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
    my.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
        {arrow && (
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        )}
      </span>
      {variant === 'outline' && (
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-0 rounded-full bg-signal/10 opacity-0 transition-opacity duration-300',
            hovered && 'opacity-100',
          )}
        />
      )}
    </>
  );

  const classes = cn(base, variants[variant], className);

  const motionProps = {
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    onMouseEnter: () => setHovered(true),
    onMouseDown: () => setHovered(true),
  };

  const content = (
    <motion.span
      ref={ref}
      style={reduced ? undefined : { x: sx, y: sy }}
      className="contents"
    >
      {inner}
    </motion.span>
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel} {...motionProps}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
        {...motionProps}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(classes, disabled && 'cursor-not-allowed opacity-50')}
      {...motionProps}
    >
      {content}
    </button>
  );
}
