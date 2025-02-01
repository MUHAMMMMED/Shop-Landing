// src/utils/googlePixel.js
export const trackGooglePixel = (event, data = {}) => {
    if (window.gtag) {
      gtag('event', event, data);
    }
  };