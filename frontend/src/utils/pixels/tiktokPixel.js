 
export const trackTikTokPixel = (event, data = {}) => {
    if (window.ttq) {
      window.ttq.track(event, data);
    }
  };