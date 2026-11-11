'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  MessageCircle,
  ArrowRight,
  MapPin,
  Gauge,
  Calendar,
  Palette,
  SlidersHorizontal,
  ArrowUpDown,
} from 'lucide-react';
import { carsData } from '@/lib/data/cars';

type SortKey = 'newest' | 'cheapest' | 'expensive';

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

function AccordionSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/8">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-white hover:bg-white/3 transition-colors"
      >
        <span className="font-heading font-bold text-xs uppercase tracking-[0.2em]">{title}</span>
        <ChevronDown
          size={14}
          className={`text-white/40 transition-transform duration-200 ${open ? '' : '-rotate-90'}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function InventoryPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('inventory');

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [yearMin, setYearMin] = useState('');
  const [yearMax, setYearMax] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [mileageMax, setMileageMax] = useState('');
  const [sort, setSort] = useState<SortKey>('newest');
  const [brandOpen, setBrandOpen] = useState(true);
  const [yearOpen, setYearOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [mileageOpen, setMileageOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    carsData.forEach((c) => {
      counts[c.brand] = (counts[c.brand] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, []);

  const filtered = useMemo(() => {
    let cars = [...carsData];
    if (selectedBrands.length) cars = cars.filter((c) => selectedBrands.includes(c.brand));
    if (yearMin) cars = cars.filter((c) => c.year >= Number(yearMin));
    if (yearMax) cars = cars.filter((c) => c.year <= Number(yearMax));
    if (priceMin) cars = cars.filter((c) => c.price >= Number(priceMin));
    if (priceMax) cars = cars.filter((c) => c.price <= Number(priceMax));
    if (mileageMax) cars = cars.filter((c) => c.mileage <= Number(mileageMax));
    if (sort === 'cheapest') cars.sort((a, b) => a.price - b.price);
    else if (sort === 'expensive') cars.sort((a, b) => b.price - a.price);
    else cars.sort((a, b) => b.year - a.year);
    return cars;
  }, [selectedBrands, yearMin, yearMax, priceMin, priceMax, mileageMax, sort]);

  const hasFilters =
    selectedBrands.length > 0 || yearMin || yearMax || priceMin || priceMax || mileageMax;

  const reset = () => {
    setSelectedBrands([]);
    setYearMin('');
    setYearMax('');
    setPriceMin('');
    setPriceMax('');
    setMileageMax('');
    setSort('newest');
  };

  const toggleBrand = (brand: string) =>
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );

  const inputCls =
    'w-full bg-black/40 border border-white/12 text-white text-sm py-2 px-3 focus:outline-none focus:border-japan-red placeholder:text-white/20';

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      {/* Header */}
      <div className="bg-black border-b border-white/10 py-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-japan-red text-[10px] font-heading font-bold uppercase tracking-[0.4em] mb-2">
            Stock
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end gap-2 justify-between">
            <h1 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-white">
              {t('title')} <span className="text-japan-red">{t('titleAccent')}</span>
            </h1>
            <p className="text-white/40 text-sm font-heading">
              <span className="text-white font-bold text-xl">{filtered.length}</span> vehicles
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-7">
          {/* ── Desktop Sidebar ── */}
          <aside className="hidden lg:block w-[280px] shrink-0 self-start sticky top-24">
            <div className="bg-[#0e0e0e] border border-white/8">
              {/* Sidebar header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                <span className="text-white font-heading font-bold text-xs uppercase tracking-[0.25em]">
                  Filters
                </span>
                {hasFilters && (
                  <button
                    onClick={reset}
                    className="text-[11px] text-japan-red hover:text-red-400 font-heading uppercase tracking-wider transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Brand */}
              <AccordionSection title="Brand" open={brandOpen} onToggle={() => setBrandOpen(!brandOpen)}>
                <div className="px-3 pb-4 max-h-52 overflow-y-auto space-y-0.5 scrollbar-thin">
                  {brandCounts.map(([brand, count]) => (
                    <label
                      key={brand}
                      className="flex items-center justify-between gap-3 py-1.5 px-2 cursor-pointer hover:bg-white/4 rounded transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 border shrink-0 flex items-center justify-center transition-colors ${
                            selectedBrands.includes(brand)
                              ? 'bg-japan-red border-japan-red'
                              : 'border-white/25 hover:border-white/50'
                          }`}
                        >
                          {selectedBrands.includes(brand) && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path
                                d="M1 4L3.5 6.5L9 1"
                                stroke="white"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`text-sm font-body transition-colors ${
                            selectedBrands.includes(brand) ? 'text-white' : 'text-white/65'
                          }`}
                        >
                          {brand}
                        </span>
                      </div>
                      <span className="text-xs text-white/25 font-body tabular-nums">{count}</span>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                      />
                    </label>
                  ))}
                </div>
              </AccordionSection>

              {/* Year */}
              <AccordionSection title="Year" open={yearOpen} onToggle={() => setYearOpen(!yearOpen)}>
                <div className="px-4 pb-4 flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="1990"
                    value={yearMin}
                    onChange={(e) => setYearMin(e.target.value)}
                    className={inputCls}
                  />
                  <span className="text-white/25 text-sm shrink-0">—</span>
                  <input
                    type="number"
                    placeholder="2024"
                    value={yearMax}
                    onChange={(e) => setYearMax(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </AccordionSection>

              {/* Price */}
              <AccordionSection
                title="Price USD"
                open={priceOpen}
                onToggle={() => setPriceOpen(!priceOpen)}
              >
                <div className="px-4 pb-4 flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="$0"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className={inputCls}
                  />
                  <span className="text-white/25 text-sm shrink-0">—</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </AccordionSection>

              {/* Mileage */}
              <AccordionSection
                title="Mileage km up to"
                open={mileageOpen}
                onToggle={() => setMileageOpen(!mileageOpen)}
              >
                <div className="px-4 pb-4">
                  <input
                    type="number"
                    placeholder="e.g. 50 000"
                    value={mileageMax}
                    onChange={(e) => setMileageMax(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </AccordionSection>
            </div>
          </aside>

          {/* ── Main ── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center gap-3 mb-5">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center gap-2 border border-white/15 text-white/60 text-xs font-heading font-bold uppercase tracking-widest px-4 py-2.5 hover:border-japan-red hover:text-white transition-colors"
              >
                <SlidersHorizontal size={13} />
                Filters {hasFilters && `(${selectedBrands.length + (yearMin ? 1 : 0) + (priceMin || priceMax ? 1 : 0)})`}
              </button>
              <div className="flex items-center gap-2 ml-auto">
                <ArrowUpDown size={12} className="text-white/25 hidden sm:block" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="bg-[#0e0e0e] border border-white/12 text-white/60 text-xs font-heading uppercase tracking-widest px-3 py-2.5 focus:outline-none focus:border-japan-red cursor-pointer"
                >
                  <option value="newest" className="bg-black">{t('sort.newest')}</option>
                  <option value="cheapest" className="bg-black">{t('sort.cheapest')}</option>
                  <option value="expensive" className="bg-black">{t('sort.expensive')}</option>
                </select>
              </div>
            </div>

            {/* Mobile filters */}
            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="lg:hidden overflow-hidden mb-5"
                >
                  <div className="bg-[#0e0e0e] border border-white/8 p-5 space-y-4">
                    <div>
                      <div className="text-white/35 text-[10px] font-heading uppercase tracking-[0.3em] mb-3">Brand</div>
                      <div className="flex flex-wrap gap-2">
                        {brandCounts.map(([brand, count]) => (
                          <button
                            key={brand}
                            onClick={() => toggleBrand(brand)}
                            className={`text-xs font-heading px-3 py-1.5 border transition-colors ${
                              selectedBrands.includes(brand)
                                ? 'bg-japan-red border-japan-red text-white'
                                : 'border-white/15 text-white/55 hover:border-white/40'
                            }`}
                          >
                            {brand} <span className="opacity-50">{count}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-white/35 text-[10px] font-heading uppercase tracking-[0.3em] mb-2">Year</div>
                        <div className="flex gap-1">
                          <input type="number" placeholder="Min" value={yearMin} onChange={e => setYearMin(e.target.value)} className="w-full bg-black/40 border border-white/12 text-white text-xs py-2 px-2 focus:outline-none focus:border-japan-red placeholder:text-white/20" />
                          <input type="number" placeholder="Max" value={yearMax} onChange={e => setYearMax(e.target.value)} className="w-full bg-black/40 border border-white/12 text-white text-xs py-2 px-2 focus:outline-none focus:border-japan-red placeholder:text-white/20" />
                        </div>
                      </div>
                      <div>
                        <div className="text-white/35 text-[10px] font-heading uppercase tracking-[0.3em] mb-2">Price USD</div>
                        <div className="flex gap-1">
                          <input type="number" placeholder="Min" value={priceMin} onChange={e => setPriceMin(e.target.value)} className="w-full bg-black/40 border border-white/12 text-white text-xs py-2 px-2 focus:outline-none focus:border-japan-red placeholder:text-white/20" />
                          <input type="number" placeholder="Max" value={priceMax} onChange={e => setPriceMax(e.target.value)} className="w-full bg-black/40 border border-white/12 text-white text-xs py-2 px-2 focus:outline-none focus:border-japan-red placeholder:text-white/20" />
                        </div>
                      </div>
                    </div>
                    {hasFilters && (
                      <button onClick={reset} className="text-xs text-japan-red font-heading uppercase tracking-wider hover:text-red-400 transition-colors">
                        Clear all filters
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Vehicle list */}
            {filtered.length === 0 ? (
              <div className="text-center py-24 border border-white/8 bg-[#0e0e0e] text-white/40">
                <p className="font-heading text-xl uppercase tracking-wider mb-4">{t('noResults')}</p>
                <p className="text-sm mb-6">{t('clearToSeeAll')}</p>
                <button
                  onClick={reset}
                  className="bg-japan-red text-white font-heading font-bold uppercase tracking-widest px-8 py-3 hover:bg-red-700 transition-colors text-sm"
                >
                  {t('filters.clearFilters')}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((car, i) => {
                  const steeringLabel = car.origin === 'Japan' ? 'RHD' : 'LHD';
                  const importLabel = car.origin === 'Japan' ? 'Japan Import' : 'Korea Import';
                  const waMsg = encodeURIComponent(
                    `Hi, I'm interested in the ${car.year} ${car.brand} ${car.model} — $${car.price.toLocaleString('en-US')}`
                  );

                  return (
                    <motion.article
                      key={car.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.3) }}
                      className="bg-[#0e0e0e] border border-white/8 hover:border-white/18 transition-colors group overflow-hidden"
                    >
                      <div className="flex flex-col sm:flex-row">
                        {/* Image */}
                        <div className="relative sm:w-[42%] h-52 sm:h-auto min-h-[200px] shrink-0 overflow-hidden bg-black/30">
                          <Image
                            src={car.images[0]}
                            alt={`${car.year} ${car.brand} ${car.model}`}
                            fill
                            sizes="(max-width: 640px) 100vw, 42vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          {car.status === 'Sold' && (
                            <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                              <span className="font-heading font-bold text-white/50 text-xl uppercase tracking-[0.3em] border border-white/30 px-5 py-1.5 rotate-[-12deg]">
                                Sold
                              </span>
                            </div>
                          )}
                          {car.status === 'Reserved' && (
                            <div className="absolute top-3 left-3 bg-amber-500/90 text-black font-heading font-bold text-[10px] uppercase tracking-widest px-2.5 py-1">
                              Reserved
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 p-5 md:p-6 flex flex-col gap-3.5">
                          {/* Badges */}
                          <div className="flex flex-wrap gap-2">
                            <span
                              className={`inline-flex items-center gap-1.5 text-[11px] font-heading font-bold uppercase tracking-wider border px-2.5 py-1 ${statusStyles[car.status]}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${statusDot[car.status]}`} />
                              {car.status}
                            </span>
                            <span className="inline-flex items-center text-[11px] font-heading font-bold uppercase tracking-wider border px-2.5 py-1 bg-teal-500/10 text-teal-400/80 border-teal-500/20">
                              {steeringLabel}
                            </span>
                            <span className="inline-flex items-center text-[11px] font-heading font-bold uppercase tracking-wider border px-2.5 py-1 bg-blue-500/10 text-blue-400/80 border-blue-500/20">
                              {importLabel}
                            </span>
                          </div>

                          {/* Title */}
                          <div>
                            <h2 className="font-heading font-bold text-white text-lg md:text-xl leading-snug group-hover:text-japan-red transition-colors duration-200">
                              {car.year} {car.brand} {car.model}
                            </h2>
                          </div>

                          <div className="border-t border-white/6" />

                          {/* Price */}
                          <div className="flex items-baseline gap-3">
                            <span className="text-white font-heading font-bold text-2xl tracking-tight">
                              ${car.price.toLocaleString('en-US')}
                            </span>
                            {car.priceJpy && (
                              <span className="text-white/28 font-body text-sm">
                                ¥{car.priceJpy.toLocaleString('en-US')}
                              </span>
                            )}
                          </div>

                          {/* Meta */}
                          <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                            <span className="flex items-center gap-1.5 text-xs text-white/45 font-body">
                              <Calendar size={11} className="text-white/25 shrink-0" />
                              {car.year}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-white/45 font-body">
                              <Gauge size={11} className="text-white/25 shrink-0" />
                              {car.mileage.toLocaleString('en-US')} km
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-white/45 font-body">
                              <Palette size={11} className="text-white/25 shrink-0" />
                              {car.color}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-white/45 font-body">
                              <MapPin size={11} className="text-white/25 shrink-0" />
                              {car.location}
                            </span>
                          </div>

                          {/* Action buttons */}
                          <div className="flex flex-wrap gap-3 mt-auto pt-1">
                            <Link
                              href={`/${locale}/inventory/${car.id}`}
                              className="inline-flex items-center gap-2 bg-japan-red text-white font-heading font-bold uppercase tracking-widest text-xs px-5 py-2.5 hover:bg-red-700 transition-colors"
                            >
                              Details
                              <ArrowRight size={12} />
                            </Link>
                            <a
                              href={`https://wa.me/971503240800?text=${waMsg}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 border border-white/18 text-white/60 font-heading font-bold uppercase tracking-widest text-xs px-5 py-2.5 hover:border-japan-red hover:text-white transition-colors"
                            >
                              <MessageCircle size={12} />
                              Request Import
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
