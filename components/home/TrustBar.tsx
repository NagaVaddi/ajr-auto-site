'use client';

import { useTranslations } from 'next-intl';

export default function TrustBar() {
  const t = useTranslations('trust');
  const items: string[] = t.raw('items') as string[];
  const doubled = [...items, ...items];

  return (
    <div className="border-y border-white/10 bg-black overflow-hidden py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="text-white/60 text-xs font-heading font-semibold uppercase tracking-widest px-8">
              {item}
            </span>
            <span className="text-japan-red text-sm shrink-0">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
