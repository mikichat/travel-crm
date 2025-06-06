import { Card as AntdCard } from 'antd';
import type { ReactNode } from 'react';

interface SectionCardProps {
  label: string;
  children: ReactNode;
  className?: string;
}

const SectionCard = ({ label, children, className = '' }: SectionCardProps) => (
  <div className={`flex mb-6 ${className}`}>

    <AntdCard
      style={{ flex: 1, borderRadius: '0 12px 12px 0', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderColor: '#D1C4E9', marginLeft: '-1px' }}
      styles={{ body: { padding: '24px' } }}
    >
      {children}
    </AntdCard>
  </div>
);

export default SectionCard; 