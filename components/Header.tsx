'use client';

import Link from 'next/link';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';

const PHONE = '+1 (888) 525-7386';
const PHONE_HREF = 'tel:+18885257386';
const WHATSAPP_HREF = 'https://wa.me/18885257386';

const navLinks = [
  { href: '/catalog', label: 'Catalog' },
  { href: '/about', label: 'About' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/about#contacts', label: 'Contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0A2540] shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-[#E53E3E] text-white font-bold text-xl px-3 py-1 rounded">
              AJR
            </div>
            <span className="text-white font-bold text-xl tracking-wide">AUTO PARTS</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
            >
              <Phone size={16} />
              <span className="font-semibold text-sm">{PHONE}</span>
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white px-3 py-2 rounded-lg hover:bg-[#1ebe57] transition-colors text-sm font-semibold"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0A2540] border-t border-white/10 px-4 py-4">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white py-2 text-base font-medium border-b border-white/10"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 text-white text-base font-semibold"
            >
              <Phone size={18} />
              {PHONE}
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-lg text-base font-semibold"
            >
              <MessageCircle size={18} />
              Message on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
