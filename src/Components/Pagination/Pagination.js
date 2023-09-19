import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="mt-[20px] flex items-center justify-end gap-[6px] max-w-full overflow-x-auto cursor-pointer text-[18px]">
      {pageNumbers.map((page) => (
        <li
          key={page}
          onClick={(e) => {
            e.preventDefault();
            onPageChange(page);
          }}
          className={`flex ite justify-center h-[28px] w-[28px] page-item ${
            currentPage === page ? 'bg-[#e47e52] text-white rounded-full' : ''
          }`}
        >
          <a href="#" className="page-link">
            {page}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
