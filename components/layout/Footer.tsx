import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Phone, Mail, MessageCircle, ExternalLink } from 'lucide-react';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-japan-red flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm tracking-widest">AJR</span>
              </div>
              <div className="font-heading font-bold text-white text-lg uppercase tracking-widest">
                Auto Parts
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">{t('tagline')}</p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://wa.me/971503240800"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-japan-red hover:border-japan-red transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="tel:+971503240800"
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-japan-red hover:border-japan-red transition-colors"
                aria-label="Phone"
              >
                <Phone size={16} />
              </a>
              <a
                href="mailto:info@ajrline.com"
                className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-japan-red hover:border-japan-red transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-white uppercase tracking-widest text-sm mb-6">{t('links')}</h3>
            <ul className="space-y-3">
              {[
                { href: `/${locale}`, label: 'Home' },
                { href: `/${locale}/inventory`, label: 'Inventory' },
                { href: `/${locale}/how-it-works`, label: 'How It Works' },
                { href: `/${locale}/contact`, label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-japan-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-white uppercase tracking-widest text-sm mb-6">{t('contact')}</h3>
            <div className="space-y-4">
              <a href="tel:+971503240800" className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors">
                <Phone size={14} className="text-japan-red shrink-0" />
                {t('phone')}
              </a>
              <a href="mailto:info@ajrline.com" className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors">
                <Mail size={14} className="text-japan-red shrink-0" />
                {t('email')}
              </a>
              <a
                href="https://wa.me/971503240800"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors"
              >
                <ExternalLink size={14} className="text-japan-red shrink-0" />
                WhatsApp
              </a>
            </div>

            <div className="mt-8 p-4 border border-japan-red/30 bg-japan-red/5">
              <div className="text-xs font-heading uppercase tracking-widest text-japan-red mb-1">Japan · Korea · Worldwide</div>
              <div className="text-white/70 text-xs">Monday – Sunday 09:00 – 21:00 JST</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">{t('rights', { year })}</p>
          <div className="flex gap-6">
            <Link href="#" className="text-white/30 hover:text-white/70 text-xs transition-colors">{t('privacy')}</Link>
            <Link href="#" className="text-white/30 hover:text-white/70 text-xs transition-colors">{t('terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
