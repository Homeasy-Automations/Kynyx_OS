import { createContext, useContext } from 'react';

/**
 * Signals whether the initial loader (see components/effects/Loader.tsx)
 * has finished. Components with mount-triggered entrance animations that
 * would otherwise run — invisibly — underneath the loader on first visit
 * can gate their mount on this so the entrance is actually seen, matching
 * the experience of navigating back to the page later (when there is no
 * loader in the way).
 *
 * Defaults to `true` so anything using this context outside of AppShell
 * (e.g. in isolation/tests) behaves as if already ready.
 */
const AppReadyContext = createContext<boolean>(true);

export const AppReadyProvider = AppReadyContext.Provider;

export function useAppReady(): boolean {
  return useContext(AppReadyContext);
}
