
import React, { useEffect, useState } from "react";
import './Simple.css';
import { } from './SimpleStyles';

export default function Simple({ data, language }) {

  const items = data?.images

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [items.length]);

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



  return (
    <div style={{ color: '#fff', float: 'right', width: '100%', marginBottom: '20px' }}>

      <div className="carousel">
        <div className="carousel-container">
          {/* Image Section with Text Overlay */}
          <div
            className="carousel-image"
            style={{ backgroundImage: `url(${items[currentIndex].image})` }}
          >
            {/* <div className="carousel-text-overlay">
              <h1>{items[currentIndex].title}</h1>
              <p>{items[currentIndex].description}</p>
            </div> */}
          </div>

          {/* Navigation Buttons */}
          <div className="carousel-controls">
            <button onClick={handlePrev} className="carousel-button">
              &#8592;

              {language === 'ar' ? 'السابق' : 'Prev'}

            </button>
            <button onClick={handleNext} className="carousel-button">
              {language === 'ar' ? 'التالي' : 'Next'}
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}









