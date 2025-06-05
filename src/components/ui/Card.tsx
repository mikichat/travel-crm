import { Card as AntdCard, type CardProps as AntdCardProps } from 'antd';
import type { ReactNode } from 'react';

interface CardProps extends AntdCardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = '', ...props }: CardProps) => (
  <AntdCard
    className={className}
    style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderColor: '#D1C4E9' }} // Rounded-xl, shadow-md, border-lightViolet
    {...props}
  >
    {children}
  </AntdCard>
);

export default Card; 