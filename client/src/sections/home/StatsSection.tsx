import { Counter } from '../../components/ui/Counter';
import { Reveal } from '../../components/ui/Reveal';
import { STATS } from '../../data/site';

/**
 * Animated statistics. Numbers live in src/data/site.ts — swap them for
 * real company figures without touching this component.
 */
export function StatsSection() {
  return (
    <section className="border-y border-ink-line bg-ink-deep" aria-label="Company statistics">
      <div className="mx-auto grid max-w-shell grid-cols-2 gap-px bg-ink-line lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i} className="bg-ink-deep">
            <div className="flex flex-col gap-4 px-6 py-14 md:px-10 md:py-20">
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                className="font-display text-5xl font-bold tracking-tight text-mist md:text-6xl lg:text-7xl"
              />
              <p className="font-mono text-[11px] uppercase tracking-widest text-ash">
                {stat.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
