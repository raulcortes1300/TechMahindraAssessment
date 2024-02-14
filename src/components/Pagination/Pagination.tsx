import React from "react";

interface PaginationProps {
  onPageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  currentPage,
  totalPages,
}) => (
  <div>
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage <= 1}
    >
      Previous Page
    </button>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage >= totalPages}
    >
      Next Page
    </button>
  </div>
);

export default Pagination;
