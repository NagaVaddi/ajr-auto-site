import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Phone, Mail, MessageCircle, Clock } from 'lucide-react';

export const metadata: Metadata = { title: 'Contact AJR Auto Cars' };

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      <div className="bg-black border-b border-white/10 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-japan-red text-xs font-heading font-bold uppercase tracking-[0.4em] mb-3">Contact</div>
          <h1 className="font-heading font-bold text-4xl md:text-6xl xl:text-7xl uppercase tracking-tight text-white">
            {t('title')} <span className="text-japan-red">{t('titleAccent')}</span>
          </h1>
          <p className="text-white/40 mt-3 max-w-xl">{t('subtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              className="space-y-5"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>Don&apos;t fill this out: <input name="bot-field" /></label>
              </p>

              <div>
                <label className="block text-white/40 text-[10px] font-heading uppercase tracking-[0.3em] mb-2">{t('name')}</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-white/5 border border-white/10 text-white py-3 px-4 focus:outline-none focus:border-japan-red placeholder:text-white/20 text-sm"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-white/40 text-[10px] font-heading uppercase tracking-[0.3em] mb-2">{t('email')}</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-white/5 border border-white/10 text-white py-3 px-4 focus:outline-none focus:border-japan-red placeholder:text-white/20 text-sm"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-white/40 text-[10px] font-heading uppercase tracking-[0.3em] mb-2">{t('phone')}</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full bg-white/5 border border-white/10 text-white py-3 px-4 focus:outline-none focus:border-japan-red placeholder:text-white/20 text-sm"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div>
                <label className="block text-white/40 text-[10px] font-heading uppercase tracking-[0.3em] mb-2">{t('vehicle')}</label>
                <input
                  type="text"
                  name="vehicle"
                  className="w-full bg-white/5 border border-white/10 text-white py-3 px-4 focus:outline-none focus:border-japan-red placeholder:text-white/20 text-sm"
                  placeholder="e.g. Ferrari F8 Spider"
                />
              </div>

              <div>
                <label className="block text-white/40 text-[10px] font-heading uppercase tracking-[0.3em] mb-2">{t('message')}</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 text-white py-3 px-4 focus:outline-none focus:border-japan-red placeholder:text-white/20 text-sm resize-none"
                  placeholder="Tell us what you're looking for..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-japan-red text-white font-heading font-bold uppercase tracking-widest py-4 hover:bg-red-700 transition-colors text-sm"
              >
                {t('send')}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="font-heading font-bold text-xl text-white uppercase tracking-wider mb-6">Direct Contact</h2>
              <div className="space-y-4">
                <a href="tel:+971503240800" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-japan-red group-hover:bg-japan-red/10 transition-colors">
                    <Phone size={18} className="text-japan-red" />
                  </div>
                  <div>
                    <div className="text-white/30 text-[10px] font-heading uppercase tracking-widest">Phone</div>
                    <div className="text-white text-sm">+971 50 324 0800</div>
                  </div>
                </a>
                <a href="mailto:info@ajrline.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-japan-red group-hover:bg-japan-red/10 transition-colors">
                    <Mail size={18} className="text-japan-red" />
                  </div>
                  <div>
                    <div className="text-white/30 text-[10px] font-heading uppercase tracking-widest">Email</div>
                    <div className="text-white text-sm">info@ajrline.com</div>
                  </div>
                </a>
                <a
                  href="https://wa.me/971503240800"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-[#25D366] group-hover:bg-[#25D366]/10 transition-colors">
                    <MessageCircle size={18} className="text-[#25D366]" />
                  </div>
                  <div>
                    <div className="text-white/30 text-[10px] font-heading uppercase tracking-widest">WhatsApp</div>
                    <div className="text-white text-sm">{t('orWhatsapp')}</div>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center">
                    <Clock size={18} className="text-japan-red" />
                  </div>
                  <div>
                    <div className="text-white/30 text-[10px] font-heading uppercase tracking-widest">Hours</div>
                    <div className="text-white text-sm">Mon–Sun · 09:00–21:00 JST</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border border-japan-red/30 bg-japan-red/5">
              <div className="text-japan-red text-xs font-heading font-bold uppercase tracking-widest mb-2">Response Time</div>
              <p className="text-white/60 text-sm">We typically respond to all enquiries within 2–4 hours during business hours. For urgent matters, WhatsApp is the fastest way to reach us.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
