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
      minPrice: '',
      maxPrice: '',
      minDate: '',
      maxDate: ''
    });
  };

  return (
    <div style={filterStyles.container}>
      <div>
        <label style={{...filterStyles.label, marginLeft: '6px'}}>Product: </label>
        <br />
        <input 
          type="text" 
          name="product" 
          value={filters.product} 
          onChange={handleFilterChange} 
          style={{ ...filterStyles.input, marginTop: '12px', marginLeft: '6px' }}
          placeholder="Filter by product"
        />
      </div>
      
      <div>
        <label style={filterStyles.label}>Customer: </label>
        <br />
        <input 
          type="text" 
          name="customer" 
          value={filters.customer} 
          onChange={handleFilterChange} 
          style={{ ...filterStyles.input, marginTop: '12px' }}
          placeholder="Filter by customer"
        />
      </div>
      
      <div>
        <label style={filterStyles.label}>Price Range ($): </label>
        <br />
        <PriceRangeFilter 
          min={minDataPrice} 
          max={maxDataPrice}
          onChange={handlePriceRangeChange}
        />
      </div>

      <div>
        <label style={filterStyles.label}>From Date: </label>
        <br />
        <input 
          type="date" 
          name="minDate" 
          value={filters.minDate} 
          onChange={handleFilterChange} 
          style={{ ...filterStyles.input, marginTop: '12px' }}
        />
      </div>
      
      <div>
        <label style={filterStyles.label}>To Date: </label>
        <br />
        <input 
          type="date" 
          name="maxDate" 
          value={filters.maxDate} 
          onChange={handleFilterChange} 
          style={{ ...filterStyles.input, marginTop: '12px' }}
        />
      </div>

      <div style={{ marginLeft: '30px' }}>
        <br />
        <button onClick={resetFilters} style={{ ...filterStyles.resetButton, marginTop: '12px' }}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
