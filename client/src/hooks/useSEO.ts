import { useEffect } from 'react';

const SITE = 'KYNYX';

/** Lightweight per-page SEO: document title + meta description. */
export function useSEO(title: string, description?: string): void {
  useEffect(() => {
    const full = title === SITE ? SITE : `${title} — ${SITE}`;
    document.title = full;

    if (description) {
      let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
  }, [title, description]);
}
