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
      <div className="card-grid">
        {data?.content?.length > 0 ? (
          data.content.map((card, index) => (
            <div className="card" key={index}>
              <div
                className="card-image"
                style={{
                  backgroundImage: `url(${getFullImageUrl(card?.image)})`,
                }}
              >
                <div className="card-overlay">
                  <h3>{card?.title}</h3>
                  <p>{card?.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No content available</p>
        )}
      </div>
    </div>
  );
}