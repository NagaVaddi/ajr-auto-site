import type { Metadata } from 'next';
import { Phone, MessageCircle, MapPin, Clock, Award, Users, Car } from 'lucide-react';

export const metadata: Metadata = {
  title: 'О компании АВТО БРЕНД — автосалон в Москве',
  description:
    'АВТО БРЕНД — автосалон с 10-летним опытом продажи проверенных автомобилей с пробегом в Москве. Гарантия, кредит, trade-in.',
};

const stats = [
  { icon: Car, value: '500+', label: 'Автомобилей продано' },
  { icon: Users, value: '10+', label: 'Лет на рынке' },
  { icon: Award, value: '98%', label: 'Довольных клиентов' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0A2540] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold mb-4">О компании АВТО БРЕНД</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Более 10 лет мы помогаем москвичам и жителям Подмосковья найти надёжный автомобиль с
            пробегом по честной цене.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center text-center p-6 bg-[#F8FAFC] rounded-2xl">
                <Icon size={36} className="text-[#E53E3E] mb-3" />
                <div className="text-4xl font-extrabold text-[#0A2540] mb-1">{value}</div>
                <div className="text-gray-600">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-[#0A2540] mb-6">Наша история</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-base">
              <p>
                АВТО БРЕНД был основан в 2014 году с простой идеей: сделать покупку подержанного
                автомобиля такой же простой и прозрачной, как покупка нового. За 10 лет работы мы
                превратились в одного из ведущих дилеров автомобилей с пробегом в Москве.
              </p>
              <p>
                Каждый автомобиль в нашем салоне проходит многоступенчатую проверку по 150
                пунктам: техническую диагностику, проверку кузова и лакокрасочного покрытия,
                юридическую экспертизу по базам ГИБДД, ФСП и реестру залогов. Только чистые,
                исправные автомобили попадают на нашу площадку.
              </p>
              <p>
                Мы предлагаем полный спектр услуг: покупку в кредит через 15 банков-партнёров,
                trade-in за один день, помощь в страховании и оформлении всех необходимых
                документов. Наша цель — чтобы вы уехали на новом автомобиле довольными, без
                лишних хлопот.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-[#0A2540] text-center mb-10">
            Наши гарантии
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                title: 'Юридическая чистота',
                desc: 'Проверяем каждый автомобиль по базам ГИБДД, Росреестра залогов, ФСС. Без обременений и скрытых ограничений.',
              },
              {
                title: 'Техническая диагностика',
                desc: 'Полная проверка двигателя, трансмиссии, ходовой части, электроники. Диагностика на профессиональном оборудовании.',
              },
              {
                title: 'Прозрачная история',
                desc: 'Предоставляем полный отчёт по истории автомобиля: пробег, ДТП, владельцы, обслуживание.',
              },
              {
                title: 'Гарантия после покупки',
                desc: 'Предоставляем гарантию на покупку в течение 30 дней. Если нашли проблему — устраняем бесплатно.',
              },
            ].map((g) => (
              <div key={g.title} className="bg-[#F8FAFC] rounded-2xl p-5 border-l-4 border-[#E53E3E]">
                <h3 className="font-bold text-[#0A2540] mb-2">{g.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Contacts */}
      <section id="contacts" className="py-16 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-[#0A2540] mb-10 text-center">Контакты</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Map placeholder */}
            <div className="bg-gray-200 rounded-2xl h-80 flex items-center justify-center overflow-hidden">
              <div className="text-center text-gray-500 p-8">
                <MapPin size={48} className="mx-auto mb-3 text-[#E53E3E]" />
                <p className="font-semibold text-lg text-[#0A2540]">
                  ул. Автозаводская, д. 15, стр. 2
                </p>
                <p className="text-sm mt-1">м. Автозаводская, 5 минут пешком</p>
                <a
                  href="https://yandex.ru/maps/?ll=37.6618,55.7122&z=16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-[#E53E3E] font-semibold hover:underline text-sm"
                >
                  Открыть в Яндекс.Картах →
                </a>
              </div>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-5">
              <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="font-bold text-[#0A2540] mb-4 text-lg">Как с нами связаться</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F8FAFC] flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-[#E53E3E]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Телефон</div>
                      <a
                        href="tel:+74951234567"
                        className="font-bold text-[#0A2540] hover:text-[#E53E3E] transition-colors"
                      >
                        +7 (495) 123-45-67
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F8FAFC] flex items-center justify-center shrink-0">
                      <MessageCircle size={18} className="text-[#25D366]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">WhatsApp</div>
                      <a
                        href="https://wa.me/74951234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-[#0A2540] hover:text-[#25D366] transition-colors"
                      >
                        +7 (495) 123-45-67
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F8FAFC] flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-[#E53E3E]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Адрес</div>
                      <span className="font-bold text-[#0A2540]">
                        Москва, ул. Автозаводская, д. 15, стр. 2
                      </span>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F8FAFC] flex items-center justify-center shrink-0">
                      <Clock size={18} className="text-[#E53E3E]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Режим работы</div>
                      <span className="font-bold text-[#0A2540]">
                        Ежедневно 9:00 – 21:00
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
