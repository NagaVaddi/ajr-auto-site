'use client';

import { Suspense, useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import CarCard from '@/components/CarCard';
import { Car } from '@/types';

const brands = ['Ferrari', 'Porsche', 'Toyota', 'Hyundai', 'Kia', 'BMW', 'Lexus', 'Mercedes-Benz'];
const transmissionOptions = ['All', 'Automatic', 'Manual', 'PDK', 'DCT'];
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'cheapest', label: 'Lowest Price' },
  { value: 'expensive', label: 'Highest Price' },
];

function CatalogContent() {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const [brand, setBrand] = useState(searchParams.get('brand') || '');
  const [priceMin, setPriceMin] = useState(searchParams.get('priceMin') || '');
  const [priceMax, setPriceMax] = useState(searchParams.get('priceMax') || '');
  const [origin, setOrigin] = useState<'' | 'Japan' | 'Korea'>(
    (searchParams.get('origin') as '' | 'Japan' | 'Korea') || ''
  );
  const [transmission, setTransmission] = useState('');
  const [sort, setSort] = useState('newest');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const loadCars = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cars');
      const data: Car[] = await res.json();

      let filtered = data;
      if (brand) filtered = filtered.filter((c) => c.brand === brand);
      if (origin) filtered = filtered.filter((c) => c.origin === origin);
      if (priceMin) filtered = filtered.filter((c) => c.price >= Number(priceMin));
      if (priceMax) filtered = filtered.filter((c) => c.price <= Number(priceMax));
      if (transmission && transmission !== 'All')
        filtered = filtered.filter((c) =>
          c.transmission.toLowerCase().includes(transmission.toLowerCase())
        );

      if (sort === 'cheapest') filtered.sort((a, b) => a.price - b.price);
      else if (sort === 'expensive') filtered.sort((a, b) => b.price - a.price);
      else filtered.sort((a, b) => b.year - a.year);

      setCars(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [brand, origin, priceMin, priceMax, transmission, sort]);

  useEffect(() => {
    loadCars();
  }, [loadCars]);

  const handleReset = () => {
    setBrand('');
    setPriceMin('');
    setPriceMax('');
    setOrigin('');
    setTransmission('');
    setSort('newest');
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-[#0A2540] mb-2">
        Japan &amp; Korea Import Cars
      </h1>
      <p className="text-gray-600 mb-8">{cars.length} vehicles available</p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile filter toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-medium w-full justify-center"
          >
            <SlidersHorizontal size={16} />
            {filtersOpen ? 'Hide Filters' : 'Filters'}
          </button>
        </div>

        {/* Sidebar Filters */}
        <aside className={`${filtersOpen ? 'block' : 'hidden'} lg:block w-full lg:w-72 shrink-0`}>
          <div className="bg-white rounded-2xl shadow p-6 sticky top-20">
            <h2 className="font-bold text-[#0A2540] text-lg mb-5">Filters</h2>

            {/* Origin */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Origin
              </label>
              <div className="flex gap-2">
                {(['', 'Japan', 'Korea'] as const).map((o) => (
                  <button
                    key={o || 'all'}
                    onClick={() => setOrigin(o)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                      origin === o
                        ? 'bg-[#0A2540] text-white border-[#0A2540]'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#0A2540]'
                    }`}
                  >
                    {o === '' ? 'All' : o}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Brand
              </label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2540]"
              >
                <option value="">All Brands</option>
                {brands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Price (USD)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2540]"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2540]"
                />
              </div>
            </div>

            {/* Transmission */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Transmission
              </label>
              <div className="flex flex-wrap gap-2">
                {transmissionOptions.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTransmission(t === 'All' ? '' : t)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                      (t === 'All' && !transmission) || transmission === t
                        ? 'bg-[#0A2540] text-white border-[#0A2540]'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#0A2540]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full text-sm text-gray-500 hover:text-[#E53E3E] transition-colors py-2"
            >
              Clear Filters
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6 bg-white rounded-xl shadow px-4 py-3">
            <span className="text-sm text-gray-600">
              <span className="font-semibold text-[#0A2540]">{cars.length}</span> vehicles
            </span>
            <div className="flex items-center gap-2">
              <ArrowUpDown size={14} className="text-gray-400" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm border-0 focus:outline-none text-gray-700 font-medium cursor-pointer"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow animate-pulse h-80" />
              ))}
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg mb-4">No vehicles match your filters</p>
              <button
                onClick={handleReset}
                className="bg-[#E53E3E] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#c53030] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow animate-pulse h-80" />
            ))}
          </div>
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
