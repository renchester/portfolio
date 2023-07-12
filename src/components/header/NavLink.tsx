'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <motion.li
      className="nav__item"
      variants={{
        initial: {
          color: 'var(--color-text-alpha75)',
        },
        focus: {
          opacity: 1,
          scale: 1.05,
          backgroundColor: 'var(--color-grad-1)',
          color: 'var(--color-light-1)',
        },
      }}
      whileHover="focus"
      whileFocus="focus"
    >
      <Link href={href} className="nav__link">
        {label}
      </Link>
    </motion.li>
  );
}
export default NavLink;
