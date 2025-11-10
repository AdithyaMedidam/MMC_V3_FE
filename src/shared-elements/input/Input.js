import React, { useState, useEffect } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './Input.css';

const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  disabled = false,
  required = false,
  className = '',
  showPasswordToggle = false,
  startIcon,
  // New props
  onlyNumbers = false,
  onlyLetters = false,
  allowDecimal = true,
  decimalPlaces,
  allowNegative = true,
  phoneFormat = false,
  min,
  max,
  minValue,
  maxValue,
  emailValidation = false,
  pattern,
  patternErrorMessage,
  validateOnBlur = true,
  validateOnChange = false,
  onBlur,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalError, setInternalError] = useState('');

  // min/max = minimum/maximum number of digits
  // minValue/maxValue = minimum/maximum numeric value

  // Check if any new features are enabled
  const hasNewFeatures = onlyNumbers || onlyLetters || phoneFormat || emailValidation || 
                         min !== undefined || max !== undefined || 
                         minValue !== undefined || maxValue !== undefined || pattern;

  // Only use internal state if new features are enabled, otherwise use value directly
  const [displayValue, setDisplayValue] = useState(value || '');

  // Update display value when value prop changes (only if using internal state)
  useEffect(() => {
    if (hasNewFeatures) {
      setDisplayValue(value || '');
    }
  }, [value, hasNewFeatures]);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate pattern
  const validatePattern = (val) => {
    if (!pattern || val === '' || val === null || val === undefined) return true;
    const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern);
    return regex.test(val);
  };

  // Phone number formatting (India - 10 digits)
  const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '').slice(0, 10); // Limit to 10 digits
    if (cleaned.length <= 5) return cleaned;
    return `${cleaned.slice(0, 5)}${cleaned.slice(5)}`;
  };

  // Validate numeric value constraints (minValue/maxValue)
  const validateNumberValue = (val) => {
    if (val === '' || val === null || val === undefined) return true;
    const num = parseFloat(val);
    if (isNaN(num)) return false;
    if (minValue !== undefined && num < minValue) return false;
    if (maxValue !== undefined && num > maxValue) return false;
    return true;
  };

  // Validate digit length (min/max)
  const validateDigitLength = (val) => {
    if (val === '' || val === null || val === undefined) return true;
    const digitCount = val.replace(/\D/g, '').length; // Count only digits
    if (min !== undefined && digitCount < min) return false;
    if (max !== undefined && digitCount > max) return false;
    return true;
  };

  // Handle input change with filtering and validation
  const handleChange = (e) => {
    let inputValue = e.target.value;
    let processedValue = inputValue;

    // If no new features are enabled, pass through unchanged
    if (!hasNewFeatures) {
      if (onChange) {
        onChange(e);
      }
      return;
    }

    // Only numbers filter
    if (onlyNumbers) {
      let numValue = inputValue.replace(/[^\d.-]/g, '');
      
      // Handle negative sign
      if (!allowNegative) {
        numValue = numValue.replace(/-/g, '');
      } else {
        // Allow only one negative sign at the start
        if (numValue.startsWith('-')) {
          numValue = '-' + numValue.slice(1).replace(/-/g, '');
        }
      }

      // Handle decimal
      if (!allowDecimal) {
        numValue = numValue.replace(/\./g, '');
      } else {
        // Allow only one decimal point
        const parts = numValue.split('.');
        if (parts.length > 2) {
          numValue = parts[0] + '.' + parts.slice(1).join('');
        }
        
        // Limit decimal places
        if (decimalPlaces !== undefined && parts.length === 2) {
          numValue = parts[0] + '.' + parts[1].slice(0, decimalPlaces);
        }
      }

      processedValue = numValue;
    }

    // Only letters filter
    if (onlyLetters) {
      processedValue = inputValue.replace(/[^a-zA-Z\s]/g, '');
    }

    // Phone format (apply after number filtering if both are enabled)
    if (phoneFormat && !onlyNumbers) {
      processedValue = formatPhoneNumber(inputValue);
    } else if (phoneFormat && onlyNumbers) {
      // If both phoneFormat and onlyNumbers, format the cleaned number
      processedValue = formatPhoneNumber(processedValue);
    }

    // Validate phone number length (India - 10 digits)
    if (phoneFormat && processedValue) {
      const phoneDigits = processedValue.replace(/\D/g, '');
      if (phoneDigits.length > 10) {
        // Limit to 10 digits
        processedValue = formatPhoneNumber(phoneDigits.slice(0, 10));
      }
    }

    // Validate digit length (min/max) - check first
    let digitLengthError = '';
    if ((min !== undefined || max !== undefined) && processedValue !== '') {
      if (!validateDigitLength(processedValue)) {
        const fieldName = label || 'this field';
        if (min !== undefined && max !== undefined) {
          digitLengthError = `Please enter valid ${fieldName} (${min}-${max} digits)`;
        } else if (min !== undefined) {
          digitLengthError = `Please enter valid ${fieldName} (minimum ${min} digits)`;
        } else {
          digitLengthError = `Please enter valid ${fieldName} (maximum ${max} digits)`;
        }
      }
    }

    // Validate numeric value constraints (minValue/maxValue) - check second
    let numericValueError = '';
    if (onlyNumbers && processedValue !== '' && !digitLengthError) {
      // Extract numeric value for validation (remove formatting)
      const numericValue = phoneFormat 
        ? processedValue.replace(/\D/g, '') 
        : processedValue;
      
      if (numericValue && !validateNumberValue(numericValue)) {
        const fieldName = label || 'this field';
        if (minValue !== undefined && maxValue !== undefined) {
          numericValueError = `Please enter valid ${fieldName} (between ${minValue} and ${maxValue})`;
        } else if (minValue !== undefined) {
          numericValueError = `Please enter valid ${fieldName} (minimum ${minValue})`;
        } else {
          numericValueError = `Please enter valid ${fieldName} (maximum ${maxValue})`;
        }
      }
    }

    // Email validation
    let emailError = '';
    if (emailValidation && type === 'email' && processedValue) {
      if (!emailRegex.test(processedValue)) {
        emailError = 'Please enter a valid email address';
      }
    }

    // Set error (prioritize: digit length > numeric value > email)
    setInternalError(digitLengthError || numericValueError || emailError);

    // Pattern validation (if validateOnChange is true)
    let patternError = '';
    if (pattern && validateOnChange && processedValue !== '') {
      if (!validatePattern(processedValue)) {
        patternError = patternErrorMessage || 'Please enter a valid value';
      }
    }

    // Set error (prioritize: digit length > numeric value > email > pattern)
    setInternalError(digitLengthError || numericValueError || emailError || patternError);

    // Update display value
    setDisplayValue(processedValue);

    // Call original onChange with processed value
    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: processedValue
        }
      };
      onChange(syntheticEvent);
    }
  };

  // Handle blur event
  const handleBlur = (e) => {
    // Only run validation if new features are enabled
    if (!hasNewFeatures) {
      if (onBlur) {
        onBlur(e);
      }
      return;
    }

    // Final validation on blur
    const currentValue = hasNewFeatures ? displayValue : e.target.value;
    let errorMessage = '';
    
    // Phone number validation (India - must be 10 digits)
    if (phoneFormat && currentValue) {
      const phoneDigits = currentValue.replace(/\D/g, '');
      if (phoneDigits.length > 0 && phoneDigits.length !== 10) {
        errorMessage = 'Phone number must be 10 digits';
      }
    }
    
    // Email validation
    if (!errorMessage && emailValidation && type === 'email' && currentValue) {
      if (!emailRegex.test(currentValue)) {
        errorMessage = 'Please enter a valid email address';
      }
    }

    // Validate digit length (min/max)
    if (!errorMessage && (min !== undefined || max !== undefined) && currentValue !== '') {
      if (!validateDigitLength(currentValue)) {
        const fieldName = label || 'this field';
        if (min !== undefined && max !== undefined) {
          errorMessage = `Please enter valid ${fieldName} (${min}-${max} digits)`;
        } else if (min !== undefined) {
          errorMessage = `Please enter valid ${fieldName} (minimum ${min} digits)`;
        } else {
          errorMessage = `Please enter valid ${fieldName} (maximum ${max} digits)`;
        }
      }
    }

    // Validate numeric value constraints (minValue/maxValue)
    if (!errorMessage && onlyNumbers && currentValue !== '') {
      // Extract numeric value for validation (remove formatting)
      const numericValue = phoneFormat 
        ? currentValue.replace(/\D/g, '') 
        : currentValue;
      
      if (numericValue && !validateNumberValue(numericValue)) {
        const fieldName = label || 'this field';
        if (minValue !== undefined && maxValue !== undefined) {
          errorMessage = `Please enter valid ${fieldName} (between ${minValue} and ${maxValue})`;
        } else if (minValue !== undefined) {
          errorMessage = `Please enter valid ${fieldName} (minimum ${minValue})`;
        } else {
          errorMessage = `Please enter valid ${fieldName} (maximum ${maxValue})`;
        }
      }
    }

    // Pattern validation (on blur) - check last
    if (!errorMessage && pattern && validateOnBlur && currentValue !== '') {
      if (!validatePattern(currentValue)) {
        errorMessage = patternErrorMessage || 'Please enter a valid value';
      }
    }

    setInternalError(errorMessage);

    if (onBlur) {
      onBlur(e);
    }
  };

  // Determine input type
  const inputType = showPasswordToggle && type === 'password' 
    ? (showPassword ? 'text' : 'password') 
    : (onlyNumbers && hasNewFeatures)
    ? 'text' // Use text to allow better control for number filtering
    : type;

  // Determine input mode for mobile keyboards (only if new features enabled)
  const inputMode = hasNewFeatures 
    ? (onlyNumbers 
      ? 'numeric' 
      : type === 'email' 
      ? 'email' 
      : type === 'tel' || phoneFormat
      ? 'tel'
      : undefined)
    : undefined;

  // Combine errors (external error takes precedence)
  const finalError = error || internalError;

  // Determine if input should be controlled or uncontrolled
  const isControlled = value !== undefined || hasNewFeatures;
  const inputValue = hasNewFeatures 
    ? displayValue 
    : (value !== undefined ? value : undefined); // undefined = uncontrolled

  // Build input props
  const inputProps = {
    type: inputType,
    placeholder,
    onChange: handleChange,
    disabled,
    autoComplete: "off",
    className: `input-field ${finalError ? 'error' : ''} ${startIcon ? 'with-start-icon' : ''}`,
    ...props
  };

  // Only set value if controlled (has value prop or new features)
  if (isControlled) {
    inputProps.value = inputValue || '';
  }

  // Set inputMode only if new features enabled
  if (inputMode) {
    inputProps.inputMode = inputMode;
  }

  // Set onBlur only if needed
  if (hasNewFeatures || onBlur) {
    inputProps.onBlur = handleBlur;
  }

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div className="input-wrapper">
        {startIcon && (
          <div className="input-start-icon">
            {startIcon}
          </div>
        )}
        <input {...inputProps} />
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
          </button>
        )}
      </div>
      {finalError && <span className="error-message">{finalError}</span>}
    </div>
  );
};

export default Input;
