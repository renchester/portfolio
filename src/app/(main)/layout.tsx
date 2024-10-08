import Header from '@/components/header/Header';
import Footer from '@/components/Footer';
import ButtonToTop from '@/components/ButtonToTop';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      {children}

      <Footer />
      <ButtonToTop />
    </>
  );
}
