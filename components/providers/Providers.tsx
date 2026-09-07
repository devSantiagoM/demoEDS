'use client';

import { ReactLenis } from 'lenis/react';
import { LazyMotion, MotionConfig, domAnimation, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import 'lenis/dist/lenis.css';

/**
 * `LazyMotion` con `domAnimation` carga solo el subconjunto de Motion que este
 * sitio usa (~18kb en vez del bundle completo). `strict` hace que un `motion.*`
 * olvidado tire error en vez de traerse el bundle grande por la puerta de atrás:
 * en toda la app se usa `m.*`.
 *
 * `MotionConfig reducedMotion="user"` desactiva de una todas las animaciones de
 * transform cuando el sistema pide movimiento reducido, sin repetir el chequeo
 * en cada componente. Lo que queda por revisar a mano son los loops propios
 * (marquee, contadores, tilt), que sí preguntan por `useReducedMotion()`.
 *
 * Lenis va en modo `root` (sin wrapper propio) y también se apaga ahí.
 */
export function Providers({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ReactLenis
          root
          options={{
            lerp: 0.1,
            duration: 1.1,
            smoothWheel: !reduce,
            syncTouch: false,
          }}
        >
          {children}
        </ReactLenis>
      </MotionConfig>
    </LazyMotion>
  );
}
