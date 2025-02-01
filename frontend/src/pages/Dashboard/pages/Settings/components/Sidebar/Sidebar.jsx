
import React, { useState } from "react";
import {
    //  FaBell, FaCreditCard, FaMapMarkerAlt,
    FaStore, FaTruck
} from "react-icons/fa";
import { MdCampaign } from "react-icons/md";
import { RiCoupon3Fill } from "react-icons/ri";

// import NotificationSettings from "../NotificationSettings/NotificationSettings";
import Coupon from "../Coupon/Coupon";
import Links from "../Links/Links";
import ShippingZones from "../ShippingZones/ShippingZones";
import StoreDetails from "../StoreDetails/StoreDetails";


import PixelSettingsForm from "../../../../../../components/PixelsLibraries/PixelSettingsForm/PixelSettingsForm";
import "./Sidebar.css";

const SettingsSidebar = ({ language = "en" }) => {
    // Tabs configuration
    const tabs = [
        {
            name: language === "ar" ? "تفاصيل المتجر" : "Store Details",
            icon: <FaStore />,
            component: <StoreDetails />,
        },
        {
            name: language === "ar" ? "الشحن والتوصيل" : "Shipping & Delivery",
            icon: <FaTruck />,
            component: <ShippingZones />,
        },

        {
            name: language === "ar" ? "الدفع" : "Campaign",
            icon: <MdCampaign />,
            component: <Links />,
        },

        {
            name: language === "ar" ? "كوبون" : "Coupon",
            icon: <RiCoupon3Fill />,
            component: <Coupon />,
        },

        {
            name: language === "ar" ? "Pixel" : "Pixels",
            icon: <RiCoupon3Fill />,
            component: <PixelSettingsForm />,
        },


        {/* {
        //     name: language === "ar" ? "المواقع" : "Locations",
        //     icon: <FaMapMarkerAlt />,
        //     component: <h1 style={{ color: "#000" }}>Locations Component</h1>,
        // },
        // {
        //     name: language === "ar" ? "الإشعارات" : "Notifications",
        //     icon: <FaBell />,
        //     component: <NotificationSettings />,
        // }, */}
    ];

    const [activeTab, setActiveTab] = useState(0); // State to track active tab

    return (
        <div className="Setting-side">
            {/* Sidebar */}
            <div className="Setting-sidebar">
                {/* <h2 className="Setting-sidebar-title">
                    {language === "ar" ? "البدء" : "Getting Started"}
                </h2> */}
                <ul className="Setting-sidebar-menu">
                    {tabs.map((item, index) => (
                        <li
                            key={index}
                            className={`${activeTab === index ? "active" : ""}`}
                            onClick={() => setActiveTab(index)}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Content Section */}
            <div className="Setting-content">{tabs[activeTab].component}</div>
        </div>
    );
};

export default SettingsSidebar;