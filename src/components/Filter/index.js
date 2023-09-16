// components/Filter.js

import React from 'react';
import './index.css'; 

const Filter = ({ options, selectedValue, onFilterChange }) => {
  return (
    <div className="select-container"> 
      <select value={selectedValue} onChange={onFilterChange}>
        <option value="">All</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
