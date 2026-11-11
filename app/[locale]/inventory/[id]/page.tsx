import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, Calendar, Gauge, Zap, Cog, Palette, Globe, MapPin, Hash } from 'lucide-react';
import { carsData } from '@/lib/data/cars';
import BuyBox from '@/components/inventory/BuyBox';

interface Props {
  params: { locale: string; id: string };
}

export async function generateStaticParams() {
  const locales = ['en', 'ru', 'ar', 'ja'];
  return locales.flatMap((locale) => carsData.map((car) => ({ locale, id: car.id })));
}

export async function generateMetadata({ params: { locale, id } }: Props): Promise<Metadata> {
  const car = carsData.find((c) => c.id === id);
  if (!car) return { title: 'Vehicle Not Found' };

  return {
    title: `${car.year} ${car.brand} ${car.model} — ${car.origin} Import`,
    description: `${car.brand} ${car.model} ${car.year}. ${(car.mileage / 1000).toFixed(0)}k km, ${car.engine}. $${car.price.toLocaleString()} USD. Direct ${car.origin} import — full auction history, worldwide export.`,
    openGraph: {
      title: `${car.year} ${car.brand} ${car.model}`,
      description: `$${car.price.toLocaleString()} — ${(car.mileage / 1000).toFixed(0)}k km — ${car.origin} import`,
      images: car.images[0] ? [{ url: car.images[0] }] : [],
    },
  };
}

export default async function VehicleDetailPage({ params: { locale, id } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('vehicle');

  const car = carsData.find((c) => c.id === id);
  if (!car) notFound();

  const vehicleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: `${car.brand} ${car.model}`,
    brand: { '@type': 'Brand', name: car.brand },
    model: car.model,
    modelDate: car.year,
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: car.mileage, unitCode: 'KMT' },
    color: car.color,
    image: car.images,
    description: car.description,
    offers: {
      '@type': 'Offer',
      price: car.price,
      priceCurrency: 'USD',
      availability: `https://schema.org/${car.status === 'Available' ? 'InStock' : car.status === 'Sold' ? 'SoldOut' : 'PreOrder'}`,
      seller: { '@type': 'AutoDealer', name: 'AJR Auto Cars', telephone: '+971503240800' },
    },
  };

  const specs = [
    { icon: Calendar, label: t('year'), value: String(car.year) },
    { icon: Gauge, label: t('mileage'), value: `${car.mileage.toLocaleString()} km` },
    { icon: Zap, label: t('engine'), value: car.engine },
    { icon: Cog, label: t('transmission'), value: car.transmission },
    { icon: Globe, label: t('drive'), value: car.drive },
    { icon: Palette, label: t('color'), value: car.color },
    { icon: MapPin, label: t('location'), value: car.location },
    ...(car.chassisCode ? [{ icon: Hash, label: t('chassis'), value: car.chassisCode }] : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema).replace(/</g, '\\u003c') }}
      />

      <div className="min-h-screen bg-obsidian pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link
            href={`/${locale}/inventory`}
            className="inline-flex items-center gap-2 text-white/40 hover:text-japan-red text-xs font-heading font-bold uppercase tracking-widest transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            {t('backToInventory')}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <div className="relative h-72 md:h-96 overflow-hidden mb-3">
                <Image
                  src={car.images[0]}
                  alt={`${car.brand} ${car.model} ${car.year} ${car.origin} import`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span
                    className="text-white text-[10px] font-heading font-bold uppercase tracking-widest px-3 py-1.5"
                    style={{ background: car.origin === 'Japan' ? '#BC002D' : '#003478' }}
                  >
                    {car.origin} Import
                  </span>
                </div>
              </div>

              {car.images.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {car.images.slice(1).map((img, i) => (
                    <div key={i} className="relative h-24 overflow-hidden">
                      <Image
                        src={img}
                        alt={`${car.brand} ${car.model} photo ${i + 2}`}
                        fill
                        className="object-cover hover:opacity-80 transition-opacity cursor-pointer"
                        sizes="200px"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 bg-black border border-white/10 p-6">
                <h2 className="font-heading font-bold text-sm uppercase tracking-widest text-white/40 mb-4">{t('specs')}</h2>
                <div className="grid grid-cols-2 gap-3">
                  {specs.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3 p-3 bg-white/3 border border-white/5">
                      <Icon size={14} className="text-japan-red mt-0.5 shrink-0" />
                      <div>
                        <div className="text-white/30 text-[10px] font-heading uppercase tracking-widest">{label}</div>
                        <div className="text-white text-sm mt-0.5">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 bg-black border border-white/10 p-6">
                <h2 className="font-heading font-bold text-sm uppercase tracking-widest text-white/40 mb-4">{t('description')}</h2>
                <p className="text-white/60 text-sm leading-relaxed">{car.description}</p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="mb-4">
                <h1 className="font-heading font-bold text-3xl md:text-4xl text-white uppercase tracking-tight">
                  {car.brand} {car.model}
                </h1>
                <p className="text-white/40 font-heading text-sm uppercase tracking-widest mt-1">{car.year}</p>
              </div>
              <BuyBox car={car} locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
