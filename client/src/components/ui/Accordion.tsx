import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useId, useState } from 'react';
import { EASE } from '../../animations/variants';
import { cn } from '../../utils';

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  /** Index open by default, or null to start fully collapsed. Default: 0. */
  defaultOpen?: number | null;
}

/** Single-open FAQ accordion — one panel expanded at a time, animated height. */
export function Accordion({ items, className, defaultOpen = 0 }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className={cn('divide-y divide-ink-line rounded-2xl border border-ink-line bg-ink-raised', className)}>
      {items.map((item, i) => {
        const expanded = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={item.question}>
            <button
              type="button"
              id={buttonId}
              onClick={() => setOpen(expanded ? null : i)}
              aria-expanded={expanded}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-ink-panel md:px-8"
            >
              <span className="font-display text-base font-medium text-mist md:text-lg">{item.question}</span>
              <span
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-line text-mist transition-all duration-300',
                  expanded && 'rotate-45 border-signal bg-signal text-ink',
                )}
                aria-hidden="true"
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed text-ash md:px-8 md:text-base">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
