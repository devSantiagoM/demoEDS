import { brand, productos, sucursales, formatGs } from '@/lib/content';

/**
 * Dominio público del sitio. Todavía no hay uno confirmado, así que sale de env
 * y cae a localhost en vez de inventar una URL.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

const DIAS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

const horario = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: [...DIAS],
  opens: brand.horario.apertura,
  closes: brand.horario.cierre,
};

/**
 * Un `Restaurant` por sucursal, más el menú con el único precio confirmado.
 * Sin direcciones exactas: todavía no las tenemos, y un dato inventado en
 * JSON-LD es peor que un dato ausente.
 */
export function restaurantJsonLd() {
  const menuItems = productos.map((p) => ({
    '@type': 'MenuItem',
    name: p.nombre,
    description: p.descripcion,
    ...(p.precio !== null && {
      offers: {
        '@type': 'Offer',
        price: p.precio,
        priceCurrency: 'PYG',
        description: formatGs(p.precio),
      },
    }),
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': sucursales.map((s) => ({
      '@type': 'Restaurant',
      '@id': `${siteUrl}/#${s.id}`,
      name: `${brand.nombre} — ${s.nombre}`,
      description: brand.bio,
      slogan: brand.eslogan,
      url: siteUrl,
      telephone: brand.whatsapp.tel,
      servesCuisine: ['Lomitos', 'Hamburguesas', 'Comida paraguaya'],
      priceRange: '$$',
      currenciesAccepted: 'PYG',
      address: {
        '@type': 'PostalAddress',
        ...(s.localidad && { addressLocality: s.localidad }),
        addressRegion: 'Gran Asunción',
        addressCountry: 'PY',
      },
      openingHoursSpecification: [horario],
      sameAs: [brand.instagram.url],
      hasMenu: {
        '@type': 'Menu',
        name: 'Carta',
        hasMenuSection: {
          '@type': 'MenuSection',
          name: 'Lo que la gente vuelve a pedir',
          hasMenuItem: menuItems,
        },
      },
    })),
  };
}
