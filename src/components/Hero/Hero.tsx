'use client';

import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

const Hero3D = lazy(() => import('./Hero3D'));

export default function Hero() {
  const [enable3D] = React.useState(true);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background - Lazy Loaded */}
      {enable3D && !prefersReducedMotion && (
        <Suspense
          fallback={
            <div className="absolute inset-0 bg-gradient-to-b from-bg via-surface to-bg" />
          }
        >
          <Hero3D />
        </Suspense>
      )}

      {/* Fallback Gradient */}
      {(!enable3D || prefersReducedMotion) && (
        <div className="absolute inset-0 bg-gradient-radial from-amethyst/10 via-bg to-bg" />
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 relative">
              {/* SVG Sigil Fallback */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  className="animate-pulse"
                />
                <path
                  d="M50 15 L80 70 L20 70 Z"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  fill="none"
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="var(--color-amethyst)" />
                    <stop offset="50%" stopColor="var(--color-ice)" />
                    <stop offset="100%" stopColor="var(--color-mint)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-limestone via-amethyst to-ice"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Saint Lucid
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-limestone/80 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Media Specialist & Creative Technologist
          </motion.p>

          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <a
              href="#projects"
              className="px-6 py-3 bg-amethyst text-bg rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 bg-surface text-limestone border border-border rounded-lg font-medium hover:border-amethyst transition-all duration-200"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="w-6 h-10 border-2 border-limestone/30 rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-1.5 bg-limestone rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
