'use client';

import './ScrollDatum.scss';
import { motion, useScroll, useSpring } from 'framer-motion';

/** Redline along the left edge that draws down as the page is read. */
function ScrollDatum() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  return (
    <motion.div className="scroll-datum" aria-hidden style={{ scaleY }} />
  );
}

export default ScrollDatum;
