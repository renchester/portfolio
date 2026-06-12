'use client';

import './AnimatedLetters.scss';
import { motion, Variants } from 'framer-motion';

// Masked word-rise reveal. Splitting on words (not letters) keeps the
// serif's kerning intact and settles in well under a second.
function AnimatedLetters({
  title,
  disabled = false,
}: {
  title: string;
  disabled?: boolean;
}) {
  const containerVariant: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const wordVariant: Variants = {
    initial: {
      y: '110%',
    },
    animate: {
      y: 0,
      transition: {
        ease: [0.16, 1, 0.3, 1],
        duration: 0.7,
      },
    },
  };

  return (
    <motion.span
      className="anm"
      variants={disabled ? undefined : containerVariant}
      initial="initial"
      animate="animate"
    >
      <span hidden>{title}</span>
      {title.split(' ').map((word, i) => (
        <span className="anm__mask" key={`word-${word}-${i}`} aria-hidden>
          <motion.span
            className="anm__item"
            variants={disabled ? undefined : wordVariant}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default AnimatedLetters;
