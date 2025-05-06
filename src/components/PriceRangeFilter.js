// Import necessary components
import React, { useState, useEffect } from 'react';
import 'react-range-slider-input/dist/style.css';
import RangeSlider from 'react-range-slider-input';

const PriceRangeFilter = ({ min, max, onChange }) => {
  // State for both slider and input values
  const [values, setValues] = useState([min, max]);
  const [inputValues, setInputValues] = useState({
    min: min,
    max: max
  });
  
  // Handle slider changes
  const handleSliderChange = (newValues) => {
    setValues(newValues);
    setInputValues({
      min: newValues[0],
      max: newValues[1]
    });
    onChange({ min: newValues[0], max: newValues[1] });
  };
  
  // Handle min input changes
  const handleMinInput = (e) => {
    const value = e.target.value === "" ? min : parseInt(e.target.value, 10);
    if (value >= min && value < values[1]) {
      setInputValues({...inputValues, min: value});
      setValues([value, values[1]]);
      onChange({ min: value, max: values[1] });
    }
  };
  
  // Handle max input changes
  const handleMaxInput = (e) => {
    const value = e.target.value === "" ? max : parseInt(e.target.value, 10);
    if (value <= max && value > values[0]) {
      setInputValues({...inputValues, max: value});
      setValues([values[0], value]);
      onChange({ min: values[0], max: value });
    }
  };

  return (
    <div className="price-range-container">
      <div className="price-inputs">
        <input
          type="number"
          value={inputValues.min}
          onChange={handleMinInput}
          min={min}
          max={values[1] - 1}
        />
        <span>to</span>
        <input
          type="number"
          value={inputValues.max}
          onChange={handleMaxInput}
          min={values[0] + 1}
          max={max}
        />
      </div>
      
      <RangeSlider
        min={min}
        max={max}
        value={values}
        onInput={handleSliderChange}
      />
    </div>
  );
};

export default PriceRangeFilter;
