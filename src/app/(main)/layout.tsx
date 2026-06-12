import Header from '@/components/header/Header';
import Footer from '@/components/Footer';
import ButtonToTop from '@/components/ButtonToTop';
import MotionProvider from '@/components/transitions/MotionProvider';
import IndexRail from '@/components/sheet/IndexRail';
import ScrollDatum from '@/components/sheet/ScrollDatum';
import { client } from '@/sanity/lib/client';
import { AUTHOR_QUERY } from '@/sanity/queries';

const options = { next: { revalidate: 3600 } }; // 1 hour

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const author = await client.fetch(AUTHOR_QUERY, undefined, options);
  const name = author ? `${author.firstName} ${author.lastName}` : null;

  return (
    <MotionProvider>
      <Header name={name} />
      <IndexRail />
      <ScrollDatum />

      {children}

      <Footer />
      <ButtonToTop />
    </MotionProvider>
  );
}
