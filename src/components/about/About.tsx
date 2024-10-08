import './About.scss';
import Link from 'next/link';
import StackItem from '../stacks/StackItem';
import SectionTitle from '../animations/SectionTitle';
import AboutMemoji from './AboutMemoji';
import { client } from '@/sanity/lib/client';
import { STACKS_QUERY } from '@/sanity/queries';
import { PortableText } from 'next-sanity';
import { AUTHOR_QUERYResult } from '@/sanity/types';

const options = { next: { revalidate: 3600 } }; // 1 hour

async function About({ author }: { author: AUTHOR_QUERYResult }) {
  const stacks = await client.fetch(STACKS_QUERY, undefined, options);

  return (
    <section
      className="home-section about"
      aria-label="About section"
      id="about"
    >
      <div className="about__wrapper">
        <AboutMemoji imgSrc={author?.memojiImage1} />
        <article className="about__main" aria-labelledby="about-me">
          <SectionTitle id="about-me" className="about__title" title="About" />

          <div className="about__description">
            <PortableText value={author?.bio || []} />
          </div>
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
                {stacks.frontend.map((stack) => (
                  <StackItem key={stack._id} item={stack} />
                ))}

                {/* <StackItem name="react" />
                <StackItem name="next" />
                <StackItem name="redux" />
                <StackItem name="javascript" />
                <StackItem name="typescript" />
                <StackItem name="html" />
                <StackItem name="css" />
                <StackItem name="sass" />
                <StackItem name="tailwind" />
                <StackItem name="framer" /> */}
              </ul>
            </li>
            <li className="stack__tech-item">
              <h3 className="stack__tech-title" id="back-end--list">
                Back End
              </h3>
              <ul className="stack__list" aria-labelledby="back-end--list">
                {/* //* BACK END */}
                {stacks.backend.map((stack) => (
                  <StackItem key={stack._id} item={stack} />
                ))}

                {/* <StackItem name="node" />
                <StackItem name="mongodb" />
                <StackItem name="mongoose" />
                <StackItem name="express" />
                <StackItem name="hono" />
                <StackItem name="firebase" />
                <StackItem name="postgresql" />
                <StackItem name="sqlite" />
                <StackItem name="prisma" />
                <StackItem name="cloudflare" />
                <StackItem name="passportjs" /> */}
              </ul>
            </li>
            <li className="stack__tech-item">
              <h3 className="stack__tech-title" id="dev-tools--list">
                Developer Tools
              </h3>
              <ul aria-labelledby="dev-tools--list" className="stack__list">
                {/*  //* DEV TOOLS */}
                {stacks.devtools.map((stack) => (
                  <StackItem key={stack._id} item={stack} />
                ))}

                {/* <StackItem name="git" />
                <StackItem name="github" />
                <StackItem name="linux" />
                <StackItem name="webpack" />
                <StackItem name="vite" />
                <StackItem name="vitest" />
                <StackItem name="jest" />
                <StackItem name="notion" />
                <StackItem name="capacitor" />
                <StackItem name="npm" />
                <StackItem name="figma" /> */}
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
                href={author?.linkedin || ''}
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
                href={author?.github || ''}
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
                {author?.email || ''}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
export default About;
