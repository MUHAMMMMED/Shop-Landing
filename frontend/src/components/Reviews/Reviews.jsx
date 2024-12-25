

import React, { useState } from 'react';
import './Review.css';

import skincareImg from "./Collection05.webp";
import bodyCareImg from "./Collection06.webp";
import makeupImg from "./Collection07.webp";

const reviews = [
    {
        name: "Emma Thompson",
        date: "04/12/23",
        rating: 5.0,
        text: "Amazing quality and effective products. My skin is thriving!",
        image: skincareImg,
    },
    {
        name: "Jake Martinez",
        date: "04/12/23",
        rating: 5.0,
        text: "Impressive service and extensive product range. A beauty haven.",
        image: bodyCareImg,
    },
    {
        name: "Sophia Loren",
        date: "04/12/23",
        rating: 5.0,
        text: "Their natural products are a game changer for sensitive skin.",
        image: makeupImg
    },


];

const Reviews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    };

    return (
        <div className="review-carousel">
            <h2>Reviews</h2>
            <div className="review-cards">
                <button className="arrow left" onClick={prevSlide}>
                    &#8249;
                </button>
                {reviews.map((review, index) => (
                    <div
                        className={`review-card ${index === currentIndex ? "active" : ""}`}
                        key={index}
                    >
                        <img src={review.image} alt={`${review.name}`} className="review-image" />

                        <div className="review-content">
                            <div className="review-rating">
                                {"★".repeat(review.rating)} <span>{review.rating.toFixed(2)}</span>
                            </div>
                            <p>{review.text}</p>
                            <div className="review-footer">
                                <strong>{review.name}</strong>
                                <span>— {review.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
                <button className="arrow right" onClick={nextSlide}>
                    &#8250;
                </button>
            </div>
        </div>
    );
};

export default Reviews;
