
import React from "react";
import "./Simple.css";
import { } from './SimpleStyles';
export default function Simple({ data }) {

  return (
    <div style={{ float: 'right', width: '100%', marginBottom: '20px' }}>

      <div className="card-grid">
        {data?.content.map((card, index) => (
          <div className="card" key={index}>
            <div
              className="card-image"
              style={{ backgroundImage: `url(${card?.image})` }}
            >
              <div className="card-overlay">
                <h3>{card?.title}</h3>
                <p>{card?.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

