import './About.scss';
import Link from 'next/link';
import Reveal from '../animations/Reveal';
import SectionTitle from '../animations/SectionTitle';
import { client } from '@/sanity/lib/client';
import { STACKS_QUERY } from '@/sanity/queries';
import { PortableText } from 'next-sanity';
import { AUTHOR_QUERYResult } from '@/sanity/types';
import { urlFor } from '@/sanity/lib/image';

const options = { next: { revalidate: 3600 } }; // 1 hour

async function About({ author }: { author: AUTHOR_QUERYResult }) {
  const stacks = await client.fetch(STACKS_QUERY, undefined, options);

  const materials = [
    { id: 'front-end--list', label: 'Front End', items: stacks.frontend },
    { id: 'back-end--list', label: 'Back End', items: stacks.backend },
    { id: 'dev-tools--list', label: 'Tools', items: stacks.devtools },
  ];

  return (
    <section
      className="home-section about"
      aria-label="About section"
      id="about"
    >
      <div className="about__wrapper">
        <article className="about__main" aria-labelledby="about-me">
          <SectionTitle
            id="about-me"
            className="about__title"
            title="About"
            index="02"
          />

          <div className="about__columns">
            <Reveal className="about__description">
              <PortableText value={author?.bio || []} />
            </Reveal>

            {author?.heroImage && (
              <Reveal className="about__figure-wrap" delay={0.15}>
                <figure className="about__figure">
                  <img
                    src={urlFor(author.heroImage).width(480).url()}
                    alt={`Portrait of ${author.firstName} ${author.lastName}`}
                    className="about__portrait"
                    loading="lazy"
                  />
                  <figcaption className="about__figcaption">
                    <span aria-hidden>fig. 01</span>
                    <span>{author.location}</span>
                  </figcaption>
                </figure>
              </Reveal>
            )}
          </div>
        </article>

        <article className="materials" aria-labelledby="about-stack--title">
          <h3 className="materials__title" id="about-stack--title">
            Stack
          </h3>

          <ul className="materials__groups">
            {materials.map((group, groupIndex) => (
              <li className="materials__group" key={group.id}>
                <Reveal delay={groupIndex * 0.12}>
                  <h4 className="materials__group-title" id={group.id}>
                    {group.label}
                  </h4>
                  <ul className="materials__list" aria-labelledby={group.id}>
                    {group.items.map((stack) => (
                      <li className="materials__item" key={stack._id}>
                        {stack.logo && (
                          <img
                            className="materials__icon"
                            src={urlFor(stack.logo).width(48).url()}
                            alt=""
                            aria-hidden
                            loading="lazy"
                            width={48}
                            height={48}
                          />
                        )}
                        <span>{stack.name}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
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
                Linkedin
              </Link>
            </li>
            <li>
              <Link
                className="about__link"
                href={author?.github || ''}
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
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
