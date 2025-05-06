import React from 'react';
import { paginationStyles } from './styles';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div style={paginationStyles.container}>
      <button 
        onClick={() => onPageChange(1)} 
        disabled={currentPage === 1}
        style={paginationStyles.button}
      >
        &laquo; First
      </button>
      
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        style={paginationStyles.button}
      >
        &lt; Prev
      </button>
      
      <div style={paginationStyles.pageNumbers}>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }
          
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              style={{
                ...paginationStyles.button,
                backgroundColor: currentPage === pageNum ? '#4CAF50' : '#f1f1f1',
                color: currentPage === pageNum ? 'white' : 'black'
              }}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
      
      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        style={paginationStyles.button}
      >
        Next &gt;
      </button>
      
      <button 
        onClick={() => onPageChange(totalPages)} 
        disabled={currentPage === totalPages}
        style={paginationStyles.button}
      >
        Last &raquo;
      </button>
    </div>
  );
};

export default Pagination;
