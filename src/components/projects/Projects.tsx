import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import FeaturedProject from './FeaturedProject';
import GalleryProject from './GalleryProject';
import SectionTitle from '../animations/SectionTitle';
import { notFound } from 'next/navigation';
import { PROJECTS_QUERYResult } from '@/sanity/types';
import { PROJECTS_QUERY } from '@/sanity/queries';
import { chunks } from '@/utils/chunks';
import { urlFor } from '@/sanity/lib/image';
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

          {/* // * Reddit Clone */}
          {/* <FeaturedProject
            mobileView={`/projects/reddit/mobile.webp`}
            desktopView={`/projects/reddit/desktop.webp`}
            index={1}
            logo="/projects/reddit/logo.png"
            type="Full-stack Social Media App"
            title="Reddit Apollo Clone"
            description="This Reddit clone replicates the basic features of Reddit, styled in the manner of the now defunct Apollo App. You can create accounts, posts, comments, and subreddits; and many more! This social media app was built with Next.js for the frontend and Firebase services for the backend."
            liveLink="https://reddit-apollo-clone.vercel.app/"
            repoLink="https://github.com/renchester/reddit-apollo-clone"
            background="#b1421a"
            techStack={[
              'next',
              'react',
              'typescript',
              'firebase',
              'framer',
              'sass',
            ]}
          ></FeaturedProject> */}
          {/* // * Dezien Blog */}
          {/* <FeaturedProject
            mobileView={`/projects/dezien/mobile.webp`}
            desktopView={`/projects/dezien/desktop.webp`}
            index={2}
            logo="/projects/dezien/logo.png"
            type="Full-stack Blog Application"
            title="Dezien Blog"
            description="Dezien is a blog focusing on architecture, design, and tech. The blog is built on an underlying RESTful API that manages content and handles authentication. The backend integrates with the client through Next.js' static-site generation to serve content quickly to the user."
            disclaimer="Note: This project's backend is hosted on a free Render plan. Features like comments and auth services may take a couple of seconds to spin up."
            liveLink="https://dezien-blog.vercel.app/"
            repoLink="https://github.com/renchester/design-blog"
            background="#1687ED"
            techStack={[
              'next',
              'react',
              'typescript',
              'node',
              'express',
              'mongodb',
              'passportjs',
              'sass',
            ]}
          /> */}
          {/* // * Hidden Hunt */}
          {/* <FeaturedProject
            mobileView={`/projects/hidden-hunt/mobile.webp`}
            desktopView={`/projects/hidden-hunt/desktop.webp`}
            index={3}
            logo="/projects/hidden-hunt/logo.png"
            type="Full-stack Web Game"
            title="Hidden Hunt"
            description={`This is a seek-and-find web game based on the "Where's Waldo?" series.The game has three maps with different levels of difficulty. In each map, you must find all the specified characters in the least amount of time. Try to beat the scores in the leaderboard!`}
            liveLink="https://hidden-hunt.vercel.app/"
            repoLink="https://github.com/renchester/hidden-hunt"
            background="#4B1796"
            techStack={[
              'react',
              'react_router',
              'vite',
              'typescript',
              'firebase',
              'tailwind',
            ]}
          /> */}
          {/* // * Savant Eyewear */}
          {/* <FeaturedProject
            mobileView={`/projects/savant/mobile.webp`}
            desktopView={`/projects/savant/desktop.webp`}
            index={4}
            logo="/projects/savant/logo.png"
            type="Front-end E-commerce Site"
            title="Savant Eyewear"
            description="Savant Eyewear is a mock-up of an e-commerce site that sells high-end eyewear products. A product search and sorter allows users to browse and find the perfect product which they can add to their cart!"
            liveLink="https://savant-eyewear.vercel.app/"
            repoLink="https://github.com/renchester/eyewear-shop"
            background="#a07b00"
            techStack={[
              'react',
              'react_router',
              'vite',
              'vitest',
              'javascript',
              'framer',
              'sass',
            ]}
          /> */}
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
                image={urlFor(proj.image || '').url()}
                title={proj.name || ''}
                liveLink={proj.liveLink || ''}
              />
            ))}
          </ul>
        ))}

        {/* <ul className="projects__gallery-list">
          <GalleryProject
            image="/projects/gallery/what-to-watch-next.webp"
            title="What to Watch Next"
            liveLink="https://what-to-watch-next.vercel.app/"
          />
          <GalleryProject
            image="/projects/gallery/battleship.webp"
            title="Battleship"
            liveLink="https://renchester.github.io/top-battleship/"
          />
          <GalleryProject
            image="/projects/gallery/weather-app.webp"
            title="Weather App"
            liveLink="https://renchester.github.io/top-weather-app/"
          />
          <GalleryProject
            image="/projects/gallery/cv-generator.webp"
            title="CV Generator"
            liveLink="https://renchester.github.io/cv-generator/"
          />
        </ul>
        <ul className="projects__gallery-list">
          <GalleryProject
            image="/projects/gallery/memory-game.webp"
            title="Avatar Memory Game"
            liveLink="https://renchester.github.io/memory-game/"
          />
          <GalleryProject
            image="/projects/gallery/patient-booking.webp"
            title="SwiftCare Mockups"
            liveLink="http://tinyurl.com/figma-patient-booking-app"
          />
          <GalleryProject
            image="/projects/gallery/timepieces.webp"
            title="Timepieces"
            subtitle="A time-tracking web app"
            liveLink="https://timepieces.vercel.app/"
          />
          <GalleryProject
            image="/projects/gallery/tic-tac-toe.webp"
            title="Tic-Tac-Toe"
            liveLink="https://renchester.github.io/top-tictactoe/"
          />
        </ul>
        <ul className="projects__gallery-list">
          <GalleryProject
            image="/projects/gallery/knights-travails.webp"
            title="Knight's Travails"
            liveLink="https://renchester.github.io/knights-travails/"
          />
          <GalleryProject
            image="/projects/gallery/todo-list.webp"
            title="To-Do App"
            liveLink="https://todo-list-renchester.vercel.app/"
          />
        </ul> */}
      </section>
    </section>
  );
}

export default Projects;
