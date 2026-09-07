'use client';

import { m, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import type { MouseEvent, ReactNode } from 'react';
import { FINE_POINTER_QUERY, useMediaQuery } from '@/lib/hooks';
import { cn } from '@/lib/utils';

type Variant = 'gold' | 'wa' | 'ghost';

const VARIANTS: Record<Variant, string> = {
  gold: 'bg-gold text-ink border-ink before:bg-ink hover:text-gold',
  wa: 'bg-wa text-ink border-ink before:bg-ink hover:text-wa',
  ghost: 'bg-transparent text-paper border-dim before:bg-paper hover:text-ink',
};

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  /** Presente = ancla; ausente = <button>. */
  href?: string;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  'aria-label'?: string;
}

/**
 * Botón de cartel: el fondo sube desde abajo en hover (pseudo-elemento, no un
 * nodo extra) y el botón se imanta al puntero. El imán solo corre con mouse y
 * con `prefers-reduced-motion: no-preference`.
 */
export function Button({
  children,
  variant = 'gold',
  href,
  external = false,
  className,
  onClick,
  ...rest
}: ButtonProps) {
  const reduce = useReducedMotion();
  const fine = useMediaQuery(FINE_POINTER_QUERY);
  const magnetic = fine && !reduce;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 22, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 260, damping: 22, mass: 0.4 });

  function handleMove(event: MouseEvent<HTMLElement>) {
    if (!magnetic) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - rect.left - rect.width / 2) * 0.26);
    rawY.set((event.clientY - rect.top - rect.height / 2) * 0.36);
  }

  function handleLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  const classes = cn(
    'group relative inline-flex cursor-pointer items-center justify-center overflow-hidden',
    'rounded-full border-2 px-7 py-3 text-[0.94rem] font-bold',
    'transition-colors duration-300',
    'before:absolute before:inset-0 before:translate-y-full before:rounded-full',
    'before:transition-transform before:duration-500 before:ease-spring',
    'hover:before:translate-y-0 focus-visible:before:translate-y-0',
    VARIANTS[variant],
    className,
  );

  const inner = <span className="relative z-10 inline-flex items-center gap-2">{children}</span>;

  const motionProps = {
    style: magnetic ? { x, y } : undefined,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    className: classes,
    ...rest,
  };

  if (href) {
    return (
      <m.a
        href={href}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
        {...motionProps}
      >
        {inner}
      </m.a>
    );
  }

  return (
    <m.button type="button" onClick={onClick} {...motionProps}>
      {inner}
    </m.button>
  );
}
