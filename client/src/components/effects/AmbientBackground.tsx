import { FloatingAIField } from './FloatingAIField';
import { ParticleField } from './ParticleField';
import { useAppReady } from '../../context/AppReadyContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Site-wide ambient background — grid lines, gradient glow, particle
 * constellation and the floating AI/data motif. Originally lived inside the
 * homepage Hero section; moved here (mounted once in AppShell, outside the
 * routed page tree) so it stays fixed to the viewport and keeps running
 * across every page and every route change, instead of unmounting whenever
 * you navigate away from "/". None of the pieces below were changed —
 * same grid, same gradient, same ParticleField/FloatingAIField components.
 */
export function AmbientBackground() {
  const reduced = usePrefersReducedMotion();
  const ready = useAppReady();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-grid-lines bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_40%,black,transparent)]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 70% 20%, rgba(198,255,62,0.07), transparent 60%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(110,168,255,0.05), transparent 60%)',
        }}
      />
      <ParticleField className="absolute inset-0 h-full w-full opacity-70" />

      {/* Free-floating AI/data motif — drifts on its own, recoils from the cursor.
          Gated on `ready` (loader finished) so its entrance plays visibly on first
          load too, instead of running out unseen underneath the loader. */}
      {!reduced && ready && <FloatingAIField />}
    </div>
  );
}
