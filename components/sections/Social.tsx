'use client';

import { m, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import type { MouseEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { FoodIcon } from '@/components/ui/FoodIcon';
import { brand, social, type FoodIconName } from '@/lib/content';
import { FINE_POINTER_QUERY, useMediaQuery } from '@/lib/hooks';

/** Mismo ciclo de color que el original, seis piezas. */
const FONDOS = ['bg-red', 'bg-gold', 'bg-red-deep', 'bg-paper', 'bg-gold', 'bg-red'];

export function Social() {
  return (
    <section className="bg-ink-2 py-28">
      <div className="wrap">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5.5">
          <div>
            <p className="text-[0.85rem] text-dim">{social.kicker}</p>
            <p className="font-display text-[1.8rem] text-gold">{brand.instagram.handle}</p>
            <p className="text-[0.85rem] text-dim">{brand.instagram.seguidores} seguidores</p>
          </div>
          <Button href={brand.instagram.url} external>
            {social.cta}
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-3.5 tab:grid-cols-6">
          {social.tiles.map((tile, i) => (
            <Tile key={`${tile}-${i}`} name={tile} className={FONDOS[i % FONDOS.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Tilt 3D: los grados viven en motion values pasados por spring. */
function Tile({ name, className }: { name: FoodIconName; className: string }) {
  const reduce = useReducedMotion();
  const fine = useMediaQuery(FINE_POINTER_QUERY);
  const activo = fine && !reduce;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 220, damping: 20, mass: 0.5 });
  const rotateY = useSpring(rawY, { stiffness: 220, damping: 20, mass: 0.5 });

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    if (!activo) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set(((event.clientY - rect.top) / rect.height - 0.5) * -22);
    rawY.set(((event.clientX - rect.left) / rect.width - 0.5) * 22);
  }

  function handleLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <m.div
      aria-hidden="true"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={activo ? { scale: 1.07 } : undefined}
      style={activo ? { rotateX, rotateY, transformPerspective: 700 } : undefined}
      className={`grid aspect-square place-items-center rounded-2xl ${className}`}
    >
      <FoodIcon name={name} className="w-[36%] text-ink" />
    </m.div>
  );
}
