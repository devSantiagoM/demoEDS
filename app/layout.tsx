import type { Metadata, Viewport } from 'next';
import { Bangers, Poppins } from 'next/font/google';
import { Cursor } from '@/components/layout/Cursor';
import { Footer } from '@/components/layout/Footer';
import { Grain } from '@/components/layout/Grain';
import { Header } from '@/components/layout/Header';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { WhatsappFloat } from '@/components/layout/WhatsappFloat';
import { Providers } from '@/components/providers/Providers';
import { brand } from '@/lib/content';
import { siteUrl } from '@/lib/site';
import './globals.css';

const bangers = Bangers({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bangers',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.nombre} — Lomitos gourmet & resto bar`,
    template: `%s | ${brand.nombre}`,
  },
  description: brand.descripcion,
  applicationName: brand.nombre,
  authors: [{ name: brand.nombre }],
  keywords: [
    'lomitos',
    'lomitería',
    'resto bar',
    'hamburguesas',
    'delivery',
    'Asunción',
    'Paraguay',
  ],
};

export const viewport: Viewport = {
  themeColor: '#100C0B',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bangers.variable} ${poppins.variable}`}>
      <body>
        <Providers>
          <Grain />
          <ScrollProgress />
          <Cursor />
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsappFloat />
        </Providers>
      </body>
    </html>
  );
}
