import React from 'react';
import { Search } from '@mui/icons-material';

/**
 * @param {string} value
 * @param {function} onChange
 * @param {string} [placeholder]
 * @param {string} [name]
 * @param {string} [className] Additional classes for input
 * ...props passed to input
 */
const SearchBar = ({ value, onChange, placeholder = 'Search', name, className = '', ...props }) => (
  <div className="relative">
    <Search fontSize='small' className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      type="search"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`pl-10 pr-4 py-2 bg-transparent text-gray-900 placeholder-gray-500 rounded-lg border border-gray-400 focus:outline-none focus:border-[#1976d2] focus:ring-[#1976d2]/20 w-[260px] ${className}`}
      {...props}
    />
  </div>
);

export default SearchBar;
