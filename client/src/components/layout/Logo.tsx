import { Link } from 'react-router-dom';
import { cn } from '../../utils';

/** KYNYX lockup: geometric mark + wordmark. */
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="KYNYX — home"
      className={cn('group inline-flex items-center gap-2.5', className)}
    >
      <span className="relative flex h-8 w-8 items-center justify-center rounded-[10px] bg-signal transition-transform duration-300 group-hover:rotate-[-8deg]">
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 h-[18px] w-[18px]" aria-hidden="true">
          <path
            d="M7 4 V20 M17 4 L10.5 12 L18 20"
            stroke="#08080B"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-signal ring-2 ring-ink" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-mist">
        KYNYX
      </span>
    </Link>
  );
}
