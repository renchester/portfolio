'use client';

import { useEffect, useState } from 'react';
import getTagalogDayTime from '@/utils/getTagalogDayTime';

// Time-aware bilingual greeting, resolved on the client to avoid a
// server/client hydration mismatch across timezones.
function HeroGreeting() {
  const [greeting, setGreeting] = useState('Magandang araw');

  useEffect(() => {
    const currentHour = new Date().getHours();
    setGreeting(`Magandang ${getTagalogDayTime(currentHour)}`);
  }, []);

  return <span className="hero__greeting">{greeting}</span>;
}

export default HeroGreeting;
