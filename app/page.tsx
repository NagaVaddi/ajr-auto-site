import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import TrustBar from '@/components/TrustBar';
import CarCard from '@/components/CarCard';
import { Car } from '@/types';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Купить авто с пробегом в Москве | АВТО БРЕНД',
  description:
    'Автосалон АВТО БРЕНД предлагает проверенные автомобили с пробегом. Гарантия юридической чистоты, кредит, trade-in.',
};

const autoDealerSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: 'АВТО БРЕНД',
  description: 'Продажа проверенных автомобилей с пробегом в Москве',
  url: 'https://avto-brand.ru',
  telephone: '+7 (495) 123-45-67',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Автозаводская, д. 15, стр. 2',
    addressLocality: 'Москва',
    addressCountry: 'RU',
    postalCode: '115280',
  },
  openingHours: 'Mo-Su 09:00-21:00',
  priceRange: 'от 1 000 000 ₽',
};

async function getFeaturedCars(): Promise<Car[]> {
  const baseUrl =
    process.env.BASE_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/cars?featured=true`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredCars = await getFeaturedCars();

  return (
    <>
      {/* JSON-LD AutoDealer Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(autoDealerSchema).replace(/</g, '\\u003c') }}
      />

      <HeroSection />

      {/* Featured Cars */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-[#0A2540]">Популярные авто</h2>
              <p className="text-gray-600 mt-1">Лучшие предложения прямо сейчас</p>
            </div>
            <Link
              href="/catalog"
              className="hidden sm:inline-flex items-center text-[#E53E3E] font-semibold hover:underline"
            >
              Смотреть все →
            </Link>
          </div>

          {featuredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-12">Загрузка автомобилей...</p>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/catalog"
              className="inline-block bg-[#0A2540] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#E53E3E] transition-colors"
            >
              Смотреть весь каталог
            </Link>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Trade-in Section */}
      <section id="trade-in" className="py-16 bg-[#0A2540]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-extrabold mb-4">Trade-in за 1 день</h2>
            <p className="text-gray-300 text-lg mb-8">
              Сдайте ваш автомобиль в зачёт стоимости нового. Оценка онлайн за 15 минут. Оформление
              за 1 день без очередей и бумажной волокиты.
            </p>
            <a
              href="https://wa.me/74951234567?text=Хочу%20узнать%20о%20Trade-in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Узнать стоимость Trade-in
            </a>
          </div>
        </div>
      </section>

      {/* Credit Section */}
      <section id="credit" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-[#0A2540] mb-4">Автокредит от 5%</h2>
            <p className="text-gray-600 text-lg mb-10">
              Работаем с 15 банками-партнёрами. Одобрение за 30 минут. Первоначальный взнос от 0%.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Банков-партнёров', value: '15+' },
                { label: 'Одобрение кредита', value: '30 мин' },
                { label: 'Ставка от', value: '5%' },
              ].map((item) => (
                <div key={item.label} className="bg-[#F8FAFC] rounded-2xl p-6">
                  <div className="text-4xl font-extrabold text-[#E53E3E] mb-2">{item.value}</div>
                  <div className="text-gray-600 font-medium">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
