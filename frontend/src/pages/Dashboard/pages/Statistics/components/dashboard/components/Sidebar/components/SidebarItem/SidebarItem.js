import React, { useState } from 'react';
import {
    FaChevronDown,
    FaChevronLeft,
    FaChevronRight
} from 'react-icons/fa';

const SidebarItem = ({ item, isArabic, isExpanded }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSubMenu = () => {
        if (item.subItems) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div>
            <div
                className={`sidebar-item ${isArabic ? 'rtl' : 'ltr'} ${item.subItems ? 'has-subitems' : ''}`}
                onClick={toggleSubMenu}
                aria-expanded={isOpen}
                dir={isArabic ? 'rtl' : 'ltr'}
            >
                <div className={`icon-label ${isArabic ? 'rtl' : 'ltr'}`} >
                    <span className="icon">{item.icon}</span>
                    <span className="label">
                        {isArabic ? item.label_en : item.label_ar}
                    </span>
                </div>

                {isExpanded && item.subItems && (
                    <div className="submenu-icon">
                        {isOpen ? (
                            <FaChevronDown />
                        ) : (
                            isArabic ? <FaChevronRight /> : <FaChevronLeft />
                        )}
                    </div>
                )}
            </div>

            {isOpen && item.subItems && (
                <ul className={`sidebar-sublist ${isArabic ? 'rtl' : 'ltr'}`}>
                    {item.subItems.map((subItem, index) => (
                        <li key={index} className="sidebar-subitem" dir={isArabic ? 'rtl' : 'ltr'}>

                            <div className={`sidebar-subitem  ${isExpanded ? 'sidebar-subitem1 ' : 'sidebar-subitem2'} ${isArabic ? 'rtl' : 'ltr'}`}>

                                <span className={`icon-label-span ${isArabic ? 'ltr' : 'rtl'}`}>
                                    {subItem.icon}
                                </span>
                                <span className="label">
                                    {isArabic ? subItem.label_en : subItem.label_ar}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SidebarItem;