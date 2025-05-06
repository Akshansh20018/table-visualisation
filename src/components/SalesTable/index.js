import React, { useState, useEffect } from 'react';
import FilterSection from './FilterSection';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import Pagination from './Pagination';
import { tableStyles } from './styles';

const SalesTable = ({ data }) => {
  // Sorting state
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

  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10
  });

  // Calculate min and max prices
  const minDataPrice = Math.floor(Math.min(...data.map(item => item.price)));
  const maxDataPrice = Math.ceil(Math.max(...data.map(item => item.price)));

  // Get filtered data
  const getFilteredData = () => {
    return data.filter(item => {
      if (filters.product && !item.product.toLowerCase().includes(filters.product.toLowerCase())) return false;
      if (filters.customer && !item.customer.toLowerCase().includes(filters.customer.toLowerCase())) return false;
      if (filters.minPrice && item.price < parseFloat(filters.minPrice)) return false;
      if (filters.maxPrice && item.price > parseFloat(filters.maxPrice)) return false;
      if (filters.minDate && item.date < filters.minDate) return false;
      if (filters.maxDate && item.date > filters.maxDate) return false;
      return true;
    });
  };

  // Get sorted data
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

  // Get paginated data
  const getPaginatedData = () => {
    const sortedData = getSortedData();
    const indexOfLastItem = pagination.currentPage * pagination.itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - pagination.itemsPerPage;
    return {
      currentItems: sortedData.slice(indexOfFirstItem, indexOfLastItem),
      totalItems: sortedData.length,
      indexOfFirstItem,
      indexOfLastItem: Math.min(indexOfLastItem, sortedData.length)
    };
  };

  // Reset to first page when filters change
  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      currentPage: 1
    }));
  }, [filters]);

  const { currentItems, totalItems, indexOfFirstItem, indexOfLastItem } = getPaginatedData();
  const totalPages = Math.ceil(totalItems / pagination.itemsPerPage);

  return (
    <div>
      <FilterSection 
        filters={filters}
        setFilters={setFilters}
        minDataPrice={minDataPrice}
        maxDataPrice={maxDataPrice}
      />
      
      <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <strong>Showing {indexOfFirstItem + 1}-{indexOfLastItem} of {totalItems} entries</strong>
        </div>
        <div>
          <label style={{ marginRight: '10px' }}>Items per page:</label>
          <select 
            value={pagination.itemsPerPage} 
            onChange={(e) => setPagination({
              currentPage: 1,
              itemsPerPage: parseInt(e.target.value, 10)
            })}
            style={{ padding: '5px' }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      
      <table style={tableStyles.table}>
        <TableHeader 
          sortConfig={sortConfig}
          requestSort={(key) => {
            let direction = 'ascending';
            if (sortConfig.key === key && sortConfig.direction === 'ascending') {
              direction = 'descending';
            }
            setSortConfig({ key, direction });
          }}
        />
        <TableBody data={currentItems} />
        <TableFooter data={getSortedData()} />
      </table>
      
      {totalItems > 0 && (
        <Pagination 
          currentPage={pagination.currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setPagination({...pagination, currentPage: page})}
        />
      )}
    </div>
  );
};

export default SalesTable;
