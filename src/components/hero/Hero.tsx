'use client';

import './Hero.scss';
import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import AnimatedLetters from '../animations/AnimatedLetters';
import ContourField from './ContourField';
import HeroGreeting from './HeroGreeting';
import LocalTime from '../LocalTime';
import { AUTHOR_QUERYResult } from '@/sanity/types';
import { urlFor } from '@/sanity/lib/image';

function Hero({ author }: { author: AUTHOR_QUERYResult }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // layers drift apart as the hero scrolls out
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-24%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section
      className="hero home-section"
      aria-label="Hero section"
      id="hero-section"
      ref={sectionRef}
    >
      <ContourField />

      <div className="hero__main">
        <motion.div
          className="hero__text-wrapper"
          style={
            prefersReducedMotion ? undefined : { y: textY, opacity: textOpacity }
          }
        >
          <h1 className="hero__title">
            <AnimatedLetters
              title={`${author?.firstName} ${author?.lastName}`}
            />
          </h1>

          <p className="hero__subtitle">{author?.job}</p>
        </motion.div>
        <motion.div
          className="hero__img-wrapper"
          style={prefersReducedMotion ? undefined : { y: imgY }}
        >
          <img
            src={urlFor(author?.heroImage).width(480).url()}
            alt="Portrait of Renchester Ramos"
            className="hero__img"
            loading="eager"
          />
        </motion.div>
      </div>

      <div className="hero__pop">
        <span className="hero__pop-loc">
          <HeroGreeting /> Currently based in {author?.location}
        </span>
        <span className="hero__pop-time">
          <LocalTime timeZone={author?.timezone ?? 'Asia/Manila'} />
        </span>
      </div>
    </section>
  );
}

export default Hero;
