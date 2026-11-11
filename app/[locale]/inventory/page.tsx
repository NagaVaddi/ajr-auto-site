'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import VehicleCard from '@/components/inventory/VehicleCard';
import { carsData } from '@/lib/data/cars';
import { motion } from 'framer-motion';

const brands = ['Ferrari', 'Porsche', 'Hyundai', 'Kia'];

export default function InventoryPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('inventory');

  const [origin, setOrigin] = useState<'' | 'Japan' | 'Korea'>('');
  const [brand, setBrand] = useState('');
  const [status, setStatus] = useState<'' | 'Available' | 'Reserved' | 'Sold'>('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sort, setSort] = useState('newest');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let cars = [...carsData];
    if (origin) cars = cars.filter((c) => c.origin === origin);
    if (brand) cars = cars.filter((c) => c.brand === brand);
    if (status) cars = cars.filter((c) => c.status === status);
    if (priceMin) cars = cars.filter((c) => c.price >= Number(priceMin));
    if (priceMax) cars = cars.filter((c) => c.price <= Number(priceMax));
    if (sort === 'cheapest') cars.sort((a, b) => a.price - b.price);
    else if (sort === 'expensive') cars.sort((a, b) => b.price - a.price);
    else cars.sort((a, b) => b.year - a.year);
    return cars;
  }, [origin, brand, status, priceMin, priceMax, sort]);

  const reset = () => {
    setOrigin('');
    setBrand('');
    setStatus('');
    setPriceMin('');
    setPriceMax('');
    setSort('newest');
  };

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      <div className="bg-black border-b border-white/10 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-japan-red text-xs font-heading font-bold uppercase tracking-[0.4em] mb-3">Stock</div>
          <h1 className="font-heading font-bold text-4xl md:text-6xl xl:text-7xl uppercase tracking-tight text-white">
            {t('title')} <span className="text-japan-red">{t('titleAccent')}</span>
          </h1>
          <p className="text-white/40 mt-3 text-sm">{t('count', { count: filtered.length })}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:hidden">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 border border-white/20 text-white text-sm font-heading font-bold uppercase tracking-widest px-5 py-3 w-full justify-center hover:border-japan-red transition-colors"
            >
              <SlidersHorizontal size={16} />
              {filtersOpen ? 'Hide Filters' : 'Filters'}
            </button>
          </div>

          <aside className={`${filtersOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 shrink-0`}>
            <div className="bg-black border border-white/10 p-6 space-y-6 sticky top-24">
              <div>
                <div className="text-white/30 text-[10px] font-heading font-bold uppercase tracking-[0.3em] mb-3">{t('filters.origin')}</div>
                <div className="flex gap-2">
                  {(['', 'Japan', 'Korea'] as const).map((o) => (
                    <button
                      key={o || 'all'}
                      onClick={() => setOrigin(o)}
                      className={`flex-1 py-2 text-xs font-heading font-bold uppercase tracking-widest border transition-colors ${
                        origin === o
                          ? 'bg-japan-red border-japan-red text-white'
                          : 'bg-transparent border-white/20 text-white/60 hover:border-white/50'
                      }`}
                    >
                      {o || t('filters.all')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-white/30 text-[10px] font-heading font-bold uppercase tracking-[0.3em] mb-3">{t('filters.brand')}</div>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm py-2.5 px-3 focus:outline-none focus:border-japan-red"
                >
                  <option value="">{t('filters.allBrands')}</option>
                  {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div>
                <div className="text-white/30 text-[10px] font-heading font-bold uppercase tracking-[0.3em] mb-3">{t('filters.status')}</div>
                <div className="space-y-2">
                  {(['', 'Available', 'Reserved', 'Sold'] as const).map((s) => (
                    <button
                      key={s || 'all'}
                      onClick={() => setStatus(s)}
                      className={`w-full py-2 text-xs font-heading font-bold uppercase tracking-widest border text-left px-3 transition-colors ${
                        status === s
                          ? 'bg-japan-red border-japan-red text-white'
                          : 'bg-transparent border-white/10 text-white/60 hover:border-white/30'
                      }`}
                    >
                      {s || t('filters.all')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-white/30 text-[10px] font-heading font-bold uppercase tracking-[0.3em] mb-3">{t('filters.priceUsd')}</div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder={t('filters.minPrice')}
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-sm py-2 px-3 focus:outline-none focus:border-japan-red placeholder:text-white/20"
                  />
                  <input
                    type="number"
                    placeholder={t('filters.maxPrice')}
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-sm py-2 px-3 focus:outline-none focus:border-japan-red placeholder:text-white/20"
                  />
                </div>
              </div>

              <button
                onClick={reset}
                className="w-full text-xs text-white/30 hover:text-japan-red font-heading uppercase tracking-widest transition-colors py-2"
              >
                {t('filters.clearFilters')}
              </button>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6 bg-black border border-white/10 px-5 py-3">
              <span className="text-white/40 text-xs font-heading uppercase tracking-widest">
                <span className="text-white font-bold">{filtered.length}</span> vehicles
              </span>
              <div className="flex items-center gap-2">
                <ArrowUpDown size={12} className="text-white/30" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-transparent text-white/60 text-xs font-heading uppercase tracking-widest border-0 focus:outline-none cursor-pointer"
                >
                  <option value="newest" className="bg-black">{t('sort.newest')}</option>
                  <option value="cheapest" className="bg-black">{t('sort.cheapest')}</option>
                  <option value="expensive" className="bg-black">{t('sort.expensive')}</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24 text-white/40">
                <p className="font-heading text-xl uppercase tracking-wider mb-4">{t('noResults')}</p>
                <p className="text-sm">{t('clearToSeeAll')}</p>
                <button
                  onClick={reset}
                  className="mt-6 bg-japan-red text-white font-heading font-bold uppercase tracking-widest px-8 py-3 hover:bg-red-700 transition-colors text-sm"
                >
                  {t('filters.clearFilters')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((car, i) => (
                  <VehicleCard key={car.id} car={car} locale={locale} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
