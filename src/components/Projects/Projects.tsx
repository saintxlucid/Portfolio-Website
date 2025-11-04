'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { Chip } from '../ui/Chip';
import { projects } from '@/lib/content';
import Link from 'next/link';

export default function Projects() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="projects" className="py-20 px-4 max-w-7xl mx-auto">
      <SectionTitle>Featured Projects</SectionTitle>
      <motion.div
        className="grid md:grid-cols-2 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
      >
        {projects.map((project, index) => (
          <motion.div key={project.title} variants={item}>
            <Link
              href={
                project.title === 'PRJKT_ASTRA_2.0'
                  ? '/projects/astra-os-core'
                  : project.title === 'Floating Through Dimensions'
                    ? '/projects/floating-through-dimensions'
                    : project.link
              }
              className="group block"
            >
              <div className="relative bg-surface/50 backdrop-blur-sm border border-border rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:border-amethyst hover:shadow-2xl hover:shadow-amethyst/20 hover:-translate-y-2">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-amethyst/5 via-transparent to-ice/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amethyst via-ice to-mint blur-xl opacity-30" />
                </div>

                <div className="relative z-10">
                  {/* Project number */}
                  <motion.div
                    className="text-6xl font-bold text-limestone/10 mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    0{index + 1}
                  </motion.div>

                  <h3 className="text-3xl font-bold text-limestone mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amethyst group-hover:to-ice transition-all duration-300">
                    {project.title}
                  </h3>

                  <p className="text-limestone/80 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <Chip
                        key={tag}
                        className="group-hover:bg-amethyst/10 group-hover:border-amethyst/30 transition-all duration-300"
                      >
                        {tag}
                      </Chip>
                    ))}
                  </div>

                  <div className="flex items-center text-amethyst font-medium group-hover:text-ice transition-colors duration-300">
                    <span>Explore Project</span>
                    <motion.svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </motion.svg>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* More projects CTA */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-limestone/60 mb-4">
          Interested in more work or collaboration?
        </p>
        <a
          href="#contact"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amethyst to-ice text-bg rounded-xl font-medium hover:scale-105 transition-transform duration-300"
        >
          Let&apos;s Connect
        </a>
      </motion.div>
    </section>
  );
}
