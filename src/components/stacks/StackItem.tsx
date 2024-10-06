'use client';

import './StackItem.scss';
import stacks from '@/config/stacks';
import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

type StackItemProps = {
  name: keyof typeof stacks;
  initTheme?: 'dark' | 'light';
  width?: number;
};

function StackItem(props: StackItemProps) {
  const { name, width = 60, initTheme = 'dark' } = props;
  const target = stacks[name];

  const [isFocus, setFocus] = useState(false);

  const showTitle = () => setFocus(true);
  const hideTitle = () => setFocus(false);

  const titleVariants: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };

  return (
    <li className="stkm__container">
      <article
        className="stkm"
        title={target.title}
        aria-label={`${target.title} logo`}
        tabIndex={0}
        onFocus={showTitle}
        onBlur={hideTitle}
        onMouseEnter={showTitle}
        onMouseLeave={hideTitle}
      >
        <img
          style={{
            width: `${width}px`,
            height: `${width}px`,
          }}
          src={`/logos/${target.logo}`}
          alt={`Logo for ${target.title}`}
          className={`stkm__logo ${isFocus && 'focus'}`}
          data-theme={initTheme}
        />

        <AnimatePresence>
          {isFocus && (
            <motion.span
              className="stkm__title"
              variants={titleVariants}
              initial="initial"
              animate="animate"
              exit="initial "
            >
              {target.title}
            </motion.span>
          )}
        </AnimatePresence>
      </article>
    </li>
  );
}

export default StackItem;
