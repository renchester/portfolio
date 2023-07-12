'use client';

import { Variants, motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import AnimatedLetters from './AnimatedLetters';

function SectionTitle({
  title,
  className,
  id,
}: {
  title: string;
  className: string;
  id: string;
}) {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(titleRef);

  return (
    <div ref={titleRef} className="sec-title">
      <h1
        className={className}
        id={id}
        style={{
          transform: isInView ? 'none' : 'translateX(-200px)',
          opacity: isInView ? 1 : 0,
          transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
          paddingBottom: '5px',
          overflow: 'hidden',
        }}
      >
        {title}
      </h1>
    </div>
  );
}
export default SectionTitle;
