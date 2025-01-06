import React, { useState } from 'react';
import { FaMobileAlt } from 'react-icons/fa';
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { IoDesktopSharp } from 'react-icons/io5';
import { MdOutlineTabletMac } from 'react-icons/md';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AxiosInstance from '../../../../../../../../Authentication/AxiosInstance';
import Config from '../../../../../../../../components/config';
import DasHeader from '../../../../../../components/DasHeader/DasHeader';
import Sidebar from '../../../../../../components/Sidebar/Sidebar';
import Desktop from '../deviceType/Desktop/Desktop';
import Mobile from '../deviceType/Mobile/Mobile';
import Tablet from '../deviceType/Tablet/Tablet';
import { IconButton, SectionTypeContainer } from './DetalisStyles';

const CreateYouTubePlayer = () => {
    const navigate = useNavigate();
    const { page_id, section_id } = useParams();
    // State for form data

    const [formData, setFormData] = useState({
        themes_desktop_Types: 'classic',
        themes_tablet_Types: 'classic',
        themes_mobile_Types: 'classic',
        is_mobile: true,
        is_tablet: true,
        is_desktop: true,
        link: ''
    });
    const [language, setLanguage] = useState('en');
    const updateLanguage = (newLanguage) => setLanguage(newLanguage);
    const [deviceType, setDeviceType] = useState('desktop');
    const handleDeviceChange = (type) => setDeviceType(type);
    const [error, setError] = useState('');

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Assuming you're sending the request to the backend API for creating the youtube
            await AxiosInstance.post(
                `${Config.baseURL}/api/content/youtube/`, formData);
            // Reset form data after success
            setFormData({
                themes_desktop_Types: 'classic',
                themes_tablet_Types: 'classic',
                themes_mobile_Types: 'classic',
                is_mobile: true,
                is_tablet: true,
                is_desktop: true,
                video_id: ''
            });

            setError('');
            navigate(`/modules/${page_id}/${section_id}/`);
        } catch (err) {
            console.error(err);
            setError('Failed to create video player');
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
                                    </button></Link>
                                {language === 'ar' ? 'إنشاء شريط تمرير' : 'Create Slider'}
                            </h1>
                            <button className="add-product-btn" onClick={handleSubmit}>
                                {language === 'en' ? 'Save' : 'حفظ'}
                            </button>
                        </header>


                        <form className="product-form">
                            <div className="Product-section Product-section-one">
                                <div className='Product-section-row'>
                                    <h2 style={{ color: '#000' }}>{language === 'en' ? 'General Information' : 'معلومات عامة'} </h2>
                                    <br />
                                    <label>video id</label>
                                    <input
                                        type="text"
                                        name="video_id"
                                        value={formData.video_id}
                                        onChange={handleChange}
                                        placeholder="Enter the video_ id"
                                    />
                                </div>

                                <div className='Product-section-row '>
                                    <div className="type-device-container">
                                        <label>  {language === 'en' ? 'Choose Device Type' : 'اختار نوع الجهاز'}</label>

                                        <SectionTypeContainer>
                                            <IconButton
                                                onClick={() => handleDeviceChange('desktop')}
                                                data-tooltip={language === 'en' ? 'Desktop' : 'ديسكتوب'}
                                                aria-label="Desktop View"
                                                disabled={deviceType === 'desktop'}  >
                                                <IoDesktopSharp />
                                            </IconButton>

                                            <IconButton
                                                onClick={() => handleDeviceChange('tablet')}
                                                data-tooltip={language === 'en' ? 'Tablet' : 'تابلت'}
                                                aria-label="Tablet View"
                                                disabled={deviceType === 'tablet'} >
                                                <MdOutlineTabletMac />
                                            </IconButton>

                                            <IconButton
                                                onClick={() => handleDeviceChange('mobile')}
                                                data-tooltip={language === 'en' ? 'Mobile' : 'موبايل'}
                                                aria-label="Mobile View"
                                                disabled={deviceType === 'mobile'} >

                                                <FaMobileAlt />
                                            </IconButton>
                                        </SectionTypeContainer>


                                        <div style={{ width: '100%', marginTop: '5px' }}>
                                            {/* Dynamic rendering for themes based on deviceType    */}
                                            {(() => {
                                                switch (deviceType) {
                                                    case 'mobile':
                                                        return (
                                                            <>
                                                                <div className='Product-section-row'>
                                                                    <label>
                                                                        {language === 'en' ? 'Themes Mobile' : 'تصميم الهاتف'}
                                                                    </label>
                                                                    <select
                                                                        name="themes_mobile_Types"
                                                                        value={formData.themes_mobile_Types}
                                                                        onChange={handleChange}
                                                                    >
                                                                        <option value="">{language === 'en' ? 'Select Themes' : 'اختر التصميم'}</option>
                                                                        <option value="classic">{language === 'en' ? 'Classic' : 'كلاسيك'}</option>
                                                                        <option value="simple">{language === 'en' ? 'Simple' : 'بسيط'}</option>
                                                                        <option value="modern">{language === 'en' ? 'Modern' : 'حديث'}</option>
                                                                    </select>
                                                                    {/* {errors.themes_mobile_Types && <p className="error">{errors.themes_mobile_Types}</p>} */}
                                                                </div>
                                                                <Mobile selected_Device="mobile"
                                                                // themes_Types={product.themes_mobile_Types} 
                                                                />;
                                                            </>
                                                        );

                                                    case 'tablet':
                                                        return (
                                                            <>
                                                                <div className='Product-section-row'>
                                                                    <label>
                                                                        {language === 'en' ? 'Themes Tablet' : 'تصميم التابلت'}
                                                                    </label>
                                                                    <select
                                                                        name="themes_tablet_Types"
                                                                        value={formData.themes_tablet_Types}
                                                                        onChange={handleChange}
                                                                    >
                                                                        <option value="">{language === 'en' ? 'Select Themes' : 'اختر التصميم'}</option>
                                                                        <option value="classic">{language === 'en' ? 'Classic' : 'كلاسيك'}</option>
                                                                        <option value="simple">{language === 'en' ? 'Simple' : 'بسيط'}</option>
                                                                        <option value="modern">{language === 'en' ? 'Modern' : 'حديث'}</option>
                                                                    </select>
                                                                    {/* {errors.themes_tablet_Types && <p className="error">{errors.themes_tablet_Types}</p>} */}

                                                                </div>
                                                                <Tablet selected_Device="tablet"
                                                                // themes_Types={product.themes_tablet_Types} 
                                                                />
                                                            </>
                                                        );

                                                    case 'desktop':
                                                        return (
                                                            <>
                                                                <div className='Product-section-row'>
                                                                    <label>

                                                                        {language === 'en' ? 'Themes Desktop' : ''}
                                                                    </label>
                                                                    <select
                                                                        name="themes_desktop_Types"
                                                                        value={formData.themes_desktop_Types}
                                                                        onChange={handleChange}
                                                                    >
                                                                        <option value="">{language === 'en' ? 'Select Themes' : 'اختر التصميم'}</option>
                                                                        <option value="classic">{language === 'en' ? 'Classic' : 'كلاسيك'}</option>
                                                                        <option value="simple">{language === 'en' ? 'Simple' : 'بسيط'}</option>
                                                                        <option value="modern">{language === 'en' ? 'Modern' : 'حديث'}</option>
                                                                    </select>
                                                                    {/* {errors.themes_desktop_Types && <p className="error">{errors.themes_desktop_Types}</p>} */}
                                                                </div>

                                                                <Desktop selected_Device="desktop"
                                                                // themes_Types={product.themes_desktop_Types}

                                                                />
                                                            </>
                                                        );

                                                    default:
                                                        return null;
                                                }
                                            })()}

                                        </div></div></div></div>



                            <div className="Product-section Product-section-two ">

                                <div className='Product-section-row '>

                                    <label>{language === 'en' ? 'Is Active mobile' : 'Is Active mobile'}__
                                        <input
                                            type="checkbox"
                                            name="is_mobile"
                                            checked={formData.is_mobile}
                                            onChange={handleChange}
                                        />
                                    </label>  </div>
                                <div className='Product-section-row '>
                                    <label>{language === 'en' ? 'Is Active tablet' : 'Is Active tablet'}__


                                        <input
                                            type="checkbox"
                                            name="is_tablet"
                                            checked={formData.is_tablet}
                                            onChange={handleChange}
                                        />
                                    </label>  </div>
                                <div className='Product-section-row '>
                                    <label>{language === 'en' ? 'Is Active desktop' : 'Is Active desktop'}__
                                        <input
                                            type="checkbox"
                                            name="is_desktop"
                                            checked={formData.is_desktop}
                                            onChange={handleChange}
                                        />
                                    </label>

                                </div>

                            </div>
                        </form >
                    </div >
                </main >
            </div >
        </>
    );
};

export default CreateYouTubePlayer;
