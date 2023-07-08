'use client';

import './WelcomeScreen.scss';
import { Variants, motion } from 'framer-motion';
import getTagalogDayTime from '@/utils/getTagalogDayTime';
import getEnglishDayTime from '@/utils/getEnglishDayTime';
import { useState } from 'react';

type WelcomeScreenProps = {
  hideScreen: () => void;
};

function WelcomeScreen(props: WelcomeScreenProps) {
  const { hideScreen } = props;

  const currentHour = new Date().getHours();
  const englishCurrent = getEnglishDayTime(currentHour);
  const tagalogCurrent = getTagalogDayTime(currentHour);

  const [isEnd, setEnd] = useState(false);

  const greetings = ['안녕하세요', 'bonjour', 'नमस्ते', 'ciao', '你好'];

  const listVariant: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.35,
      },
    },
  };

  const itemVariant: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: [0, 1, 0],
    },
  };

  const finalItemVariant: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.25,
      },
    },
  };

  return (
    <motion.div
      className="welc"
      aria-busy
      exit={{
        y: -100,
        opacity: 0.25,
        borderBottomLeftRadius: '42%',
        borderBottomRightRadius: '25%',
        transition: {
          type: 'tween',
          duration: 0.5,
          delay: 0.35,
          ease: 'easeIn',
        },
      }}
    >
      <div className="welc__greeting">
        <motion.ul
          className="welc__dynamic"
          variants={listVariant}
          initial="initial"
          animate="animate"
          onAnimationComplete={() => setEnd(true)}
        >
          {greetings.map((greet, i) => (
            <motion.li
              className="welc__item"
              key={greet}
              custom={i}
              variants={itemVariant}
            >
              {greet}
            </motion.li>
          ))}

          {isEnd && (
            <>
              <motion.li
                className="welc__item final"
                variants={finalItemVariant}
                initial="initial"
                animate="animate"
                onAnimationComplete={hideScreen}
              >
                Magandang
                <br />
                {tagalogCurrent}
              </motion.li>
              <motion.li
                className="welc__item final"
                variants={finalItemVariant}
                initial="initial"
                animate="animate"
              >
                Good
                <br />
                {englishCurrent}
              </motion.li>
            </>
          )}
        </motion.ul>
      </div>
    </motion.div>
  );
}

export default WelcomeScreen;
