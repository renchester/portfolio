'use client';

import './StackItem.scss';
import stacks from '@/config/stacks';
import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ReactSVG } from 'react-svg';

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
        <ReactSVG
          beforeInjection={(svg) => {
            svg.classList.add('stkm__logo');
            isFocus && svg.classList.add('focus');
            svg.setAttribute('style', `height: ${width}px; width: ${width}px`);
            svg.setAttribute('data-theme', initTheme);
          }}
          src={`/logos/${target.logo}`}
          wrapper="span"
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
