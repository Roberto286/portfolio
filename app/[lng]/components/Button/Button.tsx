import { ButtonProps } from './Button.props';
import React from 'react';

const Button: React.FC<ButtonProps> = ({ rounded, className, onClick, children, type, id }) => {
  return (
    <button
      id={id}
      className={`${className || ''} ${rounded ? 'rounded-full' : ''} flex items-center justify-center`}
      onClick={onClick}
      type={type || 'button'}
    >
      {children}
    </button>
  );
};

export default Button;
