import { default as React, default as React, useEffect, useState } from 'react';
import "./Banner.css";
import './Simple.css';
import { } from './SimpleStyles';

export default function Simple({ Type, Device }) {
  const items = [
    {
      image: slide1,
      title: "Rejuvenate & Revitalize",
      description: "Elevate your self-care regime with our luxury collections.",
    },
    {
      image: slide2,
      title: "Pure Elegance",
      description: "Discover the essence of beauty with natural products.",
    },
    {
      image: slide3,
      title: "Glow from Within",
      description: "Unleash your inner glow with premium health essentials.",
    },
  ];

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
    <div style={{ background: "green", color: '#fff', float: 'right', width: '100%', marginBottom: '20px' }}>

      <div className="carousel">
        <div className="carousel-container">
          {/* Image Section with Text Overlay */}
          <div
            className="carousel-image"
            style={{ backgroundImage: `url(${items[currentIndex].image})` }}
          >
            <div className="carousel-text-overlay">
              <h1>{items[currentIndex].title}</h1>
              <p>{items[currentIndex].description}</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="carousel-controls">
            <button onClick={handlePrev} className="carousel-button">
              &#8592; Prev
            </button>
            <button onClick={handleNext} className="carousel-button">
              Next &#8594;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}



