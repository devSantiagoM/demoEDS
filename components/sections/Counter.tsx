'use client';

import {
  animate,
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';
import { useEffect, useRef } from 'react';

/**
 * Contador animado. El número vive en un motion value y se renderiza como hijo
 * del `m.span`: Motion escribe el texto directo en el DOM, así que la cuenta de
 * 0 a 153 no dispara un solo re-render de React.
 */
export function Counter({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  const count = useMotionValue(0);
  const texto = useTransform(count, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      count.set(to);
      return;
    }
    const controls = animate(count, to, { duration: 1.2, ease: [0.22, 0.61, 0.36, 1] });
    return () => controls.stop();
  }, [inView, reduce, to, count]);

  return (
    <m.span ref={ref} className={className}>
      {texto}
    </m.span>
  );
}
