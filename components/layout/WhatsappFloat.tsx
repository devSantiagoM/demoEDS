'use client';

import { m, useReducedMotion } from 'motion/react';
import { WhatsappIcon } from '@/components/ui/BrandIcon';
import { brand } from '@/lib/content';

/** Botón flotante: entra con spring y late en loop hasta que lo tocan. */
export function WhatsappFloat() {
  const reduce = useReducedMotion();

  return (
    <m.a
      href={brand.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Pedir por WhatsApp al ${brand.whatsapp.display}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.7 }}
      className="fixed right-5 bottom-5 z-40 grid size-[58px] place-items-center rounded-full bg-wa shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
    >
      {!reduce && (
        <m.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border-2 border-wa"
          animate={{ scale: [1, 1.65], opacity: [0.7, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <WhatsappIcon className="relative size-[29px] text-ink" />
    </m.a>
  );
}
