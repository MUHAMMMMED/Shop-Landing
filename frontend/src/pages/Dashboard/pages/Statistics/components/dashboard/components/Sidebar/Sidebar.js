import React, { useState } from 'react';
import {
    FaAngleDoubleLeft,
    FaAngleDoubleRight
} from 'react-icons/fa';
import './Sidebar.css';
import SidebarItem from './components/SidebarItem/SidebarItem';

const Sidebar = ({ logo, logoSmall, items, isLeft = true, isExpanded, toggleExpansion }) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const toggleMobileSidebar = () => {
        setIsMobileOpen(!isMobileOpen);
    };

    return (
        <>
            <div
                className={`sidebar ${isLeft ? 'left' : 'right'} ${isExpanded ? 'expanded' : 'collapsed'} ${isMobileOpen ? 'mobile-open' : ''}`}
            >
                {isExpanded && (
                    <div className="sidebar-header" dir={isLeft ? 'rtl' : 'ltr'}>
                        <img src={logo} alt="Logo" className="logo" />
                    </div>
                )}

                {!isExpanded && (
                    <img src={logoSmall} alt="logoSmall" className="logoSmall" />
                )}

                <ul className="sidebar-list">
                    {items.map((item, index) => (
                        <li key={index}>
                            <SidebarItem
                                item={isLeft ? item : { ...item, label_en: item.label_ar }}
                                isArabic={isLeft}
                                isExpanded={isExpanded}
                            />
                        </li>
                    ))}
                </ul>

                <span className="expand-toggle" onClick={toggleExpansion} aria-label="Toggle Sidebar">
                    {isExpanded ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
                </span>

                {/* <button className="mobile-toggle" onClick={toggleMobileSidebar} aria-label="Toggle Mobile Sidebar">
                    {isMobileOpen ? <FaTimes /> : <FaBars />}
                </button> */}
            </div>

            {/* Overlay for mobile when sidebar is open
            {isMobileOpen && <div className="sidebar-overlay" onClick={toggleMobileSidebar}></div>} */}




        </>
    );
};

export default Sidebar;