'use client';

import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';
import { brand, quote } from '@/lib/content';
import { cn } from '@/lib/utils';

const APAGADO = 'rgba(26, 20, 18, 0.14)';
const ENCENDIDO = '#E12A24';

/**
 * La cita se enciende palabra por palabra a medida que entra en pantalla.
 * Un `useScroll` para toda la sección y un `useTransform` por palabra sobre su
 * tramo del progreso: nada de un listener por palabra.
 */
export function Quote() {
  const ref = useRef<HTMLQuoteElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.5'],
  });

  const palabras = quote.cita.split(' ');

  return (
    <section id="nosotros" className="bg-paper py-32 text-ink">
      <div className="wrap">
        <blockquote
          ref={ref}
          className={cn(
            'max-w-[17ch] font-display text-[clamp(2.1rem,5.8vw,4.4rem)] leading-[1.07] font-normal',
            reduce && 'text-red',
          )}
        >
          {/* Con movimiento reducido la cita ya viene encendida entera. */}
          {reduce
            ? quote.cita
            : palabras.map((palabra, i) => (
                <Palabra
                  key={`${palabra}-${i}`}
                  progress={scrollYProgress}
                  range={[i / palabras.length, (i + 1) / palabras.length]}
                >
                  {palabra}
                </Palabra>
              ))}
        </blockquote>

        <div className="mt-8 grid items-end gap-10 tab:grid-cols-[1fr_auto]">
          <p className="max-w-[46ch] text-ink/75">{quote.cuerpo}</p>
          <div className="rounded-2xl bg-ink px-6.5 py-5 whitespace-nowrap text-paper shadow-[8px_8px_0_var(--color-red)]">
            <b className="block font-display text-[1.5rem] font-normal text-gold">
              {brand.horario.apertura} — {brand.horario.cierre}
            </b>
            <span className="text-[0.77rem] text-dim">{brand.horario.dias}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Palabra({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
}) {
  const color = useTransform(progress, range, [APAGADO, ENCENDIDO]);
  return (
    <m.span style={{ color }} className="mr-[0.22em] inline-block">
      {children}
    </m.span>
  );
}
