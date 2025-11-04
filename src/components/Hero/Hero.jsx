import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

// Lazy load the 3D sigil component
const AnimatedSigil = lazy(() => import('../three/AnimatedSigil'));

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-dark-bg to-dark-bg" />
      
      {/* 3D Sigil - Lazy loaded */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <Suspense fallback={<div className="w-96 h-96 bg-purple-500/5 rounded-full animate-pulse" />}>
          <AnimatedSigil />
        </Suspense>
      </div>

      {/* Content */}
      <motion.div
        className="section-container relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          Saint Lucid
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Creative Technologist • Musician • Designer
        </motion.p>
        
        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          variants={itemVariants}
        >
          <a
            href="#projects"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors duration-300 focus-outline"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 bg-dark-surface hover:bg-dark-hover border border-purple-500/30 rounded-lg font-semibold transition-colors duration-300 focus-outline"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        >
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
