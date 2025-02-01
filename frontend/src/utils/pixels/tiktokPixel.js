export const trackTikTokPixel = (event, data = {}) => {
  if (typeof window !== "undefined" && window.ttq) {
    window.ttq.track(event, data);
  }
};