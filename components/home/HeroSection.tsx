'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const BRANDS = ['Porsche', 'Ferrari', 'Lamborghini', 'Bentley', 'Mercedes-AMG', 'Maserati', 'BMW', 'Mercedes-Benz'];

const wordVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.75, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] as number[] },
  }),
};

const lineVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.55 + i * 0.1, ease: 'easeOut' as const },
  }),
};

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 4.17) % 100}%`,
  top: `${(i * 7.3 + 15) % 85}%`,
  delay: `${(i * 0.37) % 4}s`,
  dur: `${3.5 + (i % 4) * 0.9}s`,
  size: i % 3 === 0 ? 2 : 1,
}));

export default function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations('hero');
  const titleWords = [t('line1'), t('line2'), t('line3')];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const blobY1 = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);
  const blobY2 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const gridY  = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section ref={ref} className="relative min-h-screen bg-obsidian flex items-center overflow-hidden">
      {/* Animated grid — parallax */}
      <motion.div
        style={{
          y: gridY,
          backgroundImage:
            'linear-gradient(rgba(230,0,18,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(230,0,18,0.35) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        className="absolute inset-0 opacity-[0.12]"
        aria-hidden
      />

      {/* Radial blobs — parallax */}
      <motion.div
        style={{ y: blobY1 }}
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-japan-red/10 blur-[130px] pointer-events-none"
        aria-hidden
      />
      <motion.div
        style={{ y: blobY2 }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-japan-red/6 blur-[110px] pointer-events-none"
        aria-hidden
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-japan-red/50"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animation: `floatParticle ${p.dur} ${p.delay} ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Diagonal accent line */}
      <div
        className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none"
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border border-white/20 px-4 py-1.5 mb-8"
        >
          <span className="text-xs font-heading uppercase tracking-[0.3em] text-white/50">🇯🇵 Japan · 🇰🇷 Korea</span>
          <span className="w-px h-3 bg-white/20" />
          <span className="text-xs font-heading uppercase tracking-[0.3em] text-japan-red">Premium Import</span>
        </motion.div>

        {/* Title */}
        <div className="mb-6">
          {titleWords.map((word, i) => (
            <div key={i} className="overflow-hidden block">
              <motion.h1
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className={`font-heading font-bold uppercase leading-[0.9] block ${
                  i === 2
                    ? 'text-japan-red text-5xl md:text-7xl xl:text-[7rem]'
                    : 'text-white text-5xl md:text-7xl xl:text-[7rem]'
                }`}
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          className="text-white/55 text-base md:text-lg max-w-lg leading-relaxed mb-10"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href={`/${locale}/inventory`}
            className="inline-flex items-center gap-3 bg-japan-red text-white font-heading font-bold uppercase tracking-widest px-8 py-4 hover:bg-red-700 transition-colors group relative overflow-hidden"
          >
            <span className="relative z-10">{t('cta1')}</span>
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
          </Link>
          <Link
            href={`/${locale}/how-it-works`}
            className="inline-flex items-center gap-3 border border-white/20 text-white font-heading font-bold uppercase tracking-widest px-8 py-4 hover:border-white/60 hover:bg-white/5 transition-all"
          >
            {t('cta2')}
          </Link>
        </motion.div>

        {/* Brand ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-14 flex items-center gap-4 overflow-hidden"
          aria-hidden
        >
          <span className="text-[10px] font-heading uppercase tracking-[0.3em] text-white/20 shrink-0">Brands</span>
          <div className="relative flex-1 overflow-hidden">
            <div className="flex gap-8 animate-marquee whitespace-nowrap">
              {[...BRANDS, ...BRANDS].map((b, i) => (
                <span key={i} className="text-[11px] font-heading uppercase tracking-[0.25em] text-white/18">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="mt-14 flex items-center gap-3 text-white/30"
        >
          <ChevronDown size={16} className="animate-bounce" />
          <span className="text-xs font-heading uppercase tracking-widest">Scroll to explore</span>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian to-transparent pointer-events-none" />
    </section>
  );
}
