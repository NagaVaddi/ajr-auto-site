import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Gauge, Fuel, Cog, ArrowRight, Phone, MessageCircle, Globe, Eye, MapPin } from 'lucide-react';
import { Car } from '@/types';
import { formatPrice, formatMileage } from '@/lib/utils';

interface Props {
  params: { id: string };
}

async function getCar(id: string): Promise<Car | null> {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
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
  if (!car) return { title: 'Vehicle Not Found' };

  return {
    title: `${car.brand} ${car.model} ${car.year} — Import from ${car.origin} | AJR Auto`,
    description: `${car.brand} ${car.model} ${car.year}. ${formatMileage(car.mileage)}, ${car.engine}. Price: ${formatPrice(car.price)}. Direct ${car.origin} import — clean title, full history. Worldwide export available.`,
    openGraph: {
      title: `${car.brand} ${car.model} ${car.year}`,
      description: `${formatPrice(car.price)} — ${formatMileage(car.mileage)} — ${car.origin} import`,
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
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'AutoDealer',
        name: 'AJR Auto Parts',
        telephone: '+18885257386',
      },
    },
  };

  const specs = [
    { icon: Calendar, label: 'Year', value: car.year },
    { icon: Gauge, label: 'Mileage', value: formatMileage(car.mileage) },
    { icon: Fuel, label: 'Engine', value: car.engine },
    { icon: Cog, label: 'Transmission', value: car.transmission },
    { icon: ArrowRight, label: 'Drive', value: car.drive },
    { icon: Eye, label: 'Color', value: car.color },
    { icon: Globe, label: 'Origin', value: car.origin },
    ...(car.location ? [{ icon: MapPin, label: 'Location', value: car.location }] : []),
  ];

  const whatsappText = encodeURIComponent(
    `Hi, I'm interested in the ${car.brand} ${car.model} ${car.year} (ID: ${car.id})`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema).replace(/</g, '\\u003c') }}
      />

      <div className="container mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#0A2540]">Home</Link>
          {' / '}
          <Link href="/catalog" className="hover:text-[#0A2540]">Catalog</Link>
          {' / '}
          <span className="text-[#0A2540] font-medium">{car.brand} {car.model} {car.year}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Gallery */}
          <div>
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden mb-3">
              <Image
                src={car.images[0]}
                alt={`${car.brand} ${car.model} ${car.year} import from ${car.origin}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <span className="absolute top-4 left-4 text-white text-sm font-bold px-3 py-1.5 rounded-full"
                style={{ background: car.origin === 'Japan' ? '#BC002D' : '#003478' }}>
                {car.origin} Import
              </span>
              <span className="absolute top-4 right-4 bg-green-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full">
                In Stock
              </span>
            </div>

            {car.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {car.images.map((img, i) => (
                  <div key={i} className="relative h-24 rounded-xl overflow-hidden">
                    <Image
                      src={img}
                      alt={`${car.brand} ${car.model} photo ${i + 1}`}
                      fill
                      className="object-cover hover:opacity-80 transition-opacity cursor-pointer"
                      sizes="200px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="lg:sticky lg:top-24 h-fit">
            <h1 className="text-3xl font-extrabold text-[#0A2540] mb-2">
              {car.brand} {car.model}, {car.year}
            </h1>

            <div className="text-4xl font-extrabold text-[#E53E3E] mb-1">
              {formatPrice(car.price)}
            </div>
            {car.priceJpy && (
              <div className="text-sm text-gray-400 mb-5">
                ¥{car.priceJpy.toLocaleString('ja-JP')}
              </div>
            )}

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
                href="tel:+18885257386"
                className="flex items-center justify-center gap-2 bg-[#E53E3E] hover:bg-[#c53030] text-white font-bold py-3.5 rounded-xl text-base transition-colors"
              >
                <Phone size={20} />
                Call to Enquire
              </a>
              <a
                href={`https://wa.me/18885257386?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold py-3.5 rounded-xl text-base transition-colors"
              >
                <MessageCircle size={20} />
                WhatsApp Enquiry
              </a>
              <a
                href="mailto:info@ajrauto.com"
                className="flex items-center justify-center gap-2 border-2 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white font-bold py-3.5 rounded-xl text-base transition-colors"
              >
                <Globe size={20} />
                Email for Export Quote
              </a>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-10 bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold text-[#0A2540] mb-4">Vehicle Description</h2>
          <p className="text-gray-700 leading-relaxed">{car.description}</p>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-[#0A2540] font-semibold hover:text-[#E53E3E] transition-colors"
          >
            ← Back to Catalog
          </Link>
        </div>
      </div>
    </>
  );
}
