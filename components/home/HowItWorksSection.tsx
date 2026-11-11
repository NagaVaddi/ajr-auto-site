'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function HowItWorksSection() {
  const t = useTranslations('how');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    t.raw('steps.0') as { num: string; title: string; desc: string },
    t.raw('steps.1') as { num: string; title: string; desc: string },
    t.raw('steps.2') as { num: string; title: string; desc: string },
  ];

  return (
    <section className="py-24 bg-obsidian" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-japan-red text-xs font-heading font-bold uppercase tracking-[0.4em] mb-4">Process</div>
          <h2 className="font-heading font-bold text-4xl md:text-5xl xl:text-6xl uppercase tracking-tight text-white">
            {t('title')}{' '}
            <span className="text-japan-red">{t('titleAccent')}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px bg-white/10">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-obsidian p-10 group hover:bg-japan-red/5 transition-colors"
            >
              <div className="font-heading font-bold text-7xl text-white/5 group-hover:text-japan-red/20 transition-colors leading-none mb-6 select-none">
                {step.num}
              </div>
              <h3 className="font-heading font-bold text-xl text-white uppercase tracking-wider mb-4">
                {step.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              <div className="mt-8 w-8 h-px bg-japan-red" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
