import Link from 'next/link';
import Image from 'next/image';
import { Gauge, Cog, Fuel, MapPin } from 'lucide-react';
import { Car } from '@/types';
import { formatPrice, formatMileage } from '@/lib/utils';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col group">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={car.images[0]}
          alt={`${car.brand} ${car.model} ${car.year} import from ${car.origin}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow"
          style={{ background: car.origin === 'Japan' ? '#BC002D' : '#003478' }}>
          {car.origin === 'Japan' ? 'Japan Import' : 'Korea Import'}
        </span>
        <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
          In Stock
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-[#0A2540] mb-1">
          {car.brand} {car.model}, {car.year}
        </h3>

        {car.location && (
          <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
            <MapPin size={11} />
            <span>{car.location}, {car.origin}</span>
          </div>
        )}

        {/* Specs row */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1.5">
            <Gauge size={14} className="text-[#E53E3E] shrink-0" />
            <span>{formatMileage(car.mileage)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel size={14} className="text-[#E53E3E] shrink-0" />
            <span className="truncate max-w-[130px]">{car.engine}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cog size={14} className="text-[#E53E3E] shrink-0" />
            <span>{car.transmission}</span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="text-2xl font-extrabold text-[#0A2540]">
            {formatPrice(car.price)}
          </div>
          {car.priceJpy && (
            <div className="text-xs text-gray-400 mb-2">
              ¥{car.priceJpy.toLocaleString('ja-JP')}
            </div>
          )}
          <Link
            href={`/catalog/${car.id}`}
            className="mt-2 block text-center bg-[#0A2540] hover:bg-[#E53E3E] text-white font-semibold py-2.5 rounded-xl transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
