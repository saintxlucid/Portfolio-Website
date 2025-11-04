import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    title: 'Ethereal Soundscapes',
    description: 'An interactive audio-visual experience combining generative music with real-time 3D visuals.',
    technologies: ['React', 'Three.js', 'Web Audio API', 'GLSL'],
    link: '#',
    image: '🌌',
    caseStudy: '/case-studies/ethereal-soundscapes.mdx',
  },
  {
    title: 'Neural Canvas',
    description: 'A creative tool that transforms user input into generative art using machine learning.',
    technologies: ['Python', 'TensorFlow', 'React', 'Canvas API'],
    link: '#',
    image: '🎨',
    caseStudy: '/case-studies/neural-canvas.mdx',
  },
  {
    title: 'Quantum Beats',
    description: 'An experimental music album exploring themes of consciousness and digital existence.',
    technologies: ['Ableton Live', 'Max/MSP', 'Sound Design'],
    link: '#',
    image: '🎵',
    caseStudy: '/case-studies/quantum-beats.mdx',
  },
  {
    title: 'Lucid Portfolio',
    description: 'A showcase of creative work with immersive 3D elements and smooth animations.',
    technologies: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
    link: '#',
    image: '✨',
    caseStudy: '/case-studies/lucid-portfolio.mdx',
  },
];

const Projects = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="projects" className="section-container" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
          variants={itemVariants}
        >
          Featured <span className="text-purple-500">Projects</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {project.image}
              </div>
              
              <h3 className="text-2xl font-semibold mb-3 text-white">
                {project.title}
              </h3>
              
              <p className="text-gray-400 mb-4">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-3">
                <a
                  href={project.link}
                  className="text-purple-400 hover:text-purple-300 transition-colors focus-outline rounded px-2 py-1"
                  onClick={(e) => e.preventDefault()}
                >
                  View Project →
                </a>
                <a
                  href={project.caseStudy}
                  className="text-gray-400 hover:text-gray-300 transition-colors focus-outline rounded px-2 py-1"
                  onClick={(e) => e.preventDefault()}
                >
                  Case Study
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
