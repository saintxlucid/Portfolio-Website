import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Domains from '@/components/Domains/Domains';
import Experience from '@/components/Experience/Experience';
import Projects from '@/components/Projects/Projects';
import Skills from '@/components/Skills/Skills';
import Contact from '@/components/Contact/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Domains />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
