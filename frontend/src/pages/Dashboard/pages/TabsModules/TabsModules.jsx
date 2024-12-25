import React, { useState } from "react";
import DasHeader from "../../components/DasHeader/DasHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./TabsModules.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Product from "./components/Product/Product";


import { useParams } from 'react-router-dom';
export default function TabsModules() {
    const [language, setLanguage] = useState("en"); // Initialize language state
    const { page_id, section_id } = useParams();

    // Function to update language from DasHeader
    const updateLanguage = (newLanguage) => {
        setLanguage(newLanguage);
    };

    const tabs = [
        { name: language === "ar" ? "الرأس" : "Header", component: <Header /> },
        { name: language === "ar" ? "السلايدر" : "Slider", component: <h1 style={{ color: '#000' }}>Slider {section_id}{page_id} </h1> },
        { name: language === "ar" ? "المنتج" : "Product", component: <Product pageId={page_id} sectionId={section_id} /> },
        { name: language === "ar" ? "المحتوى" : "Content", component: <h1 style={{ color: '#000' }}>Content {section_id}{page_id} </h1> },
        { name: language === "ar" ? "التذييل" : "Footer", component: <Footer /> },
    ];

    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <DasHeader language={language} updateLanguage={updateLanguage} />
            <div className={`dashboard ${language === "ar" ? "rtl" : "ltr"}`}>
                <Sidebar language={language} />
                <main className="content">
                    <div className="tabs-container">
                        <div className="tabs-header">
                            {tabs.map((tab, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTab(index)}
                                    className={`tab-button ${activeTab === index ? "active" : ""}`}  >
                                    {tab.name}
                                </button>
                            ))}
                        </div>
                        {/* Render Active Tab Content */}

                        <div className="tabs-content">{tabs[activeTab]?.component}</div>
                    </div>
                </main>
            </div>
        </>
    );
}