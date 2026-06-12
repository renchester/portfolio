import About from '@/components/about/About';
import Bridge from '@/components/bridge/Bridge';
import ContactForm from '@/components/contact/ContactForm';
import Projects from '@/components/projects/Projects';
import Hero from '@/components/hero/Hero';
import { client } from '@/sanity/lib/client';
import { AUTHOR_QUERY } from '@/sanity/queries';
import { notFound } from 'next/navigation';
import WorkExperience from '@/components/experience/WorkExperience';

const options = { next: { revalidate: 1800 } }; // 30 mins

export default async function Home() {
  const author = await client.fetch(AUTHOR_QUERY, undefined, options);

  if (!author) {
    notFound();
  }

  return (
    <main className="home-page">
      {/* Hero */}
      <Hero author={author} />

      {/* About */}
      <About author={author} />

      {/* Statement bridge */}
      <Bridge author={author} />

      {/* Experience  */}
      <WorkExperience />

      {/* Projects */}
      <Projects />

      {/* Contact */}
      <ContactForm author={author} />
    </main>
  );
}
