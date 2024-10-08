'use client';

import './Hero.scss';
import { motion } from 'framer-motion';
import AnimatedLetters from '../animations/AnimatedLetters';
import Marquee from '../animations/Marquee';
import { AUTHOR_QUERYResult } from '@/sanity/types';
import { urlFor } from '@/sanity/lib/image';

// [0.6, 0.01, -0.05, 0.9];

function Hero({
  author,
  startAnimation,
}: {
  author: AUTHOR_QUERYResult;
  startAnimation: boolean;
}) {
  return (
    <motion.section
      className="hero home-section"
      aria-label="Hero section"
      id="hero-section"
    >
      <div className="hero__main">
        <div className="hero__text-wrapper">
          <h1 className="hero__title">
            {!startAnimation && (
              <AnimatedLetters
                title={`${author?.firstName} ${author?.lastName}`}
              />
            )}
          </h1>

          <h2 className="hero__subtitle">{author?.job}</h2>
        </div>
        <div className="hero__img-wrapper">
          <img
            src={urlFor(author?.heroImage || '').url()}
            alt="Profile Picture of portfolio subject. Man wearing white polo shirt"
            className="hero__img"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>

      <div className="hero__marquee">
        <Marquee baseVelocity={-1.5} repeatChildren={8}>
          <span className="hero__marquee--name">
            {`${author?.firstName} ${author?.lastName}`} —
          </span>
        </Marquee>
        <Marquee baseVelocity={1.5} repeatChildren={6}>
          <span className="hero__marquee--sub">
            {author?.marquee?.join(' — ').concat(' - ')}
          </span>
        </Marquee>
      </div>

      <div className="hero__pop">
        <span className="hero__pop-loc">
          Currently based in {author?.location}
        </span>
      </div>
    </motion.section>
  );
}

export default Hero;
