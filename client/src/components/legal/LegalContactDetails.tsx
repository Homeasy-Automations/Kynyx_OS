import { Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT, OFFICE_LOCATIONS } from '../../data/site';

/**
 * Email link + a grid of individual office cards (city, full address, tel
 * link). Pulls from the same data/site.ts source used on the Contact page
 * and Footer, so every location and phone number stays in sync site-wide.
 */
export function LegalContactDetails() {
  return (
    <div className="mt-6 space-y-6">
      <a
        href={`mailto:${CONTACT.email}`}
        className="inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink-panel px-5 py-2.5 font-mono text-sm text-mist transition-colors duration-300 hover:border-signal hover:text-signal"
      >
        <Mail className="h-4 w-4 text-signal" aria-hidden="true" />
        {CONTACT.email}
      </a>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {OFFICE_LOCATIONS.map((office) => (
          <div
            key={office.city}
            className="rounded-xl border border-ink-line bg-ink-panel/60 p-5 transition-colors duration-300 hover:border-signal/40"
          >
            <p className="flex items-center gap-2 font-display text-sm font-semibold text-mist">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
              {office.city}, {office.country}
            </p>
            <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-ash">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal" aria-hidden="true" />
              {office.address}
            </p>
            <a
              href={`tel:${office.phone.replace(/\s/g, '')}`}
              className="mt-3 inline-flex items-center gap-2 text-xs text-mist/70 transition-colors duration-300 hover:text-signal"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {office.phone}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
