
import React from "react";
import './Simple.css';
import { } from './SimpleStyles';

export default function Simple({ data }) {
  return (
    <div style={{ float: 'right', width: '100%', marginBottom: '20px' }}>
      <div className="features-container">
        {/* <h3>More Features</h3> */}
        <div className="features-grid">
          {data?.content.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="icon">
                <img src={feature.image} alt={feature.title} />
              </div>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}








