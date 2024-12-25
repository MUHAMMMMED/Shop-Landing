
import React from "react";
import './Simple.css';
import { } from './SimpleStyles';

export default function Simple({ data }) {

  const videoId = data?.video_id
  return (
    <div style={{ float: 'right', width: '100%', marginBottom: '20px' }}>
      <div className="youtube">
        <div className="youtube-container">
          <iframe
            className="youtube-iframe"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&mute=1&loop=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div></div>

    </div>
  )
}









