import React from 'react';
import './Checkbox.css';

const Checkbox = ({ 
  label, 
  checked, 
  onChange, 
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <div className={`checkbox-group ${className}`}>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="checkbox-input"
          {...props}
        />
        <span className="checkbox-custom"></span>
        {label && <span className="checkbox-text">{label}</span>}
      </label>
    </div>
  );
};

export default Checkbox;
