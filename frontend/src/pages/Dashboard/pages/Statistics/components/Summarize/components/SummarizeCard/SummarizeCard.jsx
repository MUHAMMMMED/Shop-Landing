import React from 'react';
import './SummarizeCard.css';

const SummarizeCard = ({ data }) => {
  return (
    <div className="summarize-container">
      {data.map((item, index) => (
        <div className="summarize-card" key={index}>
          <div>
            <div className="card-title">{item.title}</div>
            <div className="card-value">{item.value}</div>
          </div>
          <div className="icon" style={{ color: item.color }}>
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummarizeCard;