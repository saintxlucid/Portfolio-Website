import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="about" className="section-container" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
          variants={itemVariants}
        >
          About <span className="text-purple-500">Me</span>
        </motion.h2>

        <motion.div
          className="max-w-3xl mx-auto space-y-6 text-gray-300 text-lg leading-relaxed"
          variants={itemVariants}
        >
          <p>
            I'm Saint Lucid, a multidisciplinary creative who bridges the worlds of technology, 
            music, and design. My work explores the intersection of code and creativity, crafting 
            experiences that resonate both aesthetically and functionally.
          </p>
          
          <p>
            With a passion for innovation and storytelling, I build projects that push boundaries 
            and challenge conventions. Whether it's through immersive web experiences, evocative 
            soundscapes, or visual narratives, I strive to create work that leaves a lasting impact.
          </p>
          
          <p>
            My approach is rooted in curiosity and experimentation. I believe in the power of 
            continuous learning and the magic that happens when different disciplines converge.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
