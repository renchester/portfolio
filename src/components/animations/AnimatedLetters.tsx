import './AnimatedLetters.scss';
import { motion, Variants } from 'framer-motion';

function AnimatedLetters({ title }: { title: string }) {
  const bannerVariant: Variants = {
    animate: {
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariant: Variants = {
    initial: {
      y: 400,
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
      variants={bannerVariant}
      initial="initial"
      animate="animate"
    >
      {[...title].map((letter, i) => (
        <motion.span
          className="anm__item"
          key={`letter-${letter}-${i}`}
          variants={letterVariant}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default AnimatedLetters;
