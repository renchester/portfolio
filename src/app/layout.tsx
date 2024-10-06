import '@/styles/globals.scss';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { nunito, inter, poppins, openSans, raleway } from '@/utils/fonts';
import Header from '@/components/header/Header';
import Footer from '@/components/Footer';
import ButtonToTop from '@/components/ButtonToTop';
import Script from 'next/script';
import { WebSite, WithContext } from 'schema-dts';

export const metadata: Metadata = {
  title: {
    template: '%s by Renchester Ramos | Full-stack Developer & Designer',
    default: 'Renchester Ramos | Full-stack Developer & Designer',
  },
  description: 'Web developer portfolio and personal site for Renchester Ramos',
  openGraph: {
    title: 'Renchester Ramos - Portfolio',
    description:
      'Full-stack developer portfolio and personal site for Renchester Ramos',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Renchester Ramos',
    description:
      'Full-stack developer portfolio and personal site for Renchester Ramos',
    thumbnailUrl: `https://avatars.githubusercontent.com/u/61845973?v=4`,
    alternateName: ['Renchester', 'Chester', 'RJR', 'RR', 'Chester Ramos'],
    url: 'https://renchester.dev/',
  };

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${nunito.variable} ${poppins.variable}  ${openSans.variable} ${raleway.variable}`}
      >
        <Header />

        {children}

        <Footer />
        <ButtonToTop />

        <Analytics />
        <SpeedInsights />
      </body>
      <Script
        id="seo-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </html>
  );
}
