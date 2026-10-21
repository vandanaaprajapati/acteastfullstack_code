import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded border ${
          currentPage === 1
            ? 'bg-gray-300 cursor-not-allowed text-gray-500'
            : 'bg-white hover:bg-gray-100 text-teal-700 border-gray-300'
        }`}
      >
        Prev
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-4 py-2 rounded border ${
            currentPage === num
              ? 'bg-teal-700 text-white'
              : 'bg-white text-teal-700 hover:bg-gray-100 border-gray-300'
          }`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded border ${
          currentPage === totalPages
            ? 'bg-gray-300 cursor-not-allowed text-gray-500'
            : 'bg-white hover:bg-gray-100 text-teal-700 border-gray-300'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
