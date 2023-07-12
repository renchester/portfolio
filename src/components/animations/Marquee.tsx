'use client';

import './Marquee.scss';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { wrap } from '@motionone/utils';

function Marquee({
  children,
  baseVelocity = 100,
  repeatChildren = 1,
}: {
  children: ReactNode;
  baseVelocity?: number;
  repeatChildren?: number;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /**
   * Magic wrapping for length of the text -- replace this with
   * what works for the effect that you're going for
   */

  const x = useTransform(baseX, (v) => `${wrap(-20, -75, v)}%`);
  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * Changes scroll direction once we switch scrolling
     * directions
     */

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -45% - this 25% is derived from the fact
   * we have four children (100% / 4). This would also want deriving from the
   * dynamically generated number of children.
   */

  return (
    <div className="marquee">
      <motion.div className="marquee__scroller" style={{ x }}>
        <span>{children}</span>
        {repeatChildren > 1 &&
          [...Array(repeatChildren - 1)].map((child, i) => (
            <span aria-hidden key={`marquee-child-${i}`}>
              {children}
            </span>
          ))}
      </motion.div>
    </div>
  );
}
export default Marquee;
