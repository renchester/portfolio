'use client';

import { Variants, motion } from 'framer-motion';

function ButtonToTop() {
  const buttonVariant: Variants = {
    initial: {
      scale: 1,
    },
    focus: {
      scale: 1.5,
    },
  };

  return (
    <motion.button
      className="btn-top"
      onClick={() => window.scrollTo({ left: 0, top: 0 })}
      aria-label="Scroll to top"
      title="Scroll to top"
      variants={buttonVariant}
      initial="initial"
      whileHover="focus"
      whileFocus="focus"
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
