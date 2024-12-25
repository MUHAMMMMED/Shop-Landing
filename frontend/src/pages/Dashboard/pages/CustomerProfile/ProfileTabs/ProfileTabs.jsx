import React, { useState } from 'react';
import Profile from '../components/Profile/Profile';
import './ProfileTabs.css';

export default function ProfileTabs({ language, data }) {
    const [activeTab, setActiveTab] = useState(0);
    const tabs = [
        // { name: language === "ar" ? "الملف الشخصي" : "Profile", component: <Profile language={language} data={data} /> },
        { name: language === "ar" ? "." : ".", component: <Profile language={language} data={data} /> },

    ];

    return (
        <div className="profile-tabs">
            <div className="profile-tabs">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`${activeTab === index ? "profile-active-tab" : ""}`}  >
                        {tab.name}
                    </button>
                ))}
            </div>

            <div className="profile-content ">
                {tabs[activeTab]?.component}
            </div>
        </div>
    );
}