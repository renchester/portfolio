'use client';

import './Hero.scss';
import { Variants, motion } from 'framer-motion';

const bannerVariant: Variants = {
  animate: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const letterVariant: Variants = {
  initial: {
    y: 400,
  },
  animate: {
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1,
    },
  },
};

const marqueeVariant: Variants = {
  animate: {
    // x: [0, -1000],
    // transition: {
    //   x: {
    //     repeat: Infinity,
    //     repeatType: 'loop',
    //     duration: 16,
    //     ease: 'linear',
    //   },
    // },
  },
};

function Hero() {
  return (
    // TODO: Add accessibility
    <motion.section className="hero home-section" aria-label="Hero section">
      <div className="hero__main">
        <div className="hero__text-wrapper">
          <h1 className="hero__title">
            <AnimatedLetters title="Renchester" />
            <span>{'  '}</span>
            <AnimatedLetters title="Ramos" />
          </h1>

          <h2 className="hero__subtitle">Full-stack web developer</h2>
        </div>
        <div className="hero__img-wrapper">
          <img
            src="./profile.png"
            alt="Profile Picture of portfolio subject. Man wearing white polo shirt"
            className="hero__img"
          />
        </div>
      </div>

      <motion.div
        className="hero__marquee"
        variants={marqueeVariant}
        animate="animate"
      >
        <h4 className="hero__marquee-track">
          <span>Developer. Designer. Planner.</span>
          <span>Developer. Designer. Planner.</span>
        </h4>
      </motion.div>

      <div className="hero__pop">
        <span className="hero__pop-loc">Based in the Philippines</span>

        <div className="hero__pop-globe"></div>
      </div>
    </motion.section>
  );
}

function AnimatedLetters({ title }: { title: string }) {
  return (
    <motion.span
      className="anm"
      variants={bannerVariant}
      initial="initial"
      animate="animate"
    >
      {[...title].map((letter, i) => (
        <motion.span
          className="anm__item"
          key={`letter-${letter}-${i}`}
          variants={letterVariant}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default Hero;
