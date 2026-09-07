# Notas para agentes

Sitio de ED'S HOUSE. **Next.js 15** (App Router) + TypeScript + Tailwind **v4** + Motion + Lenis.
Leer el `README.md` antes de tocar algo: ahí está dónde vive el contenido y qué decisiones no conviene deshacer.

## Reglas del proyecto

- **Contenido → `lib/content.ts`.** Nada de copy, precios, sucursales ni links hardcodeados
  en componentes. Si hace falta un dato nuevo, se agrega ahí con su tipo.
- **No inventar datos de negocio.** Precios sin confirmar van `precio: null` (la UI muestra
  "Consultar"). No hay direcciones exactas de sucursal ni dominio propio todavía.
- **Motion se importa de `motion/react`**, nunca de `framer-motion`, y siempre como `m.*`
  (el provider usa `LazyMotion strict`; un `motion.*` tira error en runtime).
- **`overflow-x: clip`, nunca `hidden`, en `html`/`body`** — con Lenis, `hidden` rompe todo
  el `position: sticky` sin dar error.
- **Tailwind v4 sin `tailwind.config.js`.** Tokens, breakpoints (`tab` 761px, `desk` 901px)
  y utilidades propias se declaran en `app/globals.css` con `@theme` y `@utility`.
- Antes de dar algo por terminado: `npm run typecheck && npm run lint && npm run build`.
