import { brand } from '@/lib/content';
import { cn } from '@/lib/utils';

/**
 * Logo recreado: no existe un archivo de logo real todavía, así que el badge
 * circular (rojo con degradé, borde punteado dorado, "ED'S" en Bangers) se
 * dibuja con CSS y escala sin perder nitidez.
 */
export function BrandMark({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' }) {
  const badge = size === 'sm' ? 'size-[42px] text-[0.85rem]' : 'size-[47px] text-base';
  const word = size === 'sm' ? 'text-[1.1rem]' : 'text-[1.3rem]';

  return (
    <a
      href="#inicio"
      className={cn('group inline-flex items-center gap-3', className)}
      aria-label={`${brand.nombre}, ir al inicio`}
    >
      <span
        className={cn(
          'brand-badge grid flex-none -rotate-6 place-items-center rounded-full',
          'border-2 border-dashed border-gold transition-transform duration-500 ease-spring',
          'group-hover:scale-[1.08] group-hover:rotate-[8deg]',
          badge,
        )}
      >
        <b className="rotate-6 font-display font-normal text-gold">ED&apos;S</b>
      </span>
      <span className="flex flex-col leading-none">
        <b className={cn('font-display font-normal', word)}>{brand.nombre}</b>
        <small className="text-[0.57rem] font-bold tracking-[3.4px] text-gold">
          RESTO&nbsp;BAR
        </small>
      </span>
    </a>
  );
}
