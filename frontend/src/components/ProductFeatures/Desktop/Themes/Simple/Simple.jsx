
import React from "react";
import './Simple.css';
import { } from './SimpleStyles';

export default function Simple({ data }) {

    return (
        <div style={{ width: '100%', marginBottom: '20px' }}>
            <div className="features-Grid">
                {data?.content.map((feature, index) => (
                    <div
                        key={index}
                        className={`feature-item ${index % 2 === 0 ? "reverse-row" : ""}`}
                    >
                        <img src={feature?.image} alt={feature.title} className="feature-image" />
                        <div className="feature-content">
                            <h3 className="feature-title">{feature?.title}</h3>
                            {/* <h4 className="feature-subtitle">{feature.subtitle}</h4> */}
                            <p className="feature-description">{feature?.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


