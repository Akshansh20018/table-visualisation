// src/App.js
import React from 'react';
import SalesTable from './components/SalesTable';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';
import salesData from './data/salesData';
import './styles/theme.css';

function App() {
  return (
    <ThemeProvider>
      <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Sales Data Table</h1>
          <br />
          <ThemeToggle />
        </div>
        <SalesTable data={salesData} />
      </div>
    </ThemeProvider>
  );
}

export default App;
