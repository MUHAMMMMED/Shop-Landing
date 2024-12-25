import React from 'react';
import './ShippingActivity.css';

const ShippingActivity = ({ order }) => {
    // Check if order exists before trying to access its properties
    if (!order) {
        return <div>Loading...</div>; // You can show a loading message or spinner here
    }

    const timelineData = [
        {
            title: "Order was placed",
            description: "Your order has been placed successfully",
            time: "",
            status: order.status === 'P' ? "completed" : "inactive",
        },
        {
            title: "Pick-up",
            description: "Pick-up scheduled with courier",
            time: "",
            status: order.status === 'PU' ? "completed" : "inactive",
        },
        {
            title: "Dispatched",
            description: "Item has been picked up by courier",
            time: "",
            status: order.status === 'Di' ? "completed" : "inactive",
        },
        {
            title: "Package arrived",
            description: "Package arrived at an Amazon facility, NY",
            time: "",
            status: order.status === 'PA' ? "completed" : "inactive",
        },
        {
            title: "Dispatched for delivery",
            description: "Package has left an Amazon facility, NY",
            time: "",
            status: order.status === 'DFD' ? "current" : "inactive",
        },
        {
            title: "Delivery",
            description: "Package will be delivered by tomorrow",
            time: "",
            status: order.status === 'D' ? "completed" : "inactive",
        },
        {
            title: "Cancel",
            description: "Your order has been canceled.",
            time: "",
            status: order.status === 'C' ? "cancel" : "inactive",
        },
    ];

    return (
        <div className="shipping-activity">
            <h2>Shipping Activity</h2>
            <div className="timeline">
                {timelineData.map((item, index) => (
                    <div className={`timeline-item ${item.status}`} key={index}>
                        <div className="timeline-icon"></div>
                        <div className="timeline-content">
                            <div className="timeline-title">{item.title}</div>
                            <div className="timeline-description">{item.description}</div>
                        </div>
                        <div className="timeline-time">{item.time}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShippingActivity;