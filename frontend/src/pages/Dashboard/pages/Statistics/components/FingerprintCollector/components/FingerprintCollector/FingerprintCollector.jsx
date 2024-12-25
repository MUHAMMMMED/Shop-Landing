// src/components/FingerprintCollector.jsx
import React, { useEffect, useState } from 'react';
import ConsentPopup from '../ConsentPopup/ConsentPopup';
import Settings from '../Settings/Settings';
import { collectFingerprintData } from '../collectFingerprintData/collectFingerprintData';
 
 

const FingerprintCollector = () => {
    const [mode, setMode] = useState(localStorage.getItem('collectMode') || 'manual');
    const [isConsentGiven, setIsConsentGiven] = useState(localStorage.getItem('isConsentGiven') === 'true');

    useEffect(() => {
        if (mode === 'auto') {
            collectFingerprintData();
        } else if (mode === 'manual' && !isConsentGiven) {
            setIsConsentGiven(false);
        }
    }, [mode, isConsentGiven]);

    const handleConsent = (consent) => {
        setIsConsentGiven(consent);
        localStorage.setItem('isConsentGiven', consent);
        if (consent) collectFingerprintData();
    };

    const handleModeChange = (newMode) => {
        setMode(newMode);
        localStorage.setItem('collectMode', newMode);
    };

    return (
        <div>
            <Settings mode={mode} onModeChange={handleModeChange} />
            {mode === 'manual' && !isConsentGiven && (
                <ConsentPopup onClose={() => setIsConsentGiven(false)} onConsent={handleConsent} />
            )}
        </div>
    );
};

export default FingerprintCollector;