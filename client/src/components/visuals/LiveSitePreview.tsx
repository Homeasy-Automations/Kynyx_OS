import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/** The width (px) we ask the embedded page to render at, i.e. a "desktop"
 *  viewport. The iframe is then CSS-scaled down to fit the container, so
 *  the embedded site's own hero — including any autoplaying video — shows
 *  through at roughly its real desktop layout. */
const BASE_WIDTH = 1440;

interface LiveSitePreviewProps {
  url: string;
  title: string;
  className?: string;
  /** Rendered instead of the iframe until it scrolls into view, and
   *  permanently if the site cannot be embedded (see caveat below). */
  fallback: React.ReactNode;
}

/**
 * Embeds a live website inside any-aspect-ratio container, scaled to fit,
 * non-interactive (pointer-events: none) so existing card click/hover
 * behavior keeps working exactly as before.
 *
 * Caveat: some sites send security headers (X-Frame-Options / CSP
 * frame-ancestors) that block being iframed. Browsers don't expose that
 * failure to JavaScript, so there's no reliable way to auto-detect it and
 * swap back to `fallback` — a blocked site will just render blank here.
 */
export function LiveSitePreview({ url, title, className, fallback }: LiveSitePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '200px' });
  const [size, setSize] = useState<{ scale: number; height: number } | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      const scale = width / BASE_WIDTH;
      setSize({ scale, height: height / scale });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative', overflow: 'hidden' }}>
      {!inView || !size ? (
        fallback
      ) : (
        <iframe
          src={url}
          title={title}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          allow="autoplay"
          style={{
            width: BASE_WIDTH,
            height: size.height,
            border: 'none',
            transform: `scale(${size.scale})`,
            transformOrigin: 'top left',
            // pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}
