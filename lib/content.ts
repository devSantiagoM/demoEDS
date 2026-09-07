/**
 * Toda la data de marca de ED'S HOUSE vive acá.
 * Actualizar precios, sucursales o copy no debería requerir tocar un componente.
 */

/* ────────── contacto ────────── */

export const WHATSAPP_E164 = '595984525513';
export const WHATSAPP_DISPLAY = '0984 525 513';

/** Link a WhatsApp, con mensaje pre-cargado opcional. */
export function waLink(mensaje?: string): string {
  const base = `https://wa.me/${WHATSAPP_E164}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}

/** 25000 → "25.000 Gs". Formateo manual (no Intl) para que servidor y cliente coincidan. */
export function formatGs(monto: number): string {
  return `${String(monto).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} Gs`;
}

/* ────────── tipos ────────── */

export type FoodIconName = 'lomito' | 'burger' | 'fries' | 'drink' | 'music';

export interface Categoria {
  id: 'clasico' | 'parrilla' | 'compartir' | 'barra';
  etiqueta: string;
}

/**
 * Foto real de producto. Todavía no hay ninguna: cuando lleguen, se cargan acá
 * y la tarjeta cambia sola del ícono dibujado a la foto, con `next/image`.
 * `blurDataURL` es opcional pero recomendado (data URI chiquito, base64).
 */
export interface ProductoImagen {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  /** null = todavía sin precio confirmado; la UI muestra "Consultar". */
  precio: number | null;
  categoria: Categoria;
  icono: FoodIconName;
  imagen?: ProductoImagen;
}

export interface Sucursal {
  id: string;
  nombre: string;
  /** Nota corta editorial. No hay direcciones exactas confirmadas todavía. */
  nota: string;
  whatsapp: string;
  /**
   * Ciudad, solo cuando la conocemos con certeza — alimenta el `addressLocality`
   * del JSON-LD. "Las Residentas" es un nombre de local, no una ciudad, así que
   * queda sin cargar hasta confirmarlo.
   */
  localidad?: string;
}

export interface NavLink {
  href: string;
  label: string;
}

/* ────────── marca ────────── */

export const brand = {
  nombre: "ED'S HOUSE",
  bajada: 'Resto bar',
  eslogan: 'Nuestra carne, hace la diferencia.',
  bio: 'Cocina hecha con tiempo, amor y buena vibra.',
  descripcion:
    "ED'S HOUSE. Nuestra carne, hace la diferencia. Lomitos gourmet, hamburguesas y tragos. Todos los días de 18:00 a 00:00.",
  horario: {
    apertura: '18:00',
    cierre: '00:00',
    dias: 'Todos los días',
  },
  instagram: {
    handle: '@eds_house.py',
    url: 'https://www.instagram.com/eds_house.py/',
    seguidores: '153 mil',
    seguidoresMiles: 153,
  },
  whatsapp: {
    e164: WHATSAPP_E164,
    display: WHATSAPP_DISPLAY,
    tel: `+${WHATSAPP_E164}`,
    url: waLink(),
  },
} as const;

/* ────────── navegación ────────── */

export const navLinks: NavLink[] = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#menu', label: 'Menú' },
  { href: '#sucursales', label: 'Sucursales' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
];

/* ────────── hero ────────── */

export const hero = {
  eyebrow: `Abierto hoy · ${brand.horario.apertura} a ${brand.horario.cierre}`,
  /** Una línea por span enmascarado. `accent` pinta la línea en dorado. */
  titulo: [
    { texto: 'Nuestra carne', accent: false },
    { texto: 'hace la', accent: true },
    { texto: 'diferencia', accent: true },
  ],
  sub: 'Cocina hecha con tiempo, amor y buena vibra. Lomitos gourmet, hamburguesas y tragos en cinco locales de Gran Asunción.',
  ctaMenu: 'Ver el menú',
  ctaWhatsapp: 'Pedir por WhatsApp',
  chips: ['Lomitos gourmet', 'Resto bar'],
  hint: 'DESLIZÁ',
} as const;

/* ────────── marquee ────────── */

export const marqueeItems: { icono: 'star' | 'wa'; texto: string }[] = [
  { icono: 'star', texto: 'Nuevo número en San Lorenzo' },
  { icono: 'wa', texto: WHATSAPP_DISPLAY },
  { icono: 'star', texto: 'Lomito árabe 25.000 Gs' },
  { icono: 'wa', texto: 'Delivery todos los días' },
];

/* ────────── menú ────────── */

export const categorias = {
  clasico: { id: 'clasico', etiqueta: 'Clásico' },
  parrilla: { id: 'parrilla', etiqueta: 'Parrilla' },
  compartir: { id: 'compartir', etiqueta: 'Para compartir' },
  barra: { id: 'barra', etiqueta: 'Barra' },
} as const satisfies Record<string, Categoria>;

export const productos: Producto[] = [
  {
    id: 'lomito-arabe',
    nombre: 'Lomito árabe',
    descripcion: 'El que nos hizo conocidos. Carne jugosa, pan árabe y la salsa de la casa.',
    precio: 25000,
    categoria: categorias.clasico,
    icono: 'lomito',
  },
  {
    id: 'hamburguesa-doble-cheddar',
    nombre: 'Hamburguesa doble cheddar',
    descripcion: 'Doble carne sellada a la plancha, cheddar derretido y pan brioche tostado.',
    precio: null,
    categoria: categorias.parrilla,
    icono: 'burger',
  },
  {
    id: 'papas-eds',
    nombre: "Papas Ed's",
    descripcion: 'Papas cargadas al estilo de la casa. Nadie las comparte del todo.',
    precio: null,
    categoria: categorias.compartir,
    icono: 'fries',
  },
  {
    id: 'tragos-de-la-casa',
    nombre: 'Tragos de la casa',
    descripcion: `Para la mesa larga, de las ${brand.horario.apertura} hasta que cerramos.`,
    precio: null,
    categoria: categorias.barra,
    icono: 'drink',
  },
];

export const menu = {
  titulo: 'Lo que la gente vuelve a pedir',
  sub: 'Cuatro clásicos de la casa. La carta completa la pasamos por WhatsApp.',
  cta: 'Pedir la carta completa',
  nota: 'Los precios pueden variar según la sucursal. Confirmalos por WhatsApp.',
  sinPrecio: 'Consultar',
} as const;

/* ────────── sucursales ────────── */

export const sucursales: Sucursal[] = [
  {
    id: 'san-lorenzo',
    nombre: 'San Lorenzo',
    nota: `Nuevo número: ${WHATSAPP_DISPLAY}`,
    whatsapp: WHATSAPP_E164,
    localidad: 'San Lorenzo',
  },
  {
    id: 'luque',
    nombre: 'Luque',
    nota: 'Donde empezó todo',
    whatsapp: WHATSAPP_E164,
    localidad: 'Luque',
  },
  {
    id: 'fernando-de-la-mora',
    nombre: 'Fernando de la Mora',
    nota: 'Delivery en la zona',
    whatsapp: WHATSAPP_E164,
    localidad: 'Fernando de la Mora',
  },
  {
    id: 'las-residentas',
    nombre: 'Las Residentas',
    nota: 'Mesas afuera y música',
    whatsapp: WHATSAPP_E164,
  },
  {
    id: 'asuncion',
    nombre: 'Asunción',
    nota: 'Abierto todos los días',
    whatsapp: WHATSAPP_E164,
    localidad: 'Asunción',
  },
];

export const sucursalesCopy = {
  titulo: 'Cinco locales, la misma cocina',
  sub: 'Escribinos y te pasamos la dirección exacta, el horario del día y las promos de esa sucursal.',
  cta: 'Pedir',
} as const;

/* ────────── nosotros ────────── */

export const quote = {
  cita: 'Empezamos como una lomitería de barrio y seguimos cocinando igual.',
  cuerpo:
    'Hoy somos resto bar en cinco puntos del país, con música en vivo algunos fines de semana y la misma mesa larga de siempre. Buena cocina, buen ambiente y gente que vuelve.',
} as const;

/* ────────── social ────────── */

export const social = {
  kicker: 'Seguinos',
  cta: 'Ver Instagram',
  /** Grilla decorativa: no son fotos reales, son los íconos de la casa. */
  tiles: ['lomito', 'drink', 'music', 'fries', 'burger', 'lomito'] as FoodIconName[],
} as const;

/* ────────── footer ────────── */

export const footer = {
  contactoTitulo: 'Contacto',
  sucursalesTitulo: 'Sucursales',
} as const;
