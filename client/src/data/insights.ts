import type { Insight } from '../types';

/** Editorial content — replace with real KYNYX writing as it lands. */
export const insights: Insight[] = [
  {
    slug: 'rag-beyond-the-demo',
    category: 'AI',
    title: 'RAG beyond the demo: shipping retrieval that survives production',
    description:
      'Most RAG systems work beautifully on three documents and fall apart on a million. Here is how we evaluate, ground and monitor retrieval pipelines that actually stay reliable.',
    date: '2025-06-18',
    readMinutes: 7,
    palette: { from: '#16240A', to: '#0A0A0D' },
    body: [
      'A RAG demo answers questions about your own PDFs. A RAG system in production answers questions for paying customers — every day, at scale, without hallucinating in front of them. The distance between those two is not model choice. It is engineering discipline.',
      'The three places retrieval pipelines quietly break: chunking that ignores document structure, embeddings that drift as your corpus grows, and evaluation that checks answer quality but never retrieval quality. We treat each as a first-class engineering problem.',
      'We build an evaluation harness before we tune anything. A hand-labeled set of question-to-chunk pairs, refreshed monthly. Retrieval recall is tracked as a deployable metric, not a vibe. When recall dips, we know which chunking strategy or index version caused it.',
      'Grounded generation matters equally: every answer must cite the passages it used, and the UI must show them. Citations are not a compliance checkbox — they are the trust layer that makes an AI feature feel safe enough to put in front of customers.',
      'The pattern we recommend to clients: start narrow, instrument everything, and treat the AI layer like any other service with an SLA. That is what separates a demo from a product.',
    ],
  },
  {
    slug: 'speed-is-a-feature',
    category: 'Engineering',
    title: 'Speed is a feature: engineering sub-second digital experiences',
    description:
      'Every 100ms of latency quietly taxes conversion, trust and retention. A practical guide to the performance budget mindset we bring to every build.',
    date: '2025-05-02',
    readMinutes: 6,
    palette: { from: '#0A1624', to: '#0A0A0D' },
    body: [
      'Performance is not a polish phase. It is a design constraint that shapes architecture from the first commit. When a stakeholder says "make it fast later", they are approving a debt that compounds with every feature.',
      'We work to a performance budget: 90+ Lighthouse performance, LCP under 2 seconds, INP under 200ms, zero layout shift. Every dependency, font and image is audited against the budget before it enters the codebase.',
      'The biggest wins are architectural: code splitting at the route level, streaming server rendering, CDN edge caching, and image pipelines that serve AVIF with responsive srcsets. Libraries are a cost center; we treat them like one.',
      'Monitoring is non-negotiable. Real-user metrics from day one, alerting on regressions, and a culture where a 50ms regression in a PR review is a blocking comment. Speed is not a one-time sprint — it is an operating discipline.',
      'When we hand over a product, the team inherits the budget, the dashboards and the bar. That is how fast stays fast.',
    ],
  },
  {
    slug: 'design-systems-that-scale',
    category: 'Design',
    title: 'Design systems that scale without becoming museums',
    description:
      'A component library is not a design system. Here is the governance model we use to keep systems alive, adopted and evolving — not frozen artifacts.',
    date: '2025-03-27',
    readMinutes: 5,
    palette: { from: '#241A0A', to: '#0A0A0D' },
    body: [
      'Every design system starts with enthusiasm and ends with a decision log nobody reads. The difference between a museum and a living system is not the components. It is the governance.',
      'We define three layers: tokens (the visual primitives), components (the reusable UI), and patterns (the workflows that combine them). Tokens are sacred. Components are versioned. Patterns are owned by product teams.',
      'Contribution is the hard part. We run a lightweight RFC process: any team can propose a component, but it ships only with usage documentation, accessibility review and a deprecation path. That friction is what keeps the system coherent.',
      'The metrics that matter: adoption rate, deprecation ratio and time-to-ship for teams using the system. If teams are faster with the system than without it, it is working. If not, the governance is the problem, not the team.',
    ],
  },
  {
    slug: 'ai-agents-in-production',
    category: 'AI',
    title: 'AI agents in production: autonomy with guardrails',
    description:
      'Agents are the new backend. We break down the architecture — memory, tools, permissions and human approval gates — that makes autonomy safe enough to deploy.',
    date: '2025-02-11',
    readMinutes: 8,
    palette: { from: '#1A0A24', to: '#0A0A0D' },
    body: [
      'An AI agent is not a chatbot with more steps. It is a system that perceives state, decides on an action and executes it against real tools. That last part — execution — is where the stakes live.',
      'We structure agent systems in layers: a planner that decomposes goals, a tool layer with explicit capabilities, a memory layer for context, and an approval layer for high-impact actions. Each layer has its own failure modes and its own tests.',
      'The approval gate is the design decision most teams underweight. Read-only actions can be autonomous; anything that spends money, sends messages or deletes data needs a human in the loop. The ratio of autonomous to approved actions is a product decision, not an engineering one.',
      'Observability is the whole game. Every agent run needs a trace: the goal, the plan, the tool calls, the outcomes and the token cost. When an agent misbehaves, you need to replay its reasoning, not guess.',
      'Teams that treat agents as services — with SLAs, canary deployments and rollback — are the ones whose autonomy features survive contact with customers.',
    ],
  },
  {
    slug: 'growth-engineering',
    category: 'Growth',
    title: 'Growth engineering: when marketing and product share a roadmap',
    description:
      'The fastest-growing companies we work with treat growth as an engineering discipline. A framework for combining product, data and campaigns into one system.',
    date: '2024-12-05',
    readMinutes: 6,
    palette: { from: '#0A241A', to: '#0A0A0D' },
    body: [
      'Marketing that cannot ship is just noise. Product that ignores acquisition is just craft. The companies compounding fastest have one team, one roadmap and one metric that both marketing and engineering answer to.',
      'The framework is simple: instrument everything from day one, run experiments with real statistical discipline, and let the product surface carry the campaigns. A landing page is a product. An email is a product. A pricing page is a product.',
      'We wire analytics into the product itself — events, funnels, cohort views — before any campaign spends a rupee. You cannot optimize what you cannot measure, and most teams are optimizing vibes.',
      'The biggest growth wins in our portfolio came from product changes, not ad spend: a faster checkout, a clearer pricing page, an onboarding flow that showed value in 90 seconds. Growth engineering is just product engineering aimed at the metric that matters.',
    ],
  },
  {
    slug: 'migrating-to-typescript',
    category: 'Technology',
    title: 'Migrating a legacy codebase to TypeScript without stopping the business',
    description:
      'A pragmatic, low-risk playbook for moving a production system to TypeScript incrementally — while shipping features the whole time.',
    date: '2024-10-22',
    readMinutes: 5,
    palette: { from: '#0A0A24', to: '#0A0A0D' },
    body: [
      'The worst way to migrate to TypeScript is the "big bang rewrite". The best way is a slow, boring, mechanical process that never blocks shipping. We have done this on codebases with hundreds of thousands of lines.',
      'Start with tooling, not code: add the compiler in loose mode, get the build green, then tighten. AllowJs lets you migrate file by file while the whole system stays shippable.',
      'The ordering matters: migrate the leaf modules first — utilities, models, API clients — where types pay off immediately, then work inward. Every migrated file reduces the surface area of the next one.',
      'Strict mode comes last, when the codebase can survive it. The payoff — a codebase where refactors are safe and onboarding takes days instead of weeks — is worth the slow burn. Business never stopped; velocity actually went up.',
    ],
  },
];

export const getInsight = (slug: string) => insights.find((i) => i.slug === slug);
