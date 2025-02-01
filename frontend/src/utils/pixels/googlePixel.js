 
export const trackGooglePixel = (event, data = {}) => {
    if (window.gtag) {
      gtag('event', event, data);
    }
  };