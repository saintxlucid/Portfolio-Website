'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';
import { experience, education } from '@/lib/content';

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 max-w-4xl mx-auto">
      <SectionTitle>Experience</SectionTitle>

      {/* Timeline */}
      <div className="space-y-6 mb-12">
        {experience.map((exp, index) => (
          <motion.div
            key={`${exp.company}-${exp.period}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
          >
            <Card>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-limestone">
                    {exp.role}
                  </h3>
                  <p className="text-limestone/80">{exp.company}</p>
                </div>
                <p className="text-limestone/60 text-sm mt-2 md:mt-0">
                  {exp.period}
                </p>
              </div>
              {exp.description && (
                <p className="text-limestone/70 mt-2">{exp.description}</p>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Education */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-limestone mb-4">Education</h3>
        <Card>
          <h4 className="text-xl font-bold text-limestone">
            {education.degree}
          </h4>
          <p className="text-limestone/80">{education.institution}</p>
          <p className="text-limestone/60 text-sm mt-2">
            Expected {education.expected}
          </p>
        </Card>
      </motion.div>
    </section>
  );
}
