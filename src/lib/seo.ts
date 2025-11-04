import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://saintlucid.com';

export const defaultMetadata: Metadata = {
  title: {
    default:
      'Saint Lucid | Founder & Chief Architect | AI Systems • Creative Technology',
    template: '%s | Saint Lucid',
  },
  description:
    'Founder & Chief Architect specializing in AI systems architecture and creative technology. Leading ASTRA OS development—sovereign AI platform redefining human-AI collaboration. Enterprise solutions • Strategic innovation • Multimedia production.',
  keywords: [
    'Saint Lucid',
    'Karim Al-Sharif',
    'CEO',
    'Founder',
    'Chief Architect',
    'AI Systems Architecture',
    'ASTRA OS',
    'Enterprise AI Solutions',
    'Creative Technology Leadership',
    'Strategic Innovation',
    'Music Production',
    'Sound Design',
    'Film Production',
    'SAP Pre-Sales',
    'Machine Learning',
    'Full Stack Development',
    'React',
    'Next.js',
    'Three.js',
    'TypeScript',
  ],
  authors: [{ name: 'Karim Al-Sharif (Saint Lucid)' }],
  creator: 'Saint Lucid',
  publisher: 'Saint Lucid',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_EG',
    url: siteUrl,
    siteName: 'Saint Lucid - Executive Portfolio',
    title:
      'Saint Lucid | Founder & Chief Architect | AI Systems • Creative Technology',
    description:
      'Leading ASTRA OS development—sovereign AI architecture redefining human-AI collaboration. Enterprise solutions, strategic innovation, and multimedia excellence.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Saint Lucid - Founder & Chief Architect Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Saint Lucid | Founder & Chief Architect | AI Systems • Creative Technology',
    description:
      'Leading ASTRA OS—sovereign AI architecture for human-AI collaboration. Enterprise solutions & strategic innovation.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export function generatePersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Karim Al-Sharif',
    alternateName: 'Saint Lucid',
    jobTitle: 'Founder & Chief Architect',
    description:
      'Founder and Chief Architect specializing in AI systems architecture and creative technology. Leading ASTRA OS development—a sovereign AI platform redefining human-AI collaboration.',
    url: siteUrl,
    sameAs: [
      'https://github.com/saintxlucid',
      'https://www.linkedin.com/in/karimalsharif',
      'https://soundcloud.com/saintxlucid',
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'AI Systems Architecture',
      'Enterprise Software',
      'Creative Technology',
      'Music Production',
      'Film Production',
      'Full Stack Development',
      'Strategic Innovation',
      'Business Development',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Arab Academy for Science, Technology and Maritime Transport',
    },
  };
}
