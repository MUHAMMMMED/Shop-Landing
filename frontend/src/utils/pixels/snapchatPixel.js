export const trackSnapchatPixel = (event, data = {}) => {
  if (typeof window !== "undefined" && window.snaptr) {
    window.snaptr("track", event, data);
  }
};