'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { fadeUp, staggerContainer } from '@/lib/animations';

const testimonials = [
  {
    quote:
      'Exceptional technical leadership combined with creative vision. Delivered enterprise solutions that exceeded expectations.',
    author: 'Enterprise Client',
    role: 'SAP Implementation Lead',
    company: 'Fortune 500 Company',
  },
  {
    quote:
      'Rare combination of technical depth and creative excellence. The AI architecture is sophisticated yet elegant.',
    author: 'Technology Partner',
    role: 'CTO',
    company: 'AI Research Firm',
  },
  {
    quote:
      'Outstanding multimedia production quality. Brings both artistic sensibility and technical precision to every project.',
    author: 'Creative Director',
    role: 'Head of Production',
    company: 'Media Agency',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 bg-surface/20">
      <div className="max-w-6xl mx-auto">
        <SectionTitle>Client Testimonials</SectionTitle>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 mt-12"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="relative p-8 bg-surface/50 backdrop-blur-sm border border-border rounded-2xl hover:border-amethyst/50 transition-all duration-300"
            >
              {/* Quote mark */}
              <div className="absolute top-6 left-6 text-6xl text-amethyst/20 font-serif">
                &ldquo;
              </div>

              <div className="relative z-10">
                <p className="text-limestone/90 leading-relaxed mb-6 italic">
                  {testimonial.quote}
                </p>

                <div className="border-t border-border/50 pt-4">
                  <p className="text-limestone font-medium mb-1">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-limestone/70">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-limestone/50 mt-1">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
