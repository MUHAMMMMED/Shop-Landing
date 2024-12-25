import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../../../../Authentication/AxiosInstance';
import Config from '../../../../components/config';
import DasHeader from '../../components/DasHeader/DasHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import './OrderDetails.css';
import CustomerDetails from './components/CustomerDetails/CustomerDetails';
import DeliveryCard from './components/DeliveryCard/DeliveryCard';
import OrderItem from './components/OrderItem/OrderItem';
import Select from './components/Select/Select';
import ShippingActivity from './components/ShippingActivity/ShippingActivity';
import ShippingAddress from './components/ShippingAddress/ShippingAddress';

// Helper function to format the date
const formatDate = (isoString) => {
    if (!isoString) return 'Date not available';
    const date = new Date(isoString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // For AM/PM format
        timeZoneName: 'short',
    };
    return date.toLocaleDateString('en-US', options);
};

// Helper function to map status codes to readable strings
const getStatusText = (statusCode) => {
    const statusMap = {
        'P': 'Order Placed',
        'PU': 'Pick-up',
        'Di': 'Dispatched',
        'PA': 'Package Arrived',
        'DFD': 'Dispatched for Delivery',
        'D': 'Delivery',
        'C': 'Cancelled',
    };
    return statusMap[statusCode] || 'Unknown Status';
};

const OrderDetails = () => {
    const [language, setLanguage] = useState('en'); // Initialize language state
    const { id: orderId } = useParams();
    const [order, setOrder] = useState(null); // State to store order details

    // Function to update language from DasHeader
    const updateLanguage = (newLanguage) => {
        setLanguage(newLanguage);
    };

    const fetchOrder = async () => {
        try {
            if (!orderId) return;
            const response = await AxiosInstance.get(`${Config.baseURL}/api/orders/order-detail/${orderId}/`);
            setOrder(response.data);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    // Early return if order is not available yet
    if (!order) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    return (
        <>
            <DasHeader language={language} updateLanguage={updateLanguage} />
            <div className={`dashboard ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                <Sidebar language={language} />
                <main className={`content ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                    <div className="main-layout">
                        <div className="order-header">
                            <span>Order # {order?.id || 'N/A'}</span>
                            <span>{order?.paid ? <span style={{ color: 'green' }}>Paid</span> : <samp style={{ color: 'red' }}>Not Paid</samp>} | {getStatusText(order?.status)}</span>
                            <span>{formatDate(order?.created_at)}</span>
                        </div>

                        <div className="order-body">
                            <div className="order-main">
                                <OrderItem order={order} />
                                <ShippingActivity order={order} />
                            </div>

                            <div className="customer">
                                <CustomerDetails order={order} />
                                <ShippingAddress order={order} />
                                <DeliveryCard order={order} />
                                <Select order={order} fetchOrder={fetchOrder} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default OrderDetails;