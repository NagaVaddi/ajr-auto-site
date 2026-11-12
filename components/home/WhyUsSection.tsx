'use client';

import { motion } from 'framer-motion';

const features = [
  {
    num: '01',
    icon: '🏆',
    title: 'Direct Source',
    desc: 'Cars sourced directly from Japanese and Korean dealer auctions — no middlemen, authentic pricing.',
  },
  {
    num: '02',
    icon: '🔍',
    title: 'Fully Inspected',
    desc: 'Every vehicle comes with auction grade reports, full specs, and photos taken at the yard.',
  },
  {
    num: '03',
    icon: '💵',
    title: 'All-In USD Price',
    desc: 'Price includes the car, shipping, insurance, and customs clearance. No hidden fees.',
  },
  {
    num: '04',
    icon: '🚢',
    title: 'Worldwide Delivery',
    desc: 'Container shipping to any country with a seaport. 30–45 days transit time.',
  },
  {
    num: '05',
    icon: '🤝',
    title: '5% Deposit Reserve',
    desc: "Secure your vehicle with a 5–10% deposit. Fully refundable if the car isn't as described.",
  },
  {
    num: '06',
    icon: '💬',
    title: '24h Support',
    desc: 'Direct WhatsApp line for fast answers — inquiries, quotes, shipping status, all in one place.',
  },
];

export default function WhyUsSection() {
  return (
    <section className="bg-obsidian py-24 relative overflow-hidden">
      {/* Accent */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-japan-red/4 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="text-japan-red text-xs font-heading font-bold uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-japan-red" />
            Why AJR Auto Cars
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white uppercase tracking-tight max-w-lg">
            Why buyers choose us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24, y: 16 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              whileHover={{ y: -4 }}
              className="group relative bg-black border border-white/10 hover:border-japan-red/35 p-6 transition-all duration-300 overflow-hidden"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(230,0,18,0.08) 0%, transparent 70%)' }} />

              <div className="flex items-start justify-between mb-4">
                <span className="text-2xl">{f.icon}</span>
                <span className="font-heading font-bold text-4xl text-white/6 leading-none group-hover:text-japan-red/15 transition-colors duration-300">
                  {f.num}
                </span>
              </div>
              <h3 className="font-heading font-bold text-white uppercase tracking-wider text-sm mb-2 group-hover:text-japan-red transition-colors duration-200">
                {f.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-japan-red scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
