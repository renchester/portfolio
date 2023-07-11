'use client';

import './About.scss';
import Link from 'next/link';
import StackItem from '../stacks/StackItem';

function About() {
  return (
    <section
      className="home-section about"
      aria-label="About section"
      id="about"
    >
      <div className="about__wrapper">
        <article className="about__main" aria-labelledby="about-renchester">
          <h1 className="about__title" id="about-renchester">
            About
          </h1>
          {/*// TODO: Refactor this paragraph */}
          <p className="about__description">
            Hi, I&apos;m Chester. I am a self-taught web
            developer—fully-investing my time into web dev since the start of
            2023. I have a background in architecture, which allows me to always
            think about how my product is going to be used by the end-user. I am
            into sustainability, accessibility, and user-centric solutions.
            Currently I am studying: GraphQL and SQL. Talk about TOP and FSO. I
            am a quick learner. Incorporate buzz words from linkedin about.
          </p>
        </article>
        <article className="stack" id="">
          <h2 className="stack__title">My Tech Stack</h2>

          <ul className="stack__tech">
            <li className="stack__tech-item">
              <h3 className="stack__tech-title" id="front-end--list">
                Front End
              </h3>
              <ul className="stack__list" aria-labelledby="front-end--list">
                {/* //* FRONT END */}
                <StackItem name="react" />
                <StackItem name="next" />
                <StackItem name="react_router" />
                <StackItem name="framer" />
                <StackItem name="javascript" />
                <StackItem name="typescript" />
                <StackItem name="html" />
                <StackItem name="css" />
                <StackItem name="sass" />
                <StackItem name="tailwind" />
              </ul>
            </li>
            <li className="stack__tech-item">
              <h3 className="stack__tech-title" id="back-end--list">
                Back End
              </h3>
              <ul className="stack__list" aria-labelledby="back-end--list">
                {/* //* BACK END */}
                <StackItem name="mongodb" />
                <StackItem name="mongoose" />
                <StackItem name="express" />
                <StackItem name="node" />
                <StackItem name="firebase" />
                <StackItem name="passportjs" />
              </ul>
            </li>
            <li className="stack__tech-item">
              <h3 className="stack__tech-title" id="dev-tools--list">
                Developer Tools
              </h3>
              <ul aria-labelledby="dev-tools--list" className="stack__list">
                {/*  //* DEV TOOLS */}
                <StackItem name="git" />
                <StackItem name="github" />
                <StackItem name="linux" />
                <StackItem name="webpack" />
                <StackItem name="vite" />
                <StackItem name="vitest" />
                <StackItem name="jest" />
                <StackItem name="notion" />
              </ul>
            </li>
          </ul>
        </article>

        {/* //TODO: ADD Linkedin and Github links here */}

        <div className="about__links-wrapper">
          <h3 className="about__links-title">Connect with me</h3>
          <ul className="about__links">
            <li>
              <Link
                className="about__link"
                href={`https://www.linkedin.com/in/renchesterramos/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/logos/linkedin.svg"
                  className="about__link-icon"
                  alt="Linkedin Logo"
                />
                <span>Linkedin</span>
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
            </li>
            <li>
              <Link
                className="about__link"
                href={`https://github.com/renchester`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/logos/github.svg"
                  className="about__link-icon"
                  alt="Github Logo"
                />
                <span>Github</span>
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
            </li>
            <li>
              <button className="about__link" type="button">
                renchesterjramos@gmail.com
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
export default About;
