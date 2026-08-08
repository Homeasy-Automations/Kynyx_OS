import { PageHero } from '../components/ui/PageHero';
import { useSEO } from '../hooks/useSEO';

const SECTIONS = [
  {
    id: 'overview',
    title: 'Overview',
    body: 'Welcome to Kynyx Solutions LLC ("Kynyx," "we," "us," or "our"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website kynyx.com (the "Site"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Site.',
  },
  {
    id: 'data',
    title: 'Information we collect',
    body: 'Personal data you provide to us: such as your name, email address, telephone number, and other details you submit via contact forms. Information we collect automatically: includes your IP address, browser type, operating system, access times, and viewed pages. Cookies and tracking technologies: used to enhance user experience; browser settings may allow disabling them but could affect functionality.',
  },
  {
    id: 'use',
    title: 'How we use your information',
    body: 'We use your information to provide a smooth, efficient, and customized experience. Specifically, we may use it to respond to your inquiries and provide requested services, deliver targeted advertising, coupons, newsletters, and promotions, monitor and improve our website and services, and prevent fraud and protect against criminal activity.',
  },
  {
    id: 'disclosure',
    title: 'Disclosure of your information',
    body: 'We do not sell or trade your personal information. We may share it in cases such as: by law or to protect rights — in response to legal processes or to protect others; and third-party service providers — for operations like data analysis or hosting.',
  },
  {
    id: 'security',
    title: 'Data security',
    body: 'We use administrative, technical, and physical safeguards to protect your data. However, no method of transmission over the internet is 100% secure.',
  },
  {
    id: 'state-rights',
    title: 'Your state privacy rights',
    body: 'We comply with applicable U.S. state privacy laws. For example, California residents have the right under CCPA to know the personal information we collect, request deletion of personal information, and opt out of data sale (note: Kynyx does not sell personal info). To exercise these rights, contact us using the info below. We will not discriminate against you for exercising your rights.',
  },
  {
    id: 'dnt',
    title: 'Do-Not-Track signals',
    body: 'Currently, we do not respond to Do-Not-Track (DNT) browser signals or similar mechanisms.',
  },
  {
    id: 'children',
    title: "Children's privacy",
    body: 'Our Site is not intended for children under 13. We do not knowingly collect personal data from them. If we learn we have done so, we will delete it immediately.',
  },
  {
    id: 'changes',
    title: 'Changes to this privacy policy',
    body: 'We may update this policy from time to time. Updates will be posted on this page, so please review it periodically.',
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: 'If you have questions or comments about this Privacy Policy, please contact us at info@kynyx.com, or write to us at any of our offices: The Green, Suite A, Dover, DE 19901, United States · 9th Floor, Logix Cyber Park, Tower-C, Sec-62, Noida, U.P 201309, India · 5th Floor, Mauryalok Complex, A-Block, Patna 800001, Bihar, India.',
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
          Last updated: 30 July 2025
        </p>
      </section>
    </>
  );
}
