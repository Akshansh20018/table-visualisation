import React from 'react';
import { tableStyles } from './styles';

const TableBody = ({ data }) => {
  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td 
            colSpan="7" 
            style={{...tableStyles.cell, textAlign: 'center', padding: '20px'}}
          >
            No matching records found
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map(sale => (
        <tr key={sale.id} style={{ borderBottom: '1px solid #ddd' }}>
          <td style={tableStyles.cell}>{sale.id}</td>
          <td style={tableStyles.cell}>{sale.product}</td>
          <td style={tableStyles.cell}>${sale.price.toFixed(2)}</td>
          <td style={tableStyles.cell}>{sale.quantity}</td>
          <td style={tableStyles.cell}>${sale.total}</td>
          <td style={tableStyles.cell}>{sale.date}</td>
          <td style={tableStyles.cell}>{sale.customer}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
