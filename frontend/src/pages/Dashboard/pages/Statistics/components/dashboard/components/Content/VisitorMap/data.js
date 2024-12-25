// src/data.js
export const countriesData = [
    {
        name: 'مصر',
        code: 'EG',
        totalVisitors: 280, // إجمالي زوار مصر
        regions: {
            'القاهرة': {
                visitors: 150,
                lat: 30.0444,
                lng: 31.2357,
                areas: {
                    'منطقة1': { visitors: 40, lat: 30.0500, lng: 31.2400 },
                    'منطقة2': { visitors: 30, lat: 30.0300, lng: 31.2200 },
                    'منطقة3': { visitors: 80, lat: 30.0400, lng: 31.2300 },
                }
            },
            'الإسكندرية': {
                visitors: 80,
                lat: 31.2156,
                lng: 29.9553,
                boundaries: [
                    { lat: 31.2001, lng: 29.9003 },
                    { lat: 31.2001, lng: 30.0103 },
                    { lat: 31.2301, lng: 30.0103 },
                    { lat: 31.2301, lng: 29.9003 },
                ],
                areas: {
                    'منطقة1': { visitors: 30, lat: 31.2156, lng: 29.9553 },
                    'منطقة2': { visitors: 25, lat: 31.2200, lng: 29.9600 },
                    'منطقة3': { visitors: 25, lat: 31.2100, lng: 29.9500 },
                }
            },
            'الجيزة': {
                visitors: 50,
                lat: 29.9753,
                lng: 31.1376,
                areas: {
                    'منطقة1': { visitors: 20, lat: 29.9800, lng: 31.1400 },
                    'منطقة2': { visitors: 30, lat: 29.9700, lng: 31.1300 },
                }
            },
        },
    },
    {
        name: 'السعودية',
        code: 'SA',
        totalVisitors: 200, // إجمالي زوار السعودية
        regions: {
            'الرياض': {
                visitors: 120,
                lat: 24.7136,
                lng: 46.6753,
                areas: {
                    'منطقة1': { visitors: 50, lat: 24.7200, lng: 46.6800 },
                    'منطقة2': { visitors: 70, lat: 24.7000, lng: 46.6600 },
                }
            },
            'جدة': {
                visitors: 80,
                lat: 21.2854,
                lng: 39.2376,
                areas: {
                    'منطقة1': { visitors: 40, lat: 21.2900, lng: 39.2400 },
                    'منطقة2': { visitors: 40, lat: 21.2800, lng: 39.2300 },
                }
            },
        },
    },
    {
        name: 'الإمارات',
        code: 'AE',
        totalVisitors: 160, // إجمالي زوار الإمارات
        regions: {
            'دبي': {
                visitors: 90,
                lat: 25.276987,
                lng: 55.296249,
                areas: {
                    'منطقة1': { visitors: 30, lat: 25.2800, lng: 55.2900 },
                    'منطقة2': { visitors: 60, lat: 25.2700, lng: 55.3000 },
                }
            },
            'أبوظبي': {
                visitors: 70,
                lat: 24.4539,
                lng: 54.3773,
                areas: {
                    'منطقة1': { visitors: 40, lat: 24.4600, lng: 54.3800 },
                    'منطقة2': { visitors: 30, lat: 24.4500, lng: 54.3700 },
                }
            },
        },
    },
    {
        name: 'تركيا',
        code: 'TR',
        totalVisitors: 160, // إجمالي زوار تركيا
        regions: {
            'إسطنبول': {
                visitors: 100,
                lat: 41.0082,
                lng: 28.9784,
                areas: {
                    'منطقة1': { visitors: 40, lat: 41.0100, lng: 28.9800 },
                    'منطقة2': { visitors: 30, lat: 41.0050, lng: 28.9850 },
                    'منطقة3': { visitors: 30, lat: 41.0150, lng: 28.9750 },
                }
            },
            'أنقرة': {
                visitors: 60,
                lat: 39.9334,
                lng: 32.8597,
                areas: {
                    'منطقة1': { visitors: 30, lat: 39.9300, lng: 32.8600 },
                    'منطقة2': { visitors: 30, lat: 39.9350, lng: 32.8500 },
                }
            },
        },
    },
];