import './Header.scss';
import Link from 'next/link';
import Logo from './Logo';

function Header() {
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__logo-wrapper">
          <Logo className="header__logo" />
        </div>
        <nav className="nav">
          <ul className="nav__links">
            <li className="nav__item">
              <Link href="/" className="nav__link active">
                Home
              </Link>
            </li>
            <li className="nav__item">
              <Link href="#home" className="nav__link">
                About
              </Link>
            </li>
            <li className="nav__item">
              <Link href="#home" className="nav__link">
                Projects
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
export default Header;
