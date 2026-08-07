import { Mail, MapPin, Phone } from 'lucide-react';
import { InquiryForm } from '../components/forms/InquiryForm';
import { PageHero } from '../components/ui/PageHero';
import { CONTACT } from '../data/site';
import { useSEO } from '../hooks/useSEO';

export default function ContactPage() {
  useSEO(
    'Contact',
    'Start a project with KYNYX. Tell us what you are building and our team will get back within one business day.',
  );

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Start a
            <br />
            <span className="text-signal">project.</span>
          </>
        }
        description="Tell us what you're building. We'll come back within one business day with initial thoughts — no sales deck required."
      />

      <section className="mx-auto max-w-shell px-5 py-16 md:px-8 md:py-24 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <InquiryForm />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="rounded-2xl border border-ink-line bg-ink-raised p-8">
                <h2 className="font-display text-xl font-semibold text-mist">Prefer email?</h2>
                <p className="mt-3 text-sm leading-relaxed text-ash">
                  Send your brief directly — we read everything and reply personally.
                </p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="mt-5 inline-flex items-center gap-2 font-mono text-sm text-signal transition-opacity hover:opacity-80"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {CONTACT.email}
                </a>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="mt-3 inline-flex items-center gap-2 font-mono text-sm text-mist/70 transition-colors hover:text-signal"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {CONTACT.phone}
                </a>
                <p className="mt-3 flex items-center gap-2 font-mono text-sm text-ash">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {CONTACT.location}
                </p>
              </div>

              <div className="rounded-2xl border border-ink-line bg-ink-raised p-8">
                <h2 className="font-mono text-[10px] uppercase tracking-widest text-signal">What happens next?</h2>
                <ol className="mt-5 space-y-4">
                  {[
                    'We review your inquiry within one business day.',
                    'A short intro call to understand your goals and constraints.',
                    'A proposal with scope, timeline and fixed pricing — no surprises.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-mist/70">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/15 font-mono text-[10px] text-signal">
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>

              <p className="px-2 text-xs leading-relaxed text-ash-deep">
                Your details are stored securely and used only to respond to your inquiry.
                See our <a href="/privacy" className="text-ash underline decoration-ink-line underline-offset-2 transition-colors hover:text-signal">privacy policy</a>.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
