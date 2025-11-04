import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionTitle({
  children,
  className = '',
  id,
}: SectionTitleProps) {
  return (
    <h2
      id={id}
      className={`text-4xl md:text-5xl font-bold text-limestone mb-8 ${className}`}
    >
      {children}
    </h2>
  );
}
