'use client';

import About from '@/components/about/About';
import ContactForm from '@/components/contact/ContactForm';
import Hero from '@/components/hero/Hero';
import Projects from '@/components/projects/Projects';
import WelcomeScreen from '@/components/transitions/WelcomeScreen';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const [onWelcome, setOnWelcome] = useState(true);
  const hideWelcome = () => setOnWelcome(false);

  return (
    <main className="home-page">
      <AnimatePresence>
        {onWelcome && <WelcomeScreen hideScreen={hideWelcome} />}
      </AnimatePresence>

      {/* Hero */}
      <Hero startAnimation={onWelcome} />

      {/* About */}
      <About />

      {/* Projects */}
      <Projects />

      {/* Contact */}
      <ContactForm />
    </main>
  );
}
