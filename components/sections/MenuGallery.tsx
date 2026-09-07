'use client';

import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { FoodIcon } from '@/components/ui/FoodIcon';
import { brand, formatGs, menu, productos } from '@/lib/content';
import { DESKTOP_QUERY, useMediaQuery } from '@/lib/hooks';
import { cn } from '@/lib/utils';

/** Cuánto scroll vertical se gasta por píxel de recorrido horizontal. */
const SCROLL_RATIO = 1.15;

const TOTAL = String(productos.length).padStart(2, '0');

/**
 * Galería anclada: mientras la sección está pinneada, el scroll vertical se
 * traduce a desplazamiento horizontal de la fila de tarjetas.
 *
 * En touch no se secuestra el scroll: la misma fila pasa a ser un carrusel
 * nativo con scroll-snap, que es lo que la gente ya sabe usar en el teléfono.
 */
export function MenuGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const reduce = useReducedMotion();
  const [maxX, setMaxX] = useState(0);

  // Cuánto sobra de la fila más allá del viewport: eso es lo que hay que
  // recorrer. Se remide con ResizeObserver porque el ancho de tarjeta es
  // relativo y la fuente display puede cargar tarde.
  useEffect(() => {
    if (!isDesktop || reduce) {
      setMaxX(0);
      return;
    }
    const row = rowRef.current;
    if (!row) return;

    // `offsetWidth` sobre una fila `w-max`: es su ancho de contenido real y no
    // depende de si en ese momento hay un contenedor de scroll o no. Medir con
    // `scrollWidth` acá haría que el valor cambie al anclar la fila, y el pin
    // entraría y saldría en loop.
    const measure = () => setMaxX(Math.max(0, row.offsetWidth - window.innerWidth));
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(row);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [isDesktop, reduce]);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -maxX]);
  // El spring es lo que da la inercia: la fila llega un instante después del
  // scroll en vez de ir clavada a él.
  const x = useSpring(rawX, { stiffness: 120, damping: 30, mass: 0.4 });

  const indice = useTransform(scrollYProgress, (p) =>
    String(Math.min(productos.length, Math.floor(p * productos.length) + 1)).padStart(2, '0'),
  );

  // Con movimiento reducido no se ancla nada: la fila cae al mismo carrusel
  // nativo con scroll-snap del mobile. Secuestrar el scroll es justo lo que
  // molesta a quien pidió menos movimiento, y así las cuatro tarjetas siguen
  // siendo alcanzables.
  const pinned = isDesktop && !reduce && maxX > 0;

  return (
    <section id="menu" className="relative bg-paper text-ink">
      {/* El alto extra de este track es el "combustible" del pin: cuanto más
          ancha la fila, más scroll hace falta para recorrerla entera. */}
      <div
        ref={trackRef}
        className="relative"
        style={
          pinned ? { height: `calc(100svh + ${Math.round(maxX * SCROLL_RATIO)}px)` } : undefined
        }
      >
        <div
          className={cn(
            'grid content-center overflow-clip',
            pinned ? 'sticky top-0 h-svh' : 'py-20',
          )}
        >
          <header className="wrap mb-7 flex items-end justify-between gap-5">
            <div>
              <h2 className="text-[clamp(2rem,4.4vw,3.2rem)]">{menu.titulo}</h2>
              <p className="mt-2 max-w-[36ch] text-[0.93rem] text-ink/65">{menu.sub}</p>
            </div>
            {/* El contador solo tiene sentido mientras la fila está anclada. */}
            <p
              className={cn(
                'font-display text-[1.5rem] whitespace-nowrap text-red',
                pinned ? 'block' : 'hidden',
              )}
            >
              <m.span>{indice}</m.span> / {TOTAL}
            </p>
          </header>

          {/* Sin pin (touch o movimiento reducido) este div es el contenedor de
              scroll del carrusel; con pin es solo un marco y la fila se mueve
              por transform. La fila de adentro siempre es `w-max`, así se puede
              medir igual en los dos estados. */}
          <div
            className={cn(!pinned && 'no-scrollbar snap-x snap-mandatory overflow-x-auto pb-4.5')}
          >
            <m.div
              ref={rowRef}
              style={pinned ? { x } : undefined}
              className={cn('flex w-max gap-6.5 px-[5vw]', pinned && 'will-change-transform')}
            >
              {productos.map((producto, i) => (
                <article
                  key={producto.id}
                  className={cn(
                    'group relative grid w-[min(390px,78vw)] flex-none content-start gap-4',
                    'overflow-clip rounded-[22px] bg-ink px-7 pt-7.5 pb-6.5 text-paper',
                    !pinned && 'snap-center',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="card-glow absolute inset-x-[-20%] -bottom-[55%] h-[110%] translate-y-[38%] transition-transform duration-700 ease-spring group-hover:translate-y-[4%]"
                  />
                  <span className="relative z-2 font-display text-[0.95rem] tracking-[2px] text-gold uppercase">
                    {String(i + 1).padStart(2, '0')} — {producto.categoria.etiqueta}
                  </span>
                  {/* Con foto cargada manda la foto; sin foto, el ícono de la casa. */}
                  <div className="relative z-2 grid aspect-[1.35] place-items-center overflow-clip rounded-2xl bg-ink-2">
                    {producto.imagen ? (
                      <Image
                        src={producto.imagen.src}
                        alt={producto.imagen.alt}
                        width={producto.imagen.width}
                        height={producto.imagen.height}
                        sizes="(max-width: 900px) 78vw, 390px"
                        placeholder={producto.imagen.blurDataURL ? 'blur' : 'empty'}
                        blurDataURL={producto.imagen.blurDataURL}
                        className="size-full object-cover transition-transform duration-700 ease-spring group-hover:scale-[1.06]"
                      />
                    ) : (
                      <FoodIcon
                        name={producto.icono}
                        className="w-[52%] text-gold transition-transform duration-700 ease-spring group-hover:scale-[1.09] group-hover:-rotate-4"
                      />
                    )}
                  </div>
                  <h3 className="relative z-2 font-sans text-[1.22rem] font-bold">
                    {producto.nombre}
                  </h3>
                  <p className="relative z-2 text-[0.89rem] text-dim">{producto.descripcion}</p>
                  {producto.precio !== null ? (
                    <span className="relative z-2 justify-self-start rounded-full bg-gold px-4 py-1.5 text-[0.84rem] font-extrabold text-ink">
                      {formatGs(producto.precio)}
                    </span>
                  ) : (
                    <span className="relative z-2 justify-self-start rounded-full border-2 border-dashed border-ink-3 px-4 py-1.5 text-[0.84rem] font-semibold text-dim">
                      {menu.sinPrecio}
                    </span>
                  )}
                </article>
              ))}
            </m.div>
          </div>
        </div>
      </div>

      <div className="wrap flex flex-wrap items-center gap-4.5 pb-24">
        <Button href={brand.whatsapp.url} external>
          {menu.cta}
        </Button>
        <p className="max-w-[34ch] text-[0.85rem] text-ink/60">{menu.nota}</p>
      </div>
    </section>
  );
}
