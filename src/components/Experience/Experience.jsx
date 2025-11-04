import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  {
    role: 'Creative Technologist',
    company: 'Independent',
    period: '2022 - Present',
    description: 'Developing innovative web experiences and multimedia projects that merge artistic vision with technical expertise.',
    technologies: ['React', 'Three.js', 'Node.js', 'WebGL'],
  },
  {
    role: 'Music Producer',
    company: 'Saint Lucid Studios',
    period: '2020 - Present',
    description: 'Creating original compositions and sound design for various multimedia projects.',
    technologies: ['Ableton Live', 'Sound Design', 'Synthesis', 'Mixing'],
  },
  {
    role: 'Frontend Developer',
    company: 'Freelance',
    period: '2019 - 2022',
    description: 'Built responsive web applications and interactive experiences for clients across diverse industries.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
];

const Experience = () => {
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="experience" className="section-container" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
          variants={itemVariants}
        >
          Professional <span className="text-purple-500">Experience</span>
        </motion.h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card relative pl-8 border-l-4 border-purple-500/50"
            >
              <div className="absolute -left-[13px] top-6 w-6 h-6 bg-purple-500 rounded-full border-4 border-dark-bg" />
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <h3 className="text-2xl font-semibold text-white">
                  {exp.role}
                </h3>
                <span className="text-purple-400 font-medium">
                  {exp.period}
                </span>
              </div>
              
              <p className="text-gray-400 font-medium mb-3">
                {exp.company}
              </p>
              
              <p className="text-gray-300 mb-4">
                {exp.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
