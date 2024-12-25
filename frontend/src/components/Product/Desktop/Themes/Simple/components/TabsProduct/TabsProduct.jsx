import React, { useState } from "react";
import "./TabsProduct.css";
import Description from "./components/Description/Description.jsx";

export default function TabsProduct({ data, language }) {

    const tabs = [
        {
            name: language === "ar" ? "التفاصيل" : "Details",
            component: <Description details={data?.details} language={language} />
        },];
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <div className="tabs-product-container">

                <div className={`tabs-product-header ${language === 'ar' ? 'rtl' : 'ltr'}`}  >
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`tabs-product-button ${activeTab === index ? "active" : ""} ${language === 'ar' ? 'rtl' : 'ltr'}`} >
                            {tab.name}
                        </button>
                    ))}
                </div>
                {/* Render Active Tab Content */}

                <div className={`tabs-product-content ${language === 'ar' ? 'rtl' : 'ltr'}`}
                >{tabs[activeTab]?.component}</div>
            </div>

        </>
    );
}