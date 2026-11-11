'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const steps = [
  {
    num: '01',
    icon: '🔎',
    title: 'Browse & Choose',
    desc: 'Search our catalog by brand, price, or year. Each listing has full specs, auction grade, and high-resolution photos.',
  },
  {
    num: '02',
    icon: '🔒',
    title: 'Reserve',
    desc: 'Pay a 5–10% deposit via wire transfer or crypto. The car is held exclusively for you with an all-inclusive USD price.',
  },
  {
    num: '03',
    icon: '🛒',
    title: 'We Purchase',
    desc: 'We buy the vehicle directly from the auction or dealer. You receive 30+ inspection photos before the balance is due.',
  },
  {
    num: '04',
    icon: '🚢',
    title: 'Delivery',
    desc: 'Container shipping to your port in 30–45 days. We handle export docs, insurance, and customs clearance end-to-end.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-black border-y border-white/10 py-20" id="how">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="text-japan-red text-xs font-heading font-bold uppercase tracking-[0.4em] mb-2">Process</div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white uppercase tracking-tight">
            4 steps — choice to delivery
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-white/10 z-0" style={{ width: 'calc(100% - 2rem)', left: '100%', transform: 'translateX(-50%)' }} />
              )}
              <div className="text-4xl mb-5">{step.icon}</div>
              <div className="font-heading font-bold text-5xl text-white/10 mb-3 leading-none">{step.num}</div>
              <h3 className="font-heading font-bold text-white uppercase tracking-wide text-sm mb-3">{step.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 pt-10 border-t border-white/10">
          <a
            href="how-it-works"
            className="text-white/40 font-heading text-xs uppercase tracking-widest hover:text-white transition-colors"
          >
            Learn more about the process →
          </a>
        </div>
      </div>
    </section>
  );
}
