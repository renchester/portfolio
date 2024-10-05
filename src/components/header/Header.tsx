'use client';

import { AnimatePresence, motion } from 'framer-motion';
import './Header.scss';
import Logo from './Logo';
import NavLink from './NavLink';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

function Header() {
  const [isVisible, setVisibility] = useState(true);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [isNavExpanded, setNavExpansion] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window) return;

    const controlHeader = () => {
      if (window.scrollY > prevScrollPosition) {
        setVisibility(false);
      } else {
        setVisibility(true);
      }

      setPrevScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', controlHeader);

    return () => window.removeEventListener('scroll', controlHeader);
  }, [prevScrollPosition]);

  // Hide nav on Global Escape Key
  useEffect(() => {
    if (!window) return;

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
      window.addEventListener('click', globalClickListener);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className="header"
          variants={{
            hidden: {
              y: -100,
              opacity: 0,
              transition: {
                duration: 1.5,
                type: 'spring',
              },
            },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 1,
                type: 'spring',
                bounce: 0.5,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="header__wrapper">
            <motion.button
              className="header__logo-wrapper"
              variants={{
                initial: { background: '#fff' },
                focus: { scale: 1.1, rotate: -10 },
                tap: {
                  scale: 0.9,
                  rotate: -370,
                  background: '#eee',
                },
              }}
              aria-label="Logo"
              initial="initial"
              whileHover="focus"
              whileFocus="focus"
              whileTap="tap"
            >
              <Link href="#hero-section">
                <Logo className="header__logo" ariaHidden />
                <span className="header__logo-label">
                  Logo for portfolio subject
                </span>
              </Link>
            </motion.button>

            <div className="header__nav-wrapper" ref={navRef}>
              <AnimatePresence>
                {isNavExpanded && (
                  <motion.nav
                    className="nav"
                    id="nav"
                    variants={{
                      initial: {
                        opacity: 0,
                        scale: 0,
                      },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                          bounce: 0.8,
                        },
                      },
                    }}
                    style={{ transformOrigin: 'right' }}
                    initial="initial"
                    animate="visible"
                    exit="initial"
                  >
                    <motion.ul className="nav__links">
                      <NavLink label="About" href="#about" />
                      <NavLink label="Projects" href="#projects" />
                      <NavLink label="Contact" href="#contact" />
                    </motion.ul>
                  </motion.nav>
                )}
              </AnimatePresence>
              <motion.button
                type="button"
                className="header__btn-nav"
                aria-label="Open navigation menu"
                aria-haspopup
                aria-expanded={isNavExpanded}
                aria-controls="nav"
                onClick={() => setNavExpansion((prev) => !prev)}
                whileFocus={{ scale: 1.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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
              </motion.button>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
export default Header;
