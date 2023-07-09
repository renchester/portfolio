import Link from 'next/link';
import { StaticImageData } from 'next/image';
import stacks from '@/config/stacks';

type ProjectProps = {
  index: number;
  logo?: StaticImageData;
  type: string;
  title: string;
  description: string;
  disclaimer?: string;
  liveLink: string;
  repoLink: string;
  techStack: string[];
};

function Project(props: ProjectProps) {
  const {
    index,
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
    <article className="featured" aria-labelledby={projectID}>
      <div className="featured__main">
        <p className="featured__type">{type}</p>
        <h4 className="featured__title" id={projectID}>
          {index}. {title}
        </h4>
        <p className="featured__description">{description}</p>
        {disclaimer && (
          <small className="featured__disclaimer">{disclaimer}</small>
        )}

        <ul className="featured__stack">
          {/* //TODO: Perform lookup on a map/dictionary of stack used */}
          {techStack.map((item) => (
            <li
              className="featured__item"
              key={`${title}-${item}`}
              title={stacks[item].title}
            >
              {item}
            </li>
          ))}
        </ul>

        <Link
          href={repoLink}
          className="featured__link github"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </Link>
        <Link
          href={liveLink}
          className="featured__link live"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Live
        </Link>
      </div>
      <div className="featured__img-gallery">
        {/* //TODO: Figure out how to add images */}
      </div>
    </article>
  );
}

export default Project;
