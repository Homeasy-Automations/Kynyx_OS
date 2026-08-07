import { motion } from 'framer-motion';
import { useState } from 'react';
import { fadeUp, stagger } from '../../animations/variants';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { AI_CAPABILITIES } from '../../data/site';
import { cn } from '../../utils';

const FLOW = [
  { key: 'input', label: 'USER / BUSINESS', sub: 'Questions · Tasks · Data', y: 0 },
  { key: 'engine', label: 'AI ENGINE', sub: 'LLMs · Agents · Retrieval', y: 0 },
  { key: 'tools', label: 'TOOLS + DATA + APIs', sub: 'Your stack, connected', y: 0 },
  { key: 'output', label: 'AUTOMATION / INSIGHTS / ACTIONS', sub: 'Outcomes, not outputs', y: 0 },
];

/**
 * AI section — "AI isn't an add-on. It's part of the architecture."
 * Interactive node-flow visual on the right; capability list on the left.
 */
export function AISection() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative mx-auto max-w-shell overflow-hidden px-5 py-28 md:px-8 md:py-40 lg:px-12" aria-label="AI capabilities">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -right-40 top-1/3 h-[520px] w-[520px] rounded-full opacity-40 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(198,255,62,0.14), transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-12">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <SectionHeading
            eyebrow="AI Capabilities"
            title={
              <>
                AI isn&rsquo;t an add-on.
                <br />
                <span className="text-signal">It&rsquo;s part of the architecture.</span>
              </>
            }
            description="We build intelligence into the systems themselves — grounded, evaluated and safe to put in front of customers."
          />

          <ul className="mt-12 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {AI_CAPABILITIES.map((cap, i) => (
              <motion.li
                key={cap.name}
                variants={fadeUp}
                custom={Math.floor(i / 2)}
                className="group flex items-start gap-3"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal transition-transform duration-300 group-hover:scale-150" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-mist transition-colors group-hover:text-signal">
                    {cap.name}
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-ash">{cap.description}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Interactive flow visual */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative rounded-3xl border border-ink-line bg-ink-raised p-6 md:p-10"
          aria-label="AI architecture flow"
        >
          <div className="mb-8 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-ash">AI architecture</span>
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-signal">
              <span className="h-1.5 w-1.5 animate-blink-dot rounded-full bg-signal" aria-hidden="true" />
              Live
            </span>
          </div>

          <div className="flex flex-col">
            {FLOW.map((node, i) => {
              const isLast = i === FLOW.length - 1;
              return (
                <div key={node.key} className="flex flex-col">
                  <motion.button
                    type="button"
                    onMouseEnter={() => setActive(node.key)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(node.key)}
                    onBlur={() => setActive(null)}
                    className={cn(
                      'group relative flex w-full items-center justify-between rounded-2xl border px-5 py-5 text-left transition-all duration-500 md:px-7 md:py-6',
                      isLast
                        ? 'border-signal/40 bg-signal-dim'
                        : 'border-ink-line bg-ink-panel hover:border-signal/40',
                      active === node.key && 'border-signal/60 shadow-glow',
                    )}
                    aria-label={`${node.label} — ${node.sub}`}
                  >
                    <div>
                      <p
                        className={cn(
                          'font-display text-sm font-semibold tracking-wide md:text-base',
                          isLast ? 'text-signal' : 'text-mist',
                        )}
                      >
                        {node.label}
                      </p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ash">{node.sub}</p>
                    </div>
                    <span
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full border text-[10px] font-bold',
                        isLast ? 'border-signal/50 bg-signal text-ink' : 'border-ink-line text-ash',
                      )}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                  </motion.button>

                  {!isLast && (
                    <div className="flex flex-col items-center py-1" aria-hidden="true">
                      <motion.span
                        animate={{ y: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.3, ease: 'easeInOut' }}
                        className="text-signal"
                      >
                        ↓
                      </motion.span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-widest text-ash">
            Hover a stage to focus
          </p>
        </motion.div>
      </div>
    </section>
  );
}
