'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { skills } from '@/lib/content';

export default function Skills() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <section id="skills" className="py-20 px-4 max-w-7xl mx-auto">
      <SectionTitle>Technical Expertise</SectionTitle>
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
      >
        {skills.map((skillCategory, index) => (
          <motion.div
            key={skillCategory.category}
            variants={item}
            className="group"
          >
            <div className="relative bg-surface/30 backdrop-blur-sm border border-border rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:border-amethyst hover:shadow-xl hover:shadow-amethyst/10">
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-amethyst/5 to-ice/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Category icon/number */}
                <motion.div
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amethyst to-ice flex items-center justify-center text-bg font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-limestone group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amethyst group-hover:to-ice transition-all duration-300">
                    {skillCategory.category}
                  </h3>
                </motion.div>

                {/* Skills list */}
                <ul className="space-y-3">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <motion.li
                      key={skill}
                      className="flex items-start gap-3 text-limestone/80 group-hover:text-limestone transition-colors duration-300"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 + skillIndex * 0.05 }}
                    >
                      <motion.span
                        className="w-1.5 h-1.5 mt-2 bg-amethyst rounded-full flex-shrink-0"
                        whileHover={{ scale: 1.5 }}
                        animate={{
                          boxShadow: [
                            '0 0 0 0 rgba(184, 140, 255, 0.4)',
                            '0 0 0 8px rgba(184, 140, 255, 0)',
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: skillIndex * 0.2,
                        }}
                      />
                      <span className="flex-1">{skill}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Skill count badge */}
                <motion.div
                  className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <span className="text-limestone/60">
                    {skillCategory.items.length} skills
                  </span>
                  <motion.div
                    className="w-2 h-2 bg-mint rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional info */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-limestone/60 max-w-2xl mx-auto leading-relaxed">
          Continuously learning and adapting to emerging technologies. Open to
          collaborative projects that push boundaries and create meaningful
          impact.
        </p>
      </motion.div>
    </section>
  );
}
