import { Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Providers } from './provider';
import { Hind_Siliguri } from 'next/font/google';
import './globals.css';

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
});

export const metadata = {
  title: 'বাজার দর - বাজারের সঠিক তথ্য',
  description: 'প্রয়োজনীয় পণ্যের দাম এক নজরে',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={hindSiliguri.className}>
      <body className="bg-[#f8faf8] text-gray-800 antialiased">
        <Providers>
          <Suspense fallback={<div className="h-16 bg-white border-b border-gray-100" />}>
            <Navbar />
          </Suspense>
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
