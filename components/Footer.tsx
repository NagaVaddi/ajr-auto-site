import Link from 'next/link';
import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A2540] text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#E53E3E] text-white font-bold text-xl px-3 py-1 rounded">
                АВТ
              </div>
              <span className="text-white font-bold text-xl">АВТО БРЕНД</span>
            </div>
            <p className="text-sm leading-relaxed">
              Продажа проверенных автомобилей с пробегом в Москве. Гарантия юридической чистоты,
              кредит, trade-in.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/catalog', label: 'Каталог автомобилей' },
                { href: '/about', label: 'О компании' },
                { href: '/#trade-in', label: 'Trade-in' },
                { href: '/#credit', label: 'Автокредит' },
                { href: '/about#contacts', label: 'Контакты' },
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
            <h3 className="text-white font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#E53E3E]" />
                <span>г. Москва, ул. Автозаводская, д. 15, стр. 2</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-[#E53E3E]" />
                <a href="tel:+74951234567" className="hover:text-white transition-colors">
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={16} className="shrink-0 text-[#25D366]" />
                <a
                  href="https://wa.me/74951234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} className="shrink-0 text-[#E53E3E]" />
                <span>Пн–Вс: 9:00 – 21:00</span>
              </li>
            </ul>
          </div>

          {/* Guarantees */}
          <div>
            <h3 className="text-white font-semibold mb-4">Гарантии</h3>
            <ul className="space-y-2 text-sm">
              <li>✓ Проверка по 150 пунктам</li>
              <li>✓ Юридическая чистота</li>
              <li>✓ Trade-in за 1 день</li>
              <li>✓ Кредит от 5%</li>
              <li>✓ Гарантия после покупки</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} АВТО БРЕНД. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
