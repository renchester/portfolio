'use client';

import Link from 'next/link';
import './GalleryProject.scss';
import { useState } from 'react';

type GalleryProjectProps = {
  image: string; //path
  title: string;
  liveLink: string;
};

function GalleryProject(props: GalleryProjectProps) {
  const { image, title, liveLink } = props;

  const [isFocus, setFocus] = useState(false);

  const showDetails = () => setFocus(true);
  const hideDetails = () => setFocus(false);

  return (
    <li
      className="gallery"
      aria-label={title}
      tabIndex={0}
      onFocus={showDetails}
      onBlur={hideDetails}
      onMouseEnter={showDetails}
      onMouseLeave={hideDetails}
    >
      <Link href={liveLink} target="_blank" rel="noopener noreferrer">
        <img
          src={image}
          alt={`Screen grab from ${title} live view`}
          className="gallery__img"
        />

        {isFocus && (
          <div className="gallery__pop">
            <h4 className="gallery__details">{title}</h4>
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
          </div>
        )}
      </Link>
    </li>
  );
}

export default GalleryProject;