'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Media query reactiva. Vía `useSyncExternalStore` para que el snapshot del
 * servidor sea siempre `false` y no haya mismatch de hidratación.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Punto de corte del layout de escritorio, alineado con el CSS. */
export const DESKTOP_QUERY = '(min-width: 901px)';

/** Solo mouse: nada de imanes ni tilt en pantallas táctiles. */
export const FINE_POINTER_QUERY = '(pointer: fine)';
