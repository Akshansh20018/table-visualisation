// src/components/SalesTable.js
import React, { useState } from 'react';
import PriceRangeFilter from './PriceRangeFilter'; // 👈 Import the new component

const SalesTable = ({ data }) => {
  // Existing sorting state
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });
  
  // 👇 Added filter state
  const [filters, setFilters] = useState({
    product: '',
    customer: '',
    minPrice: '',
    maxPrice: '',
    minDate: '',
    maxDate: ''
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

  // 👇 Added filter change handler
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // 👇 Added function to filter data
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

  // 👇 Modified to use filtered data before sorting
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

  const salesWithTotal = getSortedData();
  
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return '⇵';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  return (
    <div>
      {/* 👇 Added filter controls */}
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
        
        {/* 👇 Added reset filters button */}
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

      {/* 👇 Added results count */}
      <div style={{ marginBottom: '10px' }}>
        <strong>Showing {salesWithTotal.length} of {data.length} entries</strong>
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
          {salesWithTotal.length > 0 ? (
            salesWithTotal.map(sale => (
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
            // 👇 Added no results message
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
              {salesWithTotal.reduce((sum, item) => sum + item.quantity, 0)}
            </td>
            <td style={tableCellStyle}>
              ${salesWithTotal.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2)}
            </td>
            <td colSpan="2" style={tableCellStyle}></td>
          </tr>
        </tfoot>
      </table>
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

// 👇 Added new styles for filter controls
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

export default SalesTable;
