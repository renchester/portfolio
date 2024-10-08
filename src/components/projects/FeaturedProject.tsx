'use client';

import './FeaturedProject.scss';
import Link from 'next/link';
import StackItem from '../stacks/StackItem';
import { Variants, motion } from 'framer-motion';
import { PROJECT_ID_QUERYResult, type Project } from '@/sanity/types';
import { urlFor } from '@/sanity/lib/image';
import { DEFAULT_GITHUB, DEFAULT_LIVE } from '@/constants';

function Project({
  project,
  children,
}: {
  project: PROJECT_ID_QUERYResult;
  children?: React.ReactNode;
}) {
  const {
    index,
    logo,
    type,
    name,
    description,
    liveLink,
    repoLink,
    mobileImage,
    image,
    disclaimer,
    stack,
    background,
  } = project!;

  const projectID = `project-${index}-${name}`;

  const logoVariant: Variants = {
    focus: {
      scale: 1.12,
    },
    active: {
      scale: 0.9,
    },
  };

  return (
    <li className="featured__container">
      <article className="featured" aria-labelledby={projectID}>
        <div className="featured__bg-wrapper" style={{ background }}>
          <div className="featured__bg-overlay" />
        </div>

        <div className="featured__main">
          <p className="featured__type">{type}</p>

          <motion.a
            href={repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="featured__logo-wrapper"
            variants={logoVariant}
            whileFocus="focus"
            whileHover="focus"
            whileTap="active"
            tabIndex={0}
          >
            <img
              src={urlFor(logo || '').url()}
              alt={`Logo for ${name}`}
              className="featured__logo"
            />
          </motion.a>
          <span className="featured__name-wrapper">
            <span className="featured__name" id={projectID}>
              {name}
            </span>
          </span>
          <p className="featured__description">
            {description}

            {disclaimer && (
              <small className="featured__disclaimer">{disclaimer}</small>
            )}
          </p>
          <ul className="featured__stack">
            {stack?.map((item) => (
              <StackItem
                item={item}
                width={35}
                key={`${name}-stack--${item}`}
                initTheme="light"
              />
            ))}
          </ul>
          <div className="featured__links">
            <Link
              href={repoLink || DEFAULT_GITHUB}
              className="featured__link github"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/logos/github.svg" alt="Github Logo" />
            </Link>
            <Link
              href={liveLink || DEFAULT_LIVE}
              className="featured__link live"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View Live</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="square"
                strokeLinejoin="round"
              >
                <path d="M7 7l9.2 9.2M17 7v10H7" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="featured__img-gallery">
          <div className="featured__img-wrapper">
            <motion.img
              src={urlFor(mobileImage || '').url()}
              alt={`Mockup on Pixel 5 phone for ${name}`}
              className="featured__img mobile"
              tabIndex={0}
              loading="lazy"
              initial={{ rotate: 0, y: '-50%', x: '-10%' }}
              whileHover={{
                rotate: [null, 8, -8, 5, -5, 3, -3, 1.5, -1.5, 0],
                x: '-12%',
                y: '-52%',
              }}
              whileFocus={{
                rotate: [null, 8, -8, 5, -5, 3, -3, 1.5, -1.5, 0],
                x: '-12%',
                y: '-52%',
              }}
            />
            <motion.img
              src={urlFor(image || '').url()}
              alt={`Mockup on Laptop for ${name}`}
              className="featured__img desktop"
              loading="lazy"
            />
          </div>

          {children}
        </div>
      </article>
    </li>
  );
}

export default Project;
