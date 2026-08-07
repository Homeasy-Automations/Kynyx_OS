import { Mail, MapPin, Phone } from 'lucide-react';
import type { ComponentType } from 'react';
import { CONTACT } from '../../data/site';
import { cn } from '../../utils';

interface ContactRow {
  icon: ComponentType<{ className?: string }>;
  label: string;
  text: string;
  href?: string;
}

interface ContactDetailsProps {
  className?: string;
  /** Include the email row. Off by default since it's often shown elsewhere. */
  showEmail?: boolean;
}

/**
 * Labelled icon-badge rows for email/phone/location — each value gets its
 * own row with a small caption above it, so address and phone never run
 * together regardless of surrounding layout or text length.
 */
export function ContactDetails({ className, showEmail = false }: ContactDetailsProps) {
  const rows: ContactRow[] = [
    ...(showEmail
      ? [{ icon: Mail, label: 'Email', text: CONTACT.email, href: `mailto:${CONTACT.email}` }]
      : []),
    { icon: Phone, label: 'Phone', text: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: 'Location', text: CONTACT.location },
  ];

  return (
    <ul className={cn('space-y-4', className)}>
      {rows.map((row) => {
        const Icon = row.icon;
        const inner = (
          <>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-line text-signal transition-colors duration-300 group-hover:border-signal/50">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-ash-deep">
                {row.label}
              </span>
              <span className="block text-sm leading-snug text-mist/80">{row.text}</span>
            </span>
          </>
        );
        return (
          <li key={row.label}>
            {row.href ? (
              <a href={row.href} className="group flex items-start gap-3 transition-colors hover:text-signal">
                {inner}
              </a>
            ) : (
              <div className="flex items-start gap-3">{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
