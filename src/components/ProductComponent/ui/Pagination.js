import React from "react";

export const Pagination = ({ total, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="flex justify-between items-center mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 border rounded"
      >
        Trước
      </button>
      <span>Trang {currentPage} / {totalPages}</span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 border rounded"
      >
        Sau
      </button>
    </div>
  );
};
