import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import type { IconType } from 'react-icons';
import {
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { EASE } from '../../animations/variants';
import {
  CONTACT,
  FOOTER_LINKS,
  FOOTER_SERVICES,
  LEGAL_LINKS,
  OFFICE_LOCATIONS,
  SOCIAL_LINKS,
} from '../../data/site';
import { Logo } from './Logo';

const SOCIAL_ICONS: Record<string, IconType> = {
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  x: FaXTwitter,
  github: FaGithub,
};

/**
 * Oversized premium footer: statement, navigation columns, contact info,
 * socials, legal links and an animated KYNYX wordmark.
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-line bg-ink-deep">
      <div className="mx-auto max-w-shell px-5 pb-10 pt-10 md:px-8 lg:px-12">
        {/* Top row */}
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm font-display text-2xl font-medium leading-snug tracking-tight text-mist md:text-3xl">
              Engineering what&rsquo;s next.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ash">
              KYNYX designs and engineers digital products, intelligent systems and
              scalable technology for ambitious businesses worldwide.
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-signal transition-opacity hover:opacity-80"
            >
              {CONTACT.email}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-7">
            <nav aria-label="Footer — explore">
              <FooterColumnTitle>Explore</FooterColumnTitle>
              <ul className="mt-4 space-y-3">
                {FOOTER_LINKS.map((l) => (
                  <FooterLink key={l.to} to={l.to} label={l.label} />
                ))}
              </ul>
            </nav>
            <nav aria-label="Footer — services">
              <FooterColumnTitle>Services</FooterColumnTitle>
              <ul className="mt-4 space-y-3">
                {FOOTER_SERVICES.map((l) => (
                  <FooterLink key={l.to} to={l.to} label={l.label} />
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Offices */}
        <div className="mt-6 border-t border-ink-line pt-6">
          <FooterColumnTitle>Offices</FooterColumnTitle>
          <div className="mt-6 grid gap-10 sm:grid-cols-3 sm:divide-x sm:divide-ink-line">
            {OFFICE_LOCATIONS.map((office) => (
              <div key={office.city} className="sm:pl-10 sm:first:pl-0">
                <p className="font-display text-base font-medium text-mist">
                  {office.city}, {office.country}
                </p>
                <p className="mt-3 flex items-start gap-3 text-sm leading-relaxed text-ash">
                  <MapPin
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal"
                    aria-hidden="true"
                  />

                  <span>
                    {office.address.split(' ').slice(0, 6).join(' ')}
                    {office.address.split(' ').length > 6 && (
                      <>
                        <br />
                        {office.address.split(' ').slice(6).join(' ')}
                      </>
                    )}
                  </span>
                </p>
                <a
                  href={`tel:${office.phone.replace(/\s/g, '')}`}
                  className="mt-2 inline-flex items-center gap-2 text-sm text-mist/70 transition-colors hover:text-signal"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {office.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-5 flex flex-col items-start justify-between gap-4 border-t border-ink-line pt-4 md:flex-row md:items-center">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ash">
            {/* © {new Date().getFullYear()} KYNYX — Digital Technology Agency */}
            © 2025 Kynyx Solutions LLC
          </p>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon];

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-ink-line text-ash transition-all duration-300 hover:border-signal hover:bg-signal hover:text-ink"
                >
                  <span
                    aria-hidden="true"
                    className="text-base transition-transform duration-300 group-hover:scale-110"
                  >
                    <Icon />
                  </span>
                </a>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="font-mono text-[10px] uppercase tracking-widest text-ash transition-colors hover:text-mist"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <motion.p
          initial={{ y: '45%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.1, ease: EASE }}
          className="whitespace-nowrap text-center font-display font-bold leading-[0.8] tracking-tightest text-mist/[0.06]"
          style={{ fontSize: 'clamp(5rem, 21vw, 26rem)' }}
        >
          KYNYX
        </motion.p>
      </div>
    </footer>
  );
}

function FooterColumnTitle({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[10px] uppercase tracking-widest text-ash">{children}</p>;
}

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <li>
      <Link
        to={to}
        className="group inline-flex items-center gap-1.5 text-sm text-mist/70 transition-colors hover:text-signal"
      >
        {label}
        <ArrowUpRight
          className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
          aria-hidden="true"
        />
      </Link>
    </li>
  );
}
