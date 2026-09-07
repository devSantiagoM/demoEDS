import { BrandMark } from '@/components/layout/BrandMark';
import { FooterWordmark } from '@/components/layout/FooterWordmark';
import { InstagramIcon, WhatsappIcon } from '@/components/ui/BrandIcon';
import { brand, footer, sucursales } from '@/lib/content';

export function Footer() {
  return (
    <footer
      id="contacto"
      className="relative overflow-hidden border-t-2 border-red bg-ink pt-19 pb-6"
    >
      <FooterWordmark />

      <div className="wrap grid gap-10 tab:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandMark size="sm" className="mb-4" />
          <p className="text-[0.89rem] text-dim">{brand.bio}</p>

          <div className="mt-4 flex gap-3">
            <a
              href={brand.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram, ${brand.instagram.handle}`}
              className="grid size-10 place-items-center rounded-full border-2 border-ink-3 transition-[transform,border-color,color] duration-500 ease-spring hover:-translate-y-1 hover:border-gold hover:text-gold"
            >
              <InstagramIcon className="size-[18px]" />
            </a>
            <a
              href={brand.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${brand.whatsapp.display}`}
              className="grid size-10 place-items-center rounded-full border-2 border-ink-3 transition-[transform,border-color,color] duration-500 ease-spring hover:-translate-y-1 hover:border-gold hover:text-gold"
            >
              <WhatsappIcon className="size-[18px]" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-3.5 text-[0.9rem] font-bold text-gold">{footer.contactoTitulo}</h4>
          <ul className="text-[0.89rem] text-dim">
            <li className="mb-2">
              <a
                href={brand.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-paper"
              >
                WhatsApp {brand.whatsapp.display}
              </a>
            </li>
            <li className="mb-2">
              <a
                href={brand.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-paper"
              >
                {brand.instagram.handle}
              </a>
            </li>
            <li className="mb-2">
              {brand.horario.dias}, {brand.horario.apertura} a {brand.horario.cierre}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3.5 text-[0.9rem] font-bold text-gold">{footer.sucursalesTitulo}</h4>
          <ul className="text-[0.89rem] text-dim">
            {sucursales.map((s) => (
              <li key={s.id} className="mb-2">
                {s.nombre}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="wrap mt-11 border-t border-ink-2 pt-5 text-center text-[0.77rem] text-dim opacity-60">
        © {new Date().getFullYear()} {brand.nombre}
      </p>
    </footer>
  );
}
