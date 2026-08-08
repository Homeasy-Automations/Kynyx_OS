import type { Service } from '../types';

/**
 * KYNYX service catalogue.
 * Every service maps to its own route: /services/:slug
 */
export const services: Service[] = [
  {
    slug: 'web-development',
    number: '01',
    name: 'Custom Web Development',
    short: 'High-performance web platforms, built to scale from day one.',
    description:
      'We design and engineer web applications that load fast, convert hard and grow without rewrites. From marketing sites to complex SaaS platforms, every build is typed, tested and tuned for real-world traffic.',
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'Vite'],
    deliverables: ['SaaS platforms', 'E-commerce', 'Marketing sites', 'Web apps & dashboards'],
    icon: 'code',
  },
  {
    slug: 'mobile-app-development',
    number: '02',
    name: 'Mobile App Development',
    short: 'Native-quality mobile experiences across iOS and Android.',
    description:
      'We ship mobile products people keep on their home screens. Cross-platform engineering with native performance, offline-first architecture and app-store-ready polish.',
    tech: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo'],
    deliverables: ['iOS & Android apps', 'Cross-platform builds', 'App store launch', 'Mobile UX'],
    icon: 'smartphone',
  },
  {
    slug: 'digital-marketing',
    number: '03',
    name: 'Digital Marketing Strategies',
    short: 'Growth systems that turn attention into revenue.',
    description:
      'Marketing is engineering too. We build full-funnel growth systems — SEO, performance campaigns, content and conversion optimization — measured against revenue, not vanity metrics.',
    tech: ['SEO', 'Performance Ads', 'Analytics', 'CRO', 'Marketing Automation'],
    deliverables: ['Growth strategy', 'SEO & content', 'Paid acquisition', 'Conversion optimization'],
    icon: 'trending',
  },
  {
    slug: 'ui-ux-design',
    number: '04',
    name: 'UI/UX Design & Branding',
    short: 'Interfaces and identities that feel unmistakably yours.',
    description:
      'Research-led product design and brand systems. We design interfaces that communicate trust at a glance and identities that scale from favicon to billboard.',
    tech: ['Figma', 'Design Systems', 'Prototyping', 'Brand Identity', 'Motion Design'],
    deliverables: ['Product design', 'Design systems', 'Brand identity', 'Prototypes & wireframes'],
    icon: 'pen',
  },
  {
    slug: 'website-optimization',
    number: '05',
    name: 'Website Audit & Optimization',
    short: 'Faster, higher-ranking, higher-converting websites.',
    description:
      'We audit performance, accessibility, SEO and conversion flow — then ship measurable improvements. Core Web Vitals in the green, rankings up, bounce rates down.',
    tech: ['Core Web Vitals', 'Lighthouse', 'SEO Audits', 'A/B Testing', 'Perf Profiling'],
    deliverables: ['Technical audits', 'Speed optimization', 'SEO fixes', 'CRO experiments'],
    icon: 'gauge',
  },
  {
    slug: 'web-crawlers',
    number: '06',
    name: 'Web Crawlers & Data Extraction',
    short: 'Reliable data pipelines for the world wide web.',
    description:
      'Custom crawlers and scrapers engineered to be fast, polite and resilient — with proxies, scheduling, storage and monitoring built in. Clean data, at scale, on time.',
    tech: ['Python', 'Playwright', 'Puppeteer', 'Proxies', 'Redis', 'PostgreSQL'],
    deliverables: ['Custom crawlers', 'Data pipelines', 'Scheduled extraction', 'Data cleaning'],
    icon: 'spider',
  },
  {
    slug: 'data-solutions',
    number: '07',
    name: 'Database Management & Data Handling',
    short: 'Data that is structured, secure and instantly useful.',
    description:
      'Schema design, migration, optimization and secure handling for relational and document databases. We make sure your data layer keeps up when you do.',
    tech: ['MongoDB', 'PostgreSQL', 'Redis', 'Prisma', 'Mongoose', 'AWS RDS'],
    deliverables: ['Schema design', 'Migrations', 'Query optimization', 'Backups & security'],
    icon: 'database',
  },
  {
    slug: 'tech-support',
    number: '08',
    name: 'Customer Technology Support',
    short: '24/7 support that protects the experience you built.',
    description:
      'Dedicated technical support for your product — monitoring, incident response and customer-facing help, staffed by engineers who actually understand the stack.',
    tech: ['SLA Monitoring', 'Helpdesk', 'Incident Response', 'Sentry', 'Status Pages'],
    deliverables: ['Dedicated support', 'Monitoring & alerts', 'Incident handling', 'User assistance'],
    icon: 'headset',
  },
  {
    slug: 'ai-insights',
    number: '09',
    name: 'AI Insights & Analytics',
    short: 'Answers buried in your data, surfaced automatically.',
    description:
      'We build analytics layers that explain themselves — natural-language queries, anomaly detection and forecasting so decisions come from data, not guesswork.',
    tech: ['LLMs', 'Python', 'dbt', 'Metabase', 'Vector Search', 'Forecasting'],
    deliverables: ['Analytics dashboards', 'NL querying', 'Anomaly detection', 'Forecasts'],
    icon: 'chart',
  },
  {
    slug: 'ai-automation',
    number: '10',
    name: 'AI Automation & Integrations',
    short: 'Workflows that run themselves while you scale.',
    description:
      'We connect your tools and let AI handle the repetitive work — lead routing, reporting, document processing, support triage. Automations that save hundreds of hours a month.',
    tech: ['n8n', 'Zapier', 'OpenAI', 'APIs', 'Webhooks', 'CRM Integration'],
    deliverables: ['Workflow automation', 'Tool integrations', 'AI agents', 'Ops pipelines'],
    icon: 'zap',
  },
  {
    slug: 'generative-ai',
    number: '11',
    name: 'LLM & Generative AI Solutions',
    short: 'Production-grade AI systems, not demos.',
    description:
      'From RAG pipelines and AI agents to full LLM products — we build generative AI that is grounded, evaluated and safe to put in front of customers.',
    tech: ['OpenAI APIs', 'LangChain', 'RAG', 'Vector DBs', 'Fine-tuning', 'AI Agents'],
    deliverables: ['RAG systems', 'AI agents', 'LLM applications', 'Fine-tuned models'],
    icon: 'sparkles',
  },
  {
    slug: 'agentic-ai',
    number: '12',
    name: 'Agentic AI Solutions',
    short: 'AI agents that think, plan, and execute tasks autonomously.',
    description:
      'Build intelligent AI agents powered by LLMs that automate workflows, make decisions, retrieve knowledge using RAG, and integrate across your business systems.',
    tech: [
      'OpenAI',
      'Claude',
      'LangChain',
      'RAG',
      'Vector Databases',
      'AI Agents',
    ],
    deliverables: [
      'AI agents',
      'RAG systems',
      'Knowledge assistants',
      'Business automation',
    ],
    icon: 'bot',
  },
  {
    slug: 'digital-transformation',
    number: '13',
    name: 'Digital Transformation',
    short: 'Modernize your business with scalable digital solutions.',
    description:
      'We help businesses modernize operations through technology consulting, process optimization, automation, and digital transformation initiatives that improve efficiency and accelerate growth.',
    tech: [
      'Business Analysis',
      'Digital Strategy',
      'Automation',
      'Cloud',
      'AI',
      'Process Optimization',
    ],
    deliverables: [
      'Digital transformation roadmap',
      'Business process automation',
      'Legacy modernization',
      'Technology consulting',
    ],
    icon: 'refresh',
  },
  {
    slug: 'cloud-infrastructure',
    number: '14',
    name: 'Cloud & Infrastructure',
    short: 'Secure, scalable cloud infrastructure built for growth.',
    description:
      'We architect, deploy, and maintain cloud infrastructure with high availability, security, monitoring, and scalability for modern digital products.',
    tech: [
      'AWS',
      'Azure',
      'Google Cloud',
      'Docker',
      'Kubernetes',
      'Terraform',
    ],
    deliverables: [
      'Cloud architecture',
      'Infrastructure setup',
      'Deployment pipelines',
      'Infrastructure monitoring',
    ],
    icon: 'cloud',
  },
  {
    slug: 'api-development',
    number: '15',
    name: 'API Development & Integrations',
    short: 'Connect your products, platforms, and services seamlessly.',
    description:
      'We build secure APIs and third-party integrations that allow your software ecosystem to communicate reliably and scale efficiently.',
    tech: [
      'REST',
      'GraphQL',
      'Node.js',
      'Express',
      'OAuth',
      'Webhooks',
    ],
    deliverables: [
      'REST APIs',
      'GraphQL APIs',
      'Third-party integrations',
      'API documentation',
    ],
    icon: 'plug',
  },
  {
    slug: 'devops-cicd',
    number: '16',
    name: 'DevOps & CI/CD',
    short: 'Automated deployments with reliability built in.',
    description:
      'Accelerate software delivery using modern DevOps practices including CI/CD pipelines, infrastructure automation, monitoring, and container orchestration.',
    tech: [
      'GitHub Actions',
      'Docker',
      'Kubernetes',
      'Jenkins',
      'Terraform',
      'Linux',
    ],
    deliverables: [
      'CI/CD pipelines',
      'Containerization',
      'Infrastructure automation',
      'Deployment monitoring',
    ],
    icon: 'git-branch',
  },
  {
    slug: 'cybersecurity',
    number: '17',
    name: 'Cybersecurity & Compliance',
    short: 'Protect your business with enterprise-grade security.',
    description:
      'Security-first engineering including vulnerability assessments, compliance guidance, secure architecture, penetration testing support, and continuous monitoring.',
    tech: [
      'OWASP',
      'Security Audits',
      'SSL',
      'IAM',
      'Compliance',
      'Encryption',
    ],
    deliverables: [
      'Security audits',
      'Compliance support',
      'Secure architecture',
      'Risk assessment',
    ],
    icon: 'shield',
  },
  {
    slug: 'amc-support',
    number: '18',
    name: 'AMC & Technical Support',
    short: 'Long-term maintenance that keeps your platform performing.',
    description:
      'Our Annual Maintenance Contracts provide continuous updates, monitoring, optimization, incident response, and technical assistance after launch.',
    tech: [
      'Monitoring',
      'Maintenance',
      'SLA',
      'Performance',
      'Security Updates',
      'Support',
    ],
    deliverables: [
      'Annual maintenance',
      'Performance optimization',
      'Bug fixes',
      'Priority support',
    ],
    icon: 'life-buoy',
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** Slugs used for quick CTA linking on the homepage. */
export const featuredServiceSlugs = [
  'web-development',
  'mobile-app-development',
  'ui-ux-design',
  'ai-automation',
  'generative-ai',
  'agentic-ai',
  'cloud-infrastructure',
  'digital-transformation',
];
