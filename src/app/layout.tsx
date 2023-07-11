import '@/styles/globals.scss';
import type { Metadata } from 'next';
import { nunito, inter, poppins, openSans } from '@/utils/fonts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ButtonToTop from '@/components/ButtonToTop';

export const metadata: Metadata = {
  title: {
    template: '%s by Renchester Ramos | Web Developer & Designer',
    default: 'Renchester Ramos | Web Developer & Designer',
  },
  description: 'Web developer portfolio and personal site for Rencbester Ramos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${nunito.variable} ${poppins.variable}  ${openSans.variable}`}
      >
        <Header />

        {children}

        <Footer />
        <ButtonToTop />
      </body>
    </html>
  );
}
