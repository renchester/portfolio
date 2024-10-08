import Link from 'next/link';
import StackItem from './stacks/StackItem';
import LocalTime from './LocalTime';
import { AUTHOR_QUERY, FOOTER_STACKS_QUERY } from '@/sanity/queries';
import { client } from '@/sanity/lib/client';
import './Footer.scss';

const options = { next: { revalidate: 3600 } }; // 1 hour

async function Footer() {
  const [author, stacks] = await Promise.all([
    client.fetch(AUTHOR_QUERY, undefined, options),
    client.fetch(FOOTER_STACKS_QUERY, undefined, options),
  ]);

  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__col-1">
          <article aria-labelledby="footer__name">
            <span className="footer__name" id="footer__name">
              <Link href="#hero-section">{`${author?.firstName} ${author?.lastName}`}</Link>
            </span>
            <span className="footer__loc">{author?.location}</span>
          </article>
          <div className="footer__meta">
            <article
              className="footer__meta-item"
              aria-labelledby="footer-version"
            >
              <span className="footer__title" id="footer-version">
                Version
              </span>
              <span>2023</span>
            </article>

            <article
              className="footer__meta-item"
              aria-labelledby="footer-local-time"
            >
              <span id="footer-local-time" className="footer__title">
                Local Time
              </span>
              <span>
                <LocalTime timeZone={author?.timezone ?? 'Europe/London'} />
              </span>
            </article>
          </div>
        </div>
        <div className="footer__col-2">
          <span className="footer__title">This portfolio was built with:</span>
          <ul className="footer__stack">
            {stacks.map((stack) => (
              <StackItem
                item={stack}
                key={stack.name}
                width={40}
                initTheme="light"
              />
            ))}

            {/* <StackItem width={40} name="react" initTheme="light" />
            <StackItem width={40} name="next" initTheme="light" />
            <StackItem width={40} name="typescript" initTheme="light" />
            <StackItem width={40} name="framer" initTheme="light" />
            <StackItem width={40} name="sass" initTheme="light" /> */}
          </ul>
          <p className="footer__coffee">
            and 16 cups of{' '}
            <span title="coffee" aria-label="coffee emoji">
              ☕
            </span>{' '}
            ...
          </p>
        </div>
        <div className="footer__col-3">
          <span className="footer__title">Links</span>
          <ul className="footer__links">
            <li>
              <Link
                className="footer__link"
                href={author?.linkedin || ''}
                target="_blank"
                rel="noopener noreferrer"
              >
                Linkedin
              </Link>
            </li>
            <li>
              <Link
                className="footer__link"
                href={author?.github || ''}
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </Link>
            </li>
            {author?.customLink && (
              <li>
                <Link
                  className="footer__link"
                  href={author.customLink.value || ''}
                  // href={`https://drive.google.com/file/d/1qJy4oltcu4WbtMfHHZhw8SJUCvnapjRk/view?usp=drive_link`}
                  // href={`https://nxjncryln9z0izl4.public.blob.vercel-storage.com/architecture-portfolio`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {author.customLink.label || ''}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
