/** Minimal loading state shown while a lazy page chunk is fetched. */
export function PageFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status" aria-label="Loading page">
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-ash">
        <span className="h-1.5 w-1.5 animate-blink-dot rounded-full bg-signal" aria-hidden="true" />
        Loading
      </div>
    </div>
  );
}
