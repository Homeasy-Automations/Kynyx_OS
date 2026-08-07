import { PageHero } from '../components/ui/PageHero';
import { useSEO } from '../hooks/useSEO';

const SECTIONS = [
  {
    id: 'overview',
    title: 'Overview',
    body: 'KYNYX ("we", "us") respects your privacy. This policy explains what we collect when you use kynyx.agency and how we use it. We keep data collection minimal and purposeful.',
  },
  {
    id: 'data',
    title: 'What we collect',
    body: 'When you submit a project inquiry we collect the details you provide: name, email, phone, company, website, services of interest, project description, budget and timeline. We also record basic technical data such as IP address for abuse prevention and analytics, where legally appropriate.',
  },
  {
    id: 'use',
    title: 'How we use it',
    body: 'We use inquiry data solely to respond to you and evaluate a potential engagement. We do not sell your data. We do not use it for marketing unless you opt in.',
  },
  {
    id: 'storage',
    title: 'Storage & security',
    body: 'Inquiries are stored in a secured database with access limited to the KYNYX team. We apply industry-standard safeguards including encrypted transport and least-privilege access.',
  },
  {
    id: 'cookies',
    title: 'Cookies',
    body: 'We use only essential cookies required for the site to function (such as storing your session preferences). We do not use third-party advertising cookies on this site.',
  },
  {
    id: 'rights',
    title: 'Your rights',
    body: 'You may request access to, correction of, or deletion of your personal data at any time by emailing hello@kynyx.agency. We respond to all legitimate requests within 30 days.',
  },
  {
    id: 'contact',
    title: 'Contact',
    body: 'Questions about this policy? Email hello@kynyx.agency — we are happy to talk through it.',
  },
];

export default function PrivacyPage() {
  useSEO('Privacy Policy', 'How KYNYX collects, uses and protects your data.');

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Privacy
            <br />
            <span className="text-signal">Policy</span>
          </>
        }
        description="Short version: we collect what you give us, use it to respond to you, and never sell it."
      />
      <section className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <div className="space-y-12">
          {SECTIONS.map((s, i) => (
            <div key={s.id} id={s.id} className="scroll-mt-32">
              <h2 className="flex items-baseline gap-4 font-display text-2xl font-semibold text-mist">
                <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, '0')}</span>
                {s.title}
              </h2>
              <p className="mt-4 leading-relaxed text-ash">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-16 border-t border-ink-line pt-6 text-xs text-ash-deep">
          Last updated: 6 August 2026
        </p>
      </section>
    </>
  );
}
