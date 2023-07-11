import './Projects.scss';
import FeaturedProject from './FeaturedProject';
import GalleryProject from './GalleryProject';
import Link from 'next/link';

function Projects() {
  return (
    <section
      className="home-section projects"
      id="projects"
      aria-labelledby='projects__title"'
    >
      <div className="projects__wrapper">
        <h1 className="projects__title" id="projects__title">
          Projects
        </h1>
        <ol className="projects__featured">
          {/* // * Reddit Clone */}
          <FeaturedProject
            mobileView={`/projects/reddit/mobile.png`}
            desktopView={`/projects/reddit/desktop.png`}
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
          ></FeaturedProject>
          {/* // * Dezien Blog */}
          <FeaturedProject
            mobileView={`/projects/dezien/mobile.png`}
            desktopView={`/projects/dezien/desktop.png`}
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
          />
          {/* // * Hidden Hunt */}
          <FeaturedProject
            mobileView={`/projects/hidden-hunt/mobile.png`}
            desktopView={`/projects/hidden-hunt/desktop.png`}
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
          />
          {/* // * Savant Eyewear */}
          <FeaturedProject
            mobileView={`/projects/savant/mobile.png`}
            desktopView={`/projects/savant/desktop.png`}
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
            image="/projects/gallery/what-to-watch-next.png"
            title="What to Watch Next"
            liveLink="https://what-to-watch-next.vercel.app/"
          />
          <GalleryProject
            image="/projects/gallery/battleship.png"
            title="Battleship"
            liveLink="https://renchester.github.io/top-battleship/"
          />
          <GalleryProject
            image="/projects/gallery/weather-app.png"
            title="Weather App"
            liveLink="https://renchester.github.io/top-weather-app/"
          />
          <GalleryProject
            image="/projects/gallery/cv-generator.png"
            title="CV Generator"
            liveLink="https://renchester.github.io/cv-generator/"
          />
          <GalleryProject
            image="/projects/gallery/rock-paper-scissors.png"
            title="Rock Paper Scissors"
            liveLink="https://renchester.github.io/top-rock-paper-scissors/"
          />
        </ul>
        <ul className="projects__gallery-list">
          <GalleryProject
            image="/projects/gallery/knights-travails.png"
            title="Knight's Travails"
            liveLink="https://renchester.github.io/knights-travails/"
          />
          <GalleryProject
            image="/projects/gallery/todo-list.png"
            title="To-Do App"
            liveLink="https://todo-list-renchester.vercel.app/"
          />
          <GalleryProject
            image="/projects/gallery/memory-game.png"
            title="Avatar Memory Game"
            liveLink="https://renchester.github.io/memory-game/"
          />
          <GalleryProject
            image="/projects/gallery/tic-tac-toe.png"
            title="Tic-Tac-Toe"
            liveLink="https://renchester.github.io/top-tictactoe/"
          />
          <GalleryProject
            image="/projects/gallery/library.png"
            title="Library"
            liveLink="https://renchester.github.io/top-library/"
          />
        </ul>
      </section>
    </section>
  );
}

export default Projects;
