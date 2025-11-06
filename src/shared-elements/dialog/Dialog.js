import React from 'react';
import MuiDialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Dialog: Reusable dialog/modal component
 * Props:
 * - open: Boolean to control dialog visibility
 * - onClose: Function to call when dialog should close
 * - title: Main title text
 * - subtitle: Optional subtitle text below title
 * - children: Content to render in the dialog body
 * - actions: Content to render in the footer (buttons, etc.)
 * - fullWidth: Whether dialog should be full width (default: true)
 * - maxWidth: Maximum width ('xs', 'sm', 'md', 'lg', 'xl', false)
 * - className: Additional classes for the dialog
 * - showCloseButton: Whether to show close button in header (default: true)
 * - headerClassName: Additional classes for header
 * - contentClassName: Additional classes for content
 * - actionsClassName: Additional classes for actions
 */
const Dialog = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  actions,
  fullWidth = true,
  maxWidth = 'sm',
  className = '',
  showCloseButton = true,
  headerClassName = '',
  contentClassName = '',
  actionsClassName = '',
  ...props
}) => {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      PaperProps={{ className: `rounded-2xl ${className}` }}
      {...props}
    >
      {/* Header */}
      {(title || subtitle || showCloseButton) && (
        <div className={`px-6 pt-4 pb-2 border-b ${headerClassName}`}>
          <div className="flex items-start justify-between">
            {(title || subtitle) && (
              <div>
                {title && (
                  typeof title === 'string' ? (
                    <h2 className="!p-0 text-[18px] !font-semibold text-gray-800">
                      {title}
                    </h2>
                  ) : (
                    <div className="!p-0 text-[18px] !font-semibold text-gray-800">
                      {title}
                    </div>
                  )
                )}
                {subtitle && (
                  <span className="text-gray-500 text-xs">{subtitle}</span>
                )}
              </div>
            )}
            {showCloseButton && (
              <IconButton onClick={onClose} size="small">
                <CloseIcon />
              </IconButton>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className={`px-6 py-4 ${contentClassName}`}>
        {children}
      </div>

      {/* Actions/Footer */}
      {actions && (
        <div className={`px-6 py-6 flex gap-4 ${actionsClassName}`}>
          {actions}
        </div>
      )}
    </MuiDialog>
  );
};

export default Dialog;

