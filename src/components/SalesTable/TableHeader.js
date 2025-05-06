import React from 'react';
import { tableStyles } from './styles';

const TableHeader = ({ sortConfig, requestSort }) => {
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return '⇵';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  return (
    <thead>
      <tr style={{ backgroundColor: '#f2f2f2' }}>
        <th 
          style={{...tableStyles.header, cursor: 'pointer'}} 
          onClick={() => requestSort('id')}
        >
          ID {getSortIndicator('id')}
        </th>
        <th 
          style={{...tableStyles.header, cursor: 'pointer'}} 
          onClick={() => requestSort('product')}
        >
          Product {getSortIndicator('product')}
        </th>
        <th 
          style={{...tableStyles.header, cursor: 'pointer'}} 
          onClick={() => requestSort('price')}
        >
          Price ($) {getSortIndicator('price')}
        </th>
        <th 
          style={{...tableStyles.header, cursor: 'pointer'}} 
          onClick={() => requestSort('quantity')}
        >
          Quantity {getSortIndicator('quantity')}
        </th>
        <th 
          style={{...tableStyles.header, cursor: 'pointer'}} 
          onClick={() => requestSort('total')}
        >
          Total ($) {getSortIndicator('total')}
        </th>
        <th 
          style={{...tableStyles.header, cursor: 'pointer'}} 
          onClick={() => requestSort('date')}
        >
          Date {getSortIndicator('date')}
        </th>
        <th 
          style={{...tableStyles.header, cursor: 'pointer'}} 
          onClick={() => requestSort('customer')}
        >
          Customer {getSortIndicator('customer')}
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
