'use client';

import { formatInTimeZone } from 'date-fns-tz';
import { useEffect, useState } from 'react';

function LocalTime({ timeZone }: { timeZone: string }) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const manilaTime = formatInTimeZone(new Date(), timeZone, 'hh:mmaa zzz');

    setFormattedDate(manilaTime);
  }, [timeZone]);

  return <time dateTime={new Date().toDateString()}>{formattedDate}</time>;
}

export default LocalTime;
