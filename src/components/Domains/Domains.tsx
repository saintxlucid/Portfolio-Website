'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';
import { domains } from '@/lib/content';

export default function Domains() {
  return (
    <section id="domains" className="py-20 px-4 max-w-6xl mx-auto">
      <SectionTitle>Domains</SectionTitle>
      <div className="grid md:grid-cols-2 gap-6">
        {domains.map((domain, index) => (
          <motion.div
            key={domain.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card hover>
              <div className="text-4xl mb-4">{domain.icon}</div>
              <h3 className="text-2xl font-bold text-limestone mb-2">
                {domain.title}
              </h3>
              <p className="text-limestone/80">{domain.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
