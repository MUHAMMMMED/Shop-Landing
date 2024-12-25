// src/utils/collectFingerprintData.js
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const collectFingerprintData = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    const fingerprintData = {
        visitorId: result.visitorId,
        components: result.components,
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        timezoneOffset: new Date().getTimezoneOffset(),
        fonts: navigator.fonts ? await navigator.fonts.query().join(", ") : null,
        plugins: navigator.plugins ? Array.from(navigator.plugins).map(p => p.name).join(", ") : null,
    };

    try {
        const response = await fetch('http://localhost:8000/api/fingerprint/collect/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fingerprintData),
        });
        if (response.ok) {
            console.log('Fingerprint data sent successfully');
        } else {
            console.error('Failed to send fingerprint data');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};