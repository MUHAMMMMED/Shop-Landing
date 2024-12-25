import React from 'react';
import './CustomerData.css'; // Import a CSS file for styling

const CustomerData = () => {
  return (
    <div className="customer-data-container">
      <h3 className="title">Customers Data</h3>
      <div className="date-selector">
        <span role="img" aria-label="calendar">📅</span> This Year
      </div>
      <div className="data-grid">
        <div className="data-card">
          <span className="data-value">38,321</span>
          <span className="data-label">TOTAL CUSTOMERS</span>
        </div>
        <div className="data-card">
          <span className="data-value">946</span>
          <span className="data-label">NEW CUSTOMERS</span>
        </div>
        <div className="data-card">
          <span className="data-value">70.8%</span>
          <span className="data-label">RETURNING CUSTOMERS</span>
        </div>
        <div className="data-card">
          <span className="data-value">1.5%</span>
          <span className="data-label">BOUNCE RATE</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerData;