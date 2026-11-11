'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircle, CreditCard, Building2 } from 'lucide-react';
import type { Car } from '@/types';

export default function BuyBox({ car, locale }: { car: Car; locale: string }) {
  const t = useTranslations('vehicle');
  const [loading, setLoading] = useState(false);

  const handleReserve = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carId: car.id, depositAmount: car.depositAmount, locale }),
      });
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setLoading(false);
    }
  };

  const whatsappText = encodeURIComponent(
    `Hi, I'm interested in the ${car.year} ${car.brand} ${car.model} (ID: ${car.id}). Price: $${car.price.toLocaleString()}`
  );

  const statusColors = {
    Available: 'bg-emerald-500',
    Reserved: 'bg-amber-500',
    Sold: 'bg-red-600',
  };

  return (
    <div className="sticky top-24 bg-black border border-white/10 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <span className={`${statusColors[car.status]} text-white text-[10px] font-heading font-bold uppercase tracking-widest px-3 py-1.5`}>
          {t(car.status.toLowerCase() as 'available' | 'reserved' | 'sold')}
        </span>
        <div className="text-white/30 text-xs font-heading uppercase tracking-widest">
          Grade {car.auctionGrade}
        </div>
      </div>

      <div>
        <div className="font-heading font-bold text-4xl text-white">
          ${car.price.toLocaleString()}
        </div>
        {car.priceJpy && (
          <div className="text-white/40 text-sm mt-1">¥{car.priceJpy.toLocaleString()}</div>
        )}
      </div>

      {car.status === 'Available' && (
        <div className="space-y-3 pt-2">
          <button
            onClick={handleReserve}
            disabled={loading}
            className="w-full bg-japan-red text-white font-heading font-bold uppercase tracking-widest px-6 py-4 hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <CreditCard size={16} />
            {loading ? 'Processing...' : `${t('reserveNow')} — $${car.depositAmount.toLocaleString()}`}
          </button>
          <div className="text-white/30 text-xs text-center">${car.depositAmount.toLocaleString()} {t('depositRequired')}</div>

          <div className="border-t border-white/10 pt-3 space-y-3">
            <button className="w-full border border-white/20 text-white font-heading font-bold uppercase tracking-widest px-6 py-3.5 hover:border-white/50 transition-colors flex items-center justify-center gap-2 text-sm">
              <Building2 size={15} />
              {t('payFull')}
            </button>
            <a
              href={`https://wa.me/971503240800?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-white font-heading font-bold uppercase tracking-widest px-6 py-3.5 hover:bg-[#1ebe57] transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <MessageCircle size={15} />
              {t('whatsappWalkthrough')}
            </a>
          </div>
        </div>
      )}

      {car.status === 'Reserved' && (
        <div className="space-y-3 pt-2">
          <div className="border border-amber-500/30 bg-amber-500/5 p-4 text-center">
            <div className="text-amber-400 text-xs font-heading font-bold uppercase tracking-widest mb-1">Reserved</div>
            <p className="text-white/60 text-xs">Join the waitlist — we'll notify you if it becomes available.</p>
          </div>
          <a
            href={`https://wa.me/971503240800?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] text-white font-heading font-bold uppercase tracking-widest px-6 py-3.5 hover:bg-[#1ebe57] transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <MessageCircle size={15} />
            Join Waitlist
          </a>
        </div>
      )}

      {car.status === 'Sold' && (
        <div className="border border-white/10 p-4 text-center">
          <div className="text-white/50 text-xs font-heading font-bold uppercase tracking-widest mb-1">Sold</div>
          <p className="text-white/40 text-xs">This vehicle has been sold. Contact us to find a similar one.</p>
        </div>
      )}

      <div className="text-white/20 text-[10px] text-center uppercase tracking-widest pt-2">
        🔒 Secure payment · 100% money-back guarantee
      </div>
    </div>
  );
}
