import {
  AlertTriangle,
  Ban,
  BookOpen,
  Clock,
  Copyright,
  FileCheck,
  FileSignature,
  Mail,
  Scale,
  ShieldAlert,
  UserCheck,
} from 'lucide-react';
import { BackToTop } from '../components/insights/BackToTop';
import { LegalContactDetails } from '../components/legal/LegalContactDetails';
import { LegalDocument } from '../components/legal/LegalDocument';
import { LegalHeroBadges } from '../components/legal/LegalHeroBadges';
import { PageHero } from '../components/ui/PageHero';
import { useSEO } from '../hooks/useSEO';

const SECTIONS = [
  {
    id: 'agreement',
    title: '1. Agreement to terms',
    icon: FileCheck,
    body: 'These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Kynyx Solutions LLC ("we," "us," or "our"), concerning your access to and use of the kynyx.com website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site"). You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Service. If you do not agree with all of these terms, then you are expressly prohibited from using the Site.',
  },
  {
    id: 'ip-rights',
    title: '2. Intellectual property rights',
    icon: Copyright,
    body: 'Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics (collectively, the "Content") and the trademarks, service marks, and logos ("Marks") are owned or licensed by us and protected by copyright, trademark, and unfair competition laws of the United States and international conventions.',
  },
  {
    id: 'user-reps',
    title: '3. User representations',
    icon: UserCheck,
    body: 'By using the Site, you represent that: you have the legal capacity to comply with these terms; you are not a minor in your jurisdiction; you will not access the Site through automated or non-human means (e.g., bots or scripts); you will not use the Site for any unlawful purpose; and your use will not violate applicable laws or regulations.',
  },
  {
    id: 'prohibited',
    title: '4. Prohibited activities',
    icon: Ban,
    body: 'You may not use the Site for any purpose other than what we make available. Commercial use not expressly approved by us is prohibited.',
  },
  {
    id: 'governing-law',
    title: '5. Governing law',
    icon: Scale,
    body: 'These terms are governed by the laws of the State of Delaware, without regard to its conflict of law principles. Disputes will be resolved in Delaware courts.',
  },
  {
    id: 'disclaimer',
    title: '6. Disclaimer',
    icon: AlertTriangle,
    body: 'The Site is provided "as is" and "as available." Your use is at your sole risk. We disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.',
  },
  {
    id: 'liability',
    title: '7. Limitation of liability',
    icon: ShieldAlert,
    body: 'In no event shall we be liable for any indirect, incidental, consequential, exemplary, or special damages, including lost profits, even if advised of such possibility.',
  },
  {
    id: 'indemnification',
    title: '8. Indemnification',
    icon: FileSignature,
    body: 'You agree to indemnify and hold us harmless from any loss or damages arising from your use of the Site, violation of these Terms, or infringement of third-party rights.',
  },
  {
    id: 'contact',
    title: '9. Contact us',
    icon: Mail,
    body: 'To resolve complaints or request more information about these Terms, contact us by email or write to us at any of our offices below.',
    render: () => <LegalContactDetails />,
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
        description="The straightforward rules for browsing kynyx.com."
      >
        <LegalHeroBadges
          badges={[
            { icon: BookOpen, label: '9 clear clauses' },
            { icon: Scale, label: 'Delaware governing law' },
            { icon: Clock, label: 'Updated 30 Jul 2025' },
          ]}
        />
      </PageHero>
      <LegalDocument sections={SECTIONS} lastUpdated="30 July 2025" />
      <BackToTop />
    </>
  );
}
