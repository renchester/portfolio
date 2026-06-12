'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Clip-path wipe that uncovers imagery as it scrolls into view. */
function ImageReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Chromium factors clip-path into IntersectionObserver ratios, so a fully
  // clipped element never reports ratio > 0 (and lazy images inside it never
  // load). Keep a 2% sliver visible and trigger on any intersection instead.
  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'inset(0 0 98% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, amount: 'some' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default ImageReveal;
