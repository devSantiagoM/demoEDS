'use client';

import { m, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { FINE_POINTER_QUERY, useMediaQuery } from '@/lib/hooks';
import { cn } from '@/lib/utils';

/**
 * Cursor de la casa. Solo con mouse y sin movimiento reducido.
 * La posición vive en motion values (no re-renderiza); el único estado de React
 * es el "grande / chico", que cambia con `mouseover`, no con cada `mousemove`.
 */
export function Cursor() {
  const fine = useMediaQuery(FINE_POINTER_QUERY);
  const reduce = useReducedMotion();
  const enabled = fine && !reduce;

  const [big, setBig] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.35 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as Element | null;
      setBig(Boolean(target?.closest?.('a, button, [data-cursor="big"]')));
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <m.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[70] mix-blend-difference"
    >
      <div
        className={cn(
          '-translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,background-color] duration-400 ease-spring',
          big ? 'size-[74px] bg-paper' : 'size-[14px] bg-gold',
        )}
      />
    </m.div>
  );
}
