'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'How long does delivery take?',
    a: 'Sea freight from Japan or Korea takes 30–45 days to your nearest port, plus 7–14 days for customs clearance. Total: approximately 5–7 weeks from purchase.',
  },
  {
    q: 'What documents do I receive?',
    a: 'You receive the Bill of Lading, export certificate, original invoice, inspection report, and all transit documents required for customs clearance in your country.',
  },
  {
    q: 'Can I inspect the car before buying?',
    a: 'Yes — we provide a detailed video walkthrough of the vehicle after the deposit is paid and before the balance is due. If the car is not as described, your deposit is fully refunded.',
  },
  {
    q: 'How do I pay?',
    a: 'We accept SWIFT international wire transfer, USDT (TRC20 or ERC20), and domestic bank transfers in selected countries. All prices are quoted in USD.',
  },
  {
    q: 'What is the reservation deposit?',
    a: 'A 5–10% deposit reserves the vehicle exclusively for you. It is applied toward the full purchase price and is refundable if the car is not as described in the inspection report.',
  },
  {
    q: 'Which countries do you ship to?',
    a: 'We ship worldwide — UAE, Georgia, Kazakhstan, Kyrgyzstan, Uzbekistan, Armenia, Kenya, South Africa, and more. If your country has a seaport, we can deliver.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-black border-t border-white/10 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="text-japan-red text-xs font-heading font-bold uppercase tracking-[0.4em] mb-2">FAQ</div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white uppercase tracking-tight">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/10 hover:border-white/20 transition-colors">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-heading font-bold text-sm text-white uppercase tracking-wide pr-4">{faq.q}</span>
                <span className="shrink-0 text-japan-red">
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-white/50 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
