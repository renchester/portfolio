'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from '@/components/hero/Hero';
import WelcomeScreen from '@/components/transitions/WelcomeScreen';
import { AUTHOR_QUERYResult } from '@/sanity/types';

function ClientSections({ author }: { author: AUTHOR_QUERYResult }) {
  const [onWelcome, setOnWelcome] = useState(true);
  const hideWelcome = () => setOnWelcome(false);

  return (
    <>
      <AnimatePresence>
        {onWelcome && <WelcomeScreen hideScreen={hideWelcome} />}
      </AnimatePresence>

      {/* Hero */}
      <Hero startAnimation={onWelcome} author={author} />
    </>
  );
}

export default ClientSections;
