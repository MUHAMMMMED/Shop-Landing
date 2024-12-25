import React from "react";
import './Simple.css';

export default function Simple({ data }) {
  return (
    <div style={{ float: 'right', width: '100%', marginBottom: '20px' }}>
      <div className="video-container">
        <video
          playsInline
          controls
          autoPlay
          loop
          muted
          preload="metadata"
          aria-label="Amber video"
        >
          <source
            src={`${data.link}?v=0`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}