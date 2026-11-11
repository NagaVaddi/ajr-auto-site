import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { Oswald, Inter } from 'next/font/google';
import '../globals.css';
import LenisProvider from '@/components/layout/LenisProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const locales = ['en', 'ru', 'ar', 'ja'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'https://ajrautocars.netlify.app'),
  title: {
    default: 'AJR Auto Cars | Premium Japan & Korea Import Vehicles',
    template: '%s | AJR Auto Cars',
  },
  description:
    'Premium pre-owned vehicles imported directly from Japan and Korea. Ferrari, Porsche, Genesis and more — clean titles, full auction history, worldwide export.',
  keywords: ['japan import cars', 'korea import cars', 'ferrari japan', 'porsche japan', 'used cars japan', 'ajr auto cars'],
  openGraph: { type: 'website', siteName: 'AJR Auto Cars' },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale)) notFound();

  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${oswald.variable} ${inter.variable}`}
    >
      <body className="bg-obsidian text-white antialiased font-body">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LenisProvider>
            <Header locale={locale} />
            <main>{children}</main>
            <Footer locale={locale} />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
