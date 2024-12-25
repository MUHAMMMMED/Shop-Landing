
import React from "react";
import './Simple.css';

export default function Simple({ data }) {
  // Determine the appropriate image to display
  const Image = data?.mobile;
  // const Image = data?.web;
  return (
    <>
      {Image && (
        <div style={{ float: 'right', width: '100%', marginBottom: '20px' }}>
          <div className="height_image-grid">
            <img
              src={Image}
              alt="height image"
              className="height_image-grid-image"
            />
          </div>
        </div>
      )}
    </>
  );
}






