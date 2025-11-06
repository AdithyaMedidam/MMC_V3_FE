import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * SideNav: Vertical sidebar navigation with icons and labels
 * Props:
 * - items: Array of navigation items with { label, path, icon }
 * - width: Sidebar width (default: 'w-24')
 * - bgColor: Background color (default: #2C2C38)
 * - className: Additional classes
 */
const SideNav = ({
  items = [],
  width = 'w-24',
  bgColor = '#2C2C38',
  className = '',
  ...props
}) => {
  return (
    <aside
      className={`${width} shadow-lg ${className} overflow-y-auto h-[calc(100%-0px)] custom-scrollbar-dark`}
      style={{ backgroundColor: bgColor }}
      {...props}
    >
      <nav className="p-3 px-1 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-2 py-2 rounded-lg font-medium transition ${isActive
                  ? " text-white"
                  : "text-gray-300"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`border border-white px-1.5 py-1.5 rounded-lg flex items-center
                      ${isActive ? "bg-white text-gray-800" : "hover:bg-white hover:text-gray-800 transition duration-300"}`}
                  >
                    <Icon fontSize="inherit" />
                  </div>
                  <div className="text-xs">{item.label}</div>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideNav;

