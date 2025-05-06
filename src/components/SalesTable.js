// src/components/SalesTable.js
import React, { useState, useEffect } from 'react';
import PriceRangeFilter from './PriceRangeFilter';

const SalesTable = ({ data }) => {
  // Existing sorting state
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });
  
  // Filter state
  const [filters, setFilters] = useState({
    product: '',
    customer: '',
    minPrice: '',
    maxPrice: '',
    minDate: '',
    maxDate: ''
  });

  // Added pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10
  });

  // Calculate min and max prices from data for the slider
  const minDataPrice = Math.floor(Math.min(...data.map(item => item.price)));
  const maxDataPrice = Math.ceil(Math.max(...data.map(item => item.price)));
  
  // Handle price range changes from the slider component
  const handlePriceRangeChange = ({ min, max }) => {
    setFilters({
      ...filters,
      minPrice: min,
      maxPrice: max
    });
  };  

  // Existing sorting logic
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filter change handler
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Function to filter data
  const getFilteredData = () => {
    return data.filter(item => {
      // Filter by product name
      if (filters.product && !item.product.toLowerCase().includes(filters.product.toLowerCase())) {
        return false;
      }
      
      // Filter by customer
      if (filters.customer && !item.customer.toLowerCase().includes(filters.customer.toLowerCase())) {
        return false;
      }
      
      // Filter by price range
      if (filters.minPrice && item.price < parseFloat(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice && item.price > parseFloat(filters.maxPrice)) {
        return false;
      }
      
      // Filter by date range
      if (filters.minDate && item.date < filters.minDate) {
        return false;
      }
      if (filters.maxDate && item.date > filters.maxDate) {
        return false;
      }
      
      return true;
    });
  };

  // Modified to use filtered data before sorting
  const getSortedData = () => {
    const filteredData = getFilteredData();
    const dataWithTotal = filteredData.map(item => ({
      ...item,
      total: (item.price * item.quantity).toFixed(2)
    }));
    
    if (!sortConfig.key) return dataWithTotal;

    return [...dataWithTotal].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  // Get sorted and filtered data
  const filteredSortedData = getSortedData();
  
  // Added pagination logic
  const indexOfLastItem = pagination.currentPage * pagination.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - pagination.itemsPerPage;
  const currentItems = filteredSortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSortedData.length / pagination.itemsPerPage);
  
  // Handle page change
  const handlePageChange = (newPage) => {
    setPagination({
      ...pagination,
      currentPage: newPage
    });
  };
  
  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setPagination({
      currentPage: 1, // Reset to first page when changing items per page
      itemsPerPage: newItemsPerPage
    });
  };
  
  // Reset to first page when filters change
  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      currentPage: 1
    }));
  }, [filters]);
  
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return '⇵';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  return (
    <div>
      {/* Filter controls */}
      <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <label style={filterLabelStyle}>Product: </label>
          <input 
            type="text" 
            name="product" 
            value={filters.product} 
            onChange={handleFilterChange} 
            style={filterInputStyle} 
            placeholder="Filter by product"
          />
        </div>
        
        <div>
          <label style={filterLabelStyle}>Customer: </label>
          <input 
            type="text" 
            name="customer" 
            value={filters.customer} 
            onChange={handleFilterChange} 
            style={filterInputStyle} 
            placeholder="Filter by customer"
          />
        </div>
        
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <label style={filterLabelStyle}>Price Range ($): </label>
          <PriceRangeFilter 
            min={minDataPrice} 
            max={maxDataPrice}
            onChange={handlePriceRangeChange}
          />
        </div>

        <div>
          <label style={filterLabelStyle}>From Date: </label>
          <input 
            type="date" 
            name="minDate" 
            value={filters.minDate} 
            onChange={handleFilterChange} 
            style={filterInputStyle}
          />
        </div>
        
        <div>
          <label style={filterLabelStyle}>To Date: </label>
          <input 
            type="date" 
            name="maxDate" 
            value={filters.maxDate} 
            onChange={handleFilterChange} 
            style={filterInputStyle}
          />
        </div>
        
        {/* Reset filters button */}
        <button 
          onClick={() => {
            setFilters({
              product: '',
              customer: '',
              minPrice: minDataPrice,  // Reset to min data price
              maxPrice: maxDataPrice,  // Reset to max data price
              minDate: '',
              maxDate: ''
            });
          }}
          style={resetButtonStyle}
        >
          Reset Filters
        </button>
      </div>

      {/* Items per page selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div>
          <strong>Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredSortedData.length)} of {filteredSortedData.length} entries</strong>
        </div>
        <div>
          <label style={{ marginRight: '10px' }}>Items per page:</label>
          <select 
            value={pagination.itemsPerPage} 
            onChange={handleItemsPerPageChange}
            style={{ padding: '5px' }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{...tableHeaderStyle, cursor: 'pointer'}} onClick={() => requestSort('id')}>
              ID {getSortIndicator('id')}
            </th>
            <th style={{...tableHeaderStyle, cursor: 'pointer'}} onClick={() => requestSort('product')}>
              Product {getSortIndicator('product')}
            </th>
            <th style={{...tableHeaderStyle, cursor: 'pointer'}} onClick={() => requestSort('price')}>
              Price ($) {getSortIndicator('price')}
            </th>
            <th style={{...tableHeaderStyle, cursor: 'pointer'}} onClick={() => requestSort('quantity')}>
              Quantity {getSortIndicator('quantity')}
            </th>
            <th style={{...tableHeaderStyle, cursor: 'pointer'}} onClick={() => requestSort('total')}>
              Total ($) {getSortIndicator('total')}
            </th>
            <th style={{...tableHeaderStyle, cursor: 'pointer'}} onClick={() => requestSort('date')}>
              Date {getSortIndicator('date')}
            </th>
            <th style={{...tableHeaderStyle, cursor: 'pointer'}} onClick={() => requestSort('customer')}>
              Customer {getSortIndicator('customer')}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map(sale => (
              <tr key={sale.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={tableCellStyle}>{sale.id}</td>
                <td style={tableCellStyle}>{sale.product}</td>
                <td style={tableCellStyle}>${sale.price.toFixed(2)}</td>
                <td style={tableCellStyle}>{sale.quantity}</td>
                <td style={tableCellStyle}>${sale.total}</td>
                <td style={tableCellStyle}>{sale.date}</td>
                <td style={tableCellStyle}>{sale.customer}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{...tableCellStyle, textAlign: 'center', padding: '20px'}}>
                No matching records found
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr style={{ backgroundColor: '#f9f9f9', fontWeight: 'bold' }}>
            <td colSpan="3" style={tableCellStyle}>Total Sales:</td>
            <td style={tableCellStyle}>
              {filteredSortedData.reduce((sum, item) => sum + item.quantity, 0)}
            </td>
            <td style={tableCellStyle}>
              ${filteredSortedData.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2)}
            </td>
            <td colSpan="2" style={tableCellStyle}></td>
          </tr>
        </tfoot>
      </table>

      {/* Pagination controls */}
      {filteredSortedData.length > 0 && (
        <div style={paginationContainerStyle}>
          <button 
            onClick={() => handlePageChange(1)} 
            disabled={pagination.currentPage === 1}
            style={paginationButtonStyle}
          >
            &laquo; First
          </button>
          
          <button 
            onClick={() => handlePageChange(pagination.currentPage - 1)} 
            disabled={pagination.currentPage === 1}
            style={paginationButtonStyle}
          >
            &lt; Prev
          </button>
          
          {/* Page number buttons */}
          <div style={pageNumbersStyle}>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show 5 page numbers centered around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (pagination.currentPage <= 3) {
                pageNum = i + 1;
              } else if (pagination.currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = pagination.currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  style={{
                    ...paginationButtonStyle,
                    backgroundColor: pagination.currentPage === pageNum ? '#4CAF50' : '#f1f1f1',
                    color: pagination.currentPage === pageNum ? 'white' : 'black'
                  }}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button 
            onClick={() => handlePageChange(pagination.currentPage + 1)} 
            disabled={pagination.currentPage === totalPages}
            style={paginationButtonStyle}
          >
            Next &gt;
          </button>
          
          <button 
            onClick={() => handlePageChange(totalPages)} 
            disabled={pagination.currentPage === totalPages}
            style={paginationButtonStyle}
          >
            Last &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

// Existing styles
const tableHeaderStyle = {
  padding: '12px 15px',
  textAlign: 'left',
  borderBottom: '2px solid #ddd'
};

const tableCellStyle = {
  padding: '10px 15px',
  textAlign: 'left'
};

// Styles for filter controls
const filterLabelStyle = {
  fontWeight: 'bold',
  marginRight: '5px'
};

const filterInputStyle = {
  padding: '8px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  minWidth: '120px'
};

const resetButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

// Added pagination styles
const paginationContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '20px',
  gap: '5px'
};

const paginationButtonStyle = {
  padding: '8px 12px',
  border: '1px solid #ddd',
  backgroundColor: '#f1f1f1',
  cursor: 'pointer',
  borderRadius: '4px',
  margin: '0 2px'
};

const pageNumbersStyle = {
  display: 'flex',
  margin: '0 10px'
};

export default SalesTable;
