import type { ReactNode } from 'react';

interface SectionCardProps {
  label: string;
  children: ReactNode;
  className?: string;
}

const SectionCard = ({ label, children, className = '' }: SectionCardProps) => (
  <div className={`flex bg-white rounded-xl shadow-md border border-lightViolet mb-6 ${className}`}>
    <div className="bg-primary text-white flex items-center justify-center px-4 py-8 rounded-l-xl min-w-[60px] font-bold text-lg">
      <span style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>{label}</span>
    </div>
    <div className="flex-1 p-6">{children}</div>
  </div>
);

export default SectionCard; 