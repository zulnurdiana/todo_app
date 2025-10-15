import React from "react";

const Pagination = ({ pagination, onPageChange, loading }) => {
  const { current_page, total_pages } = pagination;

  if (total_pages <= 1) {
    return null;
  }

  const handlePageChange = (page) => {
    if (page !== current_page && !loading) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, current_page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(total_pages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination ${i === current_page ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
          disabled={loading}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(current_page - 1)}
        disabled={current_page === 1 || loading}
      >
        Previous
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => handlePageChange(current_page + 1)}
        disabled={current_page === total_pages || loading}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
