import {
  Clock,
  Cookie,
  Database,
  EyeOff,
  Mail,
  RefreshCw,
  Scale,
  Settings2,
  Share2,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { BackToTop } from '../components/insights/BackToTop';
import { LegalContactDetails } from '../components/legal/LegalContactDetails';
import { LegalDocument } from '../components/legal/LegalDocument';
import { LegalHeroBadges } from '../components/legal/LegalHeroBadges';
import { PageHero } from '../components/ui/PageHero';
import { useSEO } from '../hooks/useSEO';

const SECTIONS = [
  {
    id: 'overview',
    title: 'Overview',
    icon: ShieldCheck,
    body: 'Welcome to Kynyx Solutions LLC ("Kynyx," "we," "us," or "our"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website kynyx.com (the "Site"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Site.',
  },
  {
    id: 'data',
    title: 'Information we collect',
    icon: Database,
    body: 'Personal data you provide to us: such as your name, email address, telephone number, and other details you submit via contact forms. Information we collect automatically: includes your IP address, browser type, operating system, access times, and viewed pages. Cookies and tracking technologies: used to enhance user experience; browser settings may allow disabling them but could affect functionality.',
  },
  {
    id: 'use',
    title: 'How we use your information',
    icon: Settings2,
    body: 'We use your information to provide a smooth, efficient, and customized experience. Specifically, we may use it to respond to your inquiries and provide requested services, deliver targeted advertising, coupons, newsletters, and promotions, monitor and improve our website and services, and prevent fraud and protect against criminal activity.',
  },
  {
    id: 'disclosure',
    title: 'Disclosure of your information',
    icon: Share2,
    body: 'We do not sell or trade your personal information. We may share it in cases such as: by law or to protect rights — in response to legal processes or to protect others; and third-party service providers — for operations like data analysis or hosting.',
  },
  {
    id: 'security',
    title: 'Data security',
    icon: Cookie,
    body: 'We use administrative, technical, and physical safeguards to protect your data. However, no method of transmission over the internet is 100% secure.',
  },
  {
    id: 'state-rights',
    title: 'Your state privacy rights',
    icon: Scale,
    body: 'We comply with applicable U.S. state privacy laws. For example, California residents have the right under CCPA to know the personal information we collect, request deletion of personal information, and opt out of data sale (note: Kynyx does not sell personal info). To exercise these rights, contact us using the info below. We will not discriminate against you for exercising your rights.',
  },
  {
    id: 'dnt',
    title: 'Do-Not-Track signals',
    icon: EyeOff,
    body: 'Currently, we do not respond to Do-Not-Track (DNT) browser signals or similar mechanisms.',
  },
  {
    id: 'children',
    title: "Children's privacy",
    icon: Users,
    body: 'Our Site is not intended for children under 13. We do not knowingly collect personal data from them. If we learn we have done so, we will delete it immediately.',
  },
  {
    id: 'changes',
    title: 'Changes to this privacy policy',
    icon: RefreshCw,
    body: 'We may update this policy from time to time. Updates will be posted on this page, so please review it periodically.',
  },
  {
    id: 'contact',
    title: 'Contact us',
    icon: Mail,
    body: 'If you have questions or comments about this Privacy Policy, please contact us by email or write to us at any of our offices below.',
    render: () => <LegalContactDetails />,
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
      >
        <LegalHeroBadges
          badges={[
            { icon: ShieldCheck, label: 'We never sell your data' },
            { icon: Scale, label: 'CCPA aligned' },
            { icon: Clock, label: 'Updated 30 Jul 2025' },
          ]}
        />
      </PageHero>
      <LegalDocument sections={SECTIONS} lastUpdated="30 July 2025" />
      <BackToTop />
    </>
  );
}
