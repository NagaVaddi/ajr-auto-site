import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Gauge, Fuel, Cog, ArrowRight, Phone, MessageCircle, CreditCard, Eye } from 'lucide-react';
import { Car } from '@/types';
import { formatPrice, formatMileage } from '@/lib/utils';

interface Props {
  params: { id: string };
}

async function getCar(id: string): Promise<Car | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/cars?id=${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const car = await getCar(params.id);
  if (!car) return { title: 'Автомобиль не найден' };

  return {
    title: `Купить ${car.brand} ${car.model} ${car.year} в Москве | АВТО БРЕНД`,
    description: `В продаже ${car.brand} ${car.model} ${car.year} года. Пробег ${formatMileage(car.mileage)}. Двигатель: ${car.engine}. Цена: ${formatPrice(car.price)}. Гарантия, кредит, trade-in. Звоните!`,
    openGraph: {
      title: `${car.brand} ${car.model} ${car.year}`,
      description: `Цена: ${formatPrice(car.price)}. Пробег: ${formatMileage(car.mileage)}.`,
      images: car.images[0] ? [{ url: car.images[0] }] : [],
    },
  };
}

export default async function VehicleDetailPage({ params }: Props) {
  const car = await getCar(params.id);
  if (!car) notFound();

  const vehicleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: `${car.brand} ${car.model}`,
    brand: { '@type': 'Brand', name: car.brand },
    model: car.model,
    modelDate: car.year,
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: car.mileage,
      unitCode: 'KMT',
    },
    color: car.color,
    image: car.images,
    description: car.description,
    offers: {
      '@type': 'Offer',
      price: car.price,
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'AutoDealer',
        name: 'АВТО БРЕНД',
        telephone: '+7 (495) 123-45-67',
      },
    },
  };

  const specs = [
    { icon: Calendar, label: 'Год выпуска', value: car.year },
    { icon: Gauge, label: 'Пробег', value: formatMileage(car.mileage) },
    { icon: Fuel, label: 'Двигатель', value: car.engine },
    { icon: Cog, label: 'Коробка', value: car.transmission },
    { icon: ArrowRight, label: 'Привод', value: car.drive },
    { icon: Eye, label: 'Цвет', value: car.color },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema) }}
      />

      <div className="container mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#0A2540]">Главная</Link>
          {' / '}
          <Link href="/catalog" className="hover:text-[#0A2540]">Каталог</Link>
          {' / '}
          <span className="text-[#0A2540] font-medium">{car.brand} {car.model} {car.year}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Gallery */}
          <div>
            {/* Main image */}
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden mb-3">
              <Image
                src={car.images[0]}
                alt={`${car.brand} ${car.model} ${car.year} купить в Москве`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <span className="absolute top-4 right-4 bg-green-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full">
                В наличии
              </span>
            </div>

            {/* Thumbnails */}
            {car.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {car.images.map((img, i) => (
                  <div key={i} className="relative h-24 rounded-xl overflow-hidden">
                    <Image
                      src={img}
                      alt={`${car.brand} ${car.model} фото ${i + 1}`}
                      fill
                      className="object-cover hover:opacity-80 transition-opacity cursor-pointer"
                      sizes="200px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details (sticky) */}
          <div className="lg:sticky lg:top-24 h-fit">
            <h1 className="text-3xl font-extrabold text-[#0A2540] mb-2">
              {car.brand} {car.model}, {car.year}
            </h1>

            <div className="text-4xl font-extrabold text-[#E53E3E] mb-6">
              {formatPrice(car.price)}
            </div>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {specs.map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-[#F8FAFC] rounded-xl p-3 flex items-start gap-3">
                  <Icon size={18} className="text-[#E53E3E] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500">{label}</div>
                    <div className="text-sm font-semibold text-[#0A2540]">{String(value)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              <a
                href="tel:+74951234567"
                className="flex items-center justify-center gap-2 bg-[#E53E3E] hover:bg-[#c53030] text-white font-bold py-3.5 rounded-xl text-base transition-colors"
              >
                <CreditCard size={20} />
                Купить в кредит
              </a>
              <a
                href="tel:+74951234567"
                className="flex items-center justify-center gap-2 border-2 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white font-bold py-3.5 rounded-xl text-base transition-colors"
              >
                <Phone size={20} />
                Записаться на просмотр
              </a>
              <a
                href={`https://wa.me/74951234567?text=Интересует%20${encodeURIComponent(`${car.brand} ${car.model} ${car.year}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold py-3.5 rounded-xl text-base transition-colors"
              >
                <MessageCircle size={20} />
                Написать в WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-10 bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold text-[#0A2540] mb-4">Описание</h2>
          <p className="text-gray-700 leading-relaxed">{car.description}</p>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-[#0A2540] font-semibold hover:text-[#E53E3E] transition-colors"
          >
            ← Вернуться в каталог
          </Link>
        </div>
      </div>
    </>
  );
}
