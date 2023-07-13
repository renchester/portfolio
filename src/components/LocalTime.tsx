'use client';

import { formatInTimeZone } from 'date-fns-tz';
import { useEffect, useState } from 'react';

function LocalTime() {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const manilaTime = formatInTimeZone(
      new Date(),
      'Asia/Manila',
      'hh:mmaa zzz',
    );

    setFormattedDate(manilaTime);
  }, []);

  return <time dateTime={new Date().toDateString()}>{formattedDate}</time>;
}

export default LocalTime;
