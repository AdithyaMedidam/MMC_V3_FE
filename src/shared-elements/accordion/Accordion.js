import React, { useState } from 'react';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

/**
 * Accordion: Reusable accordion component
 * Props:
 * - expanded: Boolean to control if accordion is expanded (controlled)
 * - defaultExpanded: Boolean for initial expanded state (uncontrolled)
 * - onChange: Callback when accordion expands/collapses (event, isExpanded) => void
 * - summary: Content to render in the summary/header area
 * - children: Content to render in the details/body area
 * - className: Additional classes for the accordion
 * - summaryClassName: Additional classes for the summary
 * - detailsClassName: Additional classes for the details
 * - expandIcon: Custom expand icon (default: KeyboardArrowDown/Up)
 * - summaryIcon: Icon to show before summary content
 * - summaryIconColor: Color for summary icon (default: 'purple-600')
 * - showExpandIcon: Whether to show expand/collapse icon (default: true)
 */
const Accordion = ({
  expanded: controlledExpanded,
  defaultExpanded = false,
  onChange,
  summary,
  children,
  className = '',
  summaryClassName = '',
  detailsClassName = '',
  expandIcon,
  summaryIcon,
  summaryIconColor = 'purple-600',
  showExpandIcon = true,
  ...props
}) => {
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded);
  const isControlled = controlledExpanded !== undefined;
  const isExpanded = isControlled ? controlledExpanded : uncontrolledExpanded;

  const handleChange = (event, isExpanded) => {
    if (!isControlled) {
      setUncontrolledExpanded(isExpanded);
    }
    if (onChange) {
      onChange(event, isExpanded);
    }
  };

  const defaultExpandIcon = isExpanded ? (
    <KeyboardArrowUpIcon className={`text-${summaryIconColor}`} />
  ) : (
    <KeyboardArrowDownIcon className={`text-${summaryIconColor}`} />
  );

  const iconToShow = expandIcon !== undefined ? expandIcon : defaultExpandIcon;

  return (
    <MuiAccordion
      expanded={isExpanded}
      onChange={handleChange}
      className={`!shadow-none !border !border-gray-200 ${className}`}
      {...props}
    >
      <MuiAccordionSummary
        expandIcon={showExpandIcon ? iconToShow : null}
        sx={{
          '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': { transform: 'none' }
        }}
        className={`!bg-gray-50 hover:!bg-gray-100 ${summaryClassName}`}
      >
        {summary}
      </MuiAccordionSummary>
      <MuiAccordionDetails className={`!px-1 !pt-1 ${detailsClassName}`}>
        {children}
      </MuiAccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;

