'use client';

import './Hero.scss';
import { Variants, motion } from 'framer-motion';
import AnimatedLetters from '../animations/AnimatedLetters';
import Marquee from '../animations/Marquee';

// [0.6, 0.01, -0.05, 0.9];

function Hero({ startAnimation }: { startAnimation: boolean }) {
  return (
    <motion.section
      className="hero home-section"
      aria-label="Hero section"
      id="hero-section"
    >
      <div className="hero__main">
        <div className="hero__text-wrapper">
          <h1 className="hero__title">
            {!startAnimation && <AnimatedLetters title="Renchester Ramos" />}
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

      <div className="hero__marquee">
        <Marquee baseVelocity={-1.5} repeatChildren={8}>
          <span className="hero__marquee--name">Renchester Ramos —</span>
        </Marquee>
        <Marquee baseVelocity={1.5} repeatChildren={6}>
          <span className="hero__marquee--sub">
            Developer — Designer — Planner —
          </span>
        </Marquee>
      </div>

      <div className="hero__pop">
        <h6 className="hero__pop-loc">
          Currently based in Bulacan, Philippines
        </h6>
      </div>
    </motion.section>
  );
}

export default Hero;
