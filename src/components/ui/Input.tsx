import { Input as AntdInput, InputProps as AntdInputProps } from 'antd';

interface InputProps extends AntdInputProps {
  className?: string;
}

const Input = ({ className = '', ...props }: InputProps) => (
  <AntdInput
    className={className}
    style={{ borderColor: '#D1C4E9', color: '#722ED1' }} // lightViolet, secondary 컬러
    {...props}
  />
);

export default Input; 