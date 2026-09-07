'use client';

import { useLenis } from 'lenis/react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';
import { BrandMark } from '@/components/layout/BrandMark';
import { WhatsappIcon } from '@/components/ui/BrandIcon';
import { Button } from '@/components/ui/Button';
import { brand, navLinks } from '@/lib/content';
import { cn } from '@/lib/utils';

const SPRING = { duration: 0.55, ease: [0.16, 1, 0.3, 1] } as const;

/** Umbral a partir del cual esconder el header al bajar deja de molestar. */
const HIDE_AFTER = 460;

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    // Con el menú abierto el header se queda quieto: si no, desaparece y deja
    // al overlay sin botón de cerrar.
    if (open) return;
    setHidden(y > previous && y > HIDE_AFTER);
  });

  // El overlay ocupa toda la pantalla, así que hay que frenar el scroll de
  // fondo. Lenis lo hace bien (agrega `lenis-stopped` al html); el atributo es
  // el respaldo para cuando Lenis está apagado por movimiento reducido.
  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.body.dataset.scrollLocked = 'true';
    } else {
      lenis?.start();
      delete document.body.dataset.scrollLocked;
    }
    return () => {
      delete document.body.dataset.scrollLocked;
    };
  }, [open, lenis]);

  // Cerrar con Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <m.header
        animate={{ y: hidden ? '-102%' : '0%' }}
        transition={SPRING}
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b-2 duration-400 ease-soft',
          'transition-[background-color,border-color,backdrop-filter]',
          solid
            ? 'border-red/45 bg-ink/85 backdrop-blur-[14px]'
            : 'border-transparent bg-transparent',
        )}
      >
        <div className="wrap flex items-center justify-between py-3.5">
          <BrandMark />

          <nav aria-label="Principal" className="hidden desk:block">
            <ul className="flex items-center gap-[30px]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group block h-[1.4em] overflow-hidden text-[0.92rem] font-semibold text-dim"
                  >
                    <span className="block transition-transform duration-500 ease-spring group-hover:-translate-y-full">
                      {link.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="block text-gold transition-transform duration-500 ease-spring group-hover:-translate-y-full"
                    >
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="wa"
              href={brand.whatsapp.url}
              external
              className="hidden desk:inline-flex"
            >
              <WhatsappIcon className="size-[17px]" />
              Pedí ahora
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="nav-mobile"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              className="grid size-[42px] cursor-pointer place-items-center text-paper desk:hidden"
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </m.header>

      {/* Fuera del <header> a propósito: el header tiene un transform animado y
          eso convertiría cualquier `position: fixed` hijo en relativo a él. */}
      <AnimatePresence>
        {open && (
          <m.nav
            id="nav-mobile"
            aria-label="Menú"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 grid content-center bg-ink desk:hidden"
          >
            <m.ul
              initial="hidden"
              animate="show"
              variants={{
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
              }}
              className="mx-auto w-[88%]"
            >
              {navLinks.map((link) => (
                <li key={link.href} className="overflow-hidden">
                  <m.a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    variants={{
                      hidden: { y: '115%' },
                      show: {
                        y: '0%',
                        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    className="block py-1.5 font-display text-[2.4rem] font-normal text-paper"
                  >
                    {link.label}
                  </m.a>
                </li>
              ))}
            </m.ul>

            <div className="mx-auto mt-8 w-[88%]">
              <Button variant="wa" href={brand.whatsapp.url} external>
                <WhatsappIcon className="size-[17px]" />
                Pedí ahora
              </Button>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </>
  );
}
