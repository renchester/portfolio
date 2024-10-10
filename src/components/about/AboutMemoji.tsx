'use client';

import { urlFor } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { motion } from 'framer-motion';

function AboutMemoji({ imgSrc }: { imgSrc?: SanityImageSource | null }) {
  return (
    <motion.img
      src={urlFor(imgSrc).url()}
      alt="Memoji of portfolio subject working on a Macbook"
      className="about__memoji"
      loading="lazy"
      variants={{
        initial: {
          rotate: 0,
          opacity: 0.85,
        },
        focus: {
          rotate: [null, -10, 10, -5, 5, 0],
          transition: {
            duration: 1,
            ease: 'easeInOut',
          },
        },
      }}
      initial="initial"
      whileFocus="focus"
      whileHover="focus"
    />
  );
}

export default AboutMemoji;
