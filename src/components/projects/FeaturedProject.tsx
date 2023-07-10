import './FeaturedProject.scss';
import Link from 'next/link';
import stacks from '@/config/stacks';
import StackItem from '../stacks/StackItem';
import { ReactNode } from 'react';

type ProjectProps = {
  children?: ReactNode;
  index: number;
  logo: string; //path
  type: string;
  title: string;
  description: string;
  disclaimer?: string;
  liveLink: string;
  repoLink: string;
  techStack: (keyof typeof stacks)[];
};

function Project(props: ProjectProps) {
  const {
    children,
    index,
    logo,
    type,
    title,
    description,
    liveLink,
    repoLink,
    disclaimer,
    techStack,
  } = props;
  const projectID = `project-${index}-${title}`;

  return (
    <li>
      <article className="featured" aria-labelledby={projectID}>
        <div className="featured__main">
          <p className="featured__type">{type}</p>

          <div className="featured__logo-wrapper">
            <img
              src={logo}
              alt={`Logo for ${title}`}
              className="featured__logo"
            />
          </div>
          <h4 className="featured__title-wrapper">
            <span className="featured__title" id={projectID}>
              {title}
            </span>
          </h4>
          <p className="featured__description">
            {description}

            {disclaimer && (
              <small className="featured__disclaimer">{disclaimer}</small>
            )}
          </p>
          <ul className="featured__stack">
            {/* //TODO: Perform lookup on a map/dictionary of stack used */}
            {techStack.map((item) => (
              <StackItem
                name={item}
                width={35}
                key={`${title}-stack--${item}`}
                initTheme="light"
              />
            ))}
          </ul>
          <div className="featured__links">
            <Link
              href={repoLink}
              className="featured__link github"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/logos/github.svg" alt="Github Logo" />
            </Link>
            <Link
              href={liveLink}
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
          {/* //TODO: Figure out how to add images */}
          {children}
        </div>
      </article>
    </li>
  );
}

export default Project;
