
import React from 'react';
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import './style.css';

const FloatingButtons = () => {
    return (
        <>
            {/* WhatsApp Floating Button */}
            <div className="floating_btn">
                <a target="_blank" rel="noopener noreferrer" href="https://wa.me/9607">
                    <div className="contact_icon">
                        <FaWhatsapp />

                    </div>
                </a>
            </div>

            {/* Phone Floating Button */}
            <div className="floating_btn1">
                <a href="tel:#">
                    <div className="contact_icon1">
                        <FaPhoneAlt />
                    </div>
                </a>
            </div>
        </>
    );
}

export default FloatingButtons;
