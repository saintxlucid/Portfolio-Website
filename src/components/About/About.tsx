'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { personalInfo } from '@/lib/content';
import { fadeUp, revealBlur } from '@/lib/animations';

export default function About() {
  return (
    <section id="about" className="py-20 px-4 max-w-4xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
      >
        <SectionTitle>About</SectionTitle>
        <motion.p
          variants={revealBlur}
          className="text-lg text-limestone/90 leading-relaxed"
        >
          {personalInfo.bio}
        </motion.p>
      </motion.div>
    </section>
  );
}
