'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function ClosingCTA({ locale }: { locale: string }) {
  return (
    <section className="bg-japan-red py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="text-white/60 text-xs font-heading font-bold uppercase tracking-[0.4em] mb-4">Ready to find your car?</div>
          <h2 className="font-heading font-bold text-4xl md:text-6xl text-white uppercase tracking-tight mb-4">
            Browse Our Full Catalog
          </h2>
          <p className="text-white/70 max-w-xl mx-auto text-base mb-10">
            Premium vehicles from Japan and Korea — with photos, USD pricing, and honest mileage data. Reserve yours with a 5% deposit today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/inventory`}
              className="inline-flex items-center gap-3 bg-white text-japan-red font-heading font-bold uppercase tracking-widest px-8 py-4 hover:bg-white/90 transition-colors group text-sm"
            >
              View All Vehicles
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://wa.me/18885257386"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border-2 border-white text-white font-heading font-bold uppercase tracking-widest px-8 py-4 hover:bg-white/10 transition-colors text-sm"
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
