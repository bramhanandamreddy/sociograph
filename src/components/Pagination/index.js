// components/Pagination.js

import React from 'react';
import './index.css'; 

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <div className="pagination-container"> 
      <button className="pagination-button" onClick={onPrevPage} disabled={currentPage === 1}>
        Previous Page
      </button>
      <span className="pagination-info">Page {currentPage} of {totalPages}</span>
      <button className="pagination-button" onClick={onNextPage} disabled={currentPage === totalPages}>
        Next Page
      </button>
    </div>
  );
}

export default Pagination;
