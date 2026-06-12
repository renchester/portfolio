import Link from 'next/link';
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

  const fullName = `${author?.firstName} ${author?.lastName}`;
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__id">
          <span className="footer__name" id="footer__name">
            <Link href="#hero-section">{fullName}</Link>
          </span>
        </div>

        <nav className="footer__links-block" aria-labelledby="footer-links">
          <h2 className="footer__label" id="footer-links">
            Links
          </h2>
          <ul className="footer__links">
            <li>
              <Link
                className="footer__link u-underline"
                href={author?.linkedin || ''}
                target="_blank"
                rel="noopener noreferrer"
              >
                Linkedin
              </Link>
            </li>
            <li>
              <Link
                className="footer__link u-underline"
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
                  className="footer__link u-underline"
                  href={author.customLink.value || ''}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {author.customLink.label || ''}
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <dl className="footer__meta">
          <div className="footer__meta-row">
            <dt>Based in</dt>
            <dd>{author?.location}</dd>
          </div>
          <div className="footer__meta-row">
            <dt>Local time</dt>
            <dd>
              <LocalTime timeZone={author?.timezone ?? 'Asia/Manila'} />
            </dd>
          </div>
        </dl>
      </div>

      <div className="footer__base">
        <span className="footer__built">
          Designed &amp; built with{' '}
          {stacks.map((stack) => stack.name).join(' / ')}
        </span>
        <span className="footer__copy">
          © {year} {fullName}
        </span>
      </div>
    </footer>
  );
}

export default Footer;
