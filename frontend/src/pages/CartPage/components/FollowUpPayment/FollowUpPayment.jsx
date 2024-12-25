
import axios from 'axios';
import React, { useState } from 'react';
import Config from '../../../../components/config';

export default function FollowUpPayment({ Total, orderData, taxAmount, cartId, language, validateForm, setErrors }) {
  const [loading, setLoading] = useState(false);
  const [stop, setStop] = useState(false);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (loading || stop) return; // Prevent form submission if already loading or stopped

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      setStop(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${Config.baseURL}/api/orders/order/`, orderData);
      const createdOrder = response.data;

      if (!createdOrder?.orderId) {
        console.error('Order creation response missing orderId:', createdOrder);
        return;
      }

      console.log('Order created successfully:', createdOrder);
      handlePayment(createdOrder.orderId); // Initiate payment after order is created
    } catch (error) {
      console.error('Error submitting order:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (orderId) => {
    try {
      const response = await axios.post(
        `${Config.baseURL}/api/payment/create-checkout-session/`,
        { items: [{ id: orderId, cart_id: cartId, Total, taxAmount }] },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );

      const { url } = response.data;
      if (url) {
        window.location.href = url;
      } else {
        console.error('Payment initiation failed:', response.data.error);
      }
    } catch (error) {
      console.error('Payment process error:', error.response?.data || error.message);
    }
  };

  return (
    <div className='Grid'>
      <div className="Grid-a" onClick={!loading && !stop ? handleSubmitOrder : null}>
        <div
          className={`BTn fw-bold ${loading ? 'disabled' : ''}`}
          style={{ width: '100%', textAlign: 'left', marginTop: '20px', float: 'right' }}
        >
          {/* {loading ? 'Processing...' : `ريال ${Total}`} */}
          {/* <div>متابعة الدفع</div> */}
          {/* <div>متابعة الدفع</div> */}
          <div style={{ width: '100%', textAlign: "center" }}>
            {language === 'ar' ? 'التالي' : 'Next'}
          </div>


        </div>
      </div>
    </div>
  );
}