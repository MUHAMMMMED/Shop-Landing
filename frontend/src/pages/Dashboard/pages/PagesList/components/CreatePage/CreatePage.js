import React, { useState } from 'react';
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../../../../Authentication/AxiosInstance';
import Config from '../../../../../../components/config';
import DasHeader from '../../../../components/DasHeader/DasHeader';
import Sidebar from '../../../../components/Sidebar/Sidebar';
import CampaignLinks from '../../../Products/components/CreateProduct/CampaignLinks/CampaignLinks';

const CreatePage = () => {
    const navigate = useNavigate();
    const [language, setLanguage] = useState('en');
    const updateLanguage = (newLanguage) => setLanguage(newLanguage);
    const [Data, setData] = useState({
        title: '',
        description: '',
        keywords: [],
        image: null,
    });

    const [currentTag, setCurrentTag] = useState('');
    const [imageCardPreview, setImageCardPreview] = useState(null);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const addTag = () => {
        if (currentTag && !Data.keywords.includes(currentTag)) {
            setData((prev) => ({
                ...prev,
                keywords: [...prev.keywords, currentTag],
            }));
            setCurrentTag('');
        } else {
            alert('Tag is already added or empty!');
        }
    };

    const removeTag = (tagToRemove) => {
        setData((prev) => ({
            ...prev,
            keywords: prev.keywords.filter((tag) => tag !== tagToRemove),
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setData((prev) => ({ ...prev, image: file }));

        // Create an image preview
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImageCardPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const formErrors = {};
        if (!Data.title.trim()) {
            formErrors.title = language === 'ar' ? 'اسم المنتج مطلوب.' : 'Product name is required.';
        }
        if (!Data.description.trim()) {
            formErrors.description = language === 'ar' ? 'وصف المنتج مطلوب.' : 'Product description is required.';
        }
        if (Data.keywords.length === 0) {
            formErrors.keywords = language === 'ar' ? 'يجب إضافة كلمة مفتاحية واحدة على الأقل.' : 'At least one keyword is required.';
        }
        if (!Data.image) {
            formErrors.image = language === 'ar' ? 'الصورة الرئيسية مطلوبة.' : 'Main image is required.';
        }
        return formErrors;
    };



    const handleSubmit = async () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const formData = new FormData();
        formData.append('title', Data.title);
        formData.append('description', Data.description);
        formData.append('keywords', Data.keywords.join(','));
        formData.append('image', Data.image);

        try {
            const response = await AxiosInstance.post(`${Config.baseURL}/api/content/pages/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data?.id) {
                navigate(`/Page/${response.data.id}`);
            } else {
                console.error('ID not found in the response:', response);
            }
        } catch (error) {
            console.error('Error submitting page:', error);
        }
    };
    const links = [
        { platform: 'influencer', url: 'https://www.snapchat.com/@examplecampaign' },
        { platform: 'facebook', url: 'https://www.facebook.com/examplecampaign' },
        { platform: 'instagram', url: 'https://www.instagram.com/examplecampaign' },
        { platform: 'twitter', url: 'https://www.twitter.com/examplecampaign' },
        { platform: 'tiktok', url: 'https://www.tiktok.com/@examplecampaign' },
        { platform: 'google', url: 'https://www.google.com/@examplecampaign' },
        { platform: 'snapchat', url: 'https://www.snapchat.com/@examplecampaign' },
        { platform: 'youtube', url: 'https://www.youtube.com/@examplecampaign' },
        { platform: 'pinterest', url: 'https://www.youtube.com/@examplecampaign' },
        { platform: 'other', url: 'https://www.snapchat.com/@examplecampaign' },
    ];

    return (
        <>
            <DasHeader language={language} updateLanguage={updateLanguage} />
            <div className={`dashboard ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                <Sidebar language={language} />
                <main className={`content ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                    <div className="create-product">
                        <header className="create-header">
                            <h1>
                                <Link to={'/pages'}>
                                    <button className="add-product-btn">
                                        {language === 'ar' ? <HiArrowRight /> : <HiArrowLeft />}
                                    </button></Link>

                                {language === 'ar' ? 'إنشاء صفحة' : 'Create Page'}
                            </h1>
                            <button className="add-product-btn" onClick={handleSubmit}>
                                {language === 'en' ? 'Save' : 'حفظ'}
                            </button>
                        </header>

                        <form className="product-form">
                            <div className="Product-section Product-section-one">
                                <div className='Product-section-row'>
                                    <h2 style={{ color: '#000' }}>{language === 'en' ? 'General Information' : 'معلومات عامة'} </h2>

                                    <label>{language === 'en' ? 'Page Name' : 'اسم الصفحة'}</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={Data.title}
                                        onChange={handleInputChange}
                                        placeholder={language === 'en' ? 'Page Name' : 'اسم الصفحة'}
                                    />
                                    {errors.title && <p className="error">{errors.title}</p>}

                                    <label>{language === 'en' ? 'Page Description' : 'وصف الصفحة'}</label>
                                    <textarea
                                        name="description"
                                        value={Data.description}
                                        onChange={handleInputChange}
                                        placeholder={language === 'en' ? 'Page Description' : 'وصف الصفحة'}
                                    />
                                    {errors.description && <p className="error">{errors.description}</p>}

                                </div>
                                <div className='Product-section-row'>
                                    <label>{language === 'en' ? 'Keywords' : 'الكلمات المفتاحية'}</label>
                                    <div className='Tags'>
                                        <div className='Tags-input'>

                                            <input
                                                type="text"
                                                value={currentTag}
                                                onChange={(e) => setCurrentTag(e.target.value)}
                                                placeholder=
                                                {language === 'en' ? 'Add a keyword' : 'أضف كلمة مفتاحية'}

                                            />
                                        </div>
                                        <div className="  Tags-btn" >
                                            <div onClick={addTag} className="add-product-btn"  >
                                                {language === 'en' ? 'Add' : 'أضف'} </div>

                                        </div></div>
                                </div>

                                <div className='Product-section-row' >
                                    <div className='image-preview' style={{ height: 'auto', padding: '5px' }}>
                                        {Data.keywords.length > 0 ? (
                                            Data.keywords.map((tag, index) => (
                                                <p className='tagify__tag' key={index}>
                                                    {tag} <span className='tagify__x' onClick={() => removeTag(tag)}>x</span>
                                                </p>
                                            ))
                                        ) : (
                                            <p>{language === 'en' ? 'No keywords yet.' : 'لا توجد كلمات مفتاحية بعد.'} </p>
                                        )}
                                    </div>

                                </div>
                            </div>
                            <div className="Product-section Product-section-two ">
                                {errors.image && <p className="error">{errors.image}</p>}
                                <div className='Product-section-row '>
                                    <div className="upload-box">
                                        {/* Display the uploaded image preview */}
                                        <>
                                            <h2 style={{ color: '#000' }}>
                                                {language === 'en' ? 'Upload Images' : 'تحميل الصور'}
                                            </h2>
                                            <label htmlFor="upload">
                                                <input
                                                    id="upload"
                                                    type="file"
                                                    onChange={handleImageChange}
                                                    accept=".png, .jpg, .jpeg, .gif"
                                                    style={{ display: 'none' }} // Hide the input for better UX
                                                />
                                                <span>
                                                    {language === 'en' ? 'Click to upload' : 'اضغط للتحميل'}

                                                    {/* or drag and drop */}
                                                </span>
                                                <span>SVG, PNG, JPG, or GIF (MAX. 800x400px)</span>
                                            </label>
                                        </>

                                    </div>
                                </div>

                                <>
                                    <div className='Product-section-row '>
                                        {imageCardPreview ? (
                                            <div className='image-preview' style={{ height: 'auto' }}>
                                                <img
                                                    src={imageCardPreview}
                                                    alt="  Preview"
                                                    style={{
                                                        maxWidth: '100%',
                                                        height: 'auto',
                                                        borderRadius: '8px',
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <p>
                                                {language === 'en' ? 'No images uploaded yet.' : 'لم يتم تحميل أي صور حتى الآن.'}
                                            </p>
                                        )}
                                    </div>




                                    <div className='Product-section-row '>
                                        <h3>
                                            {language === 'en' ? 'Ads link Information' : 'معلومات رابط الإعلان'}
                                        </h3>


                                        <br />
                                        <label>{language === 'en' ? 'Campaign Source (e.g., facebook, twitter, google)' : 'مصدر الحملة (مثل facebook, twitter, google)'}</label>
                                        <select name="category">
                                            <option value="facebook">{language === 'en' ? 'facebook' : 'فيسبوك'}</option>
                                            <option value="twitter">{language === 'en' ? 'twitter' : 'تويتر'}</option>
                                            <option value="google">{language === 'en' ? 'google' : 'جوجل'}</option>
                                            <option value="instagram">{language === 'en' ? 'instagram' : 'إنستاجرام'}</option>
                                            <option value="tiktok">{language === 'en' ? 'tiktok' : 'تيك توك'}</option>
                                            <option value="snapchat">{language === 'en' ? 'snapchat' : 'سناب شات'}</option>
                                            <option value="influencer">{language === 'en' ? 'influencer' : 'مؤثر'}</option>
                                            <option value="other">{language === 'en' ? 'other' : 'أخرى'}</option>
                                        </select>

                                        <label>{language === 'en' ? 'Campaign Medium (e.g., cpc, social, email)' : 'وسيلة الحملة (مثل cpc, social, email)'}</label>
                                        <select name="category">
                                            <option value="email">{language === 'en' ? 'email' : 'بريد إلكتروني'}</option>
                                            <option value="social">{language === 'en' ? 'social' : 'اجتماعي'}</option>
                                            <option value="cpc">{language === 'en' ? 'cpc' : 'cpc'}</option>
                                        </select>

                                        <label>{language === 'en' ? 'Campaign Name (e.g., spring_sale, launch)' : 'اسم الحملة التسويقية (مثل spring_sale, launch)'}</label>
                                        <select name="category">
                                            <option value="launch">{language === 'en' ? 'launch' : 'إطلاق'}</option>
                                            <option value="spring_sale">{language === 'en' ? 'spring_sale' : 'بيع الربيع'}</option>
                                        </select>

                                        <button className="add-product-btn" style={{ width: '100%' }}>
                                            {language === 'en' ? 'Create link' : 'إنشاء الرابط'}
                                        </button>



                                    </div>

                                    <div className='Product-section-row '> <CampaignLinks links={links} /></div>


                                </>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
};

export default CreatePage;
