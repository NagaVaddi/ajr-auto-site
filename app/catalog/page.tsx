'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import CarCard from '@/components/CarCard';
import { Car } from '@/types';

const brands = ['Toyota', 'Kia', 'Hyundai', 'BMW', 'Volkswagen', 'Mercedes-Benz'];
const transmissionOptions = ['Все', 'Автомат', 'Механика', 'Робот', 'Вариатор'];
const sortOptions = [
  { value: 'newest', label: 'Сначала новые' },
  { value: 'cheapest', label: 'Сначала дешевле' },
  { value: 'expensive', label: 'Сначала дороже' },
];

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [brand, setBrand] = useState(searchParams.get('brand') || '');
  const [priceMin, setPriceMin] = useState(searchParams.get('priceMin') || '');
  const [priceMax, setPriceMax] = useState(searchParams.get('priceMax') || '');
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
      if (priceMin) filtered = filtered.filter((c) => c.price >= Number(priceMin));
      if (priceMax) filtered = filtered.filter((c) => c.price <= Number(priceMax));
      if (transmission && transmission !== 'Все')
        filtered = filtered.filter((c) => c.transmission === transmission);

      if (sort === 'cheapest') filtered.sort((a, b) => a.price - b.price);
      else if (sort === 'expensive') filtered.sort((a, b) => b.price - a.price);
      else filtered.sort((a, b) => b.year - a.year);

      setCars(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [brand, priceMin, priceMax, transmission, sort]);

  useEffect(() => {
    loadCars();
  }, [loadCars]);

  const handleReset = () => {
    setBrand('');
    setPriceMin('');
    setPriceMax('');
    setTransmission('');
    setSort('newest');
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-[#0A2540] mb-2">
        Каталог автомобилей в наличии
      </h1>
      <p className="text-gray-600 mb-8">Найдено: {cars.length} автомобилей</p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile filter toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-medium w-full justify-center"
          >
            <SlidersHorizontal size={16} />
            {filtersOpen ? 'Скрыть фильтры' : 'Фильтры'}
          </button>
        </div>

        {/* Sidebar Filters */}
        <aside
          className={`${filtersOpen ? 'block' : 'hidden'} lg:block w-full lg:w-72 shrink-0`}
        >
          <div className="bg-white rounded-2xl shadow p-6 sticky top-20">
            <h2 className="font-bold text-[#0A2540] text-lg mb-5">Фильтры</h2>

            {/* Brand */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Марка
              </label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2540]"
              >
                <option value="">Все марки</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Price range */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Цена, ₽
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="от"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2540]"
                />
                <input
                  type="number"
                  placeholder="до"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2540]"
                />
              </div>
            </div>

            {/* Transmission */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Коробка передач
              </label>
              <div className="flex flex-wrap gap-2">
                {transmissionOptions.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTransmission(t === 'Все' ? '' : t)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                      (t === 'Все' && !transmission) || transmission === t
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
              Сбросить фильтры
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-6 bg-white rounded-xl shadow px-4 py-3">
            <span className="text-sm text-gray-600">
              <span className="font-semibold text-[#0A2540]">{cars.length}</span> автомобилей
            </span>
            <div className="flex items-center gap-2">
              <ArrowUpDown size={14} className="text-gray-400" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm border-0 focus:outline-none text-gray-700 font-medium cursor-pointer"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow animate-pulse h-80" />
              ))}
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg mb-4">Автомобили по заданным параметрам не найдены</p>
              <button
                onClick={handleReset}
                className="bg-[#E53E3E] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#c53030] transition-colors"
              >
                Сбросить фильтры
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
