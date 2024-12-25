import React, { useEffect, useState } from 'react';
import ApplyCoupon from '../ApplyCoupon/ApplyCoupon';
import FollowUpPayment from '../FollowUpPayment/FollowUpPayment';
import ItemLi from './components/ItemLi/ItemLi';

export default function Invoice({ cart, tax, shippingPrice, language, orderData, validateForm, setErrors }) {
    const [discountedTotal, setDiscountedTotal] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0); // Add a state for taxAmount

    const total = Number(cart?.total) || 0;
    const taxRate = Number(tax) || 0;
    const shipping = Number(shippingPrice) || 0;

    useEffect(() => {
        const calculatedTaxAmount = (total * taxRate) / 100;
        setTaxAmount(calculatedTaxAmount); // Store the calculated tax amount in state
        const finalTotal = Number(total + calculatedTaxAmount + shipping);
        setDiscountedTotal(finalTotal);
    }, [total, taxRate, shipping]);


    return (
        <div className="section-cart-products-row2">
            <div className="section-cart-totals" style={{ background: '#fff' }}>
                <h5 className="text-body"   >
                    {language === 'ar' ? 'مجموع الطلب' : 'Order Total'}
                </h5>
                <ApplyCoupon total={total} updateTotal={setDiscountedTotal} language={language} />
                <ul className="list-group">
                    <li className="list-group-item-li">
                        <span className="fw-bold text-primary">({cart.cart_items_count || 0})</span>
                        <div className="me-auto"><span>
                            {language === 'ar' ? 'عدد المنتجات' : 'Product Quantity'}

                        </span></div>
                    </li>
                    <li className="list-group-item-li">
                        <span className="fw-bold text-primary">{cart.cart_quantity || 0}</span>
                        <div className="me-auto"><span>
                            {language === 'ar' ? 'الكمية' : 'Quantity'}</span></div>
                    </li>
                    <ItemLi Name={language === 'ar' ? 'المجموع الفرعي' : 'Subtotal'} Amount={cart?.total} />
                    <ItemLi Name={`(${tax || 0} %) ${language === 'ar' ? 'الضريبة' : 'Tax'}`} Amount={(total * taxRate) / 100} />
                    <ItemLi Name={language === 'ar' ? 'رسوم التوصيل' : 'Delivery Fee'} Amount={shipping} />
                    <li className="list-group-item-li">
                        <span className="total-amount fw-bold"> <spen style={{ float: 'left' }}>{discountedTotal} </spen> <span className='money_code' style={{ float: 'left' }}>  {cart.currency}</span> </span>
                        <div className="total-title"><span>     {language === 'ar' ? 'المجموع' : 'Total'}   </span></div>
                    </li>
                </ul>
            </div>

            <FollowUpPayment Total={discountedTotal} cartId={cart?.cart_data?.id} taxAmount={taxAmount} orderData={orderData} language={language} validateForm={validateForm} setErrors={setErrors} />

        </div>
    );
}