import React from 'react';
import { Skeleton as MuiSkeleton } from '@mui/material';
import './Skeleton.css';

/**
 * Skeleton: Reusable skeleton loading component
 * 
 * Props:
 * - variant: 'text' | 'rectangular' | 'circular' | 'card' | 'tableRow' | 'tableCell' (default: 'rectangular')
 * - width: Width of skeleton (can be number, string, or 'auto')
 * - height: Height of skeleton (can be number, string, or 'auto')
 * - className: Additional classes
 * - animation: 'pulse' | 'wave' | false (default: 'pulse')
 * - count: Number of skeleton items to render (default: 1)
 * - columns: Number of columns for tableRow variant (default: 5)
 * - ...props: All other MUI Skeleton props
 */
const Skeleton = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
  animation = 'pulse',
  count = 1,
  columns = 5,
  ...props
}) => {
  // Custom variants
  if (variant === 'card') {
    return (
      <div className={`skeleton-card ${className}`}>
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="skeleton-card-item">
            <MuiSkeleton variant="rectangular" height={24} width="60%" className="mb-2" animation={animation} />
            <MuiSkeleton variant="rectangular" height={16} width="80%" className="mb-3" animation={animation} />
            <MuiSkeleton variant="rectangular" height={16} width="100%" animation={animation} />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'tableRow') {
    return (
      <>
        {Array.from({ length: count }).map((_, idx) => (
          <tr key={idx} className="skeleton-table-row">
            {Array.from({ length: columns }).map((_, colIdx) => (
              <td key={colIdx} className="px-4 py-3">
                <MuiSkeleton variant="text" width="80%" height={20} animation={animation} />
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  }

  if (variant === 'tableCell') {
    return (
      <MuiSkeleton 
        variant="text" 
        width={width || '80%'} 
        height={height || 20} 
        animation={animation} 
        className={className}
        {...props} 
      />
    );
  }

  // Default MUI Skeleton
  if (count === 1) {
    return (
      <MuiSkeleton
        variant={variant}
        width={width}
        height={height}
        animation={animation}
        className={className}
        {...props}
      />
    );
  }

  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <MuiSkeleton
          key={idx}
          variant={variant}
          width={width}
          height={height}
          animation={animation}
          className={className}
          {...props}
        />
      ))}
    </>
  );
};

export default Skeleton;

