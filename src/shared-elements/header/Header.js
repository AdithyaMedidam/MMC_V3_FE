import React from 'react';

// const Header = ({ logo, logoAlt = 'logo', rightContent, className = '', ...props }) => {
//   return (
//     <div className={`h-14 bg-white shadow flex items-center px-10 ${className}`} {...props}>
//       <img src={logo} alt={logoAlt} className="h-9" />
//       {rightContent && (
//         <div className="ml-auto flex items-center gap-4">
//           {rightContent}
//         </div>
//       )}
//     </div>
//   );
// };
const Header = ({
    leftLogo,
    logoAlt = "logo",
    leftText,
    rightContent,
    className = "",
    ...props
  }) => {
    return (
      <div
        className={`h-14 bg-white shadow flex items-center justify-between px-10 ${className}`}
        {...props}
      >
        <div className="flex items-center gap-3">
          {leftLogo && <img src={leftLogo} alt={logoAlt} className="h-9" />}
          {leftText && <span className="text-lg font-semibold">{leftText}</span>}
        </div>
  
        {rightContent && (
          <div className="flex items-center gap-4">
            {rightContent}
          </div>
        )}
      </div>
    );
  };

export default Header;

