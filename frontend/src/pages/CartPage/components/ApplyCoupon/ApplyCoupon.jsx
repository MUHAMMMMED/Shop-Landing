import axios from 'axios';
import React, { useState } from 'react';
import { RiCoupon3Line } from "react-icons/ri";
import Config from '../../../../components/config';
import './applyCoupon.css';

export default function ApplyCoupon({ total, language, updateTotal }) {
  const [couponCode, setCouponCode] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const applyCoupon = async () => {
    try {
      const response = await axios.post(`${Config.baseURL}/api/cart/coupon/apply/`, { code: couponCode, Total: total });
      if (response.data.valid) {
        const newDiscountedPrice = response.data.discounted_price;
        const percentage = response.data.percentage || 0;
        updateTotal(newDiscountedPrice); // Update total in parent
        setSuccessMessage(
          language === 'ar'
            ? `تم تطبيق خصم ${percentage}% بنجاح!`
            : `A discount of ${percentage}% has been successfully applied!`
        );
        setErrorMessage("");
      } else {
        setErrorMessage();
        setSuccessMessage(
          language === 'ar'
            ? "كود الخصم غير صحيح"
            : "The discount code is invalid"
        );
        setSuccessMessage("");
      }
    } catch (error) {
      setSuccessMessage(
        language === 'ar'
          ? "كود الخصم غير صحيح"
          : "The discount code is invalid"
      );
      setSuccessMessage("");
    }
  };

  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
  };

  return (
    <div className="section-card">
      <div className="div-btn">
        <button className="coupon-btn" type="button" onClick={applyCoupon}>
          <span className="px-1">
            {language === 'ar' ? 'إرسال' : 'Send'}
          </span>
          <span className="js-apply-coupon-icon"><RiCoupon3Line /></span>
        </button>
      </div>  

      <div className="div-input">
        <input
          type="text"
          className="Form-control custom-input"  // إضافة الفئة المخصصة
          placeholder={language === 'ar' ? 'أدخل كود الخصم' : 'Enter the discount code'}
          value={couponCode}
          onChange={handleCouponCodeChange}
        />
      </div>  

      <div style={{ marginTop: '0', paddingTop: '0' }}>
        {successMessage && (<div className="successMessage">{successMessage}</div>)}
        {errorMessage && (<div className="errorMessage">{errorMessage}</div>)}
      </div>
    </div>
  );
}