import { Providers } from './provider';
import './globals.css';

export const metadata = {
  title: 'বাজার দর - বাজারের সঠিক তথ্য',
  description: 'প্রয়োজনীয় পণ্যের দাম এক নজরে',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
