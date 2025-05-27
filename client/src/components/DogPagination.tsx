import React from 'react';

// Props expected by the pagination component
interface DogPaginationProps {
  page: number;                           // Current page number
  totalPages: number;                     // Total number of pages available
  onPageChange: (newPage: number) => void; // Callback function when a page is changed
}

/**
 * DogPagination displays simple pagination controls:
 * - A "Prev" button (disabled on first page)
 * - A "Next" button (disabled on last page)
 * - A page counter (e.g. 2 / 10)
 * 
 * The parent component controls page state and handles fetching data accordingly.
 */
const DogPagination: React.FC<DogPaginationProps> = ({ page, totalPages, onPageChange }) => (
  <div className="pagination">
    {/* Previous button; disabled when on the first page */}
    <button
      disabled={page === 1}
      onClick={() => onPageChange(page - 1)}
    >
      Prev
    </button>

    {/* Page number display */}
    <span>{page} / {totalPages}</span>

    {/* Next button; disabled when on the last page */}
    <button
      disabled={page === totalPages}
      onClick={() => onPageChange(page + 1)}
    >
      Next
    </button>
  </div>
);

export default DogPagination;
