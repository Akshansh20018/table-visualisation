import React from 'react';
import PriceRangeFilter from '../PriceRangeFilter';
import { filterStyles } from './styles';

const FilterSection = ({ filters, setFilters, minDataPrice, maxDataPrice }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handlePriceRangeChange = ({ min, max }) => {
    setFilters({
      ...filters,
      minPrice: min,
      maxPrice: max
    });
  };

  const resetFilters = () => {
    setFilters({
      product: '',
      customer: '',
      minPrice: minDataPrice,
      maxPrice: maxDataPrice,
      minDate: '',
      maxDate: ''
    });
  };

  return (
    <div style={filterStyles.container}>
      <div>
        <label style={filterStyles.label}>Product: </label>
        <input 
          type="text" 
          name="product" 
          value={filters.product} 
          onChange={handleFilterChange} 
          style={filterStyles.input} 
          placeholder="Filter by product"
        />
      </div>
      
      <div>
        <label style={filterStyles.label}>Customer: </label>
        <input 
          type="text" 
          name="customer" 
          value={filters.customer} 
          onChange={handleFilterChange} 
          style={filterStyles.input} 
          placeholder="Filter by customer"
        />
      </div>
      
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <label style={filterStyles.label}>Price Range ($): </label>
        <PriceRangeFilter 
          min={minDataPrice} 
          max={maxDataPrice}
          onChange={handlePriceRangeChange}
        />
      </div>

      <div>
        <label style={filterStyles.label}>From Date: </label>
        <input 
          type="date" 
          name="minDate" 
          value={filters.minDate} 
          onChange={handleFilterChange} 
          style={filterStyles.input}
        />
      </div>
      
      <div>
        <label style={filterStyles.label}>To Date: </label>
        <input 
          type="date" 
          name="maxDate" 
          value={filters.maxDate} 
          onChange={handleFilterChange} 
          style={filterStyles.input}
        />
      </div>
      
      <button onClick={resetFilters} style={filterStyles.resetButton}>
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;
