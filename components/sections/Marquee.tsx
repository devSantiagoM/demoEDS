'use client';

import {
  m,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import { useRef } from 'react';
import { WhatsappIcon } from '@/components/ui/BrandIcon';
import { Burst } from '@/components/ui/FoodIcon';
import { marqueeItems } from '@/lib/content';
import { wrap } from '@/lib/utils';

/** Copias de la lista en la cinta. Con cuatro no aparece hueco ni en 3440px. */
const COPIES = 4;

/** Velocidad de crucero, en % del ancho total de la cinta por segundo. */
const BASE_VELOCITY = -1.6;

export function Marquee() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Fuera de pantalla la cinta se congela: no tiene sentido gastar un rAF por
  // frame animando algo que nadie ve.
  const inView = useInView(ref, { margin: '200px' });

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  // El scroll rápido empuja la cinta y la inclina; al soltar vuelve sola.
  const velocityFactor = useTransform(smoothVelocity, [-2000, 2000], [4, -4], {
    clamp: true,
  });
  const skewX = useTransform(smoothVelocity, [-2000, 2000], [6, -6], { clamp: true });
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return;
    const moveBy = (BASE_VELOCITY + velocityFactor.get()) * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={ref} className="overflow-clip border-y-2 border-ink bg-red py-4">
      <m.div
        style={reduce ? undefined : { x, skewX }}
        className="flex w-max gap-14 will-change-transform"
      >
        {Array.from({ length: COPIES }).flatMap((_, copy) =>
          marqueeItems.map((item) => (
            <span
              key={`${copy}-${item.texto}`}
              // Solo la primera copia se anuncia; el resto es decoración.
              aria-hidden={copy > 0 ? 'true' : undefined}
              className="inline-flex items-center gap-3.5 font-display text-[1.3rem] whitespace-nowrap"
            >
              {item.icono === 'star' ? (
                <Burst className="w-[19px] flex-none text-gold" />
              ) : (
                <WhatsappIcon className="w-[19px] flex-none text-gold" />
              )}
              {item.texto}
            </span>
          )),
        )}
      </m.div>
    </div>
  );
}
