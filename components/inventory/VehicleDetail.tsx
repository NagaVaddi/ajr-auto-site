'use client';

import { useState, useEffect, useCallback } from 'react';
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
  X,
  Maximize2,
  Calendar,
  Gauge,
  Palette,
  Settings,
  Navigation,
  Award,
  Hash,
  Globe,
  Phone,
  Mail,
  CheckCircle,
  Eye,
} from 'lucide-react';
import type { Car } from '@/lib/data/cars';
import { allCars } from '@/lib/data/cars';

const statusStyles = {
  Available: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Reserved: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Sold: 'bg-white/8 text-white/35 border-white/12',
};
const statusDot = {
  Available: 'bg-emerald-400',
  Reserved: 'bg-amber-400',
  Sold: 'bg-white/30',
};

function SpecItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-white/6 last:border-0">
      <div className="text-white/25 mt-0.5 shrink-0">{icon}</div>
      <div className="flex-1 min-w-0 flex items-center justify-between gap-3">
        <span className="text-white/40 text-sm font-body shrink-0">{label}</span>
        <span className="text-white text-sm font-body font-medium text-right">{value}</span>
      </div>
    </div>
  );
}

export default function VehicleDetail({ car, locale }: { car: Car; locale: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const prev = useCallback(() => setActiveIdx((i) => (i === 0 ? car.images.length - 1 : i - 1)), [car.images.length]);
  const next = useCallback(() => setActiveIdx((i) => (i === car.images.length - 1 ? 0 : i + 1)), [car.images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen, prev, next]);

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  const steeringLabel = car.origin === 'Japan' ? 'RHD' : 'LHD';
  const importLabel = car.origin === 'Japan' ? 'Japan Import' : 'Korea Import';

  const waBase = `https://wa.me/971503240800?text=`;
  const waReserve = waBase + encodeURIComponent(`Hi, I want to RESERVE the ${car.year} ${car.brand} ${car.model}. Deposit: $${car.depositAmount?.toLocaleString('en-US')}`);
  const waFull = waBase + encodeURIComponent(`Hi, I want to PAY IN FULL for the ${car.year} ${car.brand} ${car.model} — $${car.price.toLocaleString('en-US')}. Please send wire transfer details.`);
  const waVideo = waBase + encodeURIComponent(`Hi, I'd like a WhatsApp VIDEO WALKAROUND of the ${car.year} ${car.brand} ${car.model}.`);
  const waInquiry = waBase + encodeURIComponent(`Hi, I'm interested in the ${car.year} ${car.brand} ${car.model} — $${car.price.toLocaleString('en-US')}. Please send more details.`);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: `${car.year} ${car.brand} ${car.model}`, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const specs = [
    { icon: <Calendar size={14} />, label: 'Year', value: String(car.year) },
    { icon: <Gauge size={14} />, label: 'Mileage', value: `${car.mileage.toLocaleString('en-US')} km` },
    { icon: <Settings size={14} />, label: 'Engine', value: car.engine },
    { icon: <Settings size={14} />, label: 'Transmission', value: car.transmission },
    { icon: <Navigation size={14} />, label: 'Drive', value: car.drive },
    { icon: <Palette size={14} />, label: 'Color', value: car.color },
    { icon: <Globe size={14} />, label: 'Origin', value: car.origin },
    { icon: <MapPin size={14} />, label: 'Location', value: car.location },
    ...(car.auctionGrade ? [{ icon: <Award size={14} />, label: 'Auction Grade', value: car.auctionGrade }] : []),
    ...(car.chassisCode ? [{ icon: <Hash size={14} />, label: 'Chassis Code', value: car.chassisCode }] : []),
  ];

  // Similar cars — same brand, exclude current
  const similar = allCars
    .filter((c) => c.brand === car.brand && c.id !== car.id && c.status !== 'Sold')
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-obsidian">
      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
          >
            {/* Lightbox header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
              <span className="text-white/50 text-sm font-heading uppercase tracking-widest">
                {car.year} {car.brand} {car.model}
              </span>
              <div className="flex items-center gap-4">
                <span className="text-white/35 text-sm font-body tabular-nums">
                  {activeIdx + 1} / {car.images.length}
                </span>
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="w-9 h-9 flex items-center justify-center border border-white/15 text-white/60 hover:text-white hover:border-white/40 transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Main lightbox image */}
            <div className="flex-1 relative flex items-center justify-center px-16 py-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full max-w-5xl max-h-[70vh]"
                >
                  <Image
                    src={car.images[activeIdx]}
                    alt={`${car.year} ${car.brand} ${car.model} — photo ${activeIdx + 1}`}
                    fill
                    sizes="90vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Lightbox arrows */}
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/8 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={20} className="text-white" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/8 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={20} className="text-white" />
              </button>
            </div>

            {/* Lightbox thumbnail strip */}
            <div className="border-t border-white/8 px-6 py-3 overflow-x-auto">
              <div className="flex gap-2 w-max">
                {car.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`relative shrink-0 w-16 h-11 overflow-hidden border-2 transition-colors ${
                      i === activeIdx ? 'border-japan-red' : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <Image src={src} alt={`Photo ${i + 1}`} fill sizes="64px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Page top padding ── */}
      <div className="pt-20">
        {/* Back nav */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <Link
            href={`/${locale}/inventory`}
            className="inline-flex items-center gap-2 text-white/35 hover:text-white text-xs font-heading font-bold uppercase tracking-[0.25em] transition-colors"
          >
            <ArrowLeft size={13} />
            Inventory
          </Link>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex flex-col xl:flex-row gap-8">

            {/* ── LEFT COLUMN ── */}
            <div className="flex-1 min-w-0">

              {/* ── Gallery ── */}
              <div className="relative">
                {/* Main image */}
                <div
                  className="relative aspect-[16/10] bg-black/40 overflow-hidden cursor-zoom-in group"
                  onClick={() => setLightboxOpen(true)}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIdx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={car.images[activeIdx]}
                        alt={`${car.year} ${car.brand} ${car.model} — photo ${activeIdx + 1}`}
                        fill
                        priority
                        sizes="(max-width: 1280px) 100vw, 70vw"
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Status overlay */}
                  {car.status === 'Sold' && (
                    <div className="absolute inset-0 bg-black/55 flex items-center justify-center z-10">
                      <span className="font-heading font-bold text-white/60 text-2xl uppercase tracking-[0.3em] border border-white/30 px-8 py-3 rotate-[-12deg]">
                        Sold
                      </span>
                    </div>
                  )}
                  {car.status === 'Reserved' && (
                    <div className="absolute top-4 left-4 bg-amber-500/90 text-black font-heading font-bold text-[11px] uppercase tracking-widest px-3 py-1.5 z-10">
                      Reserved
                    </div>
                  )}

                  {/* Gallery controls */}
                  {car.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); prev(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 border border-white/10 flex items-center justify-center transition-colors z-10"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft size={18} className="text-white" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); next(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 border border-white/10 flex items-center justify-center transition-colors z-10"
                        aria-label="Next photo"
                      >
                        <ChevronRight size={18} className="text-white" />
                      </button>
                    </>
                  )}

                  {/* Photo count + expand */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
                    <div className="flex items-center gap-1.5 bg-black/70 text-white/70 text-xs font-heading px-3 py-1.5 tracking-wider">
                      <Eye size={11} />
                      {car.images.length} Photos
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/70 text-white/70 text-xs font-heading px-3 py-1.5 tracking-wider">
                      <Maximize2 size={11} />
                      Expand
                    </div>
                  </div>

                  {/* Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white/60 text-xs font-heading px-2.5 py-1.5 tracking-wider z-10">
                    {activeIdx + 1} / {car.images.length}
                  </div>
                </div>

                {/* Thumbnail grid */}
                {car.images.length > 1 && (
                  <div className="mt-2 grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5">
                    {car.images.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIdx(i)}
                        className={`relative aspect-[4/3] overflow-hidden border-2 transition-all duration-150 ${
                          i === activeIdx
                            ? 'border-japan-red opacity-100'
                            : 'border-transparent opacity-55 hover:opacity-90 hover:border-white/30'
                        }`}
                      >
                        <Image src={src} alt={`Photo ${i + 1}`} fill sizes="80px" className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Title + Badges ── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-8"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-heading font-bold uppercase tracking-wider border px-2.5 py-1 ${statusStyles[car.status]}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusDot[car.status]}`} />
                    {car.status}
                  </span>
                  <span className="inline-flex items-center text-[11px] font-heading font-bold uppercase tracking-wider border px-2.5 py-1 bg-teal-500/10 text-teal-400 border-teal-500/20">
                    {steeringLabel}
                  </span>
                  <span className="inline-flex items-center text-[11px] font-heading font-bold uppercase tracking-wider border px-2.5 py-1 bg-blue-500/10 text-blue-400 border-blue-500/20">
                    {importLabel}
                  </span>
                  {car.auctionGrade && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-heading font-bold uppercase tracking-wider border px-2.5 py-1 bg-yellow-500/10 text-yellow-400/80 border-yellow-500/20">
                      <Award size={10} />
                      Grade {car.auctionGrade}
                    </span>
                  )}
                </div>

                <div className="text-japan-red text-[10px] font-heading font-bold uppercase tracking-[0.4em] mb-1">
                  {car.brand}
                </div>
                <h1 className="font-heading font-bold text-white text-2xl md:text-4xl leading-tight">
                  {car.year} {car.brand} {car.model}
                </h1>

                {/* Quick stats bar */}
                <div className="mt-4 flex flex-wrap gap-5 py-4 border-t border-b border-white/8">
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <Calendar size={13} className="text-white/25" />
                    <span className="font-body">{car.year}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <Gauge size={13} className="text-white/25" />
                    <span className="font-body">{car.mileage.toLocaleString('en-US')} km</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <Palette size={13} className="text-white/25" />
                    <span className="font-body">{car.color}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <Settings size={13} className="text-white/25" />
                    <span className="font-body">{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <MapPin size={13} className="text-white/25" />
                    <span className="font-body">{car.location}</span>
                  </div>
                </div>
              </motion.div>

              {/* ── Description ── */}
              {car.description && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="mt-8 bg-[#0e0e0e] border border-white/8 p-6"
                >
                  <div className="font-heading font-bold text-xs uppercase tracking-[0.3em] text-white/35 mb-4">
                    About This Vehicle
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed font-body">{car.description}</p>
                </motion.div>
              )}

              {/* ── Specifications ── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-6 bg-[#0e0e0e] border border-white/8"
              >
                <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between">
                  <span className="font-heading font-bold text-xs uppercase tracking-[0.3em] text-white/50">
                    Specifications
                  </span>
                  <span className="text-[10px] text-white/20 font-heading uppercase tracking-wider">{specs.length} fields</span>
                </div>
                <div className="px-6 py-2 grid sm:grid-cols-2 gap-x-10">
                  {specs.map((s) => (
                    <SpecItem key={s.label} icon={s.icon} label={s.label} value={s.value} />
                  ))}
                </div>
              </motion.div>

              {/* ── Import process info ── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="mt-6 bg-[#0e0e0e] border border-white/8 p-6"
              >
                <div className="font-heading font-bold text-xs uppercase tracking-[0.3em] text-white/35 mb-5">
                  Import Process
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { step: '01', title: 'Reserve', desc: `Secure with $${car.depositAmount?.toLocaleString('en-US')} deposit` },
                    { step: '02', title: 'Export', desc: 'We handle all Japan/Korea export paperwork' },
                    { step: '03', title: 'Ship', desc: '3–6 weeks ocean freight to your port' },
                    { step: '04', title: 'Deliver', desc: 'Clear customs, registered to your name' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3 p-4 bg-white/[0.02] border border-white/6">
                      <span className="text-japan-red font-heading font-bold text-xs tracking-widest shrink-0">{item.step}</span>
                      <div>
                        <div className="text-white text-sm font-heading font-bold uppercase tracking-wider mb-1">{item.title}</div>
                        <div className="text-white/40 text-xs font-body leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* ── Contact row ── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-6 flex flex-col sm:flex-row gap-3"
              >
                <a
                  href="tel:+971503240800"
                  className="flex-1 flex items-center justify-center gap-2.5 border border-white/12 text-white/55 hover:border-white/30 hover:text-white py-3.5 text-sm font-heading uppercase tracking-widest transition-colors"
                >
                  <Phone size={14} />
                  +971 50 324 0800
                </a>
                <a
                  href="mailto:info@ajrline.com"
                  className="flex-1 flex items-center justify-center gap-2.5 border border-white/12 text-white/55 hover:border-white/30 hover:text-white py-3.5 text-sm font-heading uppercase tracking-widest transition-colors"
                >
                  <Mail size={14} />
                  info@ajrline.com
                </a>
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2.5 border border-white/12 text-white/55 hover:border-white/30 hover:text-white py-3.5 text-sm font-heading uppercase tracking-widest transition-colors"
                >
                  {copied ? <CheckCircle size={14} className="text-emerald-400" /> : <Share2 size={14} />}
                  {copied ? 'Copied!' : 'Share'}
                </button>
              </motion.div>
            </div>

            {/* ── RIGHT COLUMN — sticky price card ── */}
            <div className="xl:w-[380px] shrink-0 self-start xl:sticky xl:top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Price card */}
                <div className="bg-[#0d0d0d] border border-white/10">
                  {/* Price header */}
                  <div className="p-6 bg-gradient-to-br from-japan-red/8 via-transparent to-transparent border-b border-white/8">
                    <div className="text-white/35 text-[10px] font-heading uppercase tracking-[0.4em] mb-2">
                      Price (USD)
                    </div>
                    <div className="font-heading font-bold text-white text-4xl tracking-tight">
                      ${car.price.toLocaleString('en-US')}
                    </div>
                    {car.priceJpy && (
                      <div className="text-white/30 text-sm font-body mt-1.5">
                        ¥{car.priceJpy.toLocaleString('en-US')} JPY
                      </div>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-heading font-bold uppercase tracking-wider border px-2.5 py-1 ${statusStyles[car.status]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusDot[car.status]}`} />
                        {car.status}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-heading font-bold uppercase tracking-wider border px-2.5 py-1 bg-white/5 text-white/40 border-white/10">
                        <MapPin size={9} />
                        {car.location}
                      </span>
                    </div>
                  </div>

                  {/* CTA buttons */}
                  <div className="p-5 space-y-2.5">
                    {/* Reserve */}
                    <a
                      href={waReserve}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2.5 bg-japan-red hover:bg-red-700 text-white font-heading font-bold uppercase tracking-widest text-sm py-4 transition-colors group relative overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                      <Zap size={15} className="relative z-10" />
                      <span className="relative z-10">Reserve — ${car.depositAmount?.toLocaleString('en-US')} Deposit</span>
                    </a>

                    {/* WhatsApp Inquiry */}
                    <a
                      href={waInquiry}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1db954] text-white font-heading font-bold uppercase tracking-widest text-sm py-3.5 transition-colors"
                    >
                      <MessageCircle size={15} />
                      WhatsApp Inquiry
                    </a>

                    {/* Video walkaround */}
                    <a
                      href={waVideo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 border border-white/15 text-white/65 hover:border-japan-red/60 hover:text-white font-heading font-bold uppercase tracking-widest text-xs py-3 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                      </svg>
                      Request Video Walkaround
                    </a>

                    {/* Pay in full */}
                    <a
                      href={waFull}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 border border-white/10 text-white/35 hover:border-white/25 hover:text-white/65 font-heading font-bold uppercase tracking-widest text-xs py-3 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>
                      </svg>
                      Pay in Full — Wire Transfer
                    </a>
                  </div>

                  {/* Trust badges */}
                  <div className="border-t border-white/6 px-5 py-4 space-y-2.5">
                    {[
                      '🔒 Secure payment — Wire Transfer',
                      '📋 Full export documentation included',
                      '🚢 Ocean freight arranged worldwide',
                      '✅ Auction inspection report available',
                    ].map((item) => (
                      <div key={item} className="text-[12px] text-white/35 font-body flex items-center gap-2">
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick spec snapshot card */}
                <div className="mt-4 bg-[#0d0d0d] border border-white/8 p-5">
                  <div className="font-heading font-bold text-[10px] uppercase tracking-[0.35em] text-white/30 mb-4">
                    Quick Specs
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Engine', value: car.engine },
                      { label: 'Trans.', value: car.transmission },
                      { label: 'Drive', value: car.drive },
                      { label: 'Grade', value: car.auctionGrade || 'N/A' },
                      { label: 'Origin', value: car.origin },
                      { label: 'Steering', value: steeringLabel },
                    ].map((item) => (
                      <div key={item.label} className="bg-white/[0.025] border border-white/6 px-3 py-2.5">
                        <div className="text-white/25 text-[9px] font-heading uppercase tracking-[0.3em] mb-1">{item.label}</div>
                        <div className="text-white text-xs font-body font-medium truncate">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deposit note */}
                {car.depositAmount && (
                  <div className="mt-3 border border-japan-red/15 bg-japan-red/4 px-4 py-3">
                    <div className="text-[11px] text-white/40 font-body leading-relaxed">
                      <span className="text-japan-red font-heading font-bold">Reserve for ${car.depositAmount.toLocaleString('en-US')}</span>
                      {' '}— balance due on arrival. First come first served.
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* ── Similar Vehicles ── */}
          {similar.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-japan-red text-[10px] font-heading font-bold uppercase tracking-[0.4em] mb-1">
                    More {car.brand}
                  </div>
                  <h2 className="font-heading font-bold text-white text-xl uppercase tracking-tight">
                    Similar Vehicles
                  </h2>
                </div>
                <Link
                  href={`/${locale}/inventory`}
                  className="text-xs font-heading font-bold uppercase tracking-widest text-white/35 hover:text-white border border-white/10 hover:border-white/30 px-4 py-2 transition-colors"
                >
                  View All
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {similar.map((c, i) => {
                  const waMsg2 = encodeURIComponent(`Hi, I'm interested in the ${c.year} ${c.brand} ${c.model} — $${c.price.toLocaleString('en-US')}`);
                  return (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.45 + i * 0.06 }}
                      className="bg-[#0e0e0e] border border-white/8 hover:border-white/18 transition-colors group overflow-hidden"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-black/30">
                        <Image
                          src={c.images[0]}
                          alt={`${c.year} ${c.brand} ${c.model}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className={`absolute top-2.5 left-2.5 inline-flex items-center gap-1 text-[10px] font-heading font-bold uppercase tracking-wider border px-2 py-0.5 ${statusStyles[c.status]}`}>
                          <span className={`w-1 h-1 rounded-full ${statusDot[c.status]}`} />
                          {c.status}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-heading font-bold text-white text-sm leading-snug mb-1 group-hover:text-japan-red transition-colors">
                          {c.year} {c.brand} {c.model}
                        </h3>
                        <div className="text-white font-heading font-bold text-base mb-3">
                          ${c.price.toLocaleString('en-US')}
                        </div>
                        <div className="flex gap-2">
                          <Link
                            href={`/${locale}/inventory/${c.id}`}
                            className="flex-1 text-center text-[11px] font-heading font-bold uppercase tracking-wider bg-japan-red hover:bg-red-700 text-white py-2 transition-colors"
                          >
                            Details
                          </Link>
                          <a
                            href={`https://wa.me/971503240800?text=${waMsg2}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-9 border border-white/15 text-white/50 hover:border-japan-red hover:text-white transition-colors"
                          >
                            <MessageCircle size={13} />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </div>
  );
}
