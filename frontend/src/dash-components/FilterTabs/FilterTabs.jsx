
import React, { useState } from 'react';
import './FilterTabs.css';

const FilterTabs = ({ onDateChange }) => {
  const [activeTab, setActiveTab] = useState('Today');

  return (
    <div className="filter-tabs">
      {['Today', 'Week', 'Month', 'Year'].map((tab) => (
        <div
          key={tab}
          className={`tab ${activeTab === tab ? 'active' : ''}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </div>
      ))}
      <div className="date-filter">
        <input
          type="text"
          placeholder="dd/mm/yyyy"
          onChange={(e) => onDateChange(e.target.value)}
        />
        <button className="filter-button">🔍</button>
      </div>
    </div>
  );
};

export default FilterTabs;