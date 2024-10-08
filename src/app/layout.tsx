import '@/styles/globals.scss';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { nunito, inter, poppins, openSans, raleway } from '@/utils/fonts';
import Script from 'next/script';
import { WebSite, WithContext } from 'schema-dts';
import { client } from '@/sanity/lib/client';
import { AUTHOR_QUERY } from '@/sanity/queries';
import { urlFor } from '@/sanity/lib/image';
import { notFound } from 'next/navigation';

const options = { next: { revalidate: 3600 } }; // 1 hour

export async function generateMetadata(): Promise<Metadata> {
  const author = await client.fetch(AUTHOR_QUERY, undefined, options);

  if (!author)
    return {
      title: 'Portfolio',
      description: 'This is a portfolio page',
    };

  const fullName = `${author.firstName} ${author.lastName}`;
  const description = author.seoDescription;
  const imageUrl = urlFor(author.seoImage || '').url();

  const url = author.seoUrl;

  return {
    title: `${fullName} | ${author.job}`,
    description: author.seoDescription,
    openGraph: {
      title: `${fullName} — Portfolio`,
      description,
      url,
      siteName: `${fullName} — Portfolio`,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: imageUrl, // Must be an absolute URL
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${fullName} — Portfolio`,
      description,
      images: [imageUrl], // Must be an absolute URL
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const author = await client.fetch(AUTHOR_QUERY, undefined, options);

  if (!author) {
    notFound();
  }

  const fullName = `${author.firstName} ${author.lastName}`;
  const description = author.seoDescription;
  const imageUrl = urlFor(author.seoImage || '').url();
  const url = author.seoUrl;

  const structuredData: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${fullName} — Portfolio`,
    description,
    thumbnailUrl: imageUrl,
    alternateName: author.seoAlternateNames,
    url,
  };

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${nunito.variable} ${poppins.variable}  ${openSans.variable} ${raleway.variable}`}
      >
        {children}
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
