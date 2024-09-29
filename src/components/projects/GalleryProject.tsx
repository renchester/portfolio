'use client';

import Link from 'next/link';
import './GalleryProject.scss';
import { useState } from 'react';
import { Variants, motion, AnimatePresence } from 'framer-motion';

type GalleryProjectProps = {
  image: string; //path
  title: string;
  subtitle?: string;
  liveLink: string;
};

function GalleryProject(props: GalleryProjectProps) {
  const { image, title, subtitle, liveLink } = props;

  const [isFocus, setFocus] = useState(false);

  const showDetails = () => setFocus(true);
  const hideDetails = () => setFocus(false);

  const popVariant: Variants = {
    initial: {
      opacity: 0,
      y: 40,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween',
        duration: 0.25,
      },
    },
  };

  return (
    <li className="gallery" aria-label={title}>
      <Link
        href={liveLink}
        target="_blank"
        rel="noopener noreferrer"
        onFocus={showDetails}
        onBlur={hideDetails}
        onMouseEnter={showDetails}
        onMouseLeave={hideDetails}
      >
        <img
          src={image}
          alt={`Screen grab from ${title} live view`}
          className="gallery__img"
          loading="lazy"
        />

        <AnimatePresence>
          {isFocus && (
            <motion.div
              className="gallery__pop"
              variants={popVariant}
              initial="initial"
              animate="animate"
              exit="initial"
            >
              <div className="gallery__details">
                <h4 className="gallery__title">{title}</h4>
                {subtitle && (
                  <span className="gallery__subtitle">{subtitle}</span>
                )}
              </div>
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
            </motion.div>
          )}
        </AnimatePresence>
      </Link>
    </li>
  );
}

export default GalleryProject;
