import React from 'react';
import './CouponCode.css';

const CouponCode = () => {
    return (
        <div className="coupon-container">
            <h2 className="coupon-title">SPECIAL DEALS</h2>
            <p className="coupon-label">COUPON CODE</p>
            <div className="coupon-code">sxcvb7</div>
            <p className="coupon-valid">VALID UNTIL JANUARY 31 2022</p>
        </div>
    );
};

export default CouponCode;