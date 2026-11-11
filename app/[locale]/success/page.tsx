import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { CheckCircle2, MessageCircle } from 'lucide-react';

export const metadata: Metadata = { title: 'Reservation Confirmed — AJR Auto Cars' };

export default async function SuccessPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('success');

  const steps = [t('step1'), t('step2'), t('step3'), t('step4')];

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center pt-20 pb-20 px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-6">
            <CheckCircle2 size={40} className="text-emerald-400" />
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white uppercase tracking-tight mb-3">
            {t('title')}
          </h1>
          <p className="text-white/50 text-sm">{t('subtitle')}</p>
        </div>

        <div className="bg-black border border-white/10 p-8 mb-6">
          <h2 className="font-heading font-bold text-sm uppercase tracking-widest text-white/40 mb-6">{t('nextSteps')}</h2>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-7 h-7 bg-japan-red text-white flex items-center justify-center font-heading font-bold text-xs shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-white/70 text-sm pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://wa.me/18885257386"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#25D366] text-white font-heading font-bold uppercase tracking-widest py-4 flex items-center justify-center gap-2 hover:bg-[#1ebe57] transition-colors text-sm"
          >
            <MessageCircle size={16} />
            {t('contactWhatsapp')}
          </a>
          <Link
            href={`/${locale}`}
            className="flex-1 border border-white/20 text-white font-heading font-bold uppercase tracking-widest py-4 flex items-center justify-center hover:border-white/50 transition-colors text-sm"
          >
            {t('backHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
