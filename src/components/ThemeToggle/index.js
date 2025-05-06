// src/components/ThemeToggle.js
import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle">
      <span>☀️</span>
      <label className="toggle-switch">
        <input 
          type="checkbox" 
          checked={isDarkMode}
          onChange={toggleTheme}
        />
        <span className="slider round"></span>
      </label>
      <span>🌙</span>
    </div>
  );
};

export default ThemeToggle;
