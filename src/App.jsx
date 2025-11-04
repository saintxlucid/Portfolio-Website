import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Domains from './components/Domains/Domains';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Domains />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      
      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 border-t border-gray-800" style={{ backgroundColor: 'var(--color-dark-surface)' }}>
        <p>&copy; {new Date().getFullYear()} Saint Lucid. All rights reserved.</p>
        <p className="text-sm mt-2">Built with React, Vite, Tailwind CSS, and Framer Motion</p>
      </footer>
    </div>
  );
}

export default App;

