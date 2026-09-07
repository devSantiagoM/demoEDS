import type { SVGProps } from 'react';
import type { FoodIconName } from '@/lib/content';

/**
 * Íconos de comida dibujados a mano para ED'S HOUSE.
 * No salen de ninguna librería de stock: el trazo grueso y plano es parte de la
 * identidad de cartel de la marca. `currentColor` en todo para que hereden.
 */

type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export function Lomito(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M18 44c0-15 14-27 32-27s32 12 32 27H18z" fill="currentColor" />
      <rect x="16" y="44" width="68" height="9" rx="4" fill="currentColor" opacity=".5" />
      <path d="M20 58l60-4 4 9-64 5z" fill="currentColor" opacity=".82" />
      <path d="M22 68l56-4 3 8-6 6-46 3-8-6z" fill="currentColor" />
    </Svg>
  );
}

export function Burger(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14 40c2-14 18-24 36-24s34 10 36 24H14z" fill="currentColor" />
      <rect x="12" y="42" width="76" height="8" rx="4" fill="currentColor" opacity=".62" />
      <rect x="12" y="54" width="76" height="10" rx="5" fill="currentColor" />
      <rect x="12" y="68" width="76" height="8" rx="4" fill="currentColor" opacity=".62" />
      <path d="M12 80c0 6 8 10 38 10s38-4 38-10H12z" fill="currentColor" />
    </Svg>
  );
}

export function Fries(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M22 40h56l-8 52a6 6 0 0 1-6 5H36a6 6 0 0 1-6-5z" fill="currentColor" />
      <rect x="30" y="10" width="9" height="40" fill="currentColor" opacity=".75" />
      <rect x="45" y="4" width="9" height="46" fill="currentColor" opacity=".9" />
      <rect x="60" y="12" width="9" height="38" fill="currentColor" opacity=".75" />
    </Svg>
  );
}

export function Drink(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20 14h60l-24 40v32h12v6H32v-6h12V54z" fill="currentColor" />
      <path d="M28 22h44" stroke="var(--color-ink)" strokeWidth="4" />
    </Svg>
  );
}

export function Music(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M40 14v50a14 14 0 1 0 8 12V32l30-7v40a14 14 0 1 0 8 12V6z" fill="currentColor" />
    </Svg>
  );
}

/** Estrella de cartel: separador del marquee y ráfaga giratoria del hero. */
export function Burst(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        d="M50 0l7 27 26-13-13 26 27 7-27 7 13 26-26-13-7 27-7-27-26 13 13-26-27-7 27-7-13-26 26 13z"
      />
    </Svg>
  );
}

const MAP = {
  lomito: Lomito,
  burger: Burger,
  fries: Fries,
  drink: Drink,
  music: Music,
} as const satisfies Record<FoodIconName, (props: IconProps) => React.ReactElement>;

export function FoodIcon({ name, ...props }: IconProps & { name: FoodIconName }) {
  const Icon = MAP[name];
  return <Icon {...props} />;
}
