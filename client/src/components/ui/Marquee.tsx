import { cn } from '../../utils';

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  className?: string;
  separator?: string;
}

/** Infinite horizontal marquee of label items. */
export function Marquee({ items, reverse, className, separator = '✦' }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div
      className={cn('mask-fade-x overflow-hidden', className)}
      aria-hidden="true"
    >      <div
        className={cn(
          'flex w-max items-center gap-8 pr-8',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
        )}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-8 whitespace-nowrap font-display text-lg font-medium tracking-tight text-ash/80 md:text-2xl"
          >
            {item}
            <span className="text-[10px] text-signal">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
