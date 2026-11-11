import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import TrustBar from '@/components/TrustBar';
import CarCard from '@/components/CarCard';
import { Car } from '@/types';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Japan & Korea Import Cars | AJR Auto Parts',
  description:
    'Premium pre-owned vehicles imported directly from Japan and Korea. Ferrari, Porsche, Genesis and more — clean titles, full auction history, worldwide export.',
};

const autoDealerSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: 'AJR Auto Parts',
  description: 'Premium Japan and Korea import vehicles — Ferrari, Porsche, Genesis and more',
  url: 'https://ajrauto.netlify.app',
  telephone: '+18885257386',
  email: 'info@ajrauto.com',
  openingHours: 'Mo-Su 09:00-21:00',
  priceRange: 'From $50,000',
  areaServed: 'Worldwide',
};

async function getFeaturedCars(): Promise<Car[]> {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
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
              <h2 className="text-3xl font-extrabold text-[#0A2540]">Featured Vehicles</h2>
              <p className="text-gray-600 mt-1">Hand-picked Japan &amp; Korea imports</p>
            </div>
            <Link
              href="/catalog"
              className="hidden sm:inline-flex items-center text-[#E53E3E] font-semibold hover:underline"
            >
              View All →
            </Link>
          </div>

          {featuredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-10">Loading vehicles…</p>
          )}

          <div className="text-center mt-10">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 bg-[#0A2540] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#E53E3E] transition-colors"
            >
              Browse Full Catalog →
            </Link>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-[#0A2540] text-center mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '1',
                title: 'Browse & Select',
                desc: 'Find your car in our Japan & Korea catalog. WhatsApp us for a live video walk-around.',
              },
              {
                step: '2',
                title: 'Pay & Export',
                desc: 'Secure payment, deregistration, and export documentation handled by us end-to-end.',
              },
              {
                step: '3',
                title: 'Receive Worldwide',
                desc: 'Your vehicle ships to your nearest port in 2–4 weeks. We track the shipment for you.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#E53E3E] text-white text-2xl font-extrabold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-[#0A2540] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
