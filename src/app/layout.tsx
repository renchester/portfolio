import '@/styles/globals.scss';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { archivo, instrumentSerif, plexMono } from '@/utils/fonts';
import Script from 'next/script';
import { WebSite, WithContext } from 'schema-dts';
import { client } from '@/sanity/lib/client';
import { AUTHOR_QUERY } from '@/sanity/queries';
import { urlFor } from '@/sanity/lib/image';

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
  const imageUrl = urlFor(author.seoImage).width(1200).url();

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

  const structuredData: WithContext<WebSite> | null = author
    ? {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: `${author.firstName} ${author.lastName} — Portfolio`,
        description: author.seoDescription,
        thumbnailUrl: urlFor(author.seoImage).width(1200).url(),
        alternateName: author.seoAlternateNames,
        url: author.seoUrl,
      }
    : null;

  return (
    <html lang="en">
      <body
        className={`${archivo.variable} ${instrumentSerif.variable} ${plexMono.variable}`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
      {structuredData && (
        <Script
          id="seo-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </html>
  );
}
