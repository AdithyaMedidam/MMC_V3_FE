import React from 'react';
import './Table.css';
import Skeleton from '../skeleton/Skeleton';

/**
 * Table: Reusable table component
 * 
 * Props:
 * - columns: Array of column configs { key, label, className?, render? }
 * - data: Array of data objects
 * - onRowClick: Function called when row is clicked (row, index) => void
 * - rowClassName: Function or string for row className (row, index) => string | string
 * - headerClassName: Additional classes for header row
 * - className: Additional classes for table wrapper
 * - emptyMessage: Message to show when no data (default: "No data available")
 * - loading: Boolean to show skeleton loading state (default: false)
 * - loadingRows: Number of skeleton rows to show when loading (default: 5)
 */
const Table = ({
  columns = [],
  data = [],
  onRowClick,
  rowClassName = '',
  headerClassName = '',
  className = '',
  emptyMessage = 'No data available',
  loading = false,
  loadingRows = 5,
  ...props
}) => {
  const getRowClassName = (row, index) => {
    if (typeof rowClassName === 'function') {
      return rowClassName(row, index);
    }
    return rowClassName || '';
  };

  return (
    <div className={`table-wrapper rounded-lg overflow-auto border ${className}`} {...props}>
      <table className="w-full text-left">
        <thead>
          <tr className={`bg-[#F9F9F9] border-b ${headerClassName}`}>
            {columns.map((column, idx) => (
              <th
                key={column.key || idx}
                className={`px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                  column.headerClassName || ''
                } ${column.className || ''}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <Skeleton variant="tableRow" count={loadingRows} columns={columns.length} />
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick && onRowClick(row, rowIndex)}
                className={`hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''} ${getRowClassName(row, rowIndex)}`}
              >
                {columns.map((column, colIndex) => {
                  const cellValue = row[column.key];
                  const cellContent = column.render
                    ? column.render(cellValue, row, rowIndex)
                    : cellValue;

                  return (
                    <td
                      key={column.key || colIndex}
                      className={`px-4 py-3 whitespace-nowrap text-sm font-medium text-[#32343A] ${
                        column.cellClassName || ''
                      }`}
                    >
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
