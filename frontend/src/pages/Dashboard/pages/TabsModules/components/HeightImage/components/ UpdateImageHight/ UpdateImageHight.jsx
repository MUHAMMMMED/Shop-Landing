

import React, { useEffect, useState } from 'react';
import { FaMobileAlt } from 'react-icons/fa';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { IoDesktopSharp } from 'react-icons/io5';
import { MdOutlineTabletMac } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AxiosInstance from '../../../../../../../../Authentication/AxiosInstance';
import Config from '../../../../../../../../components/config';
import DasHeader from '../../../../../../components/DasHeader/DasHeader';
import Sidebar from '../../../../../../components/Sidebar/Sidebar';
import { IconButton, SectionTypeContainer } from './DetalisStyles';

const UpdateImageHight = () => {
    const navigate = useNavigate();
    const { page_id, section_id, imageId } = useParams();

    // State for form data
    const [formData, setFormData] = useState({
        themes_desktop_Types: 'simple',
        themes_tablet_Types: 'simple',
        themes_mobile_Types: 'simple',
        is_mobile: true,
        is_tablet: true,
        is_desktop: true,
        web: null,
        mobile: null,
    });

    const [imagePreview, setImagePreview] = useState({
        web: formData.web,
        mobile: formData.mobile,
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [language, setLanguage] = useState('en');
    const [deviceType, setDeviceType] = useState('desktop');
    const [error, setError] = useState('');

    const updateLanguage = (newLanguage) => setLanguage(newLanguage);
    const handleDeviceChange = (type) => setDeviceType(type);

    // Fetch existing data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosInstance.get(
                    `${Config.baseURL}/api/content/image_hight/${imageId}/`
                );
                const data = response.data;
                setFormData({
                    themes_desktop_Types: data.themes_desktop_Types,
                    themes_tablet_Types: data.themes_tablet_Types,
                    themes_mobile_Types: data.themes_mobile_Types,
                    is_mobile: data.is_mobile,
                    is_tablet: data.is_tablet,
                    is_desktop: data.is_desktop,
                    web: null,
                    mobile: null,
                });
                setImagePreview({
                    web: data.web,
                    mobile: data.mobile,
                });
            } catch (err) {
                console.error(err);
                setError('Failed to fetch data');
            }
        };

        fetchData();
    }, [imageId]);



    const handleChange = (e) => {
        const { name, type, files, value } = e.target;

        if (type === 'file') {
            const file = files[0];

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview((prev) => ({
                    ...prev,
                    [name]: reader.result, // تحديث البريفيو بالصورة المحملة
                }));
            };
            reader.readAsDataURL(file); // قراءة الصورة كـ URL وعرضها في البريفيو
            setFormData((prev) => ({ ...prev, [name]: file }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const uploadData = new FormData();

        // إضافة أنواع المواضيع وحالة الأجهزة
        uploadData.append('themes_desktop_Types', formData.themes_desktop_Types);
        uploadData.append('themes_tablet_Types', formData.themes_tablet_Types);
        uploadData.append('themes_mobile_Types', formData.themes_mobile_Types);
        uploadData.append('is_mobile', formData.is_mobile);
        uploadData.append('is_tablet', formData.is_tablet);
        uploadData.append('is_desktop', formData.is_desktop);

        // التعامل مع صورة الويب الجديدة
        if (formData.web instanceof File) {
            // إذا كانت صورة جديدة تم تحميلها
            uploadData.append('web', formData.web);
        } else if (imagePreview.web) {

        }

        // التعامل مع صورة الموبايل الجديدة
        if (formData.mobile instanceof File) {
            // إذا كانت صورة جديدة تم تحميلها
            uploadData.append('mobile', formData.mobile);
        } else if (imagePreview.mobile) {

        }

        try {
            // إرسال الطلب إلى الخادم
            const response = await AxiosInstance.put(
                `${Config.baseURL}/api/content/image_hight/${imageId}/`,
                uploadData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            console.log('Response:', response.data);
            setSuccessMessage('ImageHight Updated Successfully!');
            setError('');
        } catch (err) {
            console.error('Error:', err.response?.data || err);
            setError('Failed to update ImageHight');
        }
    };


    return (
        <>
            <DasHeader language={language} updateLanguage={updateLanguage} />
            <div className={`dashboard ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                <Sidebar language={language} />
                <main className={`content ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                    <div className="create-product">
                        <header className="create-header">
                            <h1>
                                <Link to={`/modules/${page_id}/${section_id}/`}>
                                    <button className="add-product-btn">
                                        {language === 'ar' ? <HiArrowRight /> : <HiArrowLeft />}
                                    </button>
                                </Link>
                                {language === 'ar' ? 'إنشاء شريط تمرير' : 'Create Slider'}
                            </h1>
                            <button className="add-product-btn" onClick={handleSubmit}>
                                {language === 'en' ? 'Save' : 'حفظ'}
                            </button>
                        </header>

                        <form className="product-form">
                            <div className="Product-section Product-section-one">
                                <div className="Product-section-row">
                                    <h2 style={{ color: '#000' }}>
                                        {language === 'en' ? 'General Information' : 'معلومات عامة'}
                                    </h2>
                                    <br />
                                </div>

                                <div className="Product-section-row">
                                    <div className="upload-box">
                                        <h2 style={{ color: '#000' }}>
                                            {language === 'en' ? 'Upload Images' : 'تحميل الصور'}
                                        </h2>
                                        <label htmlFor="upload-web">
                                            <input
                                                id="upload-web"
                                                name="web"
                                                type="file"
                                                onChange={handleChange}
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                            />
                                            <span>{language === 'en' ? 'Click to upload' : 'اضغط للتحميل'} Web Image</span>
                                            <span>SVG, PNG, JPG, or GIF (MAX. 800x400px)</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="Product-section-row">
                                    {imagePreview.web ? (
                                        <div className="image-preview" style={{ height: 'auto' }}>
                                            <img
                                                src={imagePreview.web}
                                                alt="Web Preview"
                                                style={{
                                                    maxWidth: '100%',
                                                    height: 'auto',
                                                    borderRadius: '8px',
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <p>{language === 'en' ? 'No images uploaded yet.' : 'لم يتم تحميل أي صور حتى الآن.'}</p>
                                    )}
                                </div>

                                <div className="Product-section-row">
                                    <div className="upload-box">
                                        <h2 style={{ color: '#000' }}>
                                            {language === 'en' ? 'Upload Images' : 'تحميل الصور'}
                                        </h2>
                                        <label htmlFor="upload-mobile">
                                            <input
                                                id="upload-mobile"
                                                name="mobile"
                                                type="file"
                                                onChange={handleChange}
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                            />
                                            <span>{language === 'en' ? 'Click to upload' : 'اضغط للتحميل'} Mobile Image</span>
                                            <span>SVG, PNG, JPG, or GIF (MAX. 800x400px)</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="Product-section-row">
                                    {imagePreview.mobile ? (
                                        <div className="image-preview" style={{ height: 'auto' }}>
                                            <img
                                                src={imagePreview.mobile}
                                                alt="Mobile Preview"
                                                style={{
                                                    maxWidth: '100%',
                                                    height: 'auto',
                                                    borderRadius: '8px',
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <p>{language === 'en' ? 'No images uploaded yet.' : 'لم يتم تحميل أي صور حتى الآن.'}</p>
                                    )}
                                </div>

                                <div className="Product-section-row">
                                    <div className="type-device-container">
                                        <label>
                                            {language === 'en' ? 'Choose Device Type' : 'اختار نوع الجهاز'}
                                        </label>

                                        <SectionTypeContainer>
                                            <IconButton
                                                onClick={() => handleDeviceChange('desktop')}
                                                data-tooltip={language === 'en' ? 'Desktop' : 'ديسكتوب'}
                                                aria-label="Desktop View"
                                            >
                                                <IoDesktopSharp />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleDeviceChange('tablet')}
                                                data-tooltip={language === 'en' ? 'Tablet' : 'تابلت'}
                                                aria-label="Tablet View"
                                            >
                                                <MdOutlineTabletMac />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleDeviceChange('mobile')}
                                                data-tooltip={language === 'en' ? 'Mobile' : 'موبايل'}
                                                aria-label="Mobile View"
                                            >
                                                <FaMobileAlt />
                                            </IconButton>
                                        </SectionTypeContainer>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
};

export default UpdateImageHight;