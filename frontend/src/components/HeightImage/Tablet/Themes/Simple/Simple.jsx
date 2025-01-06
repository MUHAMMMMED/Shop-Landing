import React from "react";
import Config from "../../../../config";
import "./Simple.css";

export default function Simple({ data }) {
  const Image = data?.web; // Replace `data?.web` with `data?.mobile` for mobile images.

  const getFullImageUrl = (image) => {
    if (image && !image.startsWith("http")) {
      return `${Config.baseURL}${image}`;
    }
    return image;
  };

  return (
    <div style={{ float: "right", width: "100%", marginBottom: "20px" }}>
      {Image ? (
        <div className="height_image-grid">
          <img
            src={getFullImageUrl(Image)}
            alt="Height-based image"
            className="height_image-grid-image"
          />
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#999" }}>
          No image available to display.
        </p>
      )}
    </div>
  );
}






