import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import DasHeader from "../../components/DasHeader/DasHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./TabsModules.css";
import BestSeller from "./components/BestSeller/BestSeller";
import CardGrid from "./components/CardGrid/CardGrid";
import FAQ from "./components/FAQ/FAQ";
import Features from "./components/Features/Features";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HeightImage from "./components/HeightImage/HeightImage";
import Product from "./components/Product/Product";
import ProductFeatures from "./components/ProductFeatures/ProductFeatures";
import Slider from "./components/Slider/Slider";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import YouTubePlayer from "./components/YouTubePlayer/YouTubePlayer";

export default function TabsModules() {
    const [language, setLanguage] = useState("en"); // Initialize language state
    const { page_id, section_id } = useParams();

    // Function to update language from DasHeader
    const updateLanguage = (newLanguage) => {
        setLanguage(newLanguage);
    };

    const tabs = [
        { name: language === "ar" ? "الرأس" : "Header", component: <Header pageId={page_id} sectionId={section_id} /> },
        { name: language === "ar" ? "السلايدر" : "Slider", component: <Slider pageId={page_id} sectionId={section_id} /> },
        { name: language === "ar" ? "المنتج" : "Product", component: <Product pageId={page_id} sectionId={section_id} /> },
        { name: language === "ar" ? "الأسئلة الشائعة" : "FAQ", component: <FAQ pageId={page_id} sectionId={section_id} /> },
        { name: language === "ar" ? "مشغل الفيديو" : "VideoPlayer", component: <VideoPlayer pageId={page_id} sectionId={section_id} /> },
        { name: language === "ar" ? "مشغل يوتيوب" : "YouTubePlayer", component: <YouTubePlayer pageId={page_id} sectionId={section_id} /> },
        { name: language === "ar" ? "صورة عالية" : "HeightImage", component: <HeightImage pageId={page_id} sectionId={section_id} /> },
        { name: language === "ar" ? "شبكة البطاقات" : "CardGrid", component: <CardGrid pageId={page_id} sectionId={section_id} /> },
        { name: language === "ar" ? "المميزات" : "Features", component: <Features pageId={page_id} sectionId={section_id} /> },
        { name: language === "ar" ? "مميزات المنتج" : "ProductFeatures", component: <ProductFeatures pageId={page_id} sectionId={section_id} /> },
        { name: language === "ar" ? "المحتوى" : "Content", component: <h1 style={{ color: '#000' }}>Content {section_id}{page_id} </h1> },
        { name: language === "ar" ? "الأكثر مبيعًا" : "BestSeller", component: <BestSeller pageId={page_id} sectionId={section_id} /> },
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
                        <div className="Tabs-header">
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