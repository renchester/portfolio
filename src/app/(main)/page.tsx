import About from '@/components/about/About';
import ContactForm from '@/components/contact/ContactForm';
import Projects from '@/components/projects/Projects';
import ClientSections from './ClientSections';
import { client } from '@/sanity/lib/client';
import { AUTHOR_QUERY } from '@/sanity/queries';
import { notFound } from 'next/navigation';

const options = { next: { revalidate: 1800 } }; // 30 mins

export default async function Home() {
  const author = await client.fetch(AUTHOR_QUERY, undefined, options);

  if (!author) {
    notFound();
  }

  return (
    <main className="home-page">
      {/* Welcome and Hero sections */}
      <ClientSections author={author} />

      {/* About */}
      <About author={author} />

      {/* Projects */}
      <Projects />

      {/* Contact */}
      <ContactForm author={author} />
    </main>
  );
}
