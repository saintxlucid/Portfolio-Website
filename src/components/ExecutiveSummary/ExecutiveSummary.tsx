'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/content';
import { fadeUp, staggerContainer } from '@/lib/animations';

export default function ExecutiveSummary() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-bg via-surface/30 to-bg">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="inline-block mb-4">
            <div className="px-4 py-2 bg-amethyst/10 border border-amethyst/30 rounded-full">
              <span className="text-xs font-medium text-amethyst uppercase tracking-wider">
                Executive Profile
              </span>
            </div>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-limestone mb-6"
          >
            {personalInfo.tagline}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-lg text-limestone/80 max-w-3xl mx-auto leading-relaxed"
          >
            {personalInfo.bio}
          </motion.p>
        </motion.div>

        {/* Key Achievements Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          {personalInfo.achievements?.map((achievement, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="group relative p-6 bg-surface/50 backdrop-blur-sm border border-border rounded-2xl hover:border-amethyst/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amethyst to-ice flex items-center justify-center">
                  <span className="text-bg font-bold text-sm">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-limestone/90 leading-relaxed">
                  {achievement}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Core Expertise Pills */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.h3
            variants={fadeUp}
            className="text-sm font-medium text-limestone/60 mb-6 uppercase tracking-wider"
          >
            Core Expertise
          </motion.h3>
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-3"
          >
            {personalInfo.expertise?.map((item, index) => (
              <motion.span
                key={index}
                className="px-6 py-3 bg-gradient-to-r from-surface to-surface/50 border border-border rounded-full text-sm text-limestone/90 hover:border-amethyst/50 hover:bg-amethyst/5 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          <motion.div
            variants={fadeUp}
            className="text-center p-6 bg-surface/30 rounded-2xl border border-border/50"
          >
            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amethyst to-ice mb-2">
              8+
            </div>
            <div className="text-sm text-limestone/60">Years Experience</div>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="text-center p-6 bg-surface/30 rounded-2xl border border-border/50"
          >
            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ice to-mint mb-2">
              50+
            </div>
            <div className="text-sm text-limestone/60">Projects Delivered</div>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="text-center p-6 bg-surface/30 rounded-2xl border border-border/50"
          >
            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-mint to-gold mb-2">
              4
            </div>
            <div className="text-sm text-limestone/60">Core Domains</div>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="text-center p-6 bg-surface/30 rounded-2xl border border-border/50"
          >
            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold to-amethyst mb-2">
              2
            </div>
            <div className="text-sm text-limestone/60">Languages (EN/AR)</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
