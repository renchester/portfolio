import Link from 'next/link';
import LocalTime from './LocalTime';
import { AUTHOR_QUERY, FOOTER_STACKS_QUERY } from '@/sanity/queries';
import { client } from '@/sanity/lib/client';
import './Footer.scss';

const options = { next: { revalidate: 3600 } }; // 1 hour

const SHEET_INDEX = [
  { id: 'hero-section', index: '01', label: 'Intro' },
  { id: 'about', index: '02', label: 'About' },
  { id: 'experience', index: '03', label: 'Experience' },
  { id: 'projects', index: '04', label: 'Projects' },
  { id: 'contact', index: '05', label: 'Contact' },
];

/** Title block — the footer drawn as the sheet's documentation strip. */
async function Footer() {
  const [author, stacks] = await Promise.all([
    client.fetch(AUTHOR_QUERY, undefined, options),
    client.fetch(FOOTER_STACKS_QUERY, undefined, options),
  ]);

  const fullName = `${author?.firstName} ${author?.lastName}`;
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__block">
        <div className="footer__cell footer__cell--id">
          <span className="footer__label" aria-hidden>
            Project
          </span>
          <span className="footer__name">
            <Link href="#hero-section">{fullName}</Link>
          </span>
          <span className="footer__role">{author?.job}</span>
        </div>

        <nav className="footer__cell" aria-labelledby="footer-index">
          <h2 className="footer__label" id="footer-index">
            Sheet index
          </h2>
          <ul className="footer__index">
            {SHEET_INDEX.map((section) => (
              <li key={section.id}>
                <Link className="footer__index-link" href={`#${section.id}`}>
                  <span aria-hidden>{section.index}</span>
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__cell" aria-labelledby="footer-links">
          <h2 className="footer__label" id="footer-links">
            Channels
          </h2>
          <ul className="footer__links">
            {author?.email && (
              <li>
                <a
                  className="footer__link u-underline"
                  href={`mailto:${author.email}`}
                >
                  Email
                </a>
              </li>
            )}
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

        <dl className="footer__cell footer__meta">
          <div className="footer__meta-row">
            <dt className="footer__label">Site</dt>
            <dd>{author?.location}</dd>
          </div>
          <div className="footer__meta-row">
            <dt className="footer__label">Local time</dt>
            <dd>
              <LocalTime timeZone={author?.timezone ?? 'Asia/Manila'} />
            </dd>
          </div>
          <div className="footer__meta-row">
            <dt className="footer__label">Status</dt>
            <dd>Open to work</dd>
          </div>
        </dl>
      </div>

      <div className="footer__base">
        <span className="footer__built">
          Drawn &amp; built with {stacks.map((stack) => stack.name).join(' / ')}
        </span>
        <span className="footer__rev" aria-hidden>
          rev. {year}.{String(new Date().getMonth() + 1).padStart(2, '0')}
        </span>
        <span className="footer__copy">
          © {year} {fullName} — sheet 01 of 01
        </span>
      </div>
    </footer>
  );
}

export default Footer;
