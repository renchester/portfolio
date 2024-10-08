'use client';

import './StackItem.scss';
import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '@/sanity/lib/image';

function StackItem(props: {
  item: {
    name?: string | null;
    logo?: SanityImageSource | null;
    type?: string | null;
  };
  initTheme?: 'dark' | 'light';
  width?: number;
}) {
  const { item, width = 60, initTheme = 'dark' } = props;

  const { name, logo } = item;

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
        title={name ?? ''}
        aria-label={`${name} logo`}
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
          src={`${urlFor(logo || '').url()}`}
          alt={`Logo for ${name}`}
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
              {name}
            </motion.span>
          )}
        </AnimatePresence>
      </article>
    </li>
  );
}

export default StackItem;
