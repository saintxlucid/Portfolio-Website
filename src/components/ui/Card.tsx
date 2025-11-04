import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  const hoverStyles = hover
    ? 'hover:border-amethyst hover:shadow-lg hover:shadow-amethyst/10 transition-all duration-300'
    : '';

  return (
    <div
      className={`bg-surface border border-border rounded-2xl p-6 ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}
