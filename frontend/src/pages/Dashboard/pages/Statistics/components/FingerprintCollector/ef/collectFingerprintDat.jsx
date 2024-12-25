// const collectFingerprintData = async () => {
//     const fp = await FingerprintJS.load();
//     const result = await fp.get();
//     const fingerprintData = {
//         visitorId: result.visitorId,
//         components: result.components,
//         userAgent: navigator.userAgent,
//         screenResolution: `${window.screen.width}x${window.screen.height}`,
//         language: navigator.language,
//         timezoneOffset: new Date().getTimezoneOffset(),
//         fonts: navigator.fonts ? await navigator.fonts.query().join(", ") : null,
//         plugins: navigator.plugins ? Array.from(navigator.plugins).map(p => p.name).join(", ") : null,
//     };

//     try {
//         const response = await fetch('http://localhost:8000/api/fingerprint/collect/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(fingerprintData),
//         });
//         if (response.ok) {
//             console.log('Fingerprint data sent successfully');
//         } else {
//             console.error('Failed to send fingerprint data');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };


// src/components/UserVisitTracker.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserVisitTracker = () => {
    const [visitData, setVisitData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVisitData = async () => {
            try {
                const response = await axios.post('http://localhost:8000/track-visit/', {
                    // أضف أي بيانات تحتاجها هنا، مثل الكوكيز، الفينغربينت، إلخ
                    user_cookie: 'example_cookie',
                    browser_fingerprint: 'example_fingerprint',
                    user_agent: navigator.userAgent,
                    screen_resolution: `${window.screen.width}x${window.screen.height}`,
                    language: navigator.language,
                    timezone_offset: new Date().getTimezoneOffset(),
                    fonts: [], // أضف أي بيانات إضافية هنا
                    plugins: [], // أضف أي بيانات إضافية هنا
                    canvas_hash: '', // أضف أي بيانات إضافية هنا
                    audio_hash: '', // أضف أي بيانات إضافية هنا
                    operating_system: navigator.platform,
                });

                setVisitData(response.data); // استلام البيانات
            } catch (error) {
                setError('Error fetching visit data');
            } finally {
                setLoading(false);
            }
        };

        fetchVisitData();
    }, []); // هذا الفانكشن سيتكرر عند تحميل المكون فقط

    if (loading) {
        return <p>Loading...</p>; // عرض مؤشر التحميل
    }

    if (error) {
        return <p>{error}</p>; // عرض رسالة الخطأ
    }

    return (
        <div>
            <h1>Visit Data</h1>
            <pre>{JSON.stringify(visitData, null, 2)}</pre> {/* عرض البيانات */}
        </div>
    );
};

export default UserVisitTracker;