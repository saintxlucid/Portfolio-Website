import { Experience, Skill, Domain, SocialLink } from '@/types';

export const personalInfo = {
  name: 'Saint Lucid',
  fullName: 'Karim Al-Sharif',
  title: 'Media Specialist & Creative Technologist',
  bio: 'Media Specialist & Creative Technologist building ASTRA — a sovereign AI assistant. Values evolution, precision, and beauty in structure.',
  email: {
    primary: 'saintxlucid@proton.me',
    secondary: 'karimkotb.alsharif@gmail.com',
  },
};

export const domains: Domain[] = [
  {
    title: 'Music & Sound Design',
    description:
      'Crafting sonic landscapes and emotional narratives through composition, mixing, and mastering.',
    icon: '🎵',
  },
  {
    title: 'Film & Narrative',
    description:
      'Visual storytelling through cinematography, editing, and post-production.',
    icon: '🎬',
  },
  {
    title: 'AI Systems & ASTRA OS',
    description:
      'Building sovereign AI assistants with RAG, vector databases, and LLM orchestration.',
    icon: '🤖',
  },
  {
    title: 'Creative Tech & Games',
    description:
      'Interactive experiences with Three.js, React, Unreal Engine 5, and real-time rendering.',
    icon: '🎮',
  },
];

export const experience: Experience[] = [
  {
    company: 'Evolve Consulting',
    role: 'SAP Pre-Sales Executive',
    period: 'Mar 2025 – Aug 2025',
  },
  {
    company: 'Walmart (via Transcom)',
    role: 'Customer Experience Specialist',
    period: 'Jun 2023 – Jul 2024',
  },
  {
    company: 'UPS (via Teleperformance)',
    role: 'Customer Service Representative',
    period: 'Feb 2022 – Nov 2022',
  },
  {
    company: 'Digital Works USA',
    role: 'Technical Support',
    period: 'Aug 2019 – Dec 2019',
  },
  {
    company: 'International Corncob',
    role: 'Customer Support',
    period: 'Feb 2019 – Jun 2019',
  },
  {
    company: 'Concentrix (Canada)',
    role: 'Customer Service Representative',
    period: 'Apr 2018 – Oct 2018',
  },
  {
    company: 'Vodafone (Ireland)',
    role: 'Customer Service',
    period: 'Jan 2018 – Mar 2018',
  },
  {
    company: 'Vodafone (UK)',
    role: 'Customer Service',
    period: 'Mar 2017 – Aug 2017',
  },
];

export const education = {
  institution: 'Arab Academy for Science, Technology and Maritime Transport',
  degree: 'B.A. Language & Mass Communication',
  expected: 'June 2026',
};

export const skills: Skill[] = [
  {
    category: 'AI & Machine Learning',
    items: ['LLMs', 'Python', 'FastAPI', 'RAG', 'Vector Databases'],
  },
  {
    category: 'Web Development',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js'],
  },
  {
    category: '3D & Game Development',
    items: ['Unreal Engine 5', 'Blender', '@react-three/fiber'],
  },
  {
    category: 'Audio Production',
    items: ['Sound Design', 'Mixing', 'Mastering', 'Music Composition'],
  },
  {
    category: 'Video Production',
    items: ['Premiere Pro', 'DaVinci Resolve', 'Cinematography'],
  },
  {
    category: 'Business & Communication',
    items: ['SAP Pre-Sales', 'Bilingual Writing (EN/AR)', 'Client Relations'],
  },
];

export const socialLinks: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/saintxlucid',
    icon: 'github',
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/karimalsharif',
    icon: 'linkedin',
  },
  {
    platform: 'SoundCloud',
    url: 'https://soundcloud.com/saintxlucid',
    icon: 'soundcloud',
  },
];

export const projects = [
  {
    title: 'Floating Through Dimensions',
    description:
      'C minor, 130 BPM - A sonic journey through ethereal soundscapes',
    link: 'https://soundcloud.com/saintxlucid',
    tags: ['Music', 'Sound Design'],
  },
  {
    title: 'PRJKT_ASTRA_2.0',
    description: 'Sovereign AI Assistant with RAG and vector databases',
    link: 'https://github.com/saintxlucid',
    tags: ['AI', 'Python', 'FastAPI'],
  },
  {
    title: 'Echoes of Cairo',
    description: 'Short film exploring identity and urban landscapes',
    link: '#',
    tags: ['Film', 'Narrative'],
  },
  {
    title: 'Bilingual Lyrics & Structure Dataset',
    description: 'Comprehensive dataset for bilingual music analysis',
    link: '#',
    tags: ['AI', 'Music', 'Data'],
  },
];
