'use client';

import About from '@/components/about/About';
import ContactForm from '@/components/contact/ContactForm';
import Hero from '@/components/hero/Hero';
import Projects from '@/components/projects/Projects';
import WelcomeScreen from '@/components/transitions/WelcomeScreen';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [onWelcome, setOnWelcome] = useState(true);
  const hideWelcome = () => setOnWelcome(false);

  // useEffect(() => {}, []);

  return (
    <main className="home-page">
      <AnimatePresence>
        {/* {onWelcome && <WelcomeScreen hideScreen={hideWelcome} />} */}
        {/* <WelcomeScreen hideScreen={hideWelcome} /> */}
      </AnimatePresence>

      {/* Hero */}
      <Hero />

      {/* About */}
      <About />

      {/* Projects */}
      <Projects />

      {/* Contact */}
      <ContactForm />
    </main>
  );
}
