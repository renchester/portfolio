import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import FeaturedProject from './FeaturedProject';
import GalleryProject from './GalleryProject';
import SectionTitle from '../animations/SectionTitle';
import { redirect } from 'next/navigation';
import { PROJECTS_QUERYResult } from '@/sanity/types';
import { PROJECTS_QUERY } from '@/sanity/queries';
import { chunks } from '@/utils/chunks';
import { urlFor } from '@/sanity/lib/image';
import './Projects.scss';

const options = { next: { revalidate: 600 } }; // 10 minutes

async function Projects() {
  const projects = await client.fetch(PROJECTS_QUERY, undefined, options);

  // Redirect back to main page if something is broken
  if (!projects || !projects[0]) {
    redirect('https://renchester.dev');
  }

  // Using reduce to split the array
  const { featuredProjects, others } = projects.reduce(
    (acc, project) => {
      // Check the isFeatured property and push the item to the appropriate array
      project.isFeatured
        ? acc.featuredProjects.push(project)
        : acc.others.push(project);
      return acc;
    },
    {
      featuredProjects: [] as PROJECTS_QUERYResult,
      others: [] as PROJECTS_QUERYResult,
    },
  );
  const otherProjects = [...chunks(others, 4)];

  return (
    <section
      className="home-section projects"
      id="projects"
      aria-labelledby='projects__title"'
    >
      <div className="projects__wrapper">
        <SectionTitle
          className="projects__title"
          id="projects__title"
          title="Projects"
        />
        <ol className="projects__featured">
          {featuredProjects.map((proj) => (
            <FeaturedProject key={proj._id} project={proj} />
          ))}
        </ol>
      </div>

      <section
        className="projects__gallery"
        aria-label="Gallery of portfolio subject's other projects"
      >
        <span className="projects__gallery-title">
          <Link
            href={`https://github.com/renchester?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>More Works</span>{' '}
            <svg
              aria-hidden
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
        </span>

        {otherProjects.map((projArr) => (
          <ul className="projects__gallery-list" key={projArr[0]._id}>
            {projArr.map((proj) => (
              <GalleryProject
                key={proj._id}
                image={urlFor(proj.image).url()}
                title={proj.name || ''}
                subtitle={proj.type}
                liveLink={proj.liveLink || ''}
              />
            ))}
          </ul>
        ))}
      </section>
    </section>
  );
}

export default Projects;
