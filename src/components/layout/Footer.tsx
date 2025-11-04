import React from 'react';
import { personalInfo } from '@/lib/content';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-limestone/60 text-sm">
          © {currentYear} {personalInfo.fullName} ({personalInfo.name}). All
          rights reserved.
        </p>
        <p className="text-limestone/40 text-xs mt-2">
          Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion
        </p>
      </div>
    </footer>
  );
}
