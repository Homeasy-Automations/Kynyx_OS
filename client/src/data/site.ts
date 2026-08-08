import type {
  AICapability,
  CapabilityGroup,
  Industry,
  NavLink,
  ProcessStep,
  Stat,
  Testimonial,
  WhyPoint,
} from '../types';

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */
export const NAV_LINKS: NavLink[] = [
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
];

export const FOOTER_LINKS: NavLink[] = [
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
];

export const FOOTER_SERVICES: NavLink[] = [
  { label: 'Web Development', to: '/services/web-development' },
  { label: 'Mobile Development', to: '/services/mobile-app-development' },
  { label: 'UI/UX Design', to: '/services/ui-ux-design' },
  { label: 'AI Solutions', to: '/services/generative-ai' },
  { label: 'Automation', to: '/services/ai-automation' },
  { label: 'Digital Marketing', to: '/services/digital-marketing' },
];

export const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: 'linkedin',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com',
    icon: 'instagram',
  },
  {
    label: 'X',
    href: 'https://x.com',
    icon: 'x',
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: 'github',
  },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Cookies', to: '/privacy#cookies' },
];

export const CONTACT = {
  email: 'hello@kynyx.agency',
  phone: '+91 98765 43210',
  location: 'New Delhi, India — working worldwide',
};

/* ------------------------------------------------------------------ */
/*  Offices — multi-location contact details                          */
/*  NOTE: addresses & phone numbers below are PLACEHOLDER values —     */
/*  replace with real details. Marked for easy find-and-replace.       */
/* ------------------------------------------------------------------ */
export interface OfficeLocation {
  city: string;
  country: string;
  address: string;
  phone: string;
}

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    city: 'USA',
    country: 'United States',
    address: 'Kynyx Solutions LLC 8 The Green, Suite A Dover, DE 19901 United States', // PLACEHOLDER
    phone: '+1 (239) 450-6273', // PLACEHOLDER
  },
  {
    city: 'Noida',
    country: 'India',
    address: '9th floor, logix Cyber Park, Tower-C, Sec-62, Noida, U.P 201309, India', // PLACEHOLDER
    phone: '+91 72097 03999', // PLACEHOLDER
  },
  {
    city: 'Patna',
    country: 'India',
    address: '5th Floor, Mauryalok Complex, A-Block, Patna 800001, Bihar, India', // PLACEHOLDER
    phone: '+91 62000 75073', // PLACEHOLDER
  },
];

/* ------------------------------------------------------------------ */
/*  Home — statistics (configurable — swap with real numbers)          */
/* ------------------------------------------------------------------ */
export const STATS: Stat[] = [
  { value: 50, suffix: '+', label: 'Digital products shipped' },
  { value: 20, suffix: '+', label: 'Technology solutions delivered' },
  { value: 99, suffix: '%', label: 'Performance focus, every build' },
  { value: 24, suffix: '/7', label: 'Technology support coverage' },
];

/* ------------------------------------------------------------------ */
/*  Capabilities / technology                                          */
/* ------------------------------------------------------------------ */
export const CAPABILITIES: CapabilityGroup[] = [
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'Python', 'FastAPI', 'REST & GraphQL'],
  },
  {
    title: 'Database',
    items: ['MongoDB', 'PostgreSQL', 'Redis', 'Prisma', 'Vector Databases'],
  },
  {
    title: 'Cloud & DevOps',
    items: ['AWS', 'Vercel', 'Docker', 'CI/CD', 'Serverless'],
  },
  {
    title: 'AI & Data',
    items: ['OpenAI APIs', 'LLMs', 'RAG', 'AI Agents', 'Automation Systems'],
  },
];

export const MARQUEE_TECH = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'MongoDB',
  'PostgreSQL',
  'Redis',
  'AWS',
  'Docker',
  'Vercel',
  'OpenAI',
  'RAG',
  'AI Agents',
  'LLMs',
  'Tailwind',
  'Figma',
  'GraphQL',
  'Kubernetes',
  'FastAPI',
];

/* ------------------------------------------------------------------ */
/*  AI section                                                         */
/* ------------------------------------------------------------------ */
export const AI_CAPABILITIES: AICapability[] = [
  { name: 'AI Agents', description: 'Autonomous systems with guardrails, memory and tool access.' },
  { name: 'AI Automation', description: 'Workflows that run themselves across your stack.' },
  { name: 'LLM Applications', description: 'Production apps built on large language models.' },
  { name: 'Generative AI', description: 'Content, code and creative generation at scale.' },
  { name: 'RAG Systems', description: 'Retrieval-augmented answers grounded in your data.' },
  { name: 'Intelligent Search', description: 'Semantic search that understands intent.' },
  { name: 'AI Insights', description: 'Dashboards that answer questions in plain language.' },
  { name: 'Workflow Automation', description: 'Multi-step orchestration across 40+ tools.' },
  { name: 'Data Intelligence', description: 'Pipelines that turn raw data into decisions.' },
  { name: 'AI Integrations', description: 'Your existing stack, upgraded with intelligence.' },
];

/* ------------------------------------------------------------------ */
/*  Process                                                            */
/* ------------------------------------------------------------------ */
export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We start with your business, not your brief. Deep-dive workshops, user research and market analysis surface the problem worth solving.',
    output: 'Opportunity brief',
  },
  {
    number: '02',
    title: 'Strategy',
    description:
      'Product, technical and go-to-market strategy converge into a roadmap with clear priorities, success metrics and a delivery plan.',
    output: 'Product roadmap',
  },
  {
    number: '03',
    title: 'Design',
    description:
      'Interfaces, systems and brands are designed in tight loops with your team — tested against real users before a line of code is written.',
    output: 'Design system',
  },
  {
    number: '04',
    title: 'Engineer',
    description:
      'Typed, tested, review-driven engineering. We ship weekly, measure everything and keep the codebase clean enough to scale.',
    output: 'Working product',
  },
  {
    number: '05',
    title: 'Launch',
    description:
      'From deployment pipelines to monitoring, SEO and analytics — we launch with the operational rigour the product will need on day one.',
    output: 'Live & monitored',
  },
  {
    number: '06',
    title: 'Optimize',
    description:
      'Post-launch, we run experiments, tune performance and iterate on data. Products we ship are products we keep making better.',
    output: 'Continuous growth',
  },
];

/* ------------------------------------------------------------------ */
/*  Why KYNYX                                                          */
/* ------------------------------------------------------------------ */
export const WHY_POINTS: WhyPoint[] = [
  {
    number: '01',
    title: 'Engineering-first thinking',
    description:
      'Every decision passes through an engineering lens — architecture, testing, observability and technical debt are first-class, not afterthoughts.',
    tag: 'Architecture',
  },
  {
    number: '02',
    title: 'Design-driven execution',
    description:
      'Engineering without design ships fast and feels cheap. We pair rigorous product design with rigorous code.',
    tag: 'Craft',
  },
  {
    number: '03',
    title: 'AI-native architecture',
    description:
      'Intelligence is not bolted on later. We design systems where AI is part of the architecture from the first schema.',
    tag: 'AI',
  },
  {
    number: '04',
    title: 'Scalable systems',
    description:
      'Built for the traffic you want, not the traffic you have. Every platform is architected to grow without rewrites.',
    tag: 'Scale',
  },
  {
    number: '05',
    title: 'Transparent collaboration',
    description:
      'Weekly demos, open roadmaps, real dashboards. You always know what is shipped, what is next and what it costs.',
    tag: 'Process',
  },
  {
    number: '06',
    title: 'Performance obsession',
    description:
      'Speed is a feature. We hold every build to a performance budget and monitor it in production.',
    tag: 'Speed',
  },
  {
    number: '07',
    title: 'Long-term product thinking',
    description:
      'We optimize for the product you will have in three years, not the demo you want next month.',
    tag: 'Partnership',
  },
];

/* ------------------------------------------------------------------ */
/*  Industries                                                         */
/* ------------------------------------------------------------------ */
export const INDUSTRIES: Industry[] = [
  { name: 'FinTech', blurb: 'Payments, treasury, lending and compliance-grade platforms.' },
  { name: 'Healthcare', blurb: 'Secure data platforms and patient-first digital experiences.' },
  { name: 'E-commerce', blurb: 'Storefronts engineered for conversion and scale.' },
  { name: 'Education', blurb: 'Learning products that keep students engaged.' },
  { name: 'Real Estate', blurb: 'Discovery and management platforms for property.' },
  { name: 'SaaS', blurb: 'Multi-tenant products built to onboard fast and scale hard.' },
  { name: 'Logistics', blurb: 'Route, fleet and operations intelligence.' },
  { name: 'Enterprise', blurb: 'Internal platforms that make organizations faster.' },
  { name: 'Startups', blurb: 'From MVP to series-ready product infrastructure.' },
  { name: 'AI Products', blurb: 'LLM applications and agent systems that ship.' },
];

/* ------------------------------------------------------------------ */
/*  Testimonials                                                       */
/* ------------------------------------------------------------------ */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'KYNYX operates like an extension of our own engineering team — except they move faster, think deeper and sweat the details we never had time for.',
    name: 'Aarav Mehta',
    position: 'CFO',
    company: 'Meridian Finance',
    projectType: 'FinTech Platform',
  },
  {
    quote:
      'We interviewed five agencies. KYNYX was the only one that asked about our data model before our brand colors. That told us everything.',
    name: 'Priya Sharma',
    position: 'VP Talent',
    company: 'TalentScout AI',
    projectType: 'AI Recruitment Platform',
  },
  {
    quote:
      'The redesign paid for itself in a quarter. What impressed me most is that they measure everything — every change shipped with a number attached.',
    name: 'Elena Rossi',
    position: 'Founder',
    company: 'Atelier & Co.',
    projectType: 'Commerce Platform',
  },
  {
    quote:
      'They built the automation layer we had been dreaming about for two years. Our ops team finally works on growth, not repetitive tasks.',
    name: 'Daniel Okafor',
    position: 'COO',
    company: 'FluxOps',
    projectType: 'Automation Platform',
  },
];

/* ------------------------------------------------------------------ */
/*  Contact form options                                               */
/* ------------------------------------------------------------------ */
export const SERVICE_OPTIONS = [
  'Custom Web Development',
  'Mobile App Development',
  'UI/UX',
  'Branding',
  'Digital Marketing',
  'Website Optimization',
  'AI Automation',
  'LLM / Generative AI',
  'Web Crawling',
  'Database Solutions',
  'Technology Support',
];

export const BUDGET_OPTIONS = [
  'Under $10k',
  '$10k – $25k',
  '$25k – $50k',
  '$50k – $100k',
  '$100k+',
  'Not sure yet',
];

export const TIMELINE_OPTIONS = [
  'ASAP',
  '1 – 3 months',
  '3 – 6 months',
  '6+ months',
  'Just exploring',
];

export const SOURCE_OPTIONS = [
  'Google Search',
  'Clutch',
  'LinkedIn',
  'Referral',
  'Social Media',
  'Other',
];

/* ------------------------------------------------------------------ */
/*  Loader copy                                                        */
/* ------------------------------------------------------------------ */
export const LOADER_LINES = ['Engineering', 'what\'s', 'next.'];
