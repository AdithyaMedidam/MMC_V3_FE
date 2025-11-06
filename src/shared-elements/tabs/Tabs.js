import React, { useState, useRef, useEffect } from 'react';
import './Tabs.css';

/**
 * Tabs: Tab navigation component
 * Props:
 * - tabs: Array of tab objects with { label, value, content? }
 * - value: Current active tab value (controlled)
 * - defaultValue: Initial tab value (uncontrolled)
 * - onChange: Callback when tab changes (value) => void
 * - className: Additional classes
 * - indicatorColor: Color for active tab indicator (default: #A3650F)
 * - variant: 'default' | 'underline'
 */
const Tabs = ({
  tabs = [],
  value: controlledValue,
  defaultValue,
  onChange,
  className = '',
  indicatorColor = '#A3650F',
  variant = 'default',
  ...props
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || (tabs.length > 0 ? tabs[0].value : 0));
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef({});
  const headerRef = useRef(null);
  
  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : uncontrolledValue;

  const handleTabClick = (tabValue) => {
    if (!isControlled) {
      setUncontrolledValue(tabValue);
    }
    if (onChange) {
      onChange(tabValue);
    }
  };

  // Update indicator position based on active tab
  useEffect(() => {
    const activeTabRef = tabRefs.current[activeValue];
    const header = headerRef.current;
    
    if (activeTabRef && header) {
      const headerRect = header.getBoundingClientRect();
      const tabRect = activeTabRef.getBoundingClientRect();
      
      setIndicatorStyle({
        left: `${tabRect.left - headerRect.left}px`,
        width: `${tabRect.width}px`,
      });
    }
  }, [activeValue, tabs]);

  return (
    <div className={`tabs-container ${className}`} {...props}>
      <div className="tabs-header" ref={headerRef}>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            ref={(el) => (tabRefs.current[tab.value] = el)}
            type="button"
            onClick={() => handleTabClick(tab.value)}
            className={`tab-button ${activeValue === tab.value ? 'active' : ''}`}
            style={{
              '--indicator-color': indicatorColor,
            }}
          >
            {tab.label}
          </button>
        ))}
        {tabs.length > 0 && (
          <div
            className="tab-indicator"
            style={{
              '--indicator-color': indicatorColor,
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Tabs;

