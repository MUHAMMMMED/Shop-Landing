import React, { useEffect, useState } from 'react';
import './FingerprintCollector.css'; // ملف CSS الخاص بالمكون

const FingerprintCollector = () => {
    const [dataCollectionMode, setDataCollectionMode] = useState('disabled');
    const [showConsentPopup, setShowConsentPopup] = useState(false);

    useEffect(() => {
        // استرجاع الحالة من Local Storage عند تحميل المكون
        const savedMode = localStorage.getItem('dataCollectionMode') || 'disabled';
        setDataCollectionMode(savedMode);

        // التحكم في سلوك جمع البيانات بناءً على الحالة
        if (savedMode === 'collect_without_consent') {
            collectFingerprintData();
        } else if (savedMode === 'collect_with_consent') {
            setShowConsentPopup(true);
        }
    }, []);

    const handleConsent = (consent) => {
        if (consent) {
            collectFingerprintData();
        }
        setShowConsentPopup(false);
    };

    const handleModeChange = (mode) => {
        setDataCollectionMode(mode);
        localStorage.setItem('dataCollectionMode', mode);
        if (mode === 'collect_without_consent') {
            collectFingerprintData();
        } else if (mode === 'collect_with_consent') {
            setShowConsentPopup(true);
        }
    };

    return (
        <div>
            <h1>Fingerprint Collector</h1>
            <div>
                <button onClick={() => handleModeChange('collect_with_consent')}>
                    جمع البيانات مع طلب إذن
                </button>
                <button onClick={() => handleModeChange('collect_without_consent')}>
                    جمع البيانات بدون إذن
                </button>
                <button onClick={() => handleModeChange('disabled')}>
                    تعطيل جمع البيانات
                </button>
            </div>

            {showConsentPopup && (
                <div className="consent-popup">
                    <p>هل توافق على جمع بياناتك لأغراض التحليل؟</p>
                    <button onClick={() => handleConsent(true)}>نعم</button>
                    <button onClick={() => handleConsent(false)}>لا</button>
                </div>
            )}
        </div>
    );
};

export default FingerprintCollector;