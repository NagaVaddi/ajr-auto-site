'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function ClosingCTA({ locale }: { locale: string }) {
  return (
    <section className="bg-japan-red py-24 relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
        aria-hidden
      />
      {/* Radial light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/10 blur-[120px] pointer-events-none" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as number[] }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-white/60 text-xs font-heading font-bold uppercase tracking-[0.4em] mb-4"
          >
            Ready to find your car?
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.75, ease: [0.16, 1, 0.3, 1] as number[] }}
              className="font-heading font-bold text-4xl md:text-6xl text-white uppercase tracking-tight"
            >
              Browse Our Full Catalog
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-white/70 max-w-xl mx-auto text-base mb-10"
          >
            Premium vehicles from Japan and Korea — with photos, USD pricing, and honest mileage data. Reserve yours with a 5% deposit today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.42, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href={`/${locale}/inventory`}
              className="inline-flex items-center gap-3 bg-white text-japan-red font-heading font-bold uppercase tracking-widest px-8 py-4 hover:bg-white/90 transition-colors group text-sm relative overflow-hidden"
            >
              <span className="relative z-10">View All Vehicles</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://wa.me/971503240800"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border-2 border-white text-white font-heading font-bold uppercase tracking-widest px-8 py-4 hover:bg-white/10 transition-colors text-sm"
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
