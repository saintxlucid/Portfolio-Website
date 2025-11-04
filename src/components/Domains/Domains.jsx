import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const domains = [
  {
    title: 'Music Production',
    description: 'Creating immersive soundscapes and electronic compositions that blend emotion with technical precision.',
    icon: '🎵',
  },
  {
    title: 'Web Development',
    description: 'Building responsive, performant web applications with modern frameworks and best practices.',
    icon: '💻',
  },
  {
    title: 'Visual Design',
    description: 'Crafting compelling visual narratives through UI/UX design and digital art.',
    icon: '🎨',
  },
  {
    title: 'Creative Coding',
    description: 'Exploring generative art and interactive experiences at the intersection of code and creativity.',
    icon: '✨',
  },
];

const Domains = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="domains" className="section-container" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
          variants={itemVariants}
        >
          Creative <span className="text-purple-500">Domains</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {domains.map((domain, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {domain.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white">
                {domain.title}
              </h3>
              <p className="text-gray-400">
                {domain.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Domains;
