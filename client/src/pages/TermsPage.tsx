import { PageHero } from '../components/ui/PageHero';
import { useSEO } from '../hooks/useSEO';

const SECTIONS = [
  {
    title: '1. Agreement to terms',
    body: 'These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Kynyx Solutions LLC ("we," "us," or "our"), concerning your access to and use of the kynyx.com website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site"). You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Service. If you do not agree with all of these terms, then you are expressly prohibited from using the Site.',
  },
  {
    title: '2. Intellectual property rights',
    body: 'Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics (collectively, the "Content") and the trademarks, service marks, and logos ("Marks") are owned or licensed by us and protected by copyright, trademark, and unfair competition laws of the United States and international conventions.',
  },
  {
    title: '3. User representations',
    body: 'By using the Site, you represent that: you have the legal capacity to comply with these terms; you are not a minor in your jurisdiction; you will not access the Site through automated or non-human means (e.g., bots or scripts); you will not use the Site for any unlawful purpose; and your use will not violate applicable laws or regulations.',
  },
  {
    title: '4. Prohibited activities',
    body: 'You may not use the Site for any purpose other than what we make available. Commercial use not expressly approved by us is prohibited.',
  },
  {
    title: '5. Governing law',
    body: 'These terms are governed by the laws of the State of Delaware, without regard to its conflict of law principles. Disputes will be resolved in Delaware courts.',
  },
  {
    title: '6. Disclaimer',
    body: 'The Site is provided "as is" and "as available." Your use is at your sole risk. We disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.',
  },
  {
    title: '7. Limitation of liability',
    body: 'In no event shall we be liable for any indirect, incidental, consequential, exemplary, or special damages, including lost profits, even if advised of such possibility.',
  },
  {
    title: '8. Indemnification',
    body: 'You agree to indemnify and hold us harmless from any loss or damages arising from your use of the Site, violation of these Terms, or infringement of third-party rights.',
  },
  {
    title: '9. Contact us',
    body: 'To resolve complaints or request more information about these Terms, contact us at info@kynyx.com, or write to us at any of our offices: The Green, Suite A, Dover, DE 19901, United States · 9th Floor, Logix Cyber Park, Tower-C, Sec-62, Noida, U.P 201309, India · 5th Floor, Mauryalok Complex, A-Block, Patna 800001, Bihar, India.',
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
          Last updated: 30 July 2025
        </p>
      </section>
    </>
  );
}
