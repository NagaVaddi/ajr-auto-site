import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://avto-brand.ru'),
  title: {
    default: 'Купить авто с пробегом в Москве | АВТО БРЕНД',
    template: '%s | АВТО БРЕНД',
  },
  description:
    'Автосалон АВТО БРЕНД предлагает проверенные автомобили с пробегом. Гарантия юридической чистоты, кредит, trade-in.',
  keywords: ['купить авто с пробегом', 'автомобили в москве', 'автосалон москва', 'авто кредит'],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АВТО БРЕНД',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${inter.className} bg-[#F8FAFC] antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
