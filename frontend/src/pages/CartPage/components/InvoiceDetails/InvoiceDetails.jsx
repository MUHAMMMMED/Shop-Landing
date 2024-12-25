import React, { useEffect, useState } from 'react';
import ApplyCoupon from '../ApplyCoupon/ApplyCoupon';
import FollowUpPayment from '../FollowUpPayment/FollowUpPayment';
import SmallCard from '../SmallCard/SmallCard';
import './InvoiceDetails.css';
export default function InvoiceDetails({ cart, tax, shippingPrice, language, orderData, validateForm, setErrors }) {
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const total = Number(cart?.total) || 0;
  const taxRate = Number(tax) || 0;
  const shipping = Number(shippingPrice) || 0;
  const taxAmount = (total * taxRate) / 100;  // Calculate tax once
  const finalTotal = total + taxAmount + shipping;  // Calculate final total

  useEffect(() => {
    setDiscountedTotal(finalTotal); // Update discounted total when the total or tax changes
  }, [total, taxRate, shipping]);

  return (
    <>
      <div className="section-cart-products-row2">
        <h2 className="Pricing-sub-title">
          {language === 'ar' ? 'المنتجات' : 'Products'}
        </h2>

        <div style={{ width: '100%', float: 'left' }}>
          {cart.cart_items.map((item) => (
            <SmallCard key={item.id} quantity={item.quantity} image={item.product.image} />
          ))}
        </div>
        <div className='Pricing-sub'>
          <div className="Pricing-sub-title">
            {language === 'ar' ? 'تفاصيل الفاتورة' : 'Invoice Details'}
          </div>
          <ApplyCoupon total={total} updateTotal={setDiscountedTotal} language={language} />
          <div className="Pricing-Summary">
            <div className="totals-item-sub_totals">
              <div className="col">
                <span className="pricing-title">
                  {language === 'ar' ? 'عدد المنتجات' : 'Product Quantity'}
                </span>
              </div>
              <div className="text-right">
                <span className="pricing-amount">({cart.cart_items_count || 0})</span>
              </div>
            </div>

            <div className="totals-item-sub_totals">
              <div className="col">
                <span className="pricing-title">
                  {language === 'ar' ? 'الكمية' : 'Quantity'}
                </span>
              </div>
              <div className="text-right">
                <span className="pricing-amount">({cart.cart_quantity || 0})</span>
              </div>
            </div>

            <div className="totals-item-sub_totals">
              <div className="col">
                <span className="pricing-title">
                  {language === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}

                </span>
              </div>
              <div className="text-right">
                <span className="pricing-amount">{total.toFixed(2)} <span className='money_code'> {cart.currency}</span></span>
              </div>
            </div>

            <div className="totals-item-sub_totals">
              <div className="col">
                <span className="pricing-title"> ({taxRate.toFixed(0)} %)
                  {language === 'ar' ? 'الضريبة' : 'Tax'}

                </span>
              </div>
              <div className="text-right">
                <span className="pricing-amount">{taxAmount.toFixed(2)} <span className='money_code'> {cart.currency}</span></span>
              </div>
            </div>

            <div className="totals-item-sub_totals">
              <div className="col">
                <span className="pricing-title">
                  {language === 'ar' ? 'رسوم التوصيل' : 'Delivery Fee'}
                </span>
              </div>
              <div className="text-right">
                <span className="pricing-amount">{shipping.toFixed(2)} </span>
              </div>
            </div>

            <div className="totals-item-total" style={{ display: 'block' }}>
              <div className="col" style={{ display: 'block' }}>
                <span className="total-title" style={{ display: 'block' }}>
                  {language === 'ar' ? 'المجموع' : 'Total'}
                </span>
              </div>
              <div className="text-right" style={{ display: 'block' }}>
                <span className="total-amount fw-bold " style={{ display: 'block' }}> <spen style={{ float: 'left' }}>{discountedTotal.toFixed(2)} </spen> <span className='money_code' style={{ float: 'left' }}>  {cart.currency}</span> </span>
              </div>
            </div>
          </div>

          <div style={{ width: '100%', float: 'left' }}>
            <FollowUpPayment Total={discountedTotal} cartId={cart?.cart_data?.id} taxAmount={taxAmount} orderData={orderData} validateForm={validateForm} setErrors={setErrors} language={language} /></div>
        </div>
      </div>
    </>
  );
}