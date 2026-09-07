'use client';

import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { useEffect, useRef } from 'react';
import { Counter } from '@/components/sections/Counter';
import { Burst, Lomito } from '@/components/ui/FoodIcon';
import { Button } from '@/components/ui/Button';
import { brand, hero, sucursales } from '@/lib/content';
import { FINE_POINTER_QUERY, useMediaQuery } from '@/lib/hooks';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const fine = useMediaQuery(FINE_POINTER_QUERY);
  const parallax = fine && !reduce;

  /* Salida por scroll: el hero se encoge y se apaga al dejar la pantalla. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.1]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  /* Parallax de puntero sobre el plato, la ráfaga y los chips. */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 55, damping: 18, mass: 0.6 });
  const py = useSpring(rawY, { stiffness: 55, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (!parallax) return;
    const move = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 30);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 22);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [parallax, rawX, rawY]);

  const burstX = useTransform(px, (v) => v * -0.5);
  const burstY = useTransform(py, (v) => v * -0.5);
  const chip1X = useTransform(px, (v) => (v * 26) / 22);
  const chip1Y = useTransform(py, (v) => (v * 26) / 22);
  const chip2X = useTransform(px, (v) => (v * -20) / 22);
  const chip2Y = useTransform(py, (v) => (v * -20) / 22);

  const stats = [
    { valor: brand.instagram.seguidoresMiles, etiqueta: 'mil seguidores', contar: true },
    { valor: sucursales.length, etiqueta: 'sucursales', contar: true },
    { valor: '18–00', etiqueta: brand.horario.dias.toLowerCase(), contar: false },
  ];

  return (
    <section
      ref={ref}
      id="inicio"
      className="hero-bg relative grid min-h-svh items-center overflow-clip pt-32 pb-22"
    >
      <div className="hero-dots pointer-events-none absolute inset-0 opacity-[0.07]" />

      {/* La salida por scroll también se salta con movimiento reducido: es
          transform ligado al scroll, no una animación que Motion pueda
          desactivar sola desde MotionConfig. */}
      <m.div style={reduce ? undefined : { opacity, scale, y }} className="will-change-transform">
        <div className="wrap relative z-2 grid items-center gap-12 desk:grid-cols-[1.06fr_0.94fr]">
          <div>
            <m.span
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, ease: EASE, delay: 0.35 }}
              className="inline-flex -rotate-2 items-center gap-2 rounded-full bg-gold px-4 py-1.5 text-[0.77rem] font-bold text-ink"
            >
              <i className="size-[7px] animate-pulse rounded-full bg-red" aria-hidden="true" />
              {hero.eyebrow}
            </m.span>

            {/* Cada línea entra desde abajo detrás de su propia máscara. */}
            <h1 className="mt-5.5 text-[clamp(3rem,7.4vw,5.8rem)]">
              <span className="sr-only">{brand.eslogan}</span>
              <m.span
                aria-hidden="true"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.08 } } }}
                className="block"
              >
                {hero.titulo.map((linea) => (
                  <span key={linea.texto} className="block overflow-hidden">
                    <m.span
                      variants={{
                        hidden: { y: '108%' },
                        show: { y: '0%', transition: { duration: 1.05, ease: EASE } },
                      }}
                      className={linea.accent ? 'block text-gold' : 'block'}
                    >
                      {linea.texto}
                    </m.span>
                  </span>
                ))}
              </m.span>
            </h1>

            <m.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, ease: EASE, delay: 0.45 }}
              className="mt-6 max-w-[43ch] text-[1.05rem] text-dim"
            >
              {hero.sub}
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, ease: EASE, delay: 0.55 }}
              className="mt-8 flex flex-wrap gap-3.5"
            >
              <Button href="#menu">{hero.ctaMenu}</Button>
              <Button variant="ghost" href={brand.whatsapp.url} external>
                {hero.ctaWhatsapp}
              </Button>
            </m.div>

            <m.dl
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, ease: EASE, delay: 0.65 }}
              className="mt-13 flex flex-wrap gap-9"
            >
              {stats.map((stat) => (
                <div key={stat.etiqueta}>
                  <dd className="font-display text-[1.9rem] font-normal text-gold">
                    {stat.contar ? <Counter to={stat.valor as number} /> : stat.valor}
                  </dd>
                  <dt className="text-[0.79rem] text-dim">{stat.etiqueta}</dt>
                </div>
              ))}
            </m.dl>
          </div>

          <div className="relative order-first grid min-h-[270px] place-items-center desk:order-none desk:min-h-[360px]">
            <m.div
              style={parallax ? { x: burstX, y: burstY } : undefined}
              className="absolute w-[min(420px,88vw)]"
            >
              <m.div
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
              >
                <Burst className="w-full text-gold opacity-90" />
              </m.div>
            </m.div>

            <m.div
              initial={{ opacity: 0, scale: 0.72, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
              style={parallax ? { x: px, y: py } : undefined}
              className="relative grid aspect-square w-[min(290px,62vw)] place-items-center rounded-full border-6 border-ink bg-paper shadow-[12px_14px_0_rgba(0,0,0,0.5)]"
            >
              <Lomito className="w-[60%] text-red" />
            </m.div>

            <m.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.66 }}
              style={parallax ? { x: chip1X, y: chip1Y } : undefined}
              className="absolute top-[4%] left-0 rounded-full border-2 border-gold bg-ink-2 px-3.5 py-1.5 text-[0.74rem] font-bold whitespace-nowrap text-gold"
            >
              {hero.chips[0]}
            </m.span>
            <m.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.78 }}
              style={parallax ? { x: chip2X, y: chip2Y } : undefined}
              className="absolute right-[-2%] bottom-[10%] rounded-full border-2 border-red bg-ink-2 px-3.5 py-1.5 text-[0.74rem] font-bold whitespace-nowrap text-red-2"
            >
              {hero.chips[1]}
            </m.span>
          </div>
        </div>
      </m.div>

      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 z-3 hidden -translate-x-1/2 justify-items-center gap-2 text-[0.68rem] tracking-[2.6px] text-dim desk:grid"
      >
        {hero.hint}
        <i className="hint-line block h-9.5 w-px" />
      </div>
    </section>
  );
}
