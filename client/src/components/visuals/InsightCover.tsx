import { cn } from '../../utils';

const ICONS: Record<string, string> = {
  AI: '✦',
  Engineering: '⚙',
  Design: '◇',
  Growth: '↗',
  Technology: '⌘',
};

interface InsightCoverProps {
  category: string;
  palette: { from: string; to: string };
  index: number;
  className?: string;
}

/** Abstract SVG cover for insight cards — gradient field + glyph grid. */
export function InsightCover({ category, palette, index, className }: InsightCoverProps) {
  const glyph = ICONS[category] ?? '✦';
  return (
    <svg viewBox="0 0 640 400" className={cn('h-full w-full', className)} role="img" aria-label={`Cover for ${category} insight`}>
      <defs>
        <linearGradient id={`ic-${category}-${index}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={palette.from} />
          <stop offset="1" stopColor={palette.to} />
        </linearGradient>
      </defs>
      <rect width="640" height="400" fill={`url(#ic-${category}-${index})`} />
      <g stroke="#F4F4F1" strokeOpacity="0.06" strokeWidth="1">
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`v${i}`} x1={i * 110} y1="0" x2={i * 110} y2="400" />
        ))}
        {Array.from({ length: 4 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 110} x2="640" y2={i * 110} />
        ))}
      </g>
      <circle cx="520" cy="80" r="90" fill="#C6FF3E" fillOpacity="0.08" />
      <text x="540" y="108" fontSize="64" textAnchor="middle" fill="#C6FF3E" fillOpacity="0.85">
        {glyph}
      </text>
      <text x="36" y="340" fontSize="13" letterSpacing="4" fill="#F4F4F1" fillOpacity="0.5" fontFamily="ui-monospace, monospace">
        {category.toUpperCase()} / 0{index + 1}
      </text>
      <text x="600" y="340" fontSize="13" textAnchor="end" fill="#F4F4F1" fillOpacity="0.3" fontFamily="ui-monospace, monospace">
        KYNYX
      </text>
    </svg>
  );
}
