'use client';

import { MapPin } from 'lucide-react';
import { m, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { sucursales, sucursalesCopy, waLink, type Sucursal } from '@/lib/content';

/** Offset del pin: el header mide ~86px, más aire. */
const TOP_BASE = 110;
/** Cada tarjeta se clava 16px más abajo que la anterior: eso arma el mazo. */
const TOP_STEP = 16;

/** Del más oscuro al más cálido a medida que se apilan. */
const FONDOS = ['#1A1412', '#1E1614', '#241916', '#2A1C18', '#31201A'];

export function Sucursales() {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="sucursales" className="bg-ink pt-28 pb-10">
      <div className="wrap">
        <div className="mb-11 max-w-[620px]">
          <h2 className="text-[clamp(2.1rem,4.4vw,3.2rem)]">{sucursalesCopy.titulo}</h2>
          <p className="mt-3 text-dim">{sucursalesCopy.sub}</p>
        </div>

        <div ref={stackRef} className="pb-30">
          {sucursales.map((sucursal, i) => (
            <Card
              key={sucursal.id}
              sucursal={sucursal}
              index={i}
              total={sucursales.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * El `position: sticky` con `top` incremental lo resuelve el CSS.
 * Motion solo aporta el encogimiento de la tarjeta que va quedando tapada,
 * mapeado al progreso de scroll del mazo completo.
 */
function Card({
  sucursal,
  index,
  total,
  progress,
}: {
  sucursal: Sucursal;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - index) * 0.02]);

  return (
    <div
      className="mb-5.5 tab:sticky"
      style={{ top: TOP_BASE + index * TOP_STEP, zIndex: index + 1 }}
    >
      <m.div
        style={{ scale, backgroundColor: FONDOS[index % FONDOS.length] }}
        className="grid items-center gap-6 rounded-[22px] border border-ink-3 p-6.5 shadow-[0_-18px_40px_rgba(0,0,0,0.5)] tab:grid-cols-[auto_1fr_auto] tab:px-8.5 tab:py-8.5"
      >
        <MapPin className="size-8.5 flex-none text-red" aria-hidden="true" />
        <div>
          <h3 className="font-sans text-[1.35rem] font-bold">{sucursal.nombre}</h3>
          <p className="mt-0.5 text-[0.87rem] text-dim">{sucursal.nota}</p>
        </div>
        <Button
          href={waLink(`Hola! Quiero hacer un pedido en ED'S HOUSE ${sucursal.nombre}.`)}
          external
          aria-label={`Pedir por WhatsApp en la sucursal ${sucursal.nombre}`}
          className="justify-self-start"
        >
          {sucursalesCopy.cta}
        </Button>
      </m.div>
    </div>
  );
}
