'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Car } from '@/types';

function StatusBadge({ status }: { status: Car['status'] }) {
  const colors = {
    Available: 'bg-emerald-500',
    Reserved: 'bg-amber-500',
    Sold: 'bg-red-600',
  };
  return (
    <span className={`${colors[status]} text-white text-[10px] font-heading font-bold uppercase tracking-widest px-2.5 py-1`}>
      {status}
    </span>
  );
}

function FeaturedCard({ car, locale, index }: { car: Car; locale: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative w-72 md:w-80 xl:w-96 shrink-0 bg-white/3 border border-white/10 overflow-hidden hover:border-japan-red/40 transition-all duration-500 cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Link href={`/${locale}/inventory/${car.id}`}>
        <div className="relative h-52 overflow-hidden">
          <Image
            src={car.images[0]}
            alt={`${car.brand} ${car.model} ${car.year}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span
              className="text-white text-[10px] font-heading font-bold uppercase tracking-widest px-2.5 py-1"
              style={{ background: car.origin === 'Japan' ? '#BC002D' : '#003478' }}
            >
              {car.origin}
            </span>
            <StatusBadge status={car.status} />
          </div>
          {car.auctionGrade && (
            <div className="absolute top-3 right-3 w-8 h-8 bg-black/80 border border-white/20 flex items-center justify-center">
              <span className="text-white text-xs font-heading font-bold">{car.auctionGrade}</span>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="text-white/50 text-xs font-heading uppercase tracking-widest mb-1">{car.year}</div>
          <h3 className="font-heading font-bold text-lg text-white uppercase tracking-wide leading-tight mb-3">
            {car.brand} {car.model}
          </h3>
          <div className="flex items-end justify-between">
            <div>
              <div className="font-heading font-bold text-2xl text-white">
                ${car.price.toLocaleString()}
              </div>
              {car.priceJpy && (
                <div className="text-white/40 text-xs">¥{car.priceJpy.toLocaleString()}</div>
              )}
            </div>
            <div className="text-white/30 text-xs font-heading uppercase tracking-widest">
              {(car.mileage / 1000).toFixed(0)}k km
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-japan-red group-hover:w-full transition-all duration-500" />
      </Link>
    </motion.div>
  );
}

export default function FeaturedVehicles({ cars, locale }: { cars: Car[]; locale: string }) {
  const t = useTranslations('featured');
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start start', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-55%']);

  return (
    <section ref={targetRef} className="relative bg-obsidian" style={{ height: `${Math.max(300, cars.length * 60)}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-japan-red text-xs font-heading font-bold uppercase tracking-[0.4em] mb-3">Collection</div>
              <h2 className="font-heading font-bold text-4xl md:text-5xl xl:text-6xl uppercase tracking-tight text-white">
                {t('title')}{' '}
                <span className="text-japan-red">{t('titleAccent')}</span>
              </h2>
              <p className="text-white/40 text-sm mt-2">{t('subtitle')}</p>
            </div>
            <Link
              href={`/${locale}/inventory`}
              className="hidden md:flex items-center gap-2 border border-white/20 text-white text-xs font-heading font-bold uppercase tracking-widest px-5 py-3 hover:border-japan-red hover:text-japan-red transition-colors shrink-0"
            >
              {t('viewAll')}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="overflow-hidden">
          <motion.div style={{ x }} className="flex gap-4 pl-4 md:pl-20">
            {cars.map((car, i) => (
              <FeaturedCard key={car.id} car={car} locale={locale} index={i} />
            ))}
          </motion.div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {[...Array(Math.min(4, cars.length))].map((_, i) => (
            <div key={i} className="w-6 h-0.5 bg-white/20" />
          ))}
        </div>
      </div>
    </section>
  );
}
