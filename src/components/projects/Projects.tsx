import './Projects.scss';
import FeaturedProject from './FeaturedProject';
import GalleryProject from './GalleryProject';
import Link from 'next/link';

function Projects() {
  return (
    <section
      className="home-section projects"
      id="projects-section"
      aria-labelledby='projects__title"'
    >
      <div className="projects__wrapper">
        <h1 className="projects__title" id="projects__title">
          Projects
        </h1>
        <ol className="projects__featured">
          {/* // * Reddit Clone */}
          <FeaturedProject
            index={1}
            logo="/projects/reddit/logo.png"
            type="Full-stack Social Media App"
            title="Reddit Apollo Clone"
            description=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi quaerat mollitia architecto autem, accusamus ratione fugiat labore unde possimus, deleniti ipsam perspiciatis, fugit sunt. "
            liveLink=""
            repoLink=""
            techStack={['next', 'react', 'typescript', 'firebase', 'framer']}
          >
            <span>Child Element</span>
          </FeaturedProject>
          {/* // * Dezien Blog */}
          <FeaturedProject
            index={2}
            logo="/projects/dezien/logo.png"
            type="Full-stack Blog Application"
            title="Dezien Blog"
            description=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi quaerat mollitia architecto autem, accusamus ratione fugiat labore unde possimus, deleniti ipsam perspiciatis, fugit sunt. "
            disclaimer="Note: This project's backend is hosted on a free Render plan. Features like comments and auth services may take a couple of seconds to spin up."
            liveLink=""
            repoLink=""
            techStack={[
              'next',
              'react',
              'node',
              'express',
              'mongodb',
              'passportjs',
              'sass',
            ]}
          />
          {/* // * Hidden Hunt */}
          <FeaturedProject
            index={3}
            logo="/projects/hidden-hunt/logo.png"
            type="Full-stack Web Game"
            title="Hidden Hunt"
            description=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi quaerat mollitia architecto autem, accusamus ratione fugiat labore unde possimus, deleniti ipsam perspiciatis, fugit sunt. "
            liveLink=""
            repoLink=""
            techStack={[
              'react',
              'react_router',
              'vite',
              'firebase',
              'tailwind',
            ]}
          />
          {/* // * Savant Eyewear */}
          <FeaturedProject
            index={4}
            logo="/projects/savant/logo.png"
            type="Front-end E-commerce Site"
            title="Savant Eyewear"
            description=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi quaerat mollitia architecto autem, accusamus ratione fugiat labore unde possimus, deleniti ipsam perspiciatis, fugit sunt. "
            liveLink=""
            repoLink=""
            techStack={[
              'react',
              'react_router',
              'vite',
              'vitest',
              'javascript',
              'sass',
              'framer',
            ]}
          />
        </ol>
      </div>

      <section
        className="projects__gallery"
        aria-label="Gallery of portfolio subject's other projects"
      >
        <h4 className="projects__gallery-title">
          <Link
            href={`https://github.com/renchester?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>More Works</span>{' '}
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
        </h4>
        <ul className="projects__gallery-list">
          <GalleryProject
            image="/projects/home-page.png"
            title="Weather App"
            liveLink=""
          />
          <GalleryProject
            image="/projects/home-page.png"
            title="What to Watch Next"
            liveLink=""
          />
          <GalleryProject
            image="/projects/home-page.png"
            title="Battleship"
            liveLink=""
          />
          <GalleryProject
            image="/projects/home-page.png"
            title="CV Generator"
            liveLink=""
          />
          <GalleryProject
            image="/projects/home-page.png"
            title="Avatar Memory Game"
            liveLink=""
          />
        </ul>
        <ul className="projects__gallery-list">
          <GalleryProject
            image="/projects/home-page.png"
            title="Tic-Tac-Toe"
            liveLink=""
          />
          <GalleryProject
            image="/projects/home-page.png"
            title="Rock Paper Scissors"
            liveLink=""
          />
          <GalleryProject
            image="/projects/home-page.png"
            title="Knight's Travails"
            liveLink=""
          />
          <GalleryProject
            image="/projects/home-page.png"
            title="To-Do App"
            liveLink=""
          />
          <GalleryProject
            image="/projects/home-page.png"
            title="Library"
            liveLink=""
          />
        </ul>
      </section>
    </section>
  );
}

export default Projects;
