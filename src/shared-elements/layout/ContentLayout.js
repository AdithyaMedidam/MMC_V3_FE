import React from 'react';
import './ContentLayout.css';

/**
 * ContentLayout: Reusable content container layout component
 * 
 * Props:
 * - children: Content to render inside the layout
 * - className: Additional classes for the container
 * - padding: Custom padding (default: uses CSS variable)
 * - ...props: All other HTML div props
 */
const ContentLayout = ({
  children,
  className = '',
  padding,
  ...props
}) => {
  const style = padding ? { padding } : {};

  return (
    <div 
      className={`content-layout ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default ContentLayout;

