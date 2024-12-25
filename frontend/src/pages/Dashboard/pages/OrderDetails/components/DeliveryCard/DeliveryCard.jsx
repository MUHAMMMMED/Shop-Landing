import React from 'react';

import Config from '../../../../../../components/config';
import './DeliveryCard.css';

export default function DeliveryCard({ order }) {
    const shipping = order?.shipping_company || {};
    return (

        <div className="shipping-address">
            <h3>Shipping Company</h3>
            <div className="DeliverCard">
                <div>
                    <img src={`${Config.baseURL}${shipping?.image}`} height="35" className="DeliveryOption-icon" alt="Delivery Option Icon" />
                </div>
                <div className="deliveryCard-content">
                    <span className="deliveryCard-title">  {shipping?.name}</span>
                    <span className="deliveryCard-price" >  price :{shipping?.shipping_price || 0}  <span className='money_code'> ريال</span>  </span>
                    <span className="deliveryCard-work"> work days : {shipping?.work_days}</span>
                </div>
            </div> </div>



    )
}