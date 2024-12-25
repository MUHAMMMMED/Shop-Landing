import React from 'react';
import { FaChartBar, FaClipboardList, FaCog, FaHome } from 'react-icons/fa';
import './DashFooterNav.css';

function FooterNav({ language }) {
  return (
    <div className={`footer-nav ${language === 'ar' ? 'rtl' : 'ltr'}`}> 
      <button className="nav-button">
        <FaHome size={24} />
        <span>{language === 'ar' ? 'القائمة' : 'Menu'}</span>
      </button>
      <button className="nav-button">
        <FaClipboardList size={24} />
        <span>{language === 'ar' ? ' الطلبات' : 'Orders'}</span>
      </button>
      <button className="nav-button">
        <FaChartBar size={24} />
        <span>{language === 'ar' ? ' التقارير' : 'Reports'}</span>
      </button>
      <button className="nav-button">
        <FaCog size={24} />
        <span>{language === 'ar' ? 'الإعدادات' : 'Settings'}</span>
      </button>
    </div>
  );
}

export default FooterNav;