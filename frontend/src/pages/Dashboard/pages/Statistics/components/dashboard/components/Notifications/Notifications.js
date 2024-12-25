import React from 'react';
import './Notifications.css';

const Notifications = () => {
    return (
        <div className="notifications">
            <h2>الإشعارات</h2>
            <ul>
                <li>إشعار 1: تم تحديث البيانات بنجاح.</li>
                <li>إشعار 2: لديك رسالة جديدة.</li>
            </ul>
        </div>
    );
};

export default Notifications;