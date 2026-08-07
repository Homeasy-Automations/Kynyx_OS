/** Join class names, filtering falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Format a date as "12 Mar 2025". */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** Estimate reading time from a word count. */
export function readingTime(words: number): string {
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

/** Generate a short uppercase reference id, e.g. KNYX-8F2A1C. */
export function referenceId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  for (let i = 0; i < 6; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return `KNYX-${out}`;
}
