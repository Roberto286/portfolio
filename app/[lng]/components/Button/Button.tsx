import React from 'react';

export type ButtonProps = {
  rounded?: boolean;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ rounded, className, onClick, children }) => {
  return (
    <button
      className={`${className || ''} ${rounded ? 'rounded-full' : ''} flex items-center justify-center`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
