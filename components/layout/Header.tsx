'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 60);
  });

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/inventory`, label: t('inventory') },
    { href: `/${locale}/how-it-works`, label: t('howItWorks') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-md bg-black/80 border-b border-white/10 shadow-2xl' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <div className="w-9 h-9 bg-japan-red flex items-center justify-center">
              <span className="text-white font-heading font-bold text-sm tracking-widest">AJR</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-heading font-bold text-white text-base tracking-widest uppercase leading-tight">
                Auto
              </div>
              <div className="text-white/50 text-[9px] tracking-[0.3em] uppercase leading-tight">
                Import Specialists
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-heading font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-japan-red group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher locale={locale} />
            <a
              href="https://wa.me/18885257386"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-japan-red text-white text-xs font-heading font-bold uppercase tracking-widest px-5 py-2.5 hover:bg-red-700 transition-colors"
            >
              <MessageCircle size={14} />
              {t('whatsapp')}
            </a>
          </div>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden backdrop-blur-md bg-black/95 border-t border-white/10">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-heading font-bold uppercase tracking-widest text-white/80 hover:text-japan-red transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex items-center justify-between">
              <LanguageSwitcher locale={locale} />
              <a
                href="https://wa.me/18885257386"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-japan-red text-white text-xs font-heading font-bold uppercase tracking-widest px-4 py-2.5"
              >
                <MessageCircle size={14} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
}
