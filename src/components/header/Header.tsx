'use client';

import { AnimatePresence, motion } from 'framer-motion';
import './Header.scss';
import Logo from './Logo';
import NavLink from './NavLink';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const NAV_ITEMS = [
  { index: '02', label: 'About', href: '#about' },
  { index: '03', label: 'Experience', href: '#experience' },
  { index: '04', label: 'Projects', href: '#projects' },
  { index: '05', label: 'Contact', href: '#contact' },
];

function Header({ name }: { name?: string | null }) {
  const [isScrolled, setScrolled] = useState(false);
  const [isNavExpanded, setNavExpansion] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hide mobile nav on Escape key or outside click
  useEffect(() => {
    const escKeyListener = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;

      setNavExpansion(false);
    };

    const globalClickListener = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as HTMLElement)) {
        setNavExpansion(false);
      }
    };

    window.addEventListener('keydown', escKeyListener);
    window.addEventListener('click', globalClickListener);

    return () => {
      window.removeEventListener('keydown', escKeyListener);
      window.removeEventListener('click', globalClickListener);
    };
  }, []);

  return (
    <header className="header" data-scrolled={isScrolled}>
      <div className="header__wrapper">
        <Link
          href="#hero-section"
          className="header__wordmark"
          aria-label="Back to top"
        >
          <Logo className="header__logo" ariaHidden />
          {name && <span className="header__name">{name}</span>}
        </Link>

        {/* Desktop navigation */}
        <nav className="header__nav" aria-label="Primary">
          <ul className="header__links">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                index={item.index}
                label={item.label}
                href={item.href}
              />
            ))}
          </ul>
        </nav>

        {/* Mobile navigation */}
        <div className="header__nav-wrapper" ref={navRef}>
          <AnimatePresence>
            {isNavExpanded && (
              <motion.nav
                className="nav"
                id="nav"
                aria-label="Primary"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              >
                <ul className="nav__links">
                  {NAV_ITEMS.map((item) => (
                    <NavLink
                      key={item.href}
                      index={item.index}
                      label={item.label}
                      href={item.href}
                      onNavigate={() => setNavExpansion(false)}
                    />
                  ))}
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
          <button
            type="button"
            className="header__btn-nav"
            aria-label="Open navigation menu"
            aria-haspopup
            aria-expanded={isNavExpanded}
            aria-controls="nav"
            onClick={() => setNavExpansion((prev) => !prev)}
          >
            <svg className="hamburger" data-expanded={isNavExpanded}>
              <line
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                className="hamburger__bar hamburger__bar--top"
              />
              <line
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                className="hamburger__bar hamburger__bar--mid"
              />
              <line
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                className="hamburger__bar hamburger__bar--bot"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
export default Header;
