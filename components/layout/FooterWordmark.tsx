'use client';

import type { MouseEvent } from 'react';
import { useRef } from 'react';
import { brand } from '@/lib/content';

/**
 * "ED'S HOUSE" en contorno, con un reflector dorado siguiendo al puntero.
 * Escribe custom properties directo sobre el nodo: ni estado de React ni
 * re-render por cada píxel de mouse.
 */
export function FooterWordmark() {
  const ref = useRef<HTMLParagraphElement>(null);

  function handleMove(event: MouseEvent<HTMLElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    node.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }

  return (
    <div onMouseMove={handleMove}>
      <p
        ref={ref}
        aria-hidden="true"
        className="wordmark mb-14 text-center font-display text-[clamp(3.2rem,15vw,11rem)] leading-[0.86] font-normal select-none"
      >
        {brand.nombre}
      </p>
    </div>
  );
}
