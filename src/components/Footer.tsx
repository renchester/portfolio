import './Footer.scss';
import Link from 'next/link';
import StackItem from './stacks/StackItem';
import LocalTime from './LocalTime';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__col-1">
          <article>
            <h3 className="footer__name">
              <Link href="#hero-section">Renchester Ramos</Link>
            </h3>
            <h4 className="footer__loc">Bulacan, Philippines</h4>
          </article>
          <div className="footer__meta">
            <article
              className="footer__meta-item"
              aria-labelledby="footer-version"
            >
              <h6 className="footer__title" id="footer-version">
                Version
              </h6>
              <p>2023</p>
            </article>

            <article
              className="footer__meta-item"
              aria-labelledby="footer-local-time"
            >
              <h6 id="footer-local-time" className="footer__title">
                Local Time
              </h6>
              <LocalTime />
            </article>
          </div>
        </div>
        <div className="footer__col-2">
          <h3 className="footer__title">This portfolio was built with:</h3>
          <ul className="footer__stack">
            <StackItem width={40} name="react" initTheme="light" />
            <StackItem width={40} name="next" initTheme="light" />
            <StackItem width={40} name="typescript" initTheme="light" />
            <StackItem width={40} name="framer" initTheme="light" />
            <StackItem width={40} name="sass" initTheme="light" />
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
          <h3 className="footer__title">Links</h3>
          <ul className="footer__links">
            <li>
              <Link
                className="footer__link"
                href={`https://www.linkedin.com/in/renchesterramos/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Linkedin
              </Link>
            </li>
            <li>
              <Link
                className="footer__link"
                href={`https://github.com/renchester`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
