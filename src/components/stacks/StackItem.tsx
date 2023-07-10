'use client';

import './StackItem.scss';
import stacks from '@/config/stacks';
import { useState } from 'react';

type StackItemProps = {
  name: keyof typeof stacks;
};

function StackItem(props: StackItemProps) {
  const { name } = props;
  const target = stacks[name];

  const [isFocus, setFocus] = useState(false);

  const showTitle = () => setFocus(true);
  const hideTitle = () => setFocus(false);

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
          src={target.logo}
          alt={`Logo for ${target.title}`}
          className={`stkm__logo ${isFocus && 'focus'}`}
        />
        {isFocus && <p className="stkm__title">{target.title}</p>}
      </article>
    </li>
  );
}

export default StackItem;
