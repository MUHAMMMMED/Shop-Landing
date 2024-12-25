import React, { useState } from 'react';
import './Tabs.css';

function Tabs({ components }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {components.map((item, index) => (
          <button
            key={index}
            className={`tab-item ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {components[activeTab].component}
      </div>
    </div>
  );
}

export default Tabs;