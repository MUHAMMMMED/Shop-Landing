
import React, { useState } from 'react';
import { FaBox, FaChartLine, FaChartPie, FaClipboardList, FaCog, FaHome, FaTags, FaUserCircle, FaUsers, FaUsersCog } from 'react-icons/fa';
import DasHeader from '../DasHeader/DasHeader';
import FooterNav from '../DashFooterNav/DashFooterNav';
import './DashboardMenu.css';

function DashboardMenu() {
    const [language, setLanguage] = useState('en'); // Initialize language state

    // Function to update language from DasHeader
    const updateLanguage = (newLanguage) => {
        setLanguage(newLanguage);
    };

    const menuItems = [
        { name: language === 'ar' ? 'الرئيسية' : 'Home', icon: <FaHome size={32} /> },
        { name: language === 'ar' ? 'لوحة التحكم' : 'Dashboard', icon: <FaChartPie size={32} /> },
        { name: language === 'ar' ? 'الطلبات' : 'Orders', icon: <FaClipboardList size={32} /> },
        { name: language === 'ar' ? 'المنتجات' : 'Products', icon: <FaBox size={32} /> },
        { name: language === 'ar' ? 'الفئات' : 'Categories', icon: <FaTags size={32} /> },
        { name: language === 'ar' ? 'العملاء' : 'Clients', icon: <FaUsers size={32} /> },
        { name: language === 'ar' ? 'التقارير' : 'Reports', icon: <FaChartLine size={32} /> },
        { name: language === 'ar' ? 'الملف الشخصي' : 'Profile', icon: <FaUserCircle size={32} /> },
        { name: language === 'ar' ? 'الإعدادات' : 'Settings', icon: <FaCog size={32} /> },
        { name: language === 'ar' ? 'الفريق' : 'Team', icon: <FaUsersCog size={32} /> },
    ];

    return (
        <>
            {/* Pass updateLanguage to DasHeader */}
            <DasHeader language={language} updateLanguage={updateLanguage} />
            <div className={`dashboard-menu ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                {menuItems.map((item, index) => (
                    <div key={index} className={`dashboard-menu-item ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                        {item.icon}
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
            <FooterNav language={language} />
        </>
    );
}

export default DashboardMenu;