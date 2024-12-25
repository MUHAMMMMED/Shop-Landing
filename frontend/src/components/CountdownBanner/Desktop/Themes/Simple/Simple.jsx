import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Simple.css';

export default function Simple({ data }) {
  const content = data?.content;
  const date_offer = data?.date_offer;
  const button_link = data?.button_link;

  const calculateTimeLeft = () => {
    const offerDate = new Date(date_offer);
    const now = new Date();
    const difference = offerDate - now;

    if (difference <= 0) {
      return null; // Return null if the offer is expired
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!timeLeft) return; // Stop the timer if the offer is expired

    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      setTimeLeft(updatedTimeLeft);

      if (!updatedTimeLeft) {
        clearInterval(timer); // Clear interval when the offer expires
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [date_offer, timeLeft]);

  if (!timeLeft) {
    // Hide the container if the offer has expired
    return null;
  }

  return (
    <div style={{ float: 'right', width: '100%', marginBottom: '20px' }}>
      <div className="Countdown">
        <div className="countdown-banner">
          {/* Offer Text */}
          <div className="banner-text">
            <h1 className="title">
              {content || "Limited Time Offer!"}
              {/* Limited Time Offer With Up To 40% Off On Your Favorite Products! */}
            </h1>
            {button_link && (
              <Link to={button_link}>
                <button className="shop-button">Shop Sale</button>
              </Link>
            )}
          </div>
          {/* Countdown Timer */}
          <div className="countdown-timer">
            {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => {
              const time =
                label === "Days"
                  ? timeLeft.days
                  : label === "Hours"
                    ? timeLeft.hours
                    : label === "Minutes"
                      ? timeLeft.minutes
                      : timeLeft.seconds;

              return (
                <div key={index} className="time-box">
                  <span className="time">{time}</span>
                  <span className="label">{label}</span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}