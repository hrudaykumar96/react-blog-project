import PropTypes from "prop-types";
import { useEffect } from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  currentBlogs,
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  useEffect(() => {
    if (currentBlogs.length === 0) {
      handlePreviousPage();
    } else {
      currentPage;
    }
  });

  return (
    <div className="pagination">
      <nav aria-label="...">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={handlePreviousPage}>
              Previous
            </button>
          </li>
          {totalPages > 0 &&
            Array.from({ length: totalPages }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button className="page-link" onClick={handleNextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentBlogs: PropTypes.any,
};

export default Pagination;