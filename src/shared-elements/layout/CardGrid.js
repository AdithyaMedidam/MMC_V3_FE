import React from 'react';

/**
 * CardGrid: Responsive grid layout for card collections.
 *
 * Props:
 * - children: nodes to render inside the grid
 * - cols: base columns (default: 1)
 * - mdCols: columns at md breakpoint (default: 2)
 * - lgCols: columns at lg breakpoint (default: 3)
 * - gap: gap size (Tailwind spacing scale, default: 6)
 * - className: extra class names
 * - as: element/component to render as wrapper (default: 'div')
 */
const CardGrid = ({
  children,
  cols = 1,
  mdCols = 2,
  lgCols = 3,
  xlCols = 3,
  gap = 6,
  className = '',
  as: Wrapper = 'div',
  ...props
}) => {
  const classParts = [
    'grid',
    `grid-cols-${cols}`,
    `md:grid-cols-${mdCols}`,
    `xl:grid-cols-${xlCols}`,
    lgCols === 4 ? 'lg:grid-cols-4' : lgCols === 3 ? 'lg:grid-cols-3' : '',    `gap-${gap}`,
    className,
  ];

  return (
    <Wrapper className={classParts.join(' ')} {...props}>
      {children}
    </Wrapper>
  );
};

export default CardGrid;


