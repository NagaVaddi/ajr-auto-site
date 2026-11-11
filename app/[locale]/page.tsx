import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { carsData } from '@/lib/data/cars';
import HeroSection from '@/components/home/HeroSection';
import StatsBar from '@/components/home/StatsBar';
import FeaturedVehicles from '@/components/home/FeaturedVehicles';
import BrandGrid from '@/components/home/BrandGrid';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import FAQSection from '@/components/home/FAQSection';
import ClosingCTA from '@/components/home/ClosingCTA';

export const metadata: Metadata = {
  title: 'AJR Auto Cars | Premium Japan & Korea Import Vehicles',
  description: 'Marketplace for premium LHD vehicles sourced directly from Japan and Korea. Ferrari, Porsche, Genesis and more — with all-inclusive USD pricing and worldwide delivery.',
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
      <StatsBar />
      <FeaturedVehicles cars={featuredCars} locale={locale} />
      <BrandGrid locale={locale} />
      <HowItWorksSection />
      <WhyUsSection />
      <FAQSection />
      <ClosingCTA locale={locale} />
    </>
  );
}
