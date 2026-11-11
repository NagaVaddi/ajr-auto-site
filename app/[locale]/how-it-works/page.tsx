import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export const metadata: Metadata = { title: 'How It Works — Japan & Korea Import Process' };

export default async function HowItWorksPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('how');

  const steps = [
    t.raw('steps.0') as { num: string; title: string; desc: string },
    t.raw('steps.1') as { num: string; title: string; desc: string },
    t.raw('steps.2') as { num: string; title: string; desc: string },
  ];

  const faqs = [
    {
      q: 'How long does shipping take?',
      a: 'Typically 2–4 weeks from Japan or Korea to most major ports worldwide. We provide full tracking throughout.',
    },
    {
      q: 'What is an auction grade?',
      a: 'Japanese auction grades run from 1 (poor) to 5 (perfect). Grade 4 means very clean with minor blemishes; Grade 5 means showroom condition. We only source Grade 4 and above.',
    },
    {
      q: 'Can I import to any country?',
      a: 'We export to most countries. Some destinations have restrictions (e.g. USA 25-year rule). Contact us with your country and we\'ll confirm feasibility.',
    },
    {
      q: 'Is the deposit refundable?',
      a: 'Yes — if the vehicle doesn\'t pass our final inspection or if shipping becomes impossible, your deposit is fully refunded.',
    },
    {
      q: 'Do you provide auction sheets?',
      a: 'Yes. Every vehicle includes the original Japanese or Korean auction sheet, which details the grade, known faults, and inspection notes.',
    },
  ];

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      <div className="bg-black border-b border-white/10 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-japan-red text-xs font-heading font-bold uppercase tracking-[0.4em] mb-3">Process</div>
          <h1 className="font-heading font-bold text-4xl md:text-6xl xl:text-7xl uppercase tracking-tight text-white">
            {t('title')} <span className="text-japan-red">{t('titleAccent')}</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 mb-20">
          {steps.map((step, i) => (
            <div key={step.num} className="bg-obsidian p-10 group hover:bg-japan-red/5 transition-colors">
              <div className="font-heading font-bold text-7xl text-white/5 group-hover:text-japan-red/20 transition-colors leading-none mb-6 select-none">
                {step.num}
              </div>
              <h3 className="font-heading font-bold text-xl text-white uppercase tracking-wider mb-4">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              <div className="mt-8 w-8 h-px bg-japan-red" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-heading font-bold text-3xl text-white uppercase tracking-tight mb-8">
              Frequently Asked <span className="text-japan-red">Questions</span>
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-white/10 p-5">
                  <h3 className="text-white font-heading font-bold text-sm uppercase tracking-wider mb-2">{faq.q}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-heading font-bold text-3xl text-white uppercase tracking-tight mb-8">
              Why <span className="text-japan-red">AJR Auto Cars</span>
            </h2>
            {[
              { title: '10+ Years of Experience', desc: 'We\'ve been sourcing from Japanese and Korean auctions since 2014.' },
              { title: 'Direct Auction Access', desc: 'We bid directly at USS, JU, and Encar auctions — no middlemen, better prices.' },
              { title: 'Full Documentation', desc: 'Every car comes with the original auction sheet, deregistration certificate, and export documents.' },
              { title: 'Worldwide Shipping Network', desc: 'We work with trusted RoRo and container carriers to every major port worldwide.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-1 bg-japan-red shrink-0" />
                <div>
                  <h3 className="text-white font-heading font-bold text-sm uppercase tracking-wider mb-1">{item.title}</h3>
                  <p className="text-white/50 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}

            <div className="mt-10 p-6 border border-japan-red/30 bg-japan-red/5">
              <div className="font-heading font-bold text-white uppercase tracking-widest text-sm mb-2">Ready to get started?</div>
              <p className="text-white/60 text-sm mb-4">Browse our current stock or contact us to discuss your requirements.</p>
              <div className="flex gap-3">
                <Link
                  href={`/${locale}/inventory`}
                  className="bg-japan-red text-white font-heading font-bold uppercase tracking-widest px-5 py-2.5 text-xs hover:bg-red-700 transition-colors"
                >
                  View Inventory
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="border border-white/20 text-white font-heading font-bold uppercase tracking-widest px-5 py-2.5 text-xs hover:border-white/50 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
