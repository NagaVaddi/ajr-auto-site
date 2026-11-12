'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { number: 30, label: 'Vehicles in catalog', suffix: '+' },
  { number: 8,  label: 'Premium brands',      suffix: '+' },
  { number: 100, label: 'Direct from Japan & Korea', suffix: '%' },
  { number: 24, label: 'Response time',       suffix: 'h' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      <span className="text-japan-red">{suffix}</span>
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="bg-black border-y border-white/10 relative overflow-hidden">
      {/* subtle red scan line */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-japan-red/40 to-transparent animate-[scanLine_4s_linear_infinite]" style={{ top: 0 }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="py-8 px-6 border-r border-white/10 last:border-r-0 odd:border-b md:odd:border-b-0 border-b md:border-b-0 group"
            >
              <div className="font-heading font-bold text-4xl md:text-5xl text-white mb-1 group-hover:text-japan-red transition-colors duration-300">
                <CountUp target={s.number} suffix={s.suffix} />
              </div>
              <div className="text-white/40 text-xs font-heading uppercase tracking-widest group-hover:text-white/60 transition-colors duration-300">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
