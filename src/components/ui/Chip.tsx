import React from 'react';

interface ChipProps {
  children: React.ReactNode;
  className?: string;
}

export function Chip({ children, className = '' }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-sm rounded-full bg-surface border border-border text-limestone ${className}`}
    >
      {children}
    </span>
  );
}
