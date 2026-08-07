import { cn } from '../../utils';

interface ProjectVisualProps {
  palette: { from: string; to: string; accent: string };
  variant: 'fintech' | 'recruitment' | 'commerce' | 'automation' | 'healthcare' | 'logistics';
  className?: string;
}

/**
 * Abstract premium product mockups drawn in SVG — deterministic, crisp and
 * theme-consistent. Each variant suggests a different product surface
 * (ledger, matching list, storefront, workflow, dashboard, map).
 */
export function ProjectVisual({ palette, variant, className }: ProjectVisualProps) {
  return (
    <svg
      viewBox="0 0 1200 800"
      className={cn('h-full w-full', className)}
      role="img"
      aria-label={`Abstract visual of the ${variant} product`}
    >
      <defs>
        <linearGradient id={`bg-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={palette.from} />
          <stop offset="1" stopColor={palette.to} />
        </linearGradient>
        <radialGradient id={`glow-${variant}`} cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor={palette.accent} stopOpacity="0.35" />
          <stop offset="1" stopColor={palette.accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`bar-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={palette.accent} stopOpacity="0.9" />
          <stop offset="1" stopColor={palette.accent} stopOpacity="0.3" />
        </linearGradient>
      </defs>

      <rect width="1200" height="800" fill={`url(#bg-${variant})`} />
      <rect width="1200" height="800" fill={`url(#glow-${variant})`} />

      {/* background grid */}
      <g stroke="#ffffff" strokeOpacity="0.045" strokeWidth="1">
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="800" />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 100} x2="1200" y2={i * 100} />
        ))}
      </g>

      {variant === 'fintech' && <FintechVisual accent={palette.accent} />}
      {variant === 'recruitment' && <RecruitmentVisual accent={palette.accent} />}
      {variant === 'commerce' && <CommerceVisual accent={palette.accent} />}
      {variant === 'automation' && <AutomationVisual accent={palette.accent} />}
      {variant === 'healthcare' && <HealthcareVisual accent={palette.accent} />}
      {variant === 'logistics' && <LogisticsVisual accent={palette.accent} />}
    </svg>
  );
}

function Frame({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <g>
      <rect x="300" y="150" width="600" height="500" rx="20" fill="#0A0A0E" fillOpacity="0.85" stroke="#ffffff" strokeOpacity="0.1" />
      <rect x="300" y="150" width="600" height="46" rx="20" fill="#ffffff" fillOpacity="0.04" />
      <circle cx="326" cy="173" r="5" fill={accent} />
      <circle cx="344" cy="173" r="5" fill="#ffffff" fillOpacity="0.25" />
      <circle cx="362" cy="173" r="5" fill="#ffffff" fillOpacity="0.25" />
      {children}
    </g>
  );
}

function FintechVisual({ accent }: { accent: string }) {
  return (
    <Frame accent={accent}>
      <text x="330" y="232" fontSize="15" fontWeight="700" fill="#F4F4F1">Treasury overview</text>
      <text x="330" y="252" fontSize="11" fill="#8E8E98">Net position · 12 banks</text>
      <text x="330" y="316" fontSize="34" fontWeight="700" fill={accent}>₹ 48.2 Cr</text>
      <text x="330" y="336" fontSize="11" fill="#8E8E98">Available today</text>
      {[0, 1, 2].map((i) => (
        <rect key={i} x="330" y={366 + i * 52} width="540" height="40" rx="8" fill="#ffffff" fillOpacity="0.04" />
      ))}
      <rect x="330" y="372" width="220" height="12" rx="6" fill="#ffffff" fillOpacity="0.14" />
      <rect x="330" y="392" width="160" height="8" rx="4" fill="#ffffff" fillOpacity="0.07" />
      <rect x="566" y="418" width="304" height="12" rx="6" fill="#ffffff" fillOpacity="0.14" />
      <rect x="566" y="438" width="200" height="8" rx="4" fill="#ffffff" fillOpacity="0.07" />
      <rect x="330" y="524" width="540" height="72" rx="10" fill={accent} fillOpacity="0.12" stroke={accent} strokeOpacity="0.3" />
      <text x="350" y="556" fontSize="11" fill="#F4F4F1">AI copilot</text>
      <text x="350" y="576" fontSize="12" fill={accent}>“Net position next Tuesday?” — 2.1s</text>
    </Frame>
  );
}

function RecruitmentVisual({ accent }: { accent: string }) {
  return (
    <Frame accent={accent}>
      <text x="330" y="232" fontSize="15" fontWeight="700" fill="#F4F4F1">Candidate shortlist</text>
      <text x="330" y="252" fontSize="11" fill="#8E8E98">Ranked by fit · 1,240 applicants</text>
      {[
        { name: 'Ananya S.', role: 'Senior Frontend', score: '96', w1: 200, w2: 160 },
        { name: 'Vikram R.', role: 'Staff Engineer', score: '92', w1: 170, w2: 190 },
        { name: 'Meera K.', role: 'Full-stack', score: '88', w1: 140, w2: 150 },
      ].map((c, i) => (
        <g key={c.name}>
          <rect x="330" y={286 + i * 74} width="540" height="62" rx="10" fill="#ffffff" fillOpacity="0.04" />
          <circle cx="356" cy={317 + i * 74} r="14" fill={accent} fillOpacity="0.25" />
          <text x="356" y={321 + i * 74} fontSize="11" fontWeight="700" textAnchor="middle" fill={accent}>{c.score}</text>
          <text x="386" y={311 + i * 74} fontSize="12" fontWeight="600" fill="#F4F4F1">{c.name}</text>
          <text x="386" y={328 + i * 74} fontSize="10" fill="#8E8E98">{c.role}</text>
          <rect x="700" y={312 + i * 74} width={c.w1} height="6" rx="3" fill="#ffffff" fillOpacity="0.08" />
          <rect x="700" y={324 + i * 74} width={c.w2} height="6" rx="3" fill={accent} fillOpacity="0.7" />
        </g>
      ))}
    </Frame>
  );
}

function CommerceVisual({ accent }: { accent: string }) {
  return (
    <g>
      <rect x="210" y="170" width="330" height="460" rx="18" fill="#0A0A0E" fillOpacity="0.85" stroke="#ffffff" strokeOpacity="0.1" />
      <rect x="330" y="140" width="14" height="40" rx="7" fill="#0A0A0E" fillOpacity="0.9" />
      <rect x="240" y="210" width="270" height="200" rx="10" fill={accent} fillOpacity="0.16" />
      <path d="M240 360 L310 280 L360 330 L430 250 L510 340 V410 H240 Z" fill="#ffffff" fillOpacity="0.08" />
      <rect x="240" y="440" width="180" height="10" rx="5" fill="#ffffff" fillOpacity="0.2" />
      <rect x="240" y="460" width="120" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.1" />
      <rect x="240" y="490" width="100" height="22" rx="11" fill={accent} />
      <rect x="650" y="190" width="360" height="420" rx="18" fill="#0A0A0E" fillOpacity="0.85" stroke="#ffffff" strokeOpacity="0.1" />
      <rect x="680" y="230" width="180" height="12" rx="6" fill="#ffffff" fillOpacity="0.22" />
      <rect x="680" y="258" width="300" height="8" rx="4" fill="#ffffff" fillOpacity="0.1" />
      <rect x="680" y="276" width="260" height="8" rx="4" fill="#ffffff" fillOpacity="0.08" />
      <rect x="680" y="320" width="300" height="120" rx="10" fill="#ffffff" fillOpacity="0.04" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="700" y={340 + i * 34} width="70" height="26" rx="6" fill={accent} fillOpacity="0.12 + i * 0.06" />
          <rect x="790" y={340 + i * 34} width="150" height="8" rx="4" fill="#ffffff" fillOpacity="0.12" />
          <rect x="790" y={356 + i * 34} width="90" height="6" rx="3" fill="#ffffff" fillOpacity="0.07" />
        </g>
      ))}
      <rect x="680" y="470" width="300" height="90" rx="10" fill={accent} fillOpacity="0.1" stroke={accent} strokeOpacity="0.3" />
      <text x="700" y="510" fontSize="11" fill="#F4F4F1">Checkout · 2 steps</text>
      <text x="700" y="534" fontSize="13" fontWeight="700" fill={accent}>99.9% completion</text>
    </g>
  );
}

function AutomationVisual({ accent }: { accent: string }) {
  const nodes = [
    { x: 350, y: 300, label: 'CRM' },
    { x: 600, y: 240, label: 'AI Agent' },
    { x: 600, y: 420, label: 'Workflow' },
    { x: 850, y: 330, label: 'Actions' },
  ];
  return (
    <g>
      <Frame accent={accent}>
        <line x1="430" y1="300" x2="520" y2="260" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="6 6" />
        <line x1="430" y1="300" x2="520" y2="400" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="6 6" />
        <line x1="680" y1="260" x2="770" y2="310" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="6 6" />
        <line x1="680" y1="420" x2="770" y2="350" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="6 6" />
        {nodes.map((n, i) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r="34" fill={i === 1 ? accent : '#ffffff'} fillOpacity={i === 1 ? 0.14 : 0.05} stroke={i === 1 ? accent : '#ffffff'} strokeOpacity="0.4" strokeWidth="1.5" />
            <text x={n.x} y={n.y + 4} fontSize="11" fontWeight="600" textAnchor="middle" fill={i === 1 ? accent : '#F4F4F1'}>{n.label}</text>
          </g>
        ))}
        <rect x="330" y="470" width="540" height="110" rx="12" fill="#ffffff" fillOpacity="0.04" />
        <text x="350" y="506" fontSize="11" fill="#8E8E98">Automation runs this month</text>
        <text x="350" y="544" fontSize="28" fontWeight="700" fill={accent}>1,940 hrs</text>
        <rect x="560" y="508" width="290" height="10" rx="5" fill="#ffffff" fillOpacity="0.08" />
        <rect x="560" y="508" width="230" height="10" rx="5" fill={accent} />
      </Frame>
    </g>
  );
}

function HealthcareVisual({ accent }: { accent: string }) {
  return (
    <Frame accent={accent}>
      <text x="330" y="232" fontSize="15" fontWeight="700" fill="#F4F4F1">Care analytics</text>
      <text x="330" y="252" fontSize="11" fill="#8E8E98">12M records · 40 sources</text>
      {/* chart */}
      <polyline points="330,420 380,400 430,410 480,360 530,380 580,330 630,350 680,300 730,310 780,270 830,290 870,255" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <polyline points="330,420 380,400 430,410 480,360 530,380 580,330 630,350 680,300 730,310 780,270 830,290 870,255 870,500 330,500" fill={accent} fillOpacity="0.08" />
      {[330, 480, 630, 780, 870].map((x) => (
        <line key={x} x1={x} y1="440" x2={x} y2="500" stroke="#ffffff" strokeOpacity="0.08" />
      ))}
      <text x="330" y="525" fontSize="10" fill="#8E8E98">Mon</text>
      <text x="480" y="525" fontSize="10" fill="#8E8E98">Wed</text>
      <text x="630" y="525" fontSize="10" fill="#8E8E98">Fri</text>
      <text x="780" y="525" fontSize="10" fill="#8E8E98">Sun</text>
      <text x="870" y="525" fontSize="10" fill="#8E8E98">Tue</text>
      <rect x="330" y="560" width="540" height="14" rx="7" fill="#ffffff" fillOpacity="0.06" />
      <rect x="330" y="560" width="430" height="14" rx="7" fill={accent} fillOpacity="0.8" />
      <text x="330" y="596" fontSize="10" fill="#8E8E98">Ingestion pipeline — 96% healthy</text>
    </Frame>
  );
}

function LogisticsVisual({ accent }: { accent: string }) {
  return (
    <g>
      <rect x="240" y="180" width="720" height="440" rx="20" fill="#0A0A0E" fillOpacity="0.85" stroke="#ffffff" strokeOpacity="0.1" />
      {/* map grid */}
      <g stroke="#ffffff" strokeOpacity="0.05">
        {Array.from({ length: 8 }, (_, i) => <line key={`mh${i}`} x1="260" y1={200 + i * 52} x2="940" y2={200 + i * 52} />)}
        {Array.from({ length: 12 }, (_, i) => <line key={`mv${i}`} x1={280 + i * 57} y1="200" x2={280 + i * 57} y2="600" />)}
      </g>
      {/* route */}
      <path d="M300 540 L420 420 L520 460 L640 320 L760 380 L900 260" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeDasharray="10 8" />
      {[
        { x: 300, y: 540 }, { x: 420, y: 420 }, { x: 520, y: 460 },
        { x: 640, y: 320 }, { x: 760, y: 380 }, { x: 900, y: 260 },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="7" fill={i === 5 ? accent : '#0A0A0E'} stroke={accent} strokeWidth="2" />
          {i === 5 && <circle cx={p.x} cy={p.y} r="13" fill={accent} fillOpacity="0.2" />}
        </g>
      ))}
      <rect x="300" y="630" width="300" height="60" rx="10" fill="#ffffff" fillOpacity="0.04" />
      <text x="320" y="660" fontSize="11" fill="#8E8E98">ETA to hub 7</text>
      <text x="320" y="680" fontSize="16" fontWeight="700" fill={accent}>14 min · on time</text>
      <rect x="640" y="630" width="260" height="60" rx="10" fill="#ffffff" fillOpacity="0.04" />
      <text x="660" y="660" fontSize="11" fill="#8E8E98">Fleet cost / km</text>
      <text x="660" y="680" fontSize="16" fontWeight="700" fill="#F4F4F1">&#8377; 61.4 <tspan fill={accent}>▼ 18%</tspan></text>
    </g>
  );
}
