'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';
import { Chip } from '../ui/Chip';
import { projects } from '@/lib/content';

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 max-w-6xl mx-auto">
      <SectionTitle>Projects</SectionTitle>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card hover>
              <h3 className="text-2xl font-bold text-limestone mb-3">
                {project.title}
              </h3>
              <p className="text-limestone/80 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </div>
              <a
                href={project.link}
                className="inline-flex items-center text-amethyst hover:text-ice transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project →
              </a>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
