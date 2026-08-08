import type { Project } from '../types';

/**
 * Real KYNYX case studies (9 total).
 *
 * Sources:
 * - title / description / tags / live link / gradient: from the provided
 *   portfolio page code.
 * - overview / challenge / solution for Homeasy, Ecotwist and Collabuilder:
 *   from the earlier, more detailed project brief (unchanged).
 * - overview for the other 6: researched by fetching each live site
 *   (homeasy.io, bharatxventures.com, bharatxinfratech.com, udyamtatva.com,
 *   etc.) and paraphrased in original wording — not the client's own copy.
 *   aixpertslabs.com, castersglobal.com and sumedhaagro.com only exposed
 *   meta tags (JS-rendered sites), so those 3 overviews lean on the given
 *   description/tags rather than deeper site content.
 * - `tech`, `process`, `stats`, `metrics` for the 6 new projects are marked
 *   PLACEHOLDER below — the brief didn't include KYNYX's actual engineering
 *   specifics for them, so don't publish those until confirmed.
 * - `testimonial` is null everywhere — no real client quotes about KYNYX's
 *   work were provided, and quotes found on some client sites are about
 *   the client's own product, not about KYNYX, so using them would be a
 *   false attribution.
 */
export const projects: Project[] = [
  {
    slug: 'homeasy-automation',
    name: 'Homeasy Automation',
    industry: 'Smart Home / IoT',
    services: ['Mobile App Development', 'IoT Integration', 'Cloud Infrastructure'],
    tech: ['React Native', 'Node.js', 'MQTT', 'AWS IoT', 'Zigbee', 'Redis'],
    year: '2025',
    result: '99.9% uptime, 50% faster device pairing',
    summary:
      'Smart home platform unifying all IoT devices with real-time control and automation.',
    // Derived from "from-cyan-500 to-teal-600"
    palette: { from: '#06b6d4', to: '#0d9488', accent: '#5eead4' },
    overview:
      'HOMEASY integrates lighting, climate, security, and appliances into a single secure mobile app with voice control and AI automation.',
    challenge:
      'Device fragmentation, real-time sync across 50+ protocols, and enterprise-grade security.',
    solution:
      'Built a protocol-agnostic gateway using MQTT + AWS IoT Core. React Native frontend with offline-first architecture.',
    process: [
      { title: 'Discovery', text: 'Mapped device fragmentation across 50+ protocols to define a unifying gateway architecture.' },
      { title: 'Gateway Engineering', text: 'Built a protocol-agnostic gateway on MQTT and AWS IoT Core for real-time device sync.' },
      { title: 'Mobile App', text: 'React Native frontend with offline-first architecture and voice control.' },
      { title: 'Security & Launch', text: 'Hardened for enterprise-grade security ahead of rollout.' },
    ],
    stats: [
      { value: '99.9%', label: 'uptime' },
      { value: '50%', label: 'faster device pairing' },
      { value: '300%', label: 'increase in user retention' },
      { value: 'CES 2025', label: 'featured' },
    ],
    testimonial: null,
    metrics: [
      { label: 'Timeline', value: 'TBD' },
      { label: 'Team', value: 'TBD' },
      { label: 'Platform', value: 'Mobile + IoT' },
    ],
    liveUrl: 'https://homeasy.io/',
  },
  {
    slug: 'ecotwist-innovations',
    name: 'Ecotwist Innovations',
    industry: 'E-commerce',
    services: ['Web Development', 'E-commerce Engineering', 'Performance Optimization'],
    tech: ['Next.js', 'TypeScript', 'Stripe', 'MongoDB', 'Redis', 'Tailwind'],
    year: '2025',
    result: '0.8s avg load time, 43% conversion uplift',
    summary:
      'Sustainable e-commerce platform with lightning-fast checkout and AI recommendations.',
    // Derived from "from-purple-600 to-pink-600"
    palette: { from: '#9333ea', to: '#db2777', accent: '#f9a8d4' },
    overview:
      'EcoTwist sells eco-friendly products with carbon-neutral shipping, dynamic pricing, and personalized storefronts.',
    challenge:
      'Sub-second page loads with 100k+ SKUs and handling flash sales with 15k concurrent users.',
    solution:
      'Next.js App Router + Edge Functions, ISR for product pages, Redis caching, Stripe Elements with webhooks.',
    process: [
      { title: 'Performance Audit', text: 'Benchmarked page loads against a 100k+ SKU catalog and flash-sale traffic spikes.' },
      { title: 'Architecture', text: 'Next.js App Router with Edge Functions and ISR for product pages.' },
      { title: 'Caching Layer', text: 'Redis caching to keep catalog queries fast under 15k concurrent users.' },
      { title: 'Checkout', text: 'Stripe Elements integration with webhook-driven order handling.' },
    ],
    stats: [
      { value: '0.8s', label: 'avg load time' },
      { value: '43%', label: 'conversion uplift' },
      { value: '$2.1M', label: 'GMV in first quarter' },
      { value: '99.99%', label: 'payment success' },
    ],
    testimonial: null,
    metrics: [
      { label: 'Timeline', value: 'TBD' },
      { label: 'Team', value: 'TBD' },
      { label: 'Platform', value: 'Web + Checkout' },
    ],
    liveUrl: 'https://ecotwist.in/',
  },
  {
    slug: 'aixperts-labs',
    name: 'AIxperts Labs',
    industry: 'AI / Automation',
    // PLACEHOLDER — services inferred from tags, not an explicit brief
    services: ['AI / Machine Learning', 'Web Development', 'UI/UX Design'],
    // PLACEHOLDER — real engineering stack not confirmed; aixpertslabs.com is a
    // client-side rendered site so its own stack couldn't be inspected either
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    // PLACEHOLDER — year not given
    year: '2025',
    // PLACEHOLDER — no measured result given
    result: 'AI innovation hub for enterprise automation',
    summary:
      'Advanced AI solutions provider specializing in machine learning models and automation.',
    // Derived from "from-indigo-500 to-blue-600"
    palette: { from: '#6366f1', to: '#2563eb', accent: '#93c5fd' },
    overview:
      'AIxperts Labs positions itself as an AI innovation hub, offering enterprise clients strategy, automation and workforce-transformation solutions built on modern machine learning.',
    // PLACEHOLDER — specific challenge not documented in the source material
    challenge:
      'Communicating a broad AI/automation service offering clearly to enterprise buyers while keeping the site fast and credible.',
    // PLACEHOLDER — specific solution not documented in the source material
    solution:
      'A focused marketing site and product presentation built around AIxperts Labs\u2019 core offerings — AI strategy, automation and enterprise ML solutions.',
    // PLACEHOLDER — process not documented
    process: [
      { title: 'Positioning', text: 'Clarified the AI/automation service offering for an enterprise audience.' },
      { title: 'Design', text: 'Built a clean, credible interface suited to enterprise decision-makers.' },
      { title: 'Development', text: 'Implemented the site with a modern, fast-loading stack.' },
      { title: 'Launch', text: 'Shipped and handed off for ongoing content updates.' },
    ],
    // PLACEHOLDER — no measured stats documented
    stats: [
      { value: 'TBD', label: 'stat 1' },
      { value: 'TBD', label: 'stat 2' },
      { value: 'TBD', label: 'stat 3' },
      { value: 'TBD', label: 'stat 4' },
    ],
    testimonial: null,
    metrics: [
      { label: 'Timeline', value: 'TBD' },
      { label: 'Team', value: 'TBD' },
      { label: 'Platform', value: 'Web' },
    ],
    liveUrl: 'https://aixpertslabs.com/',
  },
  {
    slug: 'bharatx-ventures',
    name: 'BharatX Ventures',
    industry: 'Venture Building / Finance',
    // PLACEHOLDER — services inferred from tags
    services: ['Web Development', 'Brand & Product Design'],
    // PLACEHOLDER — real engineering stack not confirmed
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    // PLACEHOLDER — year not given
    year: '2026',
    result: '100Cr+ enterprise value generated, 50+ ventures supported',
    summary:
      'Supporting startups with funding, mentorship, and scalable growth strategies.',
    // Derived from "from-yellow-500 to-red-500"
    palette: { from: '#eab308', to: '#ef4444', accent: '#fdba74' },
    overview:
      'BharatX Ventures is an institutional venture-building firm that partners with entrepreneurs across agri-tech, manufacturing, infrastructure and technology to fund and scale high-impact businesses in India.',
    // PLACEHOLDER — specific challenge not documented
    challenge:
      'Presenting an institutional-grade venture builder \u2014 spanning capital, consulting and industrial sectors \u2014 with the credibility and clarity expected by founders and investors.',
    // PLACEHOLDER — specific solution not documented
    solution:
      'A structured site covering the firm\u2019s core verticals, venture-development framework and industries served, built to read as institutional rather than a typical startup landing page.',
    // PLACEHOLDER — process not documented
    process: [
      { title: 'Discovery', text: 'Mapped the firm\u2019s core verticals: SME capital, consulting, venture development, agri-tech and industrial automation.' },
      { title: 'Information Architecture', text: 'Structured the site around the four-stage venture-development framework.' },
      { title: 'Design', text: 'Institutional visual language suited to founders, investors and partners.' },
      { title: 'Development & Launch', text: 'Built and shipped the production site.' },
    ],
    // Real — pulled from bharatxventures.com's own published figures
    stats: [
      { value: '100Cr+', label: 'enterprise value generated' },
      { value: '50+', label: 'ventures supported globally' },
      { value: '10+', label: 'core industries served' },
      { value: '15+ yrs', label: 'leadership experience' },
    ],
    testimonial: null,
    metrics: [
      { label: 'Timeline', value: 'TBD' },
      { label: 'Team', value: 'TBD' },
      { label: 'Platform', value: 'Web' },
    ],
    liveUrl: 'https://bharatx.vc/',
  },
  {
    slug: 'bharatx-infratech',
    name: 'BharatX Infratech',
    industry: 'Infrastructure / Construction',
    // PLACEHOLDER — services inferred from tags
    services: ['Web Development', 'Corporate Website Design'],
    // PLACEHOLDER — real engineering stack not confirmed
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    // PLACEHOLDER — year not given
    year: '2025',
    result: 'Corporate infrastructure & EPC presence, built for credibility',
    summary:
      'Focused on smart cities and sustainable infrastructure development.',
    // Derived from "from-gray-600 to-gray-900"
    palette: { from: '#4b5563', to: '#111827', accent: '#d1d5db' },
    overview:
      'BharatX Infratech delivers infrastructure development across India \u2014 roads, bridges and civil engineering \u2014 and needed a corporate site that communicates engineering credibility for EPC clients.',
    // PLACEHOLDER — specific challenge not documented
    challenge:
      'Representing large-scale civil infrastructure work in a way that reads as trustworthy and technically credible to institutional and government clients.',
    // PLACEHOLDER — specific solution not documented
    solution:
      'A corporate site emphasizing engineering excellence and project scope, aligned to how infrastructure and EPC buyers evaluate contractors.',
    // PLACEHOLDER — process not documented
    process: [
      { title: 'Discovery', text: 'Reviewed the firm\u2019s infrastructure and civil engineering focus areas.' },
      { title: 'Design', text: 'Corporate visual language suited to EPC and government stakeholders.' },
      { title: 'Development', text: 'Built the production site.' },
      { title: 'Launch', text: 'Shipped and handed off.' },
    ],
    // PLACEHOLDER — no measured stats documented
    stats: [
      { value: 'TBD', label: 'stat 1' },
      { value: 'TBD', label: 'stat 2' },
      { value: 'TBD', label: 'stat 3' },
      { value: 'TBD', label: 'stat 4' },
    ],
    testimonial: null,
    metrics: [
      { label: 'Timeline', value: 'TBD' },
      { label: 'Team', value: 'TBD' },
      { label: 'Platform', value: 'Web' },
    ],
    liveUrl: 'https://bharatxinfratech.com/',
  },
  {
    slug: 'casters-global',
    name: 'CastersGlobal',
    industry: 'Logistics / Trade',
    // PLACEHOLDER — services inferred from tags
    services: ['Web Development', 'Analytics Dashboard'],
    // PLACEHOLDER — real engineering stack not confirmed; site is client-rendered
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    // PLACEHOLDER — year not given
    year: '2025',
    // PLACEHOLDER — no measured result given, using the brief's description
    result: 'Real-time tracking and analytics for global trade & logistics',
    summary:
      'Global logistics platform with real-time tracking and analytics.',
    // Derived from "from-green-500 to-emerald-600"
    palette: { from: '#22c55e', to: '#059669', accent: '#6ee7b7' },
    // PLACEHOLDER — castersglobal.com only exposed meta tags (JS-rendered site),
    // so this overview leans on the given description rather than deeper content
    overview:
      'CastersGlobal is a trade and logistics platform focused on real-time shipment tracking and analytics for global operations.',
    // PLACEHOLDER — specific challenge not documented
    challenge:
      'Giving logistics operators real-time visibility into shipments and trade flows without a cluttered, hard-to-scan interface.',
    // PLACEHOLDER — specific solution not documented
    solution:
      'A platform combining live tracking with clear analytics views, built for operators who need fast, accurate answers.',
    // PLACEHOLDER — process not documented
    process: [
      { title: 'Discovery', text: 'Reviewed the logistics and trade tracking use case.' },
      { title: 'Design', text: 'Interface built for fast scanning of live shipment data.' },
      { title: 'Development', text: 'Implemented the tracking and analytics views.' },
      { title: 'Launch', text: 'Shipped and handed off.' },
    ],
    // PLACEHOLDER — no measured stats documented
    stats: [
      { value: 'TBD', label: 'stat 1' },
      { value: 'TBD', label: 'stat 2' },
      { value: 'TBD', label: 'stat 3' },
      { value: 'TBD', label: 'stat 4' },
    ],
    testimonial: null,
    metrics: [
      { label: 'Timeline', value: 'TBD' },
      { label: 'Team', value: 'TBD' },
      { label: 'Platform', value: 'Web' },
    ],
    liveUrl: 'https://castersglobal.com/',
  },
  {
    slug: 'sumedha-agro',
    name: 'Sumedha Agro',
    industry: 'AgriTech',
    // PLACEHOLDER — services inferred from tags
    services: ['Web Development', 'IoT Integration'],
    // PLACEHOLDER — real engineering stack not confirmed; site is client-rendered
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    // PLACEHOLDER — year not given
    year: '2025',
    // PLACEHOLDER — no measured result given, using the brief's description
    result: 'AI + IoT powered precision farming platform',
    summary:
      'AI + IoT powered agriculture platform for precision farming.',
    // Derived from "from-lime-500 to-green-700"
    palette: { from: '#84cc16', to: '#15803d', accent: '#bef264' },
    // PLACEHOLDER — sumedhaagro.com only exposed meta tags (JS-rendered site),
    // so this overview leans on the given description rather than deeper content
    overview:
      'Sumedha Agro brings AI and IoT to precision farming, helping growers make data-driven decisions about crops, irrigation and yield.',
    // PLACEHOLDER — specific challenge not documented
    challenge:
      'Making sensor and AI-driven farming insights accessible and actionable for growers, not just data for data\u2019s sake.',
    // PLACEHOLDER — specific solution not documented
    solution:
      'A platform pairing IoT field sensors with AI analysis to turn raw agricultural data into clear, actionable guidance.',
    // PLACEHOLDER — process not documented
    process: [
      { title: 'Discovery', text: 'Reviewed the precision-farming use case and sensor requirements.' },
      { title: 'Design', text: 'Interface designed for growers, not just data analysts.' },
      { title: 'Development', text: 'Implemented IoT data ingestion and AI-driven insights.' },
      { title: 'Launch', text: 'Shipped and handed off.' },
    ],
    // PLACEHOLDER — no measured stats documented
    stats: [
      { value: 'TBD', label: 'stat 1' },
      { value: 'TBD', label: 'stat 2' },
      { value: 'TBD', label: 'stat 3' },
      { value: 'TBD', label: 'stat 4' },
    ],
    testimonial: null,
    metrics: [
      { label: 'Timeline', value: 'TBD' },
      { label: 'Team', value: 'TBD' },
      { label: 'Platform', value: 'Web + IoT' },
    ],
    liveUrl: 'https://sumedhaagro.com/',
  },
  {
    slug: 'udyam-tatva',
    name: 'Udyam Tatva',
    industry: 'Startup Ecosystem',
    // PLACEHOLDER — services inferred from tags
    services: ['Web Development', 'Product Design'],
    // Real — udyamtatva.com is a Next.js app (confirmed via _next/image asset paths)
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    // PLACEHOLDER — year not given
    year: '2026',
    result: '400+ founders, 50+ mentors, 50+ investors on the platform',
    summary:
      'Helping founders from idea to execution with tools and mentorship.',
    // Derived from "from-orange-500 to-red-600"
    palette: { from: '#f97316', to: '#dc2626', accent: '#fdba74' },
    overview:
      'Udyam Tatva is a founder operating system that takes entrepreneurs from idea to execution with a structured roadmap, a mentor and investor network, and a marketplace of vetted resources.',
    // PLACEHOLDER — specific challenge not documented
    challenge:
      'Founders face a high failure rate without a clear execution path, and existing resources are scattered across mentors, tools and communities.',
    // PLACEHOLDER — specific solution not documented
    solution:
      'A single platform combining a guided founder roadmap, execution workflows, and a marketplace of vetted experts and SaaS resources \u2014 built with a bold, high-energy visual identity aimed at early-stage founders.',
    process: [
      { title: 'Positioning', text: 'Defined the "founder operating system" concept: roadmap, execution and marketplace in one place.' },
      { title: 'Design', text: 'High-energy, founder-focused visual identity with a 3-step onboarding flow.' },
      { title: 'Development', text: 'Built the platform with Next.js and Framer Motion for a fast, animated experience.' },
      { title: 'Launch', text: 'Shipped v1.0 with waitlist and blueprint request flows.' },
    ],
    // Real — pulled from udyamtatva.com's own published figures
    stats: [
      { value: '400+', label: 'founders on the platform' },
      { value: '50+', label: 'mentors and advisors' },
      { value: '50+', label: 'investors' },
      { value: '94%', label: 'founder NPS' },
    ],
    testimonial: null,
    metrics: [
      { label: 'Timeline', value: 'TBD' },
      { label: 'Team', value: 'TBD' },
      { label: 'Platform', value: 'Web' },
    ],
    liveUrl: 'https://udyamtatva.com/',
  },
  {
    slug: 'collabuilder-collaboration-platform',
    name: 'Collabuilder Collaboration Platform',
    industry: 'Construction Tech / SaaS',
    services: ['Product Design', 'Web Development', 'Workflow Systems'],
    tech: ['Next.js', 'TypeScript', 'Stripe', 'MongoDB', 'Redis', 'Tailwind'],
    year: '2024',
    result: 'Improved team coordination, reduced project delays',
    summary:
      'Smart collaboration platform designed to streamline project management, communication, and team workflows.',
    // Derived from "from-blue-500 to-indigo-600"
    palette: { from: '#3b82f6', to: '#4f46e5', accent: '#a5b4fc' },
    overview:
      'Collabuilder enables construction teams and enterprises to manage projects efficiently through centralized communication, real-time updates, and workflow tracking.',
    challenge:
      'Simplifying complex construction workflows while maintaining clarity across multiple stakeholders like contractors, engineers, and managers.',
    solution:
      'Built a clean, intuitive platform with centralized dashboards, real-time collaboration tools, and structured workflow pipelines for seamless project execution.',
    process: [
      { title: 'Stakeholder Mapping', text: 'Studied workflows across contractors, engineers, and managers to find shared pain points.' },
      { title: 'Dashboard Design', text: 'Centralized dashboards for real-time project visibility across teams.' },
      { title: 'Collaboration Tools', text: 'Real-time communication and update tooling built into the core workflow.' },
      { title: 'Workflow Pipelines', text: 'Structured pipelines to keep project execution transparent and on schedule.' },
    ],
    stats: [
      { value: 'Improved', label: 'team coordination' },
      { value: 'Reduced', label: 'project delays' },
      { value: 'Better', label: 'transparency' },
      { value: 'Scalable', label: 'workflow system' },
    ],
    testimonial: null,
    metrics: [
      { label: 'Timeline', value: 'TBD' },
      { label: 'Team', value: 'TBD' },
      { label: 'Platform', value: 'Web + Dashboard' },
    ],
    liveUrl: 'https://collabuilder.com/',
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
