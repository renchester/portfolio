import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import FeaturedProject from './FeaturedProject';
import ArchiveIndex, { ArchiveEntry } from './ArchiveIndex';
import SectionTitle from '../animations/SectionTitle';
import Reveal from '../animations/Reveal';
import { notFound } from 'next/navigation';
import { PROJECTS_QUERYResult } from '@/sanity/types';
import { PROJECTS_QUERY } from '@/sanity/queries';
import { urlFor } from '@/sanity/lib/image';
import refDimensions from '@/utils/refDimensions';
import './Projects.scss';

const options = { next: { revalidate: 600 } }; // 10 minutes

async function Projects() {
  const projects = await client.fetch(PROJECTS_QUERY, undefined, options);

  if (!projects || !projects[0]) {
    notFound();
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
  const archiveEntries: ArchiveEntry[] = others.map((proj) => {
    const dims = refDimensions(proj.image);
    return {
      id: proj._id,
      number: String(proj.index ?? 0).padStart(2, '0'),
      name: proj.name || 'Untitled',
      type: proj.type,
      materials: (proj.stack ?? [])
        .slice(0, 4)
        .map((item) => item.name)
        .filter((n): n is string => Boolean(n)),
      href: proj.liveLink || proj.repoLink || '',
      previewSrc: urlFor(proj.image).width(720).url(),
      previewWidth: dims?.width,
      previewHeight: dims?.height,
    };
  });

  return (
    <section
      className="home-section projects"
      id="projects"
      aria-labelledby="projects__title"
    >
      <div className="projects__wrapper">
        <SectionTitle
          className="projects__title"
          id="projects__title"
          title="Projects"
          index="04"
        />
        <ol className="projects__featured">
          {featuredProjects.map((proj) => (
            <FeaturedProject key={proj._id} project={proj} />
          ))}
        </ol>
      </div>

      {archiveEntries.length > 0 && (
        <section
          className="projects__archive"
          aria-label="Archive of additional works"
        >
          <div className="projects__wrapper">
            <Reveal>
              <header className="projects__archive-head">
                <h3 className="projects__archive-title">
                  Archive — additional works
                </h3>
                <Link
                  className="projects__archive-more u-underline"
                  href="https://github.com/renchester?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Full archive on Github
                </Link>
              </header>
              <ArchiveIndex entries={archiveEntries} />
            </Reveal>
          </div>
        </section>
      )}
    </section>
  );
}

export default Projects;
