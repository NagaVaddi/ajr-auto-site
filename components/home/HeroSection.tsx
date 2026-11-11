'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Globe3D = dynamic(() => import('@/components/three/Globe3D'), {
  ssr: false,
  loading: () => null,
});

const wordVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};

const lineVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.5 + i * 0.1, ease: 'easeOut' as const },
  }),
};

export default function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations('hero');
  const titleWords = [t('line1'), t('line2'), t('line3')];

  return (
    <section className="relative min-h-screen bg-obsidian flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-japan-red/5 via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-full h-full md:w-[55%]">
        <div className="w-full h-full opacity-70">
          <Globe3D />
        </div>
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-transparent via-transparent to-obsidian pointer-events-none hidden md:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="mb-6">
          {titleWords.map((word, i) => (
            <div key={i} className="overflow-hidden block">
              <motion.h1
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className={`font-heading font-bold uppercase leading-none block ${
                  i === 2
                    ? 'text-japan-red text-5xl md:text-7xl xl:text-8xl'
                    : 'text-white text-5xl md:text-7xl xl:text-8xl'
                }`}
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          className="text-white/60 text-base md:text-lg max-w-lg leading-relaxed mb-10"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href={`/${locale}/inventory`}
            className="inline-flex items-center gap-3 bg-japan-red text-white font-heading font-bold uppercase tracking-widest px-8 py-4 hover:bg-red-700 transition-colors group"
          >
            {t('cta1')}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href={`/${locale}/how-it-works`}
            className="inline-flex items-center gap-3 border border-white/20 text-white font-heading font-bold uppercase tracking-widest px-8 py-4 hover:border-white/60 hover:bg-white/5 transition-all"
          >
            {t('cta2')}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-20 flex items-center gap-3 text-white/30"
        >
          <ChevronDown size={16} className="animate-bounce" />
          <span className="text-xs font-heading uppercase tracking-widest">Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
}
