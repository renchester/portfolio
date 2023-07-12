'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <motion.li
      className="nav__item"
      variants={{
        initial: {},
        focus: {
          opacity: 1,
          scale: 1.05,
          backgroundColor: 'var(--color-grad-1)',
          color: 'var(--color-light-1)',
          transition: {
            duration: 0.25,
          },
        },
        tap: {
          scale: 0.9,
        },
      }}
      whileHover="focus"
      whileFocus="focus"
      whileTap="tap"
      tabIndex={-1}
    >
      <Link href={href} className="nav__link">
        {label}
      </Link>
    </motion.li>
  );
}
export default NavLink;
