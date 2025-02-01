// src/utils/snapchatPixel.js
export const trackSnapchatPixel = (event, data = {}) => {
    if (window.snaptr) {
      window.snaptr('track', event, data);
    }
  };