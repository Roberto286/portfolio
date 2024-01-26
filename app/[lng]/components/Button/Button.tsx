import React from 'react';

export type ButtonProps = {
  rounded?: boolean;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  id: string;
  type?: 'button' | 'submit' | 'reset';
};

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
