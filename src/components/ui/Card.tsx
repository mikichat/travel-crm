import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = '' }: CardProps) => (
  <div className={`bg-white rounded-xl shadow-md border border-lightViolet p-6 ${className}`}>
    {children}
  </div>
);

export default Card; 