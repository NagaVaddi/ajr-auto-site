'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Gauge } from 'lucide-react';
import type { Car } from '@/lib/data/cars';

function statusColor(status: Car['status']) {
  if (status === 'Available') return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
  if (status === 'Reserved') return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
  return 'bg-white/10 text-white/40 border-white/20';
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as number[] } },
};

export default function FeaturedVehicles({ cars, locale }: { cars: Car[]; locale: string }) {
  return (
    <section className="bg-obsidian py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-japan-red text-xs font-heading font-bold uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-japan-red" />
              Now in catalog
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white uppercase tracking-tight">
              Featured Vehicles
            </h2>
            <p className="text-white/35 text-sm mt-2">Hand-picked from our latest arrivals</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={`/${locale}/inventory`}
              className="hidden md:inline-flex items-center gap-2 text-white/50 font-heading text-sm uppercase tracking-widest hover:text-white transition-colors group"
            >
              View all
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {cars.slice(0, 4).map((car) => (
            <motion.div key={car.id} variants={item}>
              <Link
                href={`/${locale}/inventory/${car.id}`}
                className="card-shimmer group block bg-black border border-white/10 hover:border-japan-red/40 transition-all duration-300 relative"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: '0 0 30px 2px rgba(230,0,18,0.12)' }} />

                <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                  <Image
                    src={car.images[0]}
                    alt={`${car.year} ${car.brand} ${car.model}`}
                    fill
                    className="object-cover group-hover:scale-107 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className={`absolute top-3 left-3 px-2 py-0.5 text-[10px] font-heading font-bold uppercase border ${statusColor(car.status)}`}>
                    {car.status}
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-heading font-bold uppercase bg-black/70 text-white/60 border border-white/20">
                    {car.origin === 'Japan' ? 'RHD' : 'LHD'}
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-white/35 text-[10px] font-heading uppercase tracking-widest mb-1">{car.brand}</div>
                  <h3 className="text-white font-heading font-bold text-sm uppercase leading-tight mb-3 line-clamp-2 group-hover:text-japan-red transition-colors duration-200">
                    {car.year} {car.model}
                  </h3>
                  <div className="flex items-center gap-3 text-white/30 text-xs mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin size={9} />
                      {car.location.split(',')[1]?.trim() || car.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Gauge size={9} />
                      {car.mileage.toLocaleString()} km
                    </span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="text-japan-red font-heading font-bold text-xl">
                      ${car.price.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-white/20 font-heading uppercase tracking-wider">
                      Grade {car.auctionGrade}
                    </div>
                  </div>
                </div>

                {/* Bottom line reveal */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-japan-red scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile CTA */}
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
