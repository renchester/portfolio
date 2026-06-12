'use client';

import './SectionTitle.scss';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

function SectionTitle({
  title,
  className,
  id,
  index,
}: {
  title: string;
  className: string;
  id: string;
  index?: string;
}) {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.5 });

  return (
    <div ref={titleRef} className="sec-title">
      {index && (
        <p
          className="sec-title__index"
          aria-hidden="true"
          style={{
            opacity: isInView ? 1 : 0,
            transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        >
          {index}
        </p>
      )}
      <div className="sec-title__mask">
        <h2
          className={className}
          id={id}
          style={{
            transform: isInView ? 'none' : 'translateY(105%)',
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}
export default SectionTitle;
