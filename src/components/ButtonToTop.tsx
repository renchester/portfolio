'use client';

import { motion } from 'framer-motion';

function ButtonToTop() {
  return (
    <motion.button
      className="btn-top"
      onClick={() => window.scrollTo({ left: 0, top: 0 })}
      aria-label="Scroll to top"
      title="Scroll to top"
      whileHover={{ scale: 1.15 }}
      whileFocus={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </motion.button>
  );
}
export default ButtonToTop;
