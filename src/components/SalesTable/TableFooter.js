import React, { useContext } from 'react';
import { tableStyles } from './styles';
import { ThemeContext } from '../../context/ThemeContext';

const TableFooter = ({ data }) => {
  const totalQuantity = data.reduce((sum, item) => sum + item.quantity, 0);
  const totalSales = data.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2);
  
  return (
    <tfoot>
      <tr style={{ backgroundColor: 'var(--color-footer-bg)', fontWeight: 'bold' }}>
        <td colSpan="3" style={tableStyles.cell}>Total Sales:</td>
        <td style={tableStyles.cell}>{totalQuantity}</td>
        <td style={tableStyles.cell}>${totalSales}</td>
        <td colSpan="2" style={tableStyles.cell}></td>
      </tr>
    </tfoot>
  );
};

export default TableFooter;
