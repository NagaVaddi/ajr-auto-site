'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import type { Car } from '@/lib/data/cars';

function statusColor(status: Car['status']) {
  if (status === 'Available') return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
  if (status === 'Reserved') return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
  return 'bg-white/10 text-white/40 border-white/20';
}

export default function FeaturedVehicles({ cars, locale }: { cars: Car[]; locale: string }) {
  return (
    <section className="bg-obsidian py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-japan-red text-xs font-heading font-bold uppercase tracking-[0.4em] mb-2">Now in catalog</div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white uppercase tracking-tight">
              Featured Vehicles
            </h2>
            <p className="text-white/40 text-sm mt-2">Hand-picked from our latest arrivals</p>
          </div>
          <Link
            href={`/${locale}/inventory`}
            className="hidden md:inline-flex items-center gap-2 text-white/60 font-heading text-sm uppercase tracking-widest hover:text-white transition-colors group"
          >
            View all
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cars.slice(0, 4).map((car, i) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link href={`/${locale}/inventory/${car.id}`} className="group block bg-black border border-white/10 hover:border-white/30 transition-colors">
                <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                  <Image
                    src={car.images[0]}
                    alt={`${car.year} ${car.brand} ${car.model}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className={`absolute top-3 left-3 px-2 py-0.5 text-[10px] font-heading font-bold uppercase border ${statusColor(car.status)}`}>
                    {car.status}
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-heading font-bold uppercase bg-black/70 text-white/60 border border-white/20">
                    {car.origin}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-white/40 text-[10px] font-heading uppercase tracking-widest mb-1">{car.brand}</div>
                  <h3 className="text-white font-heading font-bold text-sm uppercase leading-tight mb-2 line-clamp-2">
                    {car.year} {car.model}
                  </h3>
                  <div className="flex items-center gap-1 text-white/30 text-xs mb-3">
                    <MapPin size={10} />
                    <span>{car.location}</span>
                    <span className="ml-2">{car.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="text-japan-red font-heading font-bold text-lg">
                    ${car.price.toLocaleString()}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href={`/${locale}/inventory`}
            className="inline-flex items-center gap-2 border border-white/20 text-white font-heading font-bold uppercase tracking-widest px-6 py-3 hover:border-white/50 transition-colors text-sm"
          >
            View All Vehicles <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
