# ED'S HOUSE

Sitio de **ED'S HOUSE** — resto bar / lomitería gourmet paraguaya.
Next.js 15 (App Router) + TypeScript + Tailwind v4, animado con Motion y scroll suave con Lenis.

```bash
npm install
npm run dev     # http://localhost:3000
```

| Script              | Qué hace                        |
| ------------------- | ------------------------------- |
| `npm run dev`       | Servidor de desarrollo          |
| `npm run build`     | Build de producción             |
| `npm run start`     | Sirve el build                  |
| `npm run lint`      | ESLint (`next/core-web-vitals`) |
| `npm run typecheck` | `tsc --noEmit`                  |
| `npm run format`    | Prettier sobre todo el repo     |

## Dónde se edita el contenido

**Todo el contenido está en [`lib/content.ts`](lib/content.ts).** Precios, sucursales,
horarios, links, copy de cada sección: nada de eso vive dentro de un componente.

```ts
// Confirmar un precio que estaba en "Consultar":
{ id: 'papas-eds', nombre: "Papas Ed's", precio: 18000, ... }
//                                       ^^^^^^^^^^^^^ de null a un número

// Sumar una sucursal:
{ id: 'capiata', nombre: 'Capiatá', nota: 'Nuevo', whatsapp: '595984525513', localidad: 'Capiatá' }
```

Cambiar cualquiera de esas dos cosas actualiza a la vez la sección, el footer,
los contadores del hero y el JSON-LD de SEO. No hay un segundo lugar que tocar.

### Reglas de contenido que el código ya respeta

- `precio: null` → la tarjeta muestra **"Consultar"** en vez de un precio inventado.
  Hoy solo el lomito árabe (25.000 Gs) tiene precio confirmado.
- `localidad` es opcional a propósito: alimenta el `addressLocality` del JSON-LD y
  se carga solo cuando la ciudad se conoce con certeza. "Las Residentas" es nombre
  de local, no de ciudad, así que va sin cargar.
- No hay direcciones exactas de sucursal porque todavía no están confirmadas: cada
  card linkea a WhatsApp con un mensaje pre-armado con el nombre de la sucursal.

### Fotos de producto

Todavía no hay fotos reales, así que las tarjetas usan los SVG de comida dibujados
a mano (`components/ui/FoodIcon/`). Cuando lleguen, se cargan en el campo opcional
`imagen` del producto y la tarjeta pasa sola a `next/image` con `sizes` y
placeholder `blur` — no hay que tocar el componente:

```ts
imagen: {
  src: '/menu/lomito-arabe.jpg',
  alt: 'Lomito árabe cortado al medio',
  width: 1200,
  height: 900,
  blurDataURL: 'data:image/jpeg;base64,...',
}
```

## Variables de entorno

Copiar `.env.example` a `.env.local`. Todas son opcionales en desarrollo.

| Variable               | Para qué                                                              |
| ---------------------- | --------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | URL canónica, OpenGraph y `@id` del JSON-LD. Sin ella cae a localhost |

Todavía no hay dominio confirmado, así que el fallback es `http://localhost:3000`
en vez de una URL inventada. Antes de publicar, definirla.

## Estructura

```
app/
  layout.tsx        fuentes, providers, header/footer, metadata base
  page.tsx          arma las secciones + JSON-LD
  globals.css       tokens de marca y utilidades propias (Tailwind v4)
components/
  layout/           Header, Footer, BrandMark, WhatsappFloat, Cursor, Grain, ScrollProgress
  sections/         Hero, Marquee, MenuGallery, Sucursales, Quote, Social, Counter
  providers/        LazyMotion + Lenis
  ui/               Button, FoodIcon (SVG propios), BrandIcon (WhatsApp/Instagram)
lib/
  content.ts        ← toda la data de marca
  site.ts           JSON-LD Restaurant por sucursal
  hooks.ts          useMediaQuery
  utils.ts          cn, wrap, clamp
```

## Decisiones técnicas que conviene no deshacer

- **`overflow-x: clip` en `html`/`body`, nunca `hidden`.** Con Lenis, `hidden` crea
  un contenedor de scroll nuevo y rompe el `position: sticky` de la galería y de
  las sucursales, en silencio y sin error en consola.
- **`LazyMotion` con `domAnimation` y `strict`.** Se importa `m.*`, no `motion.*`:
  `strict` hace que un `motion.*` olvidado tire error en vez de traerse el bundle
  completo por la puerta de atrás.
- **`MotionConfig reducedMotion="user"`** en el provider desactiva de una todas las
  animaciones de transform con `prefers-reduced-motion`. Los loops propios
  (marquee, contadores, tilt, cursor) preguntan además por `useReducedMotion()`.
- **La galería no secuestra el scroll en touch.** Arriba de 901px el scroll vertical
  se traduce a horizontal con el track pinneado; abajo es un carrusel nativo con
  scroll-snap, que es lo que la gente ya sabe usar en el teléfono.
- **El overlay del menú mobile se renderiza fuera del `<header>`**, porque el header
  tiene un transform animado y eso convertiría cualquier `position: fixed` hijo en
  relativo a él.
- **El paquete es `motion`, no `framer-motion`**, y se importa desde `motion/react`.

## Dependencias

`motion`, `lenis`, `lucide-react`. Nada más. Sin `react-fast-marquee`,
`react-parallax-tilt`, `AOS`, `react-scroll`, `locomotive-scroll` ni `framer-motion`.
