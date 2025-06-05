import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'danger' | 'info' | 'light';
}

const colorMap = {
  primary: 'bg-primary text-white hover:bg-secondary',
  secondary: 'bg-secondary text-white hover:bg-primary',
  danger: 'bg-dangerRed text-white hover:bg-red-700',
  info: 'bg-infoBlue text-white hover:bg-blue-700',
  light: 'bg-lightViolet text-primary hover:bg-primary hover:text-white',
};

const Button = ({ children, color = 'primary', className = '', ...props }: ButtonProps) => {
  return (
    <button
      className={`px-5 py-2 rounded-lg font-semibold shadow-sm transition ${colorMap[color]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 