import './FeaturedProject.scss';
import Link from 'next/link';
import ImageReveal from '../animations/ImageReveal';
import Reveal from '../animations/Reveal';
import { PROJECT_ID_QUERYResult } from '@/sanity/types';
import { urlFor } from '@/sanity/lib/image';
import { DEFAULT_GITHUB, DEFAULT_LIVE } from '@/constants';

// Sanity asset refs encode intrinsic size, e.g. "image-abc123-1216x735-png".
// Width/height attributes let the browser reserve space before the image loads.
function refDimensions(image?: { asset?: { _ref: string } | null } | null) {
  const match = image?.asset?._ref.match(/-(\d+)x(\d+)-/);
  if (!match) return undefined;
  return { width: Number(match[1]), height: Number(match[2]) };
}

function Project({
  project,
  children,
}: {
  project: PROJECT_ID_QUERYResult;
  children?: React.ReactNode;
}) {
  const {
    index,
    type,
    name,
    description,
    liveLink,
    repoLink,
    mobileImage,
    image,
    disclaimer,
    stack,
  } = project!;

  const projectID = `project-${index}-${name}`;
  const number = String(index ?? 0).padStart(2, '0');
  const mobileDims = refDimensions(mobileImage);
  const desktopDims = refDimensions(image);

  return (
    <li className="featured__container">
      <article className="featured" aria-labelledby={projectID}>
        <header className="featured__head">
          <span className="featured__no" aria-hidden>
            {number}
          </span>
          <div className="featured__head-text">
            <h3 className="featured__title" id={projectID}>
              {name}
            </h3>
            <p className="featured__type">{type}</p>
          </div>
        </header>

        <div className="featured__body">
          <div className="featured__info">
            <p className="featured__description">
              {description}

              {disclaimer && (
                <small className="featured__disclaimer">{disclaimer}</small>
              )}
            </p>

            <ul className="featured__stack" aria-label="Built with">
              {stack?.map((item) => (
                <li
                  className="featured__stack-item"
                  key={`${name}-stack--${item.name}`}
                >
                  {item.name}
                </li>
              ))}
            </ul>

            <div className="featured__links">
              <Link
                href={repoLink || DEFAULT_GITHUB}
                className="featured__link u-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
                <svg
                  aria-hidden
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                >
                  <path d="M7 7l9.2 9.2M17 7v10H7" transform="rotate(-90 12 12)" />
                </svg>
              </Link>
              <Link
                href={liveLink || DEFAULT_LIVE}
                className="featured__link u-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View live
                <svg
                  aria-hidden
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                >
                  <path d="M7 7l9.2 9.2M17 7v10H7" transform="rotate(-90 12 12)" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="featured__img-wrapper">
            <ImageReveal>
              <img
                src={urlFor(image).width(1600).url()}
                alt={`Mockup on Laptop for ${name}`}
                className="featured__img desktop"
                loading="lazy"
                {...desktopDims}
              />
            </ImageReveal>
            <Reveal className="featured__phone" delay={0.25} y={20}>
              <img
                src={urlFor(mobileImage).width(640).url()}
                alt={`Mockup on Pixel 5 phone for ${name}`}
                className="featured__img mobile"
                loading="lazy"
                {...mobileDims}
              />
            </Reveal>
          </div>

          {children}
        </div>
      </article>
    </li>
  );
}

export default Project;
