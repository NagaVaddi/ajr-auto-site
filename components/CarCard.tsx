import Link from 'next/link';
import Image from 'next/image';
import { Gauge, Cog, Fuel } from 'lucide-react';
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
          alt={`${car.brand} ${car.model} ${car.year} купить в Москве`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
          В наличии
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-[#0A2540] mb-3">
          {car.brand} {car.model}, {car.year}
        </h3>

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
          <div className="text-2xl font-extrabold text-[#0A2540] mb-3">
            {formatPrice(car.price)}
          </div>
          <Link
            href={`/catalog/${car.id}`}
            className="block text-center bg-[#0A2540] hover:bg-[#E53E3E] text-white font-semibold py-2.5 rounded-xl transition-colors duration-200"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
}
