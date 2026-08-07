import { PageHero } from '../components/ui/PageHero';
import { useSEO } from '../hooks/useSEO';

const SECTIONS = [
  {
    title: '1. Agreement',
    body: 'By accessing kynyx.agency you agree to these terms. If you are engaging KYNYX for services, the specific engagement agreement governs that work; these terms cover the website itself.',
  },
  {
    title: '2. Use of the site',
    body: 'You may browse the site freely. You may not scrape, reverse-engineer, or misuse its content for commercial purposes without written permission. Content is provided for information about KYNYX and its capabilities.',
  },
  {
    title: '3. Intellectual property',
    body: 'All content — text, design, code and visuals — is the property of KYNYX unless otherwise stated. Case studies shown belong to their respective clients; KYNYX presents them with permission.',
  },
  {
    title: '4. Inquiries',
    body: 'Submitting an inquiry does not create a contractual relationship. We review every inquiry but are not obligated to respond or to accept any engagement.',
  },
  {
    title: '5. Limitation of liability',
    body: 'The site is provided "as is". KYNYX is not liable for indirect or consequential damages arising from use of the site. Nothing in these terms limits liability that cannot be limited by law.',
  },
  {
    title: '6. Changes',
    body: 'We may update these terms as the site evolves. Material changes will be reflected here with an updated date.',
  },
  {
    title: '7. Contact',
    body: 'Questions about these terms? Email hello@kynyx.agency.',
  },
];

export default function TermsPage() {
  useSEO('Terms', 'Terms of use for the KYNYX website.');

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Terms
            <br />
            <span className="text-signal">of Use</span>
          </>
        }
        description="The straightforward rules for browsing kynyx.agency."
      />
      <section className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <div className="space-y-12">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-xl font-semibold text-mist">{s.title}</h2>
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
