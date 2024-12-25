import { useEffect, useState } from 'react';
import './CookieConsent.css'; // استيراد ملف CSS للأنماط

function CookieConsent() {
    const [showConsent, setShowConsent] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('cookie_token');
        if (!token) {
            setShowConsent(true);
        }
    }, []);

    const handleConsent = (agree) => {
        const token = agree ? 'consent' : 'skip';
        localStorage.setItem('cookie_token', token);
        setShowConsent(false);
    };

    return (
        showConsent && (
            <div className="cookie-consent">
                <p>نحن نستخدم الكوكيز لتحسين تجربتك. هل توافق على ذلك؟</p>
                <div className="buttons">
                    <button className='cookie-buttons' onClick={() => handleConsent(true)}>موافق</button>
                    <button  className='cookie-buttons' onClick={() => handleConsent(false)}>غير موافق</button>
                </div>
            </div>
        )
    );
}

export default CookieConsent;