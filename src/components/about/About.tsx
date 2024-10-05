'use client';

import './About.scss';
import Link from 'next/link';
import StackItem from '../stacks/StackItem';
import SectionTitle from '../animations/SectionTitle';
import { motion } from 'framer-motion';

function About() {
  return (
    <section
      className="home-section about"
      aria-label="About section"
      id="about"
    >
      <div className="about__wrapper">
        <motion.img
          src="/memoji_3.webp"
          alt="Memoji of portfolio subject working on a Macbook"
          className="about__memoji"
          loading="lazy"
          variants={{
            initial: {
              rotate: 0,
              opacity: 0.85,
            },
            focus: {
              rotate: [null, -10, 10, -5, 5, 0],
              transition: {
                duration: 1,
                ease: 'easeInOut',
              },
            },
          }}
          initial="initial"
          whileFocus="focus"
          whileHover="focus"
        />

        <article className="about__main" aria-labelledby="about-renchester">
          <SectionTitle
            id="about-renchester"
            className="about__title"
            title="About"
          />

          <p className="about__description">
            Hi, I&apos;m Chester. I am a self-taught web
            developer—fully-investing my time into learning web development at
            the beginning of 2023. My background in architecture allows me to
            always view projects from the perspective of the end-user. Just as
            an architect&apos;s fundamentals are functionality, aesthetics, and
            usability—I strive to create products that not only meet the
            technical requirements of the project, but are also user-friendly
            and enjoyable to use.
          </p>

          <p className="about__description">
            I learned web development skills through{' '}
            <Link
              href="https://theodinproject.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Odin Project
            </Link>{' '}
            and{' '}
            <Link
              href="https://fullstackopen.com/en/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Full Stack Open
            </Link>
            . This has provided me with opportunities to work on projects that
            constantly challenge me to learn and apply new principles,
            frameworks, and technologies. There is always so much to learn and I
            cannot wait to tackle the endless learning possibilities in this
            field.
          </p>
        </article>
        <article className="stack" aria-labelledby="about-stack--title">
          <h2 className="stack__title" id="about-stack--title">
            My Tech Stack
          </h2>

          <ul className="stack__tech">
            <li className="stack__tech-item">
              <h3 className="stack__tech-title" id="front-end--list">
                Front End
              </h3>
              <ul className="stack__list" aria-labelledby="front-end--list">
                {/* //* FRONT END */}
                <StackItem name="react" />
                <StackItem name="next" />
                <StackItem name="redux" />
                <StackItem name="javascript" />
                <StackItem name="typescript" />
                <StackItem name="html" />
                <StackItem name="css" />
                <StackItem name="sass" />
                <StackItem name="tailwind" />
                <StackItem name="framer" />
              </ul>
            </li>
            <li className="stack__tech-item">
              <h3 className="stack__tech-title" id="back-end--list">
                Back End
              </h3>
              <ul className="stack__list" aria-labelledby="back-end--list">
                {/* //* BACK END */}
                <StackItem name="node" />
                <StackItem name="mongodb" />
                <StackItem name="mongoose" />
                <StackItem name="express" />
                <StackItem name="hono" />
                <StackItem name="firebase" />
                <StackItem name="postgresql" />
                <StackItem name="sqlite" />
                <StackItem name="prisma" />
                <StackItem name="cloudflare" />
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
                <StackItem name="capacitor" />
                <StackItem name="npm" />
                <StackItem name="figma" />
              </ul>
            </li>
          </ul>
        </article>

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
              </Link>
            </li>
            <li>
              <Link className="about__link" href="#contact">
                renchesterjramos@gmail.com
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
export default About;
