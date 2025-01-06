

import React, { useEffect, useState } from "react";
import Config from "../../../../config";
import './Simple.css';

export default function Simple({ data, language }) {
  const items = data?.images_data || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [items]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getFullImageUrl = (image) => {
    if (image && !image.startsWith('http')) {
      return `${Config.baseURL}${image}`;
    }
    return image;
  };

  return (
    <div className="carousel-wrapper" style={{ color: '#fff', marginBottom: '20px' }}>
      {items.length > 0 ? (
        <div className="carousel">
          <div
            className="carousel-image"
            style={{ backgroundImage: `url(${getFullImageUrl(items[currentIndex]?.image)})` }}
          />
          <div className="carousel-controls">
            <button onClick={handlePrev} className="carousel-button">
              &#8592; {language === 'ar' ? 'السابق' : 'Prev'}
            </button>
            <button onClick={handleNext} className="carousel-button">
              {language === 'ar' ? 'التالي' : 'Next'} &#8594;
            </button>
          </div>
        </div>
      ) : (
        <p>{language === 'ar' ? 'لا توجد صور للعرض' : 'No images to display'}</p>
      )}
    </div>
  );
}





