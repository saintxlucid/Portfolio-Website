'use client';

import React, { Suspense, lazy } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero3D = lazy(() => import('./Hero3D'));

export default function Hero() {
  const [enable3D] = React.useState(true);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.6, 0.01, 0.05, 0.95] as const,
      },
    }),
  };

  const titleText = 'Saint Lucid';

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced 3D Background - Lazy Loaded */}
      {enable3D && !prefersReducedMotion && (
        <Suspense
          fallback={
            <div className="absolute inset-0 bg-gradient-radial from-amethyst/20 via-bg to-bg" />
          }
        >
          <motion.div style={{ opacity, scale }} className="absolute inset-0">
            <Hero3D />
          </motion.div>
        </Suspense>
      )}

      {/* Fallback Gradient with enhanced effects */}
      {(!enable3D || prefersReducedMotion) && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-amethyst/10 via-bg to-bg" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-ice/5 via-transparent to-transparent" />
        </div>
      )}

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Animated title with letter-by-letter reveal */}
        <motion.h1
          className="text-7xl md:text-9xl font-bold mb-6 tracking-tight"
          initial="hidden"
          animate="visible"
        >
          {titleText.split('').map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-limestone via-amethyst to-ice"
              style={{
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 8s ease infinite',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-xl md:text-3xl text-limestone/90 mb-4 font-light">
            Media Specialist & Creative Technologist
          </p>
          <p className="text-sm md:text-base text-limestone/60 mb-12 max-w-2xl mx-auto">
            Building ASTRA — Sovereign AI architecture for the future
          </p>
        </motion.div>

        {/* Enhanced CTA buttons */}
        <motion.div
          className="flex gap-6 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.a
            href="#projects"
            className="group relative px-8 py-4 bg-amethyst text-bg rounded-xl font-medium overflow-hidden transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">View Projects</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-ice to-mint opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
          </motion.a>
          <motion.a
            href="#contact"
            className="group relative px-8 py-4 bg-surface/50 backdrop-blur-sm text-limestone border-2 border-border rounded-xl font-medium overflow-hidden transition-all duration-300 hover:border-amethyst"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Get in Touch</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-amethyst/20 to-ice/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
          </motion.a>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator with animation */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className="w-8 h-14 border-2 border-limestone/30 rounded-full flex justify-center p-2"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-2 h-2 bg-limestone rounded-full"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <p className="text-xs text-limestone/40 mt-2 text-center">Scroll</p>
      </motion.div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
}
