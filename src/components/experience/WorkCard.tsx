'use client';

import { urlFor } from '@/sanity/lib/image';
import { EXPERIENCE_ID_QUERYResult } from '@/sanity/types';
import { format } from 'date-fns';
import { PortableText } from 'next-sanity';
import { useState } from 'react';

function WorkCard({ exp }: { exp: EXPERIENCE_ID_QUERYResult | null }) {
  const [isExpanded, setExpanded] = useState(false);

  const dateNow = new Date();

  return (
    <li className="exp__listItem">
      <img
        src={urlFor(exp?.logo).url()}
        alt={`Logo for ${exp?.company}`}
        className="exp__img"
      />
      <div className="exp__card">
        <article className="exp__top">
          <button
            type="button"
            className="exp__main"
            onClick={() => setExpanded((prev) => !prev)}
          >
            <h3 className="exp__company">
              {exp?.company}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
                className="exp__more"
                data-active={isExpanded}
              >
                <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
              </svg>
            </h3>
            <span className="exp__position">{exp?.position}</span>
          </button>
          <div className="exp__details">
            <span className="exp__location" aria-label="Company location">
              {exp?.location}
            </span>
            <span className="exp__separator">•</span>
            <div className="exp__dates">
              <time dateTime={exp?.startDate}>
                {format(new Date(exp?.startDate!), 'LLLL yyyy')}
              </time>{' '}
              -{' '}
              {exp?.endDate ? (
                <time dateTime={exp?.endDate}>
                  {format(new Date(exp?.endDate!), 'LLLL yyyy')}
                </time>
              ) : (
                <time dateTime={dateNow.toISOString()}>present</time>
              )}
            </div>
          </div>
        </article>
        {isExpanded && (
          <div className="exp__description">
            <PortableText value={exp?.description || []} />
          </div>
        )}
      </div>
    </li>
  );
}

export default WorkCard;
