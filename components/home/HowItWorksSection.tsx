'use client';

import { motion } from 'framer-motion';

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
    <section className="bg-black border-y border-white/10 py-24 relative overflow-hidden" id="how">
      {/* Animated background line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-japan-red/20 to-transparent origin-left hidden lg:block"
        style={{ top: '45%' }}
      />

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
            Process
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white uppercase tracking-tight">
            4 steps — choice to delivery
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] as number[] }}
              whileHover={{ y: -6 }}
              className="group relative"
            >
              {/* Step icon circle */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 + 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
                className="w-14 h-14 rounded-full border border-white/15 bg-black flex items-center justify-center mb-5 text-2xl group-hover:border-japan-red/50 group-hover:bg-japan-red/5 transition-all duration-300 relative z-10"
              >
                {step.icon}
              </motion.div>

              <div className="font-heading font-bold text-5xl text-white/8 mb-3 leading-none group-hover:text-japan-red/20 transition-colors duration-300">
                {step.num}
              </div>
              <h3 className="font-heading font-bold text-white uppercase tracking-wide text-sm mb-3 group-hover:text-japan-red transition-colors duration-200">
                {step.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 pt-10 border-t border-white/8">
          <a
            href="how-it-works"
            className="text-white/35 font-heading text-xs uppercase tracking-widest hover:text-white transition-colors inline-flex items-center gap-2 group"
          >
            Learn more about the process
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
