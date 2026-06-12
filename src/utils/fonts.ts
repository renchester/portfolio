import { Archivo, IBM_Plex_Mono, Instrument_Serif } from 'next/font/google';

// Display voice — sharp editorial serif, used large for statements/titles.
export const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
});

// Text/UI voice — grotesk for body copy and interface.
export const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

// Annotation voice — mono for labels, coordinates, dates, indices.
export const plexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
});
