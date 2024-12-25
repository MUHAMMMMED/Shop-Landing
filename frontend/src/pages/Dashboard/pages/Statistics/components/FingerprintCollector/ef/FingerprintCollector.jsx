// // npm install @fingerprintjs/fingerprintjs

// import FingerprintJS from '@fingerprintjs/fingerprintjs';
// import React, { useEffect } from 'react';

// const FingerprintCollector = () => {
//     useEffect(() => {
//         const collectFingerprint = async () => {
//             // تحميل مكتبة FingerprintJS وبدء العملية
//             const fp = await FingerprintJS.load();
//             const result = await fp.get();
//             // استخراج بصمة المتصفح (visitorId) والبيانات الأخرى
//             const fingerprintData = {
//                 visitorId: result.visitorId,
//                 components: result.components,
//                 userAgent: navigator.userAgent,
//                 screenResolution: `${window.screen.width}x${window.screen.height}`,
//                 language: navigator.language,
//                 timezoneOffset: new Date().getTimezoneOffset(),


//                 user_agent: navigator.userAgent,
//                 screen_resolution: `${window.screen.width}x${window.screen.height}`,
//                 language: navigator.language,
//                 timezone_offset: new Date().getTimezoneOffset().toString(),
//                 fonts: navigator.fonts ? await navigator.fonts.query().join(", ") : null,
//                 plugins: navigator.plugins ? Array.from(navigator.plugins).map(p => p.name).join(", ") : null,
//                 device: userAgentData.device.model || 'Unknown',
//                 operating_system: userAgentData.os.name || 'Unknown',
//                 country: null,
//                 region: null,
//                 city: null,
//                 hashed_ip: null, 

 

//             };

//             // إرسال البيانات إلى خادم Django
//             try {
//                 const response = await fetch('http://localhost:8000/api/fingerprint/collect/', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(fingerprintData),
//                 });
//                 if (response.ok) {
//                     console.log('Fingerprint data sent successfully');
//                 } else {
//                     console.error('Failed to send fingerprint data');
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         };

//         collectFingerprint();
//     }, []);

//     return <div>Collecting fingerprint data...</div>;
// };

// export default FingerprintCollector;






// // src/App.js

// import React from 'react';
// import FingerprintCollector from './components/FingerprintCollector';

// function App() {
//     return (
//         <div className="App">
//             <h1>Fingerprint Collector</h1>
//             <FingerprintCollector />
//         </div>
//     );
// }

// export default App;


const collectFingerprintData = async () => {
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