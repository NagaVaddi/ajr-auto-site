'use client';

import { motion } from 'framer-motion';

const features = [
  {
    icon: '🏆',
    title: 'Direct Source',
    desc: 'Cars sourced directly from Japanese and Korean dealer auctions — no middlemen, authentic pricing.',
  },
  {
    icon: '🔍',
    title: 'Fully Inspected',
    desc: 'Every vehicle comes with auction grade reports, full specs, and photos taken at the yard.',
  },
  {
    icon: '💵',
    title: 'All-In USD Price',
    desc: 'Price includes the car, shipping, insurance, and customs clearance. No hidden fees.',
  },
  {
    icon: '🚢',
    title: 'Worldwide Delivery',
    desc: 'Container shipping to any country with a seaport. 30–45 days transit time.',
  },
  {
    icon: '🤝',
    title: '5% Deposit Reserve',
    desc: 'Secure your vehicle with a 5–10% deposit. Fully refundable if the car isn\'t as described.',
  },
  {
    icon: '💬',
    title: '24h Support',
    desc: 'Direct WhatsApp line for fast answers — inquiries, quotes, shipping status, all in one place.',
  },
];

export default function WhyUsSection() {
  return (
    <section className="bg-obsidian py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="text-japan-red text-xs font-heading font-bold uppercase tracking-[0.4em] mb-2">Why AJR Auto Cars</div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white uppercase tracking-tight max-w-lg">
            Why buyers choose us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-black border border-white/10 p-6 hover:border-white/20 transition-colors"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-heading font-bold text-white uppercase tracking-wider text-sm mb-2">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
