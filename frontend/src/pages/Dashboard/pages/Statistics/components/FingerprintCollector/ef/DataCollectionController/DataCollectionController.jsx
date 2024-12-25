// src/components/DataCollectionController.jsx
import React from 'react';

const DataCollectionController = ({ onModeChange }) => {
    return (
        <div>
            <h1>إعدادات جمع البيانات</h1>
            <button onClick={() => onModeChange('collect_with_consent')}>
                جمع البيانات مع طلب إذن
            </button>
            <button onClick={() => onModeChange('collect_without_consent')}>
                جمع البيانات بدون إذن
            </button>
            <button onClick={() => onModeChange('disabled')}>
                تعطيل جمع البيانات
            </button>
        </div>
    );
};

export default DataCollectionController;


