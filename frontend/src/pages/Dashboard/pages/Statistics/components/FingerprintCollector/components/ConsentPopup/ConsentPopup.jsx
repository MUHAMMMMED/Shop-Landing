// src/components/ConsentPopup.jsx
import React from 'react';
import './ConsentPopup.css'; // استيراد ملف الأنماط

const ConsentPopup = ({ onClose, onConsent }) => {
    return (
        <div className="consent-popup">
            <div className="consent-content">
                <p className="consent-text">
                    هل ترغب في السماح بجمع بياناتك لأغراض التحليل لتحسين تجربتك في الموقع؟
                </p>
                <div className="consent-buttons">
                    <button className="button consent-yes" onClick={() => onConsent(true)}>نعم</button>
                    <button className="button consent-no" onClick={() => onClose(false)}>لا</button>
                </div>
            </div>
        </div>
    );
};

export default ConsentPopup;