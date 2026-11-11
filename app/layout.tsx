import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'https://ajrauto.netlify.app'),
  title: {
    default: 'Japan & Korea Import Cars | AJR Auto Parts',
    template: '%s | AJR Auto Parts',
  },
  description:
    'Premium pre-owned vehicles imported directly from Japan and Korea. Ferrari, Porsche, Genesis and more — clean titles, full history, worldwide export.',
  keywords: [
    'japan import cars',
    'korea import cars',
    'ferrari japan',
    'porsche japan',
    'used cars japan',
    'ajr auto',
    'japan export cars',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'AJR Auto Parts',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F8FAFC] antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
