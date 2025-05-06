import React from 'react';
import SalesTable from './components/SalesTable';
import salesData from './data/salesData';

function App() {
  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Sales Data Table</h1>
      {/* 👇 Added instructions for users */}
      <p style={{ marginBottom: '20px' }}>
        Click on any column header to sort the data. Click again to toggle between ascending and descending order.
      </p>
      <SalesTable data={salesData} />
    </div>
  );
}

export default App;
