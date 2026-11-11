'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ArrowLeft,
  Zap,
  MapPin,
  Share2,
} from 'lucide-react';
import type { Car } from '@/lib/data/cars';

const statusStyles = {
  Available: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Reserved: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Sold: 'bg-white/8 text-white/35 border-white/12',
};

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-white/6 last:border-0">
      <span className="text-white/40 text-sm font-body">{label}</span>
      <span className="text-white text-sm font-body font-medium text-right max-w-[60%]">{value}</span>
    </div>
  );
}

export default function VehicleDetail({ car, locale }: { car: Car; locale: string }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const prev = () => setActiveIdx((i) => (i === 0 ? car.images.length - 1 : i - 1));
  const next = () => setActiveIdx((i) => (i === car.images.length - 1 ? 0 : i + 1));

  const steeringLabel = car.origin === 'Japan' ? 'RHD' : 'LHD';
  const importLabel = car.origin === 'Japan' ? 'Japan Import' : 'Korea Import';

  const waMsg = encodeURIComponent(
    `Hi, I'm interested in the ${car.year} ${car.brand} ${car.model} — $${car.price.toLocaleString('en-US')}. Please send more details.`
  );

  const specs = [
    { label: 'Year of release', value: String(car.year) },
    { label: 'Mileage', value: `${car.mileage.toLocaleString('en-US')} km` },
    { label: 'Engine', value: car.engine },
    { label: 'Transmission', value: car.transmission },
    { label: 'Drive', value: car.drive },
    { label: 'Color', value: car.color },
    { label: 'Origin', value: car.origin },
    { label: 'Location', value: car.location },
    ...(car.auctionGrade ? [{ label: 'Auction Grade', value: car.auctionGrade }] : []),
    ...(car.chassisCode ? [{ label: 'Chassis Code', value: car.chassisCode }] : []),
  ];

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      {/* Back nav */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <Link
          href={`/${locale}/inventory`}
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm font-heading font-bold uppercase tracking-widest transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Inventory
        </Link>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ── Main layout ── */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: gallery + specs */}
          <div className="flex-1 min-w-0">
            {/* Gallery */}
            <div className="flex flex-col md:flex-row gap-3">
              {/* Main image */}
              <div className="relative flex-1 aspect-[4/3] bg-black/40 overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={car.images[activeIdx]}
                      alt={`${car.year} ${car.brand} ${car.model} — photo ${activeIdx + 1}`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 65vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Arrows */}
                {car.images.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors z-10"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft size={18} className="text-white" />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors z-10"
                      aria-label="Next photo"
                    >
                      <ChevronRight size={18} className="text-white" />
                    </button>
                  </>
                )}

                {/* Counter */}
                <div className="absolute bottom-3 right-3 bg-black/60 text-white/70 text-xs font-heading px-2.5 py-1 tracking-wider">
                  {activeIdx + 1} / {car.images.length}
                </div>

                {/* Status overlay for Sold */}
                {car.status === 'Sold' && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="font-heading font-bold text-white/60 text-2xl uppercase tracking-[0.3em] border border-white/30 px-8 py-3 rotate-[-12deg]">
                      Sold
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail strip */}
              {car.images.length > 1 && (
                <div className="flex md:flex-col gap-2 md:w-[120px] overflow-x-auto md:overflow-y-auto md:max-h-[400px]">
                  {car.images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className={`relative shrink-0 w-24 md:w-full h-16 md:h-20 overflow-hidden border-2 transition-colors ${
                        i === activeIdx ? 'border-japan-red' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`Photo ${i + 1}`}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Below gallery: badge + title */}
            <div className="mt-5 flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-heading font-bold uppercase tracking-wider border px-2.5 py-1 bg-teal-500/10 text-teal-400 border-teal-500/25">
                  {steeringLabel}
                </span>
                <span className="text-xs font-heading font-bold uppercase tracking-wider border px-2.5 py-1 bg-blue-500/10 text-blue-400 border-blue-500/20">
                  {importLabel}
                </span>
                <span className={`text-xs font-heading font-bold uppercase tracking-wider border px-2.5 py-1 ${statusStyles[car.status]}`}>
                  {car.status}
                </span>
              </div>

              <div>
                <div className="text-japan-red text-xs font-heading font-bold uppercase tracking-[0.3em] mb-1">
                  {car.brand}
                </div>
                <h1 className="font-heading font-bold text-white text-2xl md:text-3xl leading-snug">
                  {car.brand} {car.model}
                  <span className="text-white/40 font-normal text-lg ml-2">({car.year})</span>
                </h1>
              </div>
            </div>

            {/* Specs table */}
            <div className="mt-6 bg-[#0e0e0e] border border-white/8">
              <div className="px-5 py-4 border-b border-white/8">
                <span className="font-heading font-bold text-xs uppercase tracking-[0.25em] text-white/50">
                  Specifications
                </span>
              </div>
              <div className="px-5 py-2">
                {specs.map((s) => (
                  <SpecRow key={s.label} label={s.label} value={s.value} />
                ))}
              </div>
            </div>

            {/* Description */}
            {car.description && (
              <div className="mt-6 bg-[#0e0e0e] border border-white/8 p-5">
                <div className="font-heading font-bold text-xs uppercase tracking-[0.25em] text-white/50 mb-3">
                  About this vehicle
                </div>
                <p className="text-white/60 text-sm leading-relaxed font-body">{car.description}</p>
              </div>
            )}
          </div>

          {/* Right: price box */}
          <div className="lg:w-[360px] shrink-0 self-start lg:sticky lg:top-24">
            {/* Price card */}
            <div className="bg-[#0e0e0e] border border-white/8">
              {/* Price */}
              <div className="p-6 border-b border-white/8 bg-gradient-to-br from-japan-red/5 to-transparent">
                <div className="font-heading font-bold text-white text-4xl tracking-tight">
                  ${car.price.toLocaleString('en-US')}
                </div>
                {car.priceJpy && (
                  <div className="text-white/35 text-sm font-body mt-1">
                    ¥{car.priceJpy.toLocaleString('en-US')}
                  </div>
                )}
              </div>

              {/* CTA buttons */}
              <div className="p-5 space-y-3">
                <a
                  href={`https://wa.me/971503240800?text=${waMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 bg-japan-red hover:bg-red-700 text-white font-heading font-bold uppercase tracking-widest text-sm py-4 transition-colors"
                >
                  <Zap size={15} />
                  Order Import
                </a>
                <a
                  href={`https://wa.me/971503240800?text=${waMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 border border-white/15 text-white/60 hover:border-white/40 hover:text-white font-heading font-bold uppercase tracking-widest text-xs py-3.5 transition-colors"
                >
                  <MessageCircle size={13} />
                  Request Details
                </a>
              </div>

              {/* Quick info */}
              <div className="border-t border-white/6 px-5 py-4 space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-white/40 font-body">
                  <MapPin size={12} className="text-white/25 shrink-0" />
                  {car.location}
                </div>
                <div className="flex items-center gap-2 text-xs text-white/40 font-body">
                  <span className="text-white/25 shrink-0 font-heading text-[10px] uppercase tracking-wider">Grade</span>
                  Auction Grade {car.auctionGrade}
                </div>
                {car.depositAmount && (
                  <div className="mt-3 text-[11px] text-white/30 font-body leading-relaxed">
                    Reserve with a ${car.depositAmount.toLocaleString('en-US')} deposit — balance on delivery.
                  </div>
                )}
              </div>
            </div>

            {/* Share */}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: `${car.year} ${car.brand} ${car.model}`, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="mt-3 w-full flex items-center justify-center gap-2 border border-white/8 text-white/30 hover:text-white/60 hover:border-white/20 text-xs font-heading uppercase tracking-widest py-3 transition-colors"
            >
              <Share2 size={12} />
              Share this vehicle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
