import Link from 'next/link';
import { Phone, MessageCircle, MapPin, Clock, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A2540] text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#E53E3E] text-white font-bold text-xl px-3 py-1 rounded">
                AJR
              </div>
              <span className="text-white font-bold text-xl">AUTO PARTS</span>
            </div>
            <p className="text-sm leading-relaxed">
              Premium Japan &amp; Korea import vehicles. Certified pre-owned, clean titles,
              full service history. Export worldwide.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/catalog', label: 'Car Catalog' },
                { href: '/catalog?origin=Japan', label: 'Japan Imports' },
                { href: '/catalog?origin=Korea', label: 'Korea Imports' },
                { href: '/about', label: 'About Us' },
                { href: '/about#contacts', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#E53E3E]" />
                <span>Japan &amp; Korea sourced vehicles, exported worldwide</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-[#E53E3E]" />
                <a href="tel:+18885257386" className="hover:text-white transition-colors">
                  +1 (888) 525-7386
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-[#E53E3E]" />
                <a href="mailto:info@ajrauto.com" className="hover:text-white transition-colors">
                  info@ajrauto.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={16} className="shrink-0 text-[#25D366]" />
                <a
                  href="https://wa.me/18885257386"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} className="shrink-0 text-[#E53E3E]" />
                <span>Mon–Sun: 9:00 AM – 9:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Why Us */}
          <div>
            <h3 className="text-white font-semibold mb-4">Why AJR</h3>
            <ul className="space-y-2 text-sm">
              <li>✓ Direct Japan &amp; Korea sourcing</li>
              <li>✓ Full auction &amp; dealer history</li>
              <li>✓ Clean title guaranteed</li>
              <li>✓ Worldwide export service</li>
              <li>✓ WhatsApp video inspections</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} AJR Auto Parts. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
