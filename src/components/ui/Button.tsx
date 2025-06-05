import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd';
import type { ReactNode } from 'react';

interface ButtonProps extends AntdButtonProps {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'danger' | 'info' | 'light';
}

const Button = ({ children, color = 'primary', className = '', ...props }: ButtonProps) => {
  let type: AntdButtonProps['type'] = 'default';
  let style = {};

  switch (color) {
    case 'primary':
      type = 'primary';
      style = { backgroundColor: '#7E57C2', borderColor: '#7E57C2' }; // primary 컬러
      break;
    case 'secondary':
      type = 'primary';
      style = { backgroundColor: '#722ed1', borderColor: '#722ed1' }; // secondary 컬러
      break;
    case 'danger':
      type = 'primary';
      style = { backgroundColor: '#EF5350', borderColor: '#EF5350' }; // dangerRed 컬러
      break;
    case 'info':
      type = 'primary';
      style = { backgroundColor: '#42A5F5', borderColor: '#42A5F5' }; // infoBlue 컬러
      break;
    case 'light':
      type = 'default';
      style = { backgroundColor: '#D1C4E9', borderColor: '#D1C4E9', color: '#7E57C2' }; // lightViolet 컬러
      break;
  }

  return (
    <AntdButton
      type={type}
      style={style}
      className={className}
      {...props}
    >
      {children}
    </AntdButton>
  );
};

export default Button; 