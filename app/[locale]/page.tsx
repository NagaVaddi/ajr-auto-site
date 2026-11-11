import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { carsData } from '@/lib/data/cars';
import HeroSection from '@/components/home/HeroSection';
import TrustBar from '@/components/home/TrustBar';
import FeaturedVehicles from '@/components/home/FeaturedVehicles';
import HowItWorksSection from '@/components/home/HowItWorksSection';

export const metadata: Metadata = {
  title: 'AJR Auto Cars | Premium Japan & Korea Import Vehicles',
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: 'AJR Auto Cars',
  description: 'Premium Japan and Korea import vehicles — Ferrari, Porsche, Genesis and more',
  url: 'https://ajrautocars.netlify.app',
  telephone: '+18885257386',
  email: 'info@ajrauto.com',
  openingHours: 'Mo-Su 09:00-21:00',
  areaServed: 'Worldwide',
};

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const featuredCars = carsData.filter((c) => c.isFeatured);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema).replace(/</g, '\\u003c') }}
      />
      <HeroSection locale={locale} />
      <TrustBar />
      <FeaturedVehicles cars={featuredCars} locale={locale} />
      <HowItWorksSection />
    </>
  );
}
