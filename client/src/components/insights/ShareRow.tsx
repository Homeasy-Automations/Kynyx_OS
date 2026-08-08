import { Check, Copy, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../utils';

interface ShareRowProps {
  title: string;
  className?: string;
}

/** Share-to-X, share-to-LinkedIn and copy-link — reads the current URL at
 * click time so it works correctly wherever the page is hosted. */
export function ShareRow({ title, className }: ShareRowProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => window.location.href;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — fail silently, link sharing still works via the other buttons.
    }
  };

  const iconBtn = 'flex h-9 w-9 items-center justify-center rounded-full border border-ink-line text-ash transition-colors duration-300 hover:border-signal/50 hover:text-signal';

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="mr-1 font-mono text-[10px] uppercase tracking-widest text-ash">Share</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(getUrl())}`}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Share on X"
        className={iconBtn}
      >
        <Twitter className="h-4 w-4" aria-hidden="true" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Share on LinkedIn"
        className={iconBtn}
      >
        <Linkedin className="h-4 w-4" aria-hidden="true" />
      </a>
      <button type="button" onClick={handleCopy} aria-label="Copy link" className={iconBtn}>
        {copied ? <Check className="h-4 w-4 text-signal" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      </button>
    </div>
  );
}
