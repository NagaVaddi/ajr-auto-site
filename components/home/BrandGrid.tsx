'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const brands = [
  { name: 'Porsche', count: 2, flag: '🇩🇪' },
  { name: 'Ferrari', count: 6, flag: '🇮🇹' },
  { name: 'Genesis', count: 1, flag: '🇰🇷' },
  { name: 'Kia', count: 1, flag: '🇰🇷' },
];

export default function BrandGrid({ locale }: { locale: string }) {
  return (
    <section className="bg-black border-y border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-japan-red text-xs font-heading font-bold uppercase tracking-[0.4em] mb-2">All brands in catalog</div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white uppercase tracking-tight">
            {brands.length} Brands Available
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={`/${locale}/inventory?brand=${brand.name}`}
                className="group flex items-center justify-between p-4 border border-white/10 hover:border-japan-red/50 hover:bg-japan-red/5 transition-all"
              >
                <div>
                  <span className="text-lg mr-2">{brand.flag}</span>
                  <span className="font-heading font-bold text-white text-sm uppercase tracking-wider">{brand.name}</span>
                </div>
                <span className="text-white/30 text-xs font-heading group-hover:text-japan-red transition-colors">{brand.count}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          href={`/${locale}/inventory`}
          className="inline-flex items-center gap-2 text-white/50 font-heading text-xs uppercase tracking-widest hover:text-white transition-colors group"
        >
          Browse all vehicles <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
