import React, { useState, useImperativeHandle, forwardRef } from 'react';
import 'react-range-slider-input/dist/style.css';
import RangeSlider from 'react-range-slider-input';
import { filterStyles } from '../SalesTable/styles.js';

const PriceRangeFilter = forwardRef(({ min, max, onChange }, ref) => {
  const [values, setValues] = useState([min, max]);
  const [inputValues, setInputValues] = useState({
    min: min,
    max: max
  });

  // Expose reset function to parent via ref
  useImperativeHandle(ref, () => ({
    resetPriceRangeFilter: () => {
      setValues([min, max]);
      setInputValues({
        min: min,
        max: max
      });
      onChange({ min, max });
    }
  }));

  const handleSliderChange = (newValues) => {
    setValues(newValues);
    setInputValues({
      min: newValues[0],
      max: newValues[1]
    });
    onChange({ min: newValues[0], max: newValues[1] });
  };

  const handleMinInput = (e) => {
    const value = e.target.value === "" ? min : parseInt(e.target.value, 10);
    if (value >= min && value < values[1]) {
      setInputValues({ ...inputValues, min: value });
      setValues([value, values[1]]);
      onChange({ min: value, max: values[1] });
    }
  };

  const handleMaxInput = (e) => {
    const value = e.target.value === "" ? max : parseInt(e.target.value, 10);
    if (value <= max && value > values[0]) {
      setInputValues({ ...inputValues, max: value });
      setValues([values[0], value]);
      onChange({ min: values[0], max: value });
    }
  };

  return (
    <div className="price-range-container">
      <div className="price-inputs" style={{ marginBottom: '16px' }}>
        <input
          type="number"
          value={inputValues.min}
          onChange={(e) => setInputValues({ ...inputValues, min: e.target.value })}
          onBlur={handleMinInput}
          inputMode="numeric"
          pattern="[0-9]*"
          style={{ ...filterStyles.input, width: '125px', marginTop: '12px' }}
        />
        <span> to </span>
        <input
          type="number"
          value={inputValues.max}
          onChange={(e) => setInputValues({ ...inputValues, max: e.target.value })}
          onBlur={handleMaxInput}
          inputMode="numeric"
          pattern="[0-9]*"
          style={{ ...filterStyles.input, width: '125px', marginTop: '12px' }}
        />
      </div>

      <div style={{ width: '300px' }}>
        <RangeSlider
          min={min}
          max={max}
          value={values}
          onInput={handleSliderChange}
          style={{ marginTop: '15px', marginBottom: '15px' }}
        />
      </div>
    </div>
  );
});

export default PriceRangeFilter;
