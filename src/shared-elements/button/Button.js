import React from 'react';
import './Button.css';

const Button = ({ children, variant = 'primary', size = 'medium',  fullWidth = false, className = '', onClick, disabled, ...props }) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'w-full' : ''} ${className} gap-1`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
