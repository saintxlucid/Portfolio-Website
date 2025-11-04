import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://saintlucid.com';

export const defaultMetadata: Metadata = {
  title: {
    default: 'Saint Lucid | Media Specialist & Creative Technologist',
    template: '%s | Saint Lucid',
  },
  description:
    'Media Specialist & Creative Technologist building ASTRA — a sovereign AI assistant. Specializing in AI systems, music production, film, and creative technology.',
  keywords: [
    'Saint Lucid',
    'Karim Al-Sharif',
    'AI Systems',
    'ASTRA',
    'Music Production',
    'Sound Design',
    'Film',
    'Creative Technology',
    'React',
    'Next.js',
    'Three.js',
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
    siteName: 'Saint Lucid Portfolio',
    title: 'Saint Lucid | Media Specialist & Creative Technologist',
    description:
      'Media Specialist & Creative Technologist building ASTRA — a sovereign AI assistant.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Saint Lucid Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saint Lucid | Media Specialist & Creative Technologist',
    description:
      'Media Specialist & Creative Technologist building ASTRA — a sovereign AI assistant.',
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
    jobTitle: 'Media Specialist & Creative Technologist',
    description:
      'Media Specialist & Creative Technologist building ASTRA — a sovereign AI assistant.',
    url: siteUrl,
    sameAs: [
      'https://github.com/saintxlucid',
      'https://www.linkedin.com/in/karimalsharif',
      'https://soundcloud.com/saintxlucid',
    ],
  };
}
