'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Car } from '@/types';

function StatusBadge({ status }: { status: Car['status'] }) {
  const map = {
    Available: { bg: 'bg-emerald-500', label: 'Available' },
    Reserved: { bg: 'bg-amber-500', label: 'Reserved' },
    Sold: { bg: 'bg-red-600', label: 'Sold' },
  };
  const { bg, label } = map[status];
  return (
    <span className={`${bg} text-white text-[10px] font-heading font-bold uppercase tracking-widest px-2.5 py-1`}>
      {label}
    </span>
  );
}

export default function VehicleCard({ car, locale, index = 0 }: { car: Car; locale: string; index?: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 8;
    const y = -((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 8;
    setTilt({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      style={{ rotateX: tilt.x, rotateY: tilt.y, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="group relative bg-white/3 border border-white/10 overflow-hidden hover:border-japan-red/40 transition-all duration-500 cursor-pointer"
    >
      <Link href={`/${locale}/inventory/${car.id}`}>
        <div className="relative h-52 overflow-hidden">
          <Image
            src={car.images[0]}
            alt={`${car.brand} ${car.model} ${car.year}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            <span
              className="text-white text-[10px] font-heading font-bold uppercase tracking-widest px-2.5 py-1"
              style={{ background: car.origin === 'Japan' ? '#BC002D' : '#003478' }}
            >
              {car.origin}
            </span>
            <StatusBadge status={car.status} />
          </div>

          {car.auctionGrade && (
            <div className="absolute top-3 right-3 w-9 h-9 bg-black/80 border border-white/20 flex items-center justify-center">
              <span className="text-white text-xs font-heading font-bold">{car.auctionGrade}</span>
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="text-white/40 text-xs font-heading uppercase tracking-widest mb-1">{car.year}</div>
          <h3 className="font-heading font-bold text-base text-white uppercase tracking-wide leading-tight mb-1">
            {car.brand}
          </h3>
          <p className="text-white/60 text-sm font-heading mb-4">{car.model}</p>

          <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-white/40">
            <div>
              <span className="text-white/20 uppercase tracking-widest block text-[10px]">Mileage</span>
              <span className="text-white/60">{(car.mileage / 1000).toFixed(0)}k km</span>
            </div>
            <div>
              <span className="text-white/20 uppercase tracking-widest block text-[10px]">Trans</span>
              <span className="text-white/60 truncate block">{car.transmission.split(' ')[0]}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-heading font-bold text-xl text-white">
                ${car.price.toLocaleString()}
              </div>
              {car.priceJpy && (
                <div className="text-white/30 text-xs">¥{car.priceJpy.toLocaleString()}</div>
              )}
            </div>
            <div className="text-japan-red text-xs font-heading font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              View →
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-japan-red group-hover:w-full transition-all duration-500" />
      </Link>
    </motion.div>
  );
}
