'use client';

import { MotionConfig } from 'framer-motion';

// Honors the user's OS-level "reduce motion" preference for every
// Framer Motion component in the tree (disables transform/layout
// animations while keeping opacity changes).
function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export default MotionProvider;
