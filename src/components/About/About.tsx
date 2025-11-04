'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { personalInfo } from '@/lib/content';

export default function About() {
  return (
    <section id="about" className="py-20 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle>About</SectionTitle>
        <p className="text-lg text-limestone/90 leading-relaxed">
          {personalInfo.bio}
        </p>
      </motion.div>
    </section>
  );
}
