// src/VisitorMap.js
import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Select from 'react-select';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import './VisitorMap.css'; // ملف CSS لتحسين المظهر
import { countriesData } from './data'; // تأكد من مسار ملف البيانات

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

const VisitorMap = () => {
    const [selectedCountry, setSelectedCountry] = useState('ALL');
    const [selectedCity, setSelectedCity] = useState('ALL');
    const [zoom, setZoom] = useState(1);
    const [center, setCenter] = useState([0, 20]); // مركز الخريطة الافتراضي
    const [languageDirection, setLanguageDirection] = useState('rtl'); // rtl للغة العربية، ltr للغة الإنجليزية

    // إعداد خيارات القوائم المنسدلة
    const countryOptions = [
        { value: 'ALL', label: 'All' },
        ...countriesData.map(country => ({
            value: country.code,
            label: `${country.name} (${country.totalVisitors} زائر)` // إضافة عدد الزوار
        }))
    ];

    const getCityOptions = (country) => {
        if (country === 'ALL') return [];
        const countryData = countriesData.find(c => c.code === country);
        const cities = Object.keys(countryData.regions);
        return [
            { value: 'ALL', label: 'All' },
            ...cities.map(city => ({
                value: city,
                label: `${city} (${countryData.regions[city].visitors} زائر)`
            }))
        ];
    };

    // التعامل مع تغيير الدولة
    const handleCountryChange = (selected) => {
        setSelectedCountry(selected.value);
        setSelectedCity('ALL');
        if (selected.value === 'ALL') {
            setZoom(1);
            setCenter([0, 20]);
        } else {
            const countryData = countriesData.find(country => country.code === selected.value);
            const firstCity = Object.keys(countryData.regions)[0];
            const firstCityData = countryData.regions[firstCity];
            setZoom(1.5);
            setCenter([firstCityData.lng, firstCityData.lat]);
        }
    };

    // التعامل مع تغيير المدينة
    const handleCityChange = (selected) => {
        setSelectedCity(selected.value);
        if (selected.value === 'ALL') {
            const countryData = countriesData.find(country => country.code === selectedCountry);
            const firstCity = Object.keys(countryData.regions)[0];
            const firstCityData = countryData.regions[firstCity];
            setZoom(1.5);
            setCenter([firstCityData.lng, firstCityData.lat]);
        } else {
            const countryData = countriesData.find(country => country.code === selectedCountry);
            const cityData = countryData.regions[selected.value];
            setZoom(4);
            setCenter([cityData.lng, cityData.lat]);
        }
    };

    // إعداد النقاط للعرض
    const getMarkers = () => {
        if (selectedCountry === 'ALL') {
            // عرض جميع الدول
            return countriesData.map(country => ({
                coordinates: [country.regions[Object.keys(country.regions)[0]].lng, country.regions[Object.keys(country.regions)[0]].lat],
                visitors: country.totalVisitors,
                label: country.name,
                level: 'country'
            }));
        } else {
            const countryData = countriesData.find(country => country.code === selectedCountry);
            if (selectedCity === 'ALL') {
                // عرض جميع المدن في الدولة
                return Object.entries(countryData.regions).map(([city, data]) => ({
                    coordinates: [data.lng, data.lat],
                    visitors: data.visitors,
                    label: city,
                    level: 'city'
                }));
            } else {
                // عرض جميع المناطق في المدينة المحددة
                const cityData = countryData.regions[selectedCity];
                return Object.entries(cityData.areas).map(([area, data]) => ({
                    coordinates: [data.lng, data.lat],
                    visitors: data.visitors,
                    label: area,
                    level: 'area'
                }));
            }
        }
    };

    // رسم حدود المدينة المختارة
    const renderBoundaries = () => {
        if (selectedCity !== 'ALL' && selectedCountry !== 'ALL') {
            const countryData = countriesData.find(country => country.code === selectedCountry);
            const cityData = countryData.regions[selectedCity];
            if (cityData.boundaries) {
                const path = cityData.boundaries.map(({ lng, lat }) => `${lng},${lat}`).join(' L ') + ' Z';
                return (
                    <g>
                        <path
                            d={`M ${path}`}
                            fill="none"
                            stroke="#FF5733"
                            strokeWidth={2}
                        />
                    </g>
                );
            }
        }
        return null;
    };

    // تحديد لون الدبوس بناءً على المستوى
    const getMarkerColor = (level) => {
        switch (level) {
            case 'country':
                return '#FF5733'; // لون الدولة
            case 'city':
                return '#33FF57'; // لون المدينة
            case 'area':
                return '#3357FF'; // لون المنطقة
            default:
                return '#FF5733';
        }
    };

    // تحديد حجم الدبوس بناءً على عدد الزوار وتجنب التداخل
    const getMarkerSize = (level, visitors) => {
        switch (level) {
            case 'country':
                return 15; // حجم ثابت للدول
            case 'city':
                return 10; // حجم ثابت للمدن
            case 'area':
                return 5; // حجم ثابت للمناطق
            default:
                return 10;
        }
    };

    // الحصول على معلومات المناطق عند الزوم
    const getRegionDetails = () => {
        if (selectedCity !== 'ALL' && selectedCountry !== 'ALL') {
            const countryData = countriesData.find(country => country.code === selectedCountry);
            const cityData = countryData.regions[selectedCity];
            return Object.entries(cityData.areas).map(([area, data], index) => ({
                name: area,
                visitors: data.visitors,
                color: getMarkerColor('area')
            }));
        }
        return [];
    };

    // تحديد موقع النص بناءً على اتجاه اللغة
    const getTextAnchor = () => {
        return languageDirection === 'rtl' ? 'end' : 'start';
    };

    return (
        <div className="visitor-map-container">
            <h2>إحصائيات الزوار حسب الدول والمناطق</h2>

            <div className="selectors">
                <Select
                    options={countryOptions}
                    onChange={handleCountryChange}
                    placeholder="اختر دولة"
                    className="select-dropdown"
                    isSearchable
                    defaultValue={{ value: 'ALL', label: 'All' }}
                />

                {selectedCountry !== 'ALL' && (
                    <Select
                        options={getCityOptions(selectedCountry)}
                        onChange={handleCityChange}
                        placeholder="اختر مدينة"
                        className="select-dropdown"
                        isSearchable
                        defaultValue={{ value: 'ALL', label: 'All' }}
                    />
                )}
            </div>

            <div className="map-and-info">
                <ComposableMap projection="geoMercator" projectionConfig={{ scale: 150 }}>
                    <ZoomableGroup
                        zoom={zoom}
                        center={center}
                        onMoveEnd={({ zoom, center }) => {
                            setZoom(zoom);
                            setCenter(center);
                        }}
                    >
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const countryData = countriesData.find(country => country.code === geo.properties.ISO_A2);
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={countryData ? 'rgba(75, 192, 192, 0.6)' : '#D6D6DA'}
                                            stroke="#FFFFFF"
                                            onClick={() => {
                                                if (countryData) {
                                                    handleCountryChange({ value: countryData.code, label: countryData.name });
                                                }
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                        {getMarkers().map((marker, index) => (
                            <Marker key={index} coordinates={marker.coordinates}>
                                <FaMapMarkerAlt
                                    size={getMarkerSize(marker.level, marker.visitors)}
                                    color={getMarkerColor(marker.level)}
                                />
                                <text
                                    textAnchor={getTextAnchor()} // تحديد موقع النص بناءً على اتجاه اللغة
                                    x={languageDirection === 'rtl' ? -10 : 10} // وضع النص على اليسار أو اليمين
                                    y={-10}
                                    style={{
                                        fontSize: marker.level === 'area' ? '8px' : '8px', // حجم خط مناسب
                                        fill: '#000',
                                        pointerEvents: 'none',
                                        whiteSpace: 'nowrap',
                                        background: 'rgba(255, 255, 255, 0.7)',
                                        padding: '2px',
                                        borderRadius: '4px',
                                    }}
                                >
                                    {marker.label}: {marker.visitors}
                                </text>
                            </Marker>
                        ))}

                        {/* إضافة حدود للمدينة المختارة */}
                        {renderBoundaries()}
                    </ZoomableGroup>
                </ComposableMap>

                {/* لوحة معلومات داخل الخريطة */}
                <div className={`info-container ${languageDirection}`}>
                    {selectedCountry === 'ALL' && (
                        <div>
                            <h3>الدول</h3>
                            <ul>
                                {countriesData.map((country, index) => (
                                    <li key={index}>
                                        <FaMapMarkerAlt color={getMarkerColor('country')} />
                                        <span className="info-label">{country.name}</span>: <span className="info-visitors">{country.totalVisitors} زائر</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {selectedCountry !== 'ALL' && selectedCity === 'ALL' && (
                        <div>
                            <h3>المدن في {countriesData.find(c => c.code === selectedCountry).name}</h3>
                            <ul>
                                {Object.entries(countriesData.find(c => c.code === selectedCountry).regions).map(([city, data], index) => (
                                    <li key={index}>
                                        <FaMapMarkerAlt color={getMarkerColor('city')} />
                                        <span className="info-label">{city}</span>: <span className="info-visitors">{data.visitors} زائر</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {selectedCity !== 'ALL' && selectedCountry !== 'ALL' && (
                        <div>
                            <h3>المناطق في {selectedCity}</h3>
                            <ul>
                                {getRegionDetails().map((region, index) => (
                                    <li key={index}>
                                        <FaMapMarkerAlt color={region.color} />
                                        <span className="info-label">{region.name}</span>: <span className="info-visitors">{region.visitors} زائر</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VisitorMap;