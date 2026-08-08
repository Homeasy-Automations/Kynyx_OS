import { cn } from '../../utils';

const GLYPHS: Record<string, string> = {
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

/** Deterministic pseudo-random generator — same (category, index) always
 * produces the same particle scatter, so covers don't jitter on re-render. */
function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Abstract cover art for insight cards — mesh glow, orbit rings, drifting
 * particles and a badged category glyph. Unique per (category, index). */
export function InsightCover({ category, palette, index, className }: InsightCoverProps) {
  const glyph = GLYPHS[category] ?? '✦';
  const uid = `${category}-${index}`;
  const rand = seeded(index * 97 + category.split('').reduce((a, c) => a + c.charCodeAt(0), 0));

  const particles = Array.from({ length: 9 }, (_, i) => ({
    cx: 60 + rand() * 560,
    cy: 40 + rand() * 320,
    r: 1.5 + rand() * 2.5,
    o: 0.12 + rand() * 0.3,
    key: i,
  }));

  return (
    <svg
      viewBox="0 0 640 400"
      className={cn('h-full w-full', className)}
      role="img"
      aria-label={`Cover for ${category} insight`}
    >
      <defs>
        <linearGradient id={`ic-bg-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={palette.from} />
          <stop offset="1" stopColor={palette.to} />
        </linearGradient>
        <radialGradient id={`ic-glow-${uid}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#C6FF3E" stopOpacity="0.28" />
          <stop offset="1" stopColor="#C6FF3E" stopOpacity="0" />
        </radialGradient>
        <filter id={`ic-blur-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
      </defs>

      {/* base */}
      <rect width="640" height="400" fill={`url(#ic-bg-${uid})`} />

      {/* soft glow */}
      <circle cx="470" cy="120" r="180" fill={`url(#ic-glow-${uid})`} filter={`url(#ic-blur-${uid})`} />

      {/* orbit rings */}
      <g fill="none" stroke="#F4F4F1" strokeOpacity="0.14">
        <circle cx="470" cy="120" r="46" />
        <circle cx="470" cy="120" r="86" strokeOpacity="0.09" />
        <circle cx="470" cy="120" r="132" strokeOpacity="0.05" strokeDasharray="2 8" />
      </g>

      {/* diagonal light beam */}
      <line x1="-40" y1="440" x2="420" y2="-40" stroke="#C6FF3E" strokeOpacity="0.08" strokeWidth="140" />

      {/* drifting particles */}
      <g fill="#F4F4F1">
        {particles.map((p) => (
          <circle key={p.key} cx={p.cx} cy={p.cy} r={p.r} fillOpacity={p.o} />
        ))}
      </g>

      {/* category badge */}
      <rect x="36" y="36" width="64" height="64" rx="18" fill="rgba(244,244,241,0.06)" stroke="rgba(244,244,241,0.14)" />
      <text x="68" y="80" fontSize="28" textAnchor="middle" fill="#C6FF3E">
        {glyph}
      </text>

      {/* labels */}
      <text x="36" y="352" fontSize="13" letterSpacing="4" fill="#F4F4F1" fillOpacity="0.55" fontFamily="ui-monospace, monospace">
        {category.toUpperCase()} / 0{index + 1}
      </text>
      <text x="604" y="352" fontSize="13" textAnchor="end" fill="#F4F4F1" fillOpacity="0.3" fontFamily="ui-monospace, monospace">
        KYNYX
      </text>
    </svg>
  );
}
