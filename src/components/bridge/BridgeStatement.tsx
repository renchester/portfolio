'use client';

import { motion } from 'framer-motion';

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
    },
  },
};

const wordVariant = {
  hidden: { y: '110%' },
  visible: {
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Word-by-word mask rise, triggered when the statement scrolls into view. */
function BridgeStatement({ text }: { text: string }) {
  const words = text.split(' ');

  return (
    <motion.p
      className="bridge__statement"
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <span className="visually-hidden">{text}</span>
      {words.map((word, i) => (
        <span className="bridge__mask" key={`${word}-${i}`} aria-hidden>
          <motion.span className="bridge__word" variants={wordVariant}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
}

export default BridgeStatement;
