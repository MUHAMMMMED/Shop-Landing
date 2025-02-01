
export const trackFacebookPixel = (event, data = {}) => {
    if (window.fbq) {
      fbq('track', event, data);
    }
  };