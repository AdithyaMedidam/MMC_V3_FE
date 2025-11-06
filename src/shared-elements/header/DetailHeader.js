import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

/**
 * DetailHeader: Page header with back button, title, and subtitle
 * Props:
 * - title: Main heading text
 * - subtitle: Secondary text below title
 * - onBack: Function to call when back button is clicked
 * - backPath: Optional route path for back navigation (if not using onBack)
 * - bgColor: Background color (default: #210035)
 * - className: Additional classes
 */
const DetailHeader = ({
  title,
  subtitle,
  onBack,
  backPath,
  bgColor = '#210035',
  className = '',
  ...props
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1); // Go back in history
    }
  };

  return (
    <header
      className={`h-16 flex-shrink-0 text-white flex items-center px-6 shadow ${className}`}
      style={{ backgroundColor: bgColor }}
      {...props}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={handleBack}
          className="p-1 border-[1px] border-[#A699AE] hover:bg-opacity-20 hover:bg-white rounded transition flex items-center"
        >
          <ArrowBackIcon fontSize="small" />
        </button>
        <div className="flex items-center gap-2">
          <div>
            {title && <h1 className="text-lg font-semibold">{title}</h1>}
            {subtitle && <p className="text-[11px] text-opacity-80" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{subtitle}</p>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DetailHeader;

