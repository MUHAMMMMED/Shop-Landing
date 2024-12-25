 
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
    Area,
    ComposedChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const translations = {
    en: {
        filterTitle: 'Select Period',
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
        tablet: 'Tablet',
        mobile: 'Mobile',
        desktop: 'Desktop',
        chartLabel: 'Device Usage Over Time',
        totalViews: 'Total Views',
        legend: 'Device Types',
    },
    ar: {
        filterTitle: 'اختر الفترة',
        daily: 'يومي',
        weekly: 'أسبوعي',
        monthly: 'شهري',
        tablet: 'تابلت',
        mobile: 'موبايل',
        desktop: 'ديسكتوب',
        chartLabel: 'استخدام الأجهزة عبر الوقت',
        totalViews: 'إجمالي المشاهدات',
        legend: 'أنواع الأجهزة',
    },
};

const sampleData = {
    daily: [
        { day: 'Monday', mobile: 2400, desktop: 2400, tablet: 1000 },
        { day: 'Tuesday', mobile: 1398, desktop: 2210, tablet: 1200 },
        { day: 'Wednesday', mobile: 9800, desktop: 2290, tablet: 1500 },
        { day: 'Thursday', mobile: 3908, desktop: 2000, tablet: 1100 },
        { day: 'Friday', mobile: 4800, desktop: 2181, tablet: 1300 },
        { day: 'Saturday', mobile: 3800, desktop: 2500, tablet: 1400 },
        { day: 'Sunday', mobile: 4300, desktop: 2100, tablet: 1250 },
    ],
    weekly: [
        { week: 'Week 1', mobile: 4000, desktop: 2400, tablet: 2000 },
        { week: 'Week 2', mobile: 3000, desktop: 1398, tablet: 1800 },
        { week: 'Week 3', mobile: 2000, desktop: 9800, tablet: 2200 },
        { week: 'Week 4', mobile: 2780, desktop: 3908, tablet: 1900 },
    ],
    monthly: [
        { month: 'January', mobile: 4000, desktop: 2400, tablet: 2000 },
        { month: 'February', mobile: 3000, desktop: 1398, tablet: 1800 },
        { month: 'March', mobile: 2000, desktop: 9800, tablet: 2200 },
        { month: 'April', mobile: 2780, desktop: 3908, tablet: 1900 },
        { month: 'May', mobile: 1890, desktop: 4800, tablet: 2100 },
        { month: 'June', mobile: 2390, desktop: 3800, tablet: 2300 },
        { month: 'July', mobile: 3490, desktop: 4300, tablet: 2500 },
    ],
};

const CustomChart = ({ language }) => {
    const t = translations[language] || translations.en;
    const isRTL = language === 'ar';
    const [period, setPeriod] = useState('monthly');

    const handlePeriodChange = (selectedPeriod) => {
        setPeriod(selectedPeriod);
    };

    const dataKey = period === 'daily' ? 'day' : period === 'weekly' ? 'week' : 'month';
    const translatedData = sampleData[period].map((item) => ({
        [dataKey]: item[dataKey],
        mobile: item.mobile,
        desktop: item.desktop,
        tablet: item.tablet,
        totalViews: item.mobile + item.desktop + item.tablet, // حساب إجمالي المشاهدات
    }));

    const buttonStyle = (selected) => ({
        padding: '8px 12px',
        margin: '0 5px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: selected ? '#8884d8' : '#e0e0e0',
        color: selected ? '#ffffff' : '#333333',
        transition: 'background-color 0.3s',
        fontSize: '14px',
    });

    const legendItemStyle = {
        display: 'flex',
        alignItems: 'center',
        margin: '0 10px',
        padding: '0 5px',
    };

    const legendDotStyle = (color) => ({
        width: '10px',
        height: '10px',
        backgroundColor: color,
        borderRadius: '50%',
        marginRight: '5px',
    });

    return (
        <div
            style={{
                direction: isRTL ? 'rtl' : 'ltr',
                fontFamily: 'Arial, sans-serif',
                padding: '20px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
            }}
        >
            <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>{t.chartLabel}</h4>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}
            >
                <div style={{ flex: '1', textAlign: isRTL ? 'right' : 'left' }}>
                    <h4>{t.filterTitle}: {t[period]}</h4>
                </div>
                <div style={{ flex: '1', display: 'flex', justifyContent: isRTL ? 'flex-start' : 'flex-end' }}>
                    <button
                        style={buttonStyle(period === 'daily')}
                        onClick={() => handlePeriodChange('daily')}
                    >
                        {t.daily}
                    </button>
                    <button
                        style={buttonStyle(period === 'weekly')}
                        onClick={() => handlePeriodChange('weekly')}
                    >
                        {t.weekly}
                    </button>
                    <button
                        style={buttonStyle(period === 'monthly')}
                        onClick={() => handlePeriodChange('monthly')}
                    >
                        {t.monthly}
                    </button>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <ComposedChart
                    data={translatedData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <XAxis dataKey={dataKey} />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="totalViews"
                        stroke="#000" // لون الخط الإجمالي
                        strokeWidth={3} // عرض خط الإجمالي
                        activeDot={{ r: 8 }}
                        name={t.totalViews}
                    />
                    <Area
                        type="monotone"
                        dataKey="desktop"
                        stroke="#8884d8"
                        fill="#8884d8"
                        name={t.desktop}
                        fillOpacity={0.3}
                    />


                    <Line
                        type="monotone"
                        dataKey="mobile"
                        stroke="#8884d8"
                        strokeWidth={2} // عرض الخط
                        activeDot={{ r: 8 }}
                        name={t.mobile}
                    />
                    <Line
                        type="monotone"
                        dataKey="tablet"
                        stroke="#ffc658"
                        strokeWidth={2} // عرض الخط
                        activeDot={{ r: 8 }}
                        name={t.tablet}
                    />





                </ComposedChart>
            </ResponsiveContainer>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}
            >

                <div style={legendItemStyle}>
                    <div style={legendDotStyle('#8884d8')}></div>
                    <span>{t.mobile}</span>
                </div>
                <div style={legendItemStyle}>
                    <div style={legendDotStyle('#82ca9d')}></div>
                    <span>{t.desktop}</span>
                </div>
                <div style={legendItemStyle}>
                    <div style={legendDotStyle('#ffc658')}></div>
                    <span>{t.tablet}</span>
                </div>
                <div style={legendItemStyle}>
                    <div style={legendDotStyle('#000')}></div>
                    <span>{t.totalViews}</span>
                </div>
            </div>
        </div>
    );
};

CustomChart.propTypes = {
    language: PropTypes.oneOf(['en', 'ar']).isRequired,
};

export default CustomChart;