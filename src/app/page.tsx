import Hero from '@/components/Hero/Hero';
import ExecutiveSummary from '@/components/ExecutiveSummary/ExecutiveSummary';
import About from '@/components/About/About';
import Domains from '@/components/Domains/Domains';
import Experience from '@/components/Experience/Experience';
import Projects from '@/components/Projects/Projects';
import Testimonials from '@/components/Testimonials/Testimonials';
import Skills from '@/components/Skills/Skills';
import Contact from '@/components/Contact/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <ExecutiveSummary />
      <About />
      <Domains />
      <Experience />
      <Projects />
      <Testimonials />
      <Skills />
      <Contact />
    </>
  );
}
