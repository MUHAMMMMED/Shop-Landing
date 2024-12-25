
import React from 'react';
import './SpecialOffer.css';

const SpecialOffer = ({ coupon, language }) => {
    return (
        <div className='special-offer'>

            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>

            <div className="special-offer-container">

                <h2 className="offer-title">
                    {language === 'ar' ? 'رمز الكوبون' : 'COUPON CODE'}
                </h2>
                <div className="offer-discount">
                    <span className="offer-percentage">{coupon?.discount} %</span>
                    <span className="offer-off">
                        {language === 'ar' ? 'خصم' : 'OFF'}
                    </span>
                </div>
                <div className="offer-code">{coupon?.code}</div>
                <p className="offer-valid">
                    {language === 'ar' ? 'صالح حتى' : 'VALID UNTIL'} {coupon?.expiryDate}
                </p>
            </div>
        </div>
    );
};

export default SpecialOffer;