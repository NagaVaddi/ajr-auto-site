'use client';

import { motion } from 'framer-motion';

const stats = [
  { number: '10', label: 'Vehicles in catalog', suffix: '+' },
  { number: '5', label: 'Premium brands', suffix: '' },
  { number: '100%', label: 'Direct from Japan & Korea', suffix: '' },
  { number: '24h', label: 'Response time', suffix: '' },
];

export default function StatsBar() {
  return (
    <section className="bg-black border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="py-8 px-6 border-r border-white/10 last:border-r-0 odd:border-b md:odd:border-b-0 border-b md:border-b-0"
            >
              <div className="font-heading font-bold text-4xl md:text-5xl text-white mb-1">
                {s.number}<span className="text-japan-red">{s.suffix}</span>
              </div>
              <div className="text-white/40 text-xs font-heading uppercase tracking-widest">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
