'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

const brands = ['Toyota', 'Kia', 'Hyundai', 'BMW', 'Volkswagen', 'Mercedes-Benz', 'Audi', 'Lexus'];
const transmissions = ['Автомат', 'Механика', 'Робот', 'Вариатор'];

export default function HeroSection() {
  const router = useRouter();
  const [brand, setBrand] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (brand) params.set('brand', brand);
    if (priceMin) params.set('priceMin', priceMin);
    if (priceMax) params.set('priceMax', priceMax);
    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <section
      className="relative min-h-[560px] flex items-center"
      style={{
        background: 'linear-gradient(135deg, #0A2540 0%, #1a3a5c 60%, #0A2540 100%)',
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Надёжные автомобили
            <span className="text-[#E53E3E]"> с гарантией</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            Купить авто с пробегом в Москве. Проверенные автомобили, юридическая чистота, выгодный
            кредит.
          </p>

          {/* Search Widget */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl shadow-2xl p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {/* Brand */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                Марка
              </label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0A2540]"
              >
                <option value="">Все марки</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Price from */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                Цена от, ₽
              </label>
              <input
                type="number"
                placeholder="500 000"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0A2540]"
              />
            </div>

            {/* Price to */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                Цена до, ₽
              </label>
              <input
                type="number"
                placeholder="5 000 000"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0A2540]"
              />
            </div>

            {/* Submit */}
            <div className="flex flex-col justify-end">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-[#E53E3E] hover:bg-[#c53030] text-white font-bold py-2.5 px-6 rounded-lg transition-colors duration-200 text-sm"
              >
                <Search size={16} />
                Найти
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
