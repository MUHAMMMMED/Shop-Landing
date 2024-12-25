// src/utils/collectFingerprintData.js
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const collectFingerprintData = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    const fingerprintData = {
        visitorId: result.visitorId,
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        timezoneOffset: new Date().getTimezoneOffset(),
    };

    try {

        await fetch('http://localhost:8000/api/fingerprint/collect/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fingerprintData),
        });
        console.log('Fingerprint data sent successfully');
    } catch (error) {
        console.error('Error sending fingerprint data:', error);
    }
};