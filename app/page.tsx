import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { MenuGallery } from '@/components/sections/MenuGallery';
import { Quote } from '@/components/sections/Quote';
import { Social } from '@/components/sections/Social';
import { Sucursales } from '@/components/sections/Sucursales';
import { brand } from '@/lib/content';
import { restaurantJsonLd, siteUrl } from '@/lib/site';

export function generateMetadata(): Metadata {
  const title = `${brand.nombre} — Lomitos gourmet & resto bar`;

  return {
    title: {
      absolute: title,
    },
    description: brand.descripcion,
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      locale: 'es_PY',
      url: siteUrl,
      siteName: brand.nombre,
      title,
      description: brand.descripcion,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: brand.descripcion,
    },
  };
}

export default function Home() {
  return (
    <>
      {/* Un `Restaurant` por sucursal: horario, teléfono e Instagram.
          Sale de lib/content.ts, no está hardcodeado acá. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd()) }}
      />

      <Hero />
      <Marquee />
      <MenuGallery />
      <Sucursales />
      <Quote />
      <Social />
    </>
  );
}
