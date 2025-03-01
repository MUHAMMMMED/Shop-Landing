import axios from 'axios';
import html2canvas from 'html2canvas';
import React, { useEffect, useState } from 'react';
import { trackFacebookPixel } from '../../utils/pixels/facebookPixel';
import { trackGooglePixel } from '../../utils/pixels/googlePixel';
import { trackSnapchatPixel } from '../../utils/pixels/snapchatPixel';
import { trackTikTokPixel } from '../../utils/pixels/tiktokPixel';
import Loading from '../Loading/Loading';
import './Success.css';
import SuccessMessage from './components/SuccessMessage/SuccessMessage';
import Tracking from './components/Tracking/Tracking';

const Success = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

 
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`/orders/invoice/`, {
                    withCredentials: true,
                });

                setOrder(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchOrder();
    }, []);

    useEffect(() => {
        if (!order) return;
        
        const checkoutData = {
            transaction_id: order?.id,
            affiliation: "SMART CARD NFC",
            value: order?.total,
            currency: "SAR",
            items: order && order?.items.map(item => ({
                item_id: item?.id,
                item_name: item?.dictionary?.name,
                price: item?.price,
                quantity: item?.quantity,
            })),
        };
     

        trackFacebookPixel('Purchase', checkoutData);
        trackGooglePixel('purchase', checkoutData);
        trackTikTokPixel('CompletePayment', checkoutData);
        trackSnapchatPixel('PURCHASE', checkoutData);
    }, [order]);
 



 
    if (loading) return <Loading />;
 
    if (error) return (
        <h2 style={{
            textAlign: 'center',
            float: 'right', width: '100%',
            marginTop: '20%', color: '#9081f6',
            border: '1px solid #9081f6',
            padding: '20px 20px'
        }}>
            البيانات المطلوبة لم تعد متاحة
        </h2>
    );

 
    const saveInvoiceAsImage = () => {
        const invoiceElement = document.querySelector('.invoice-container');
        html2canvas(invoiceElement).then(canvas => {
            const link = document.createElement('a');
            link.download = 'invoice.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    };

    const calculateTotal = (price, quantity) => {
        return (price * quantity).toFixed(2);
    };

    const calculateSubtotal = () => {
        return order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    const Tax = order?.tax_amount;
    const shipping = order?.shipping;
    const total = (parseFloat(calculateSubtotal()));
    const total_tax_shipping = Tax + shipping
    const order_total = (order?.total - total_tax_shipping);
    const discount = (total - order_total);

 
    return (
        <>
            <SuccessMessage />
            <section className="invoice-container">
                <div className="invoice-cont">
                    <div className="invoice-md-flex justify-content-between" style={{ borderBottom: '1px solid #ddd' }}>
                        <div className="invoice-flex_right">
                            <h2 className="display-5 fw-bold"> الفاتوره</h2>
                            <p className="m-0">رقم الفاتوره: {order.invoice_number}</p>
                            <p className="m-0">{formatDate(order?.created_at)} : تاريخ الفاتورة</p>
                        </div>
                        <div className='invoice-flex_left'>
                            <h2 className="display-5 fw-bold" style={{ textAlign: 'center', color: '#9081f6', fontSize: '50px', padding: '0px 5px 0px 5px', marginBottom: '0px', marginTop: '25px' }}> NFC </h2>
                            <p className="display-5 fw-bold" style={{ textAlign: 'center', color: '#9081f6', fontSize: '15px', padding: '0px', marginTop: '0px', letterSpacing: '.3rem' }}> smart card </p>
                        </div>
                    </div>
                    <div className="invoice-md-flex justify-content-between">
                        <div className='invoice-flex_left'>
                            <p className="text-primary">الفاتوره الي</p>
                            <h4>{order?.customer?.name}</h4>
                            <ul className="list-unstyled">
                                <li >   العنوان : -
                                    {order?.customer?.country?.name}
                                    {order?.customer?.governorate} ,
                                    {order?.customer?.city}  <br />
                                    {order?.customer?.neighborhood} ,
                                    {order?.customer?.shipping_address}
                                </li>
                                {order?.customer?.shipping_address &&
                                    <li>العنوان تفصيلي:
                                        {order?.customer?.shipping_address}
                                    </li>}
                                {order?.customer?.phone &&
                                    <li>
                                        رقم الهاتف:
                                        {` ${order?.customer?.phone} `}

                                    </li>}
                            </ul>
                        </div>
                        <div className="invoice-flex_right">
                            <p className="text-primary">الفاتورة من</p>
                            <h4>شركة</h4>
                            <ul className="list-unstyled">
                                <li>Nfc</li>
                                <li>info@abccompany.com</li>
                                <li>(510) 710-3464</li>
                            </ul>
                        </div>
                    </div>
                    <table className="table border">
                        <thead>
                            <tr className="bg-primary-subtle">
                                <th scope="col">رقم</th>
                                <th scope="col" style={{ textAlign: 'right' }}>اسم المنتج</th>
                                <th scope="col">السعر</th>
                                <th scope="col">الكمية</th>
                                <th scope="col">الاجمالي</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order && order?.items.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td style={{ textAlign: 'right' }}>{item?.dictionary?.name}</td>
                                    <td>{item?.price.toFixed(2)}  </td>
                                    <td>{item?.quantity}</td>
                                    <td>{calculateTotal(item?.price, item?.quantity)} </td>
                                </tr>

                            ))}
                            {discount > 0 ? (
                                <>
                                    <tr>
                                        <th style={{ border: '0px solid #dee2e6' }}></th>
                                        <td style={{ border: '0px solid #dee2e6' }}></td>
                                        <td style={{ border: '0px solid #dee2e6', borderLeft: '1px solid #dee2e6' }}></td>
                                        <td style={{ width: '200px', textDecoration: 'line-through' }}>المجموع الفرعي</td>
                                        <td style={{ textDecoration: 'line-through' }}>{calculateSubtotal()}  </td>
                                    </tr>
                                    <tr>
                                        <th style={{ border: '0px solid #dee2e6' }}></th>
                                        <td style={{ border: '0px solid #dee2e6' }}></td>
                                        <td style={{ border: '0px solid #dee2e6', borderLeft: '1px solid #dee2e6' }}></td>

                                        <td className="text-primary   " style={{ width: '200px' }}>
                                            المجموع الفرعي
                                            <br />
                                            بعد تطبيق الخصم
                                        </td>
                                        <td className="text-primary  ">{discount.toFixed(2) || 0} SAR</td>
                                    </tr>
                                </>
                            ) : (
                                <tr>
                                    <th style={{ border: '0px solid #dee2e6' }}></th>
                                    <td style={{ border: '0px solid #dee2e6' }}></td>
                                    <td style={{ border: '0px solid #dee2e6', borderLeft: '1px solid #dee2e6' }}></td>

                                    <td style={{ width: '200px', border: '1px solid #dee2e6' }}>المجموع الفرعي</td>
                                    <td>{calculateSubtotal()}  </td>
                                </tr>
                            )}


                            <tr>
                                <th style={{ border: '0px solid #dee2e6' }}></th>
                                <td style={{ border: '0px solid #dee2e6' }}></td>
                                <td style={{ border: '0px solid #dee2e6', borderLeft: '1px solid #dee2e6' }}></td>
                                <td style={{ width: '200px' }}>الضريب ( {order?.tax} % ) </td>
                                <td>{Tax.toFixed(2) || 0}  </td>
                            </tr>
                            <tr>
                                <th style={{ border: '0px solid #dee2e6' }}></th>
                                <td style={{ border: '0px solid #dee2e6' }}></td>
                                <td style={{ border: '0px solid #dee2e6', borderLeft: '1px solid #dee2e6' }}></td>

                                <td style={{ width: '200px' }}>الشحن</td>
                                <td>{order?.shipping.toFixed(2) || 0}  </td>
                            </tr>
                            <tr>
                                <th style={{ border: '0px solid #dee2e6' }}></th>
                                <td style={{ border: '0px solid #dee2e6' }}></td>
                                <td style={{ border: '0px solid #dee2e6', borderLeft: '1px solid #dee2e6' }}></td>

                                <td className="text-primary fw-bold" style={{ width: '200px' }}>المجموع</td>
                                <td className="text-primary fw-bold">{order?.total.toFixed(2) || 0}  </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-center">
                        {/* <p className="text-muted"><span className="fw-semibold">ملاحظة: </span> سيتم فرض رسوم تمويل بنسبة 1.5% على الأرصدة غير المدفوعة بعد 30 يومًا.</p> */}
                    </div>
                    {order?.Tracking && <Tracking Tracking={order?.Tracking} />}
                    <div id="footer-bottom" >
                        <div className="container border-top" style={{ background: '#fff' }}>
                            <div className="row mt-3">
                                <div className="col-md-6 copy_right">
                                    <p style={{ textAlign: 'center' }}>© 2024 <a href="#" target="_blank" className="text-decoration-none text-black-50"> NFC.</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div style={{ float: 'right', width: '100%', padding: '5px', marginBottom: '50px' }}>
                <div style={{ width: '200px', margin: 'auto', padding: '5px' }}>
                    <button className="invoice-Btn" onClick={saveInvoiceAsImage}>حفظ صورة الفاتورة</button>
                </div>
            </div>
        </>
    );
};

export default Success;
