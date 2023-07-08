import { Nunito_Sans, Inter, Poppins } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
});

export const nunito = Nunito_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-nunito',
  display: 'swap',
  preload: false,
});

export const poppins = Poppins({
  weight: ['400', '500', '700', '100'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-poppins',
  display: 'swap',
  preload: false,
});
