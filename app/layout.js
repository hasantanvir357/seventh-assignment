import Navbar from './components/Navbar';
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
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
