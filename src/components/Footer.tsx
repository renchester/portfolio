import './Footer.scss';
import Link from 'next/link';
import StackItem from './stacks/StackItem';
import LocalTime from './LocalTime';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__col-1">
          <article aria-labelledby="footer__name">
            <span className="footer__name" id="footer__name">
              <Link href="#hero-section">Renchester Ramos</Link>
            </span>
            <span className="footer__loc">Bulacan, Philippines</span>
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
                <LocalTime />
              </span>
            </article>
          </div>
        </div>
        <div className="footer__col-2">
          <span className="footer__title">This portfolio was built with:</span>
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
          <span className="footer__title">Links</span>
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
            <li>
              <Link
                className="footer__link"
                href={`https://drive.google.com/file/d/1qJy4oltcu4WbtMfHHZhw8SJUCvnapjRk/view?usp=drive_link`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Architecture Portfolio
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
