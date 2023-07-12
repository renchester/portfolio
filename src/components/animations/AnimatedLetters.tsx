'use client';

import './AnimatedLetters.scss';
import { motion, Variants } from 'framer-motion';

function AnimatedLetters({
  title,
  initialY = 400,
  disabled = false,
}: {
  title: string;
  initialY?: number;
  disabled?: boolean;
}) {
  const bannerVariant: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariant: Variants = {
    initial: {
      y: initialY,
    },
    animate: {
      y: 0,
      transition: {
        ease: [0.6, 0.01, -0.05, 0.95],
        duration: 1,
      },
    },
  };

  return (
    <motion.span
      className="anm"
      variants={disabled ? undefined : bannerVariant}
      initial="initial"
      animate="animate"
    >
      <span hidden>{title}</span>
      {[...title].map((letter, i) => (
        <motion.span
          className="anm__item"
          key={`letter-${letter}-${i}`}
          variants={disabled ? undefined : letterVariant}
          aria-hidden
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default AnimatedLetters;
