import { notFound } from 'next/navigation';
import { carsData } from '@/lib/data/cars';
import VehicleDetail from '@/components/inventory/VehicleDetail';
import { unstable_setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  const locales = ['en', 'ru', 'ar', 'ja'];
  return locales.flatMap((locale) =>
    carsData.map((car) => ({ locale, id: car.id }))
  );
}

export function generateMetadata({ params }: { params: { locale: string; id: string } }) {
  const car = carsData.find((c) => c.id === params.id);
  if (!car) return {};
  return {
    title: `${car.year} ${car.brand} ${car.model} — AJR Auto Cars`,
    description: `${car.origin} import ${car.year} ${car.brand} ${car.model}. ${car.mileage.toLocaleString('en-US')} km, Auction Grade ${car.auctionGrade}. $${car.price.toLocaleString('en-US')} USD.`,
  };
}

export default function VehiclePage({ params }: { params: { locale: string; id: string } }) {
  unstable_setRequestLocale(params.locale);
  const car = carsData.find((c) => c.id === params.id);
  if (!car) notFound();
  return <VehicleDetail car={car} locale={params.locale} />;
}
