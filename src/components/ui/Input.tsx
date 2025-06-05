import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className = '', ...props }: InputProps) => (
  <input
    className={`w-full border border-lightViolet rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-purple-900 placeholder-purple-300 ${className}`}
    {...props}
  />
);

export default Input; 