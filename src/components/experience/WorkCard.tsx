import { EXPERIENCE_QUERYResult } from '@/sanity/types';
import {
  differenceInCalendarMonths,
  format,
  parseISO,
  startOfToday,
} from 'date-fns';
import { PortableText } from 'next-sanity';
import Reveal from '../animations/Reveal';

const EMPLOYMENT_LABELS: Record<string, string> = {
  fullTime: 'Full-time',
  partTime: 'Part-time',
  selfEmployed: 'Self-employed',
  freelance: 'Freelance',
  contract: 'Contract',
  internship: 'Internship',
  apprenticeship: 'Apprenticeship',
  seasonal: 'Seasonal',
};

const LOCATION_LABELS: Record<string, string> = {
  onSite: 'On-site',
  hybrid: 'Hybrid',
  remote: 'Remote',
};

function tenureLabel(start: Date, end: Date) {
  const months = differenceInCalendarMonths(end, start) + 1;
  const yr = Math.floor(months / 12);
  const mo = months % 12;
  return [yr > 0 && `${yr} yr`, mo > 0 && `${mo} mo`]
    .filter(Boolean)
    .join(' ');
}

function WorkCard({
  exp,
  number,
}: {
  exp: EXPERIENCE_QUERYResult[number];
  number: string;
}) {
  const start = exp.startDate ? parseISO(exp.startDate) : null;
  const end = exp.endDate ? parseISO(exp.endDate) : null;

  return (
    <li className="record">
      <Reveal>
        <article className="record__grid" aria-label={exp.company ?? 'Role'}>
          <header className="record__meta">
            <span className="record__no" aria-hidden>
              {number}
            </span>

            <p className="record__dates">
              {start && (
                <time dateTime={exp.startDate!}>
                  {format(start, 'MMM yyyy')}
                </time>
              )}
              <span aria-hidden>{' — '}</span>
              {end ? (
                <time dateTime={exp.endDate!}>{format(end, 'MMM yyyy')}</time>
              ) : (
                <span className="record__present">Present</span>
              )}
            </p>

            <dl className="record__facts">
              {start && (
                <div className="record__fact">
                  <dt>Tenure</dt>
                  <dd suppressHydrationWarning>
                    {tenureLabel(start, end ?? startOfToday())}
                  </dd>
                </div>
              )}
              <div className="record__fact">
                <dt>Location</dt>
                <dd>
                  {exp.location}
                  {exp.locationType
                    ? ` · ${LOCATION_LABELS[exp.locationType] ?? exp.locationType}`
                    : ''}
                </dd>
              </div>
              {exp.employmentType && (
                <div className="record__fact">
                  <dt>Engagement</dt>
                  <dd>
                    {EMPLOYMENT_LABELS[exp.employmentType] ?? exp.employmentType}
                  </dd>
                </div>
              )}
            </dl>
          </header>

          <div className="record__body">
            <h3 className="record__company">
              {exp.url ? (
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="record__company-link"
                >
                  {exp.company}
                  <svg
                    aria-hidden
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                    className="record__arrow"
                  >
                    <path
                      d="M7 7l9.2 9.2M17 7v10H7"
                      transform="rotate(-90 12 12)"
                    />
                  </svg>
                </a>
              ) : (
                exp.company
              )}
            </h3>
            <p className="record__role">{exp.position}</p>

            {exp.description && (
              <div className="record__description">
                <PortableText value={exp.description} />
              </div>
            )}

            {exp.stacks && exp.stacks.length > 0 && (
              <ul className="record__stack" aria-label="Technologies used">
                {exp.stacks.map((stack) => (
                  <li className="record__stack-item" key={stack._id}>
                    {stack.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>
      </Reveal>
    </li>
  );
}

export default WorkCard;
