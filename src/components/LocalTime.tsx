'use client';

import { formatInTimeZone } from 'date-fns-tz';

function LocalTime() {
  const manilaTime = formatInTimeZone(new Date(), 'Asia/Manila', 'hh:mmaa zzz');

  return <time dateTime={new Date().toDateString()}>{manilaTime}</time>;
}

export default LocalTime;
