import React from 'react';
import './Select.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MuiSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';


const Select = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  error = false,
  disabled = false,
  required = false,
  className = '',
  helperText = '',
  InputLabelProps = {},
  SelectProps = {},
  MenuProps = {},
  menuItems = null,
  multiple = false,
  renderValue,
  fullWidth = true,
  ...props
}) => {
  // const labelId = 'mui-select-label-' + Math.random().toString(36).substring(2, 10);
  return (
    <>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
        // <label id={labelId} className={`custom-select-label text-xs font-medium ${InputLabelProps.className || ''}`} {...InputLabelProps}>
        //   {label}
        // </label>
      )}
      <FormControl size='small' fullWidth={fullWidth} variant="outlined" required={required} error={!!error} disabled={disabled} className={className}>
        <MuiSelect
          value={multiple ? (Array.isArray(value) ? value : (value ? [value] : [])) : (value ?? '')}
          onChange={onChange}
          displayEmpty={!multiple}
          multiple={multiple}
          renderValue={renderValue}
          className={`custom-select-field ${SelectProps.className || ''}`}
          MenuProps={MenuProps}
          {...SelectProps}
          {...props}
        >
          {!menuItems && !multiple && (
            <MenuItem value="" disabled hidden>{placeholder}</MenuItem>
          )}
          {menuItems
            ? menuItems
            : options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </MuiSelect>
        {!!error && (
          <FormHelperText>{typeof error === 'string' ? error : helperText}</FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default Select;
