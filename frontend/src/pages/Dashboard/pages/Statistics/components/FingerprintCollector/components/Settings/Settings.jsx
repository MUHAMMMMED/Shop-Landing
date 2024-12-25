// src/components/Settings.jsx
import React from 'react';

const Settings = ({ mode, onModeChange }) => {
    return (
        <div className="settings">
            <label>حدد وضع جمع البيانات:</label>
            <select value={mode} onChange={(e) => onModeChange(e.target.value)}>
                <option value="auto">جمع تلقائي للبيانات</option>
                <option value="manual">إظهار نافذة الموافقة</option>
                <option value="disabled">تعطيل جمع البيانات</option>
            </select>
        </div>
    );
};

export default Settings;