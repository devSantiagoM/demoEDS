'use client';

import { m, useScroll, useSpring } from 'motion/react';

/** Barra de progreso de lectura. Un solo motion value: cero re-renders. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-red to-gold"
    />
  );
}
