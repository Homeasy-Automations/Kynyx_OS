import { Marquee } from '../../components/ui/Marquee';
import { Reveal } from '../../components/ui/Reveal';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { CAPABILITIES, MARQUEE_TECH } from '../../data/site';

/**
 * Capabilities — a technology marquee plus interactive grouped pills.
 * Deliberately not a boring logo grid.
 */
export function Capabilities() {
  return (
    <section className="relative border-y border-ink-line bg-ink-deep py-28 md:py-36" aria-label="Capabilities">
      <Marquee items={MARQUEE_TECH} className="mb-24 border-b border-ink-line pb-14 opacity-80" />

      <div className="mx-auto max-w-shell px-5 md:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Capabilities"
          title="Technology that scales with your ambition."
          description="We stay deliberately close to the core of the modern stack — typed frontends, resilient backends, managed data and an AI layer that is part of the architecture."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line md:grid-cols-2 lg:grid-cols-5">
          {CAPABILITIES.map((group, gi) => (
            <div key={group.title} className="group bg-ink-raised p-7 transition-colors duration-500 hover:bg-ink-panel">
              <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
                {String(gi + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 font-display text-lg font-semibold text-mist">{group.title}</h3>
              <ul className="mt-5 flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <li key={item}>
                    <span className="tech-chip inline-flex cursor-default items-center gap-2 rounded-full border border-ink-line px-3 py-1.5 text-xs text-mist/70 transition-all duration-300 hover:border-signal/60 hover:bg-signal-dim hover:text-signal">
                      <span className="h-1 w-1 rounded-full bg-signal/50 transition-colors duration-300 group-hover:bg-signal" aria-hidden="true" />
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="max-w-2xl text-sm leading-relaxed text-ash">
            Missing a stack on this list? Our engineering team ships with whatever
            technology genuinely fits the problem — these are the tools we reach for most,
            not the only tools we know.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
