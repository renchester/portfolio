'use client';

import { AnimatePresence, motion } from 'framer-motion';
import './Header.scss';
import Logo from './Logo';
import NavLink from './NavLink';
import { useEffect, useState } from 'react';

function Header() {
  const [isVisible, setVisibility] = useState(true);
  const [prevScrollPostion, setPrevScrollPostion] = useState(0);

  const controlHeader = () => {
    if (window.scrollY > prevScrollPostion) {
      setVisibility(false);
    } else {
      setVisibility(true);
    }

    setPrevScrollPostion(window.scrollY);
  };

  useEffect(() => {
    if (!window) return;

    window.addEventListener('scroll', controlHeader);

    return () => window.removeEventListener('scroll', controlHeader);
  });

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
            <motion.div
              className="header__logo-wrapper"
              variants={{
                initial: { background: '#fff' },
                focus: { scale: 1.1, rotate: -10 },
                tap: {
                  scale: 0.9,
                  rotate: -370,
                  background: '#d3c7c3',
                },
              }}
              initial="initial"
              whileHover="focus"
              whileTap="tap"
            >
              <Logo className="header__logo" />
            </motion.div>
            <nav className="nav">
              <ul className="nav__links">
                <NavLink label="About" href="#about" />
                <NavLink label="Projects" href="#projects" />
                <NavLink label="Contact" href="#contact" />
              </ul>
            </nav>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
export default Header;
