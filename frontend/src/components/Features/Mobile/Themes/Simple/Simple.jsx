import React from "react";
import Config from "../../../../config";
import "./Simple.css";

export default function Simple({ data }) {
  const getFullImageUrl = (image) => {
    if (image && !image.startsWith("http")) {
      return `${Config.baseURL}${image}`;
    }
    return image;
  };

  return (
    <div style={{ float: "right", width: "100%", marginBottom: "20px" }}>
      <div className="features-container">
        <div className="features-grid">
          {data?.content?.length > 0 ? (
            data.content.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="icon">
                  <img
                    src={getFullImageUrl(feature.image)}
                    alt={feature.title}
                  />
                </div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))
          ) : (
            <p>No features available</p>
          )}
        </div>
      </div>
    </div>
  );
}