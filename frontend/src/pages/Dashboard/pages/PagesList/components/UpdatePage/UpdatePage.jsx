import React, { useEffect, useState } from 'react';
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { Link, useNavigate, useParams } from 'react-router-dom';
import AxiosInstance from '../../../../../../Authentication/AxiosInstance';
import Config from '../../../../../../components/config';
import DasHeader from '../../../../components/DasHeader/DasHeader';
import Sidebar from '../../../../components/Sidebar/Sidebar';
import Campaign from '../CampaignLinks/Campaign';


const UpdatePage = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the product ID from the URL
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

    // Fetch product data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosInstance.get(`${Config.baseURL}/api/content/pages/${id}/`);
                const { title, description, keywords, image } = response.data;

                setData({
                    title,
                    description,
                    keywords: keywords.split(','),
                    image: null, // Reset file input
                });

                // Set image preview if URL is available
                if (image) setImageCardPreview(image);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        fetchData();
    }, [id]);

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
        if (!Data.title.trim()) formErrors.title = language === 'ar' ? 'اسم المنتج مطلوب.' : 'Product name is required.';
        if (!Data.description.trim()) formErrors.description = language === 'ar' ? 'وصف المنتج مطلوب.' : 'Product description is required.';
        if (Data.keywords.length === 0) formErrors.keywords = language === 'ar' ? 'يجب إضافة كلمة مفتاحية واحدة على الأقل.' : 'At least one keyword is required.';
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

        if (Data.image) formData.append('image', Data.image); // Append image only if updated

        try {
            await AxiosInstance.put(`${Config.baseURL}/api/pages/${id}/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            navigate(`/Page/${id}`);
        } catch (error) {
            console.error('Error updating page:', error);
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
                                <Link to={'/pages'}>
                                    <button className="add-product-btn">
                                        {language === 'ar' ? <HiArrowRight /> : <HiArrowLeft />}
                                    </button>
                                </Link>
                                {language === 'ar' ? 'تحديث الصفحة' : 'Update Page'}
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
                                    <div>
                                        <div style={{ width: '80%', float: 'left', marginRight: '5px' }}>
                                            <input
                                                type="text"
                                                value={currentTag}
                                                onChange={(e) => setCurrentTag(e.target.value)}
                                                placeholder={language === 'en' ? 'Add a keyword' : 'أضف كلمة مفتاحية'}
                                            />
                                        </div>
                                        <div onClick={addTag} className="add-product-btn" style={{ width: '19%', float: 'left', textAlign: 'center' }}>  {language === 'en' ? 'Add' : 'أضف'}</div>
                                    </div>
                                </div>

                                <div className='Product-section-row'>
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

                            <div className="Product-section Product-section-two">
                                {errors.image && <p className="error">{errors.image}</p>}
                                <div className='Product-section-row'>
                                    <div className="upload-box">
                                        <h2 style={{ color: '#000' }}>  {language === 'en' ? 'Upload Images' : 'تحميل الصور'}</h2>
                                        <label htmlFor="upload">
                                            <input
                                                id="upload"
                                                type="file"
                                                onChange={handleImageChange}
                                                accept=".png, .jpg, .jpeg, .gif"
                                                style={{ display: 'none' }}
                                            />
                                            <span> {language === 'en' ? 'Click to upload' : 'اضغط للتحميل'}</span>
                                            <span>SVG, PNG, JPG, or GIF (MAX. 800x400px)</span>
                                        </label>
                                    </div>
                                </div>

                                <div className='Product-section-row'>
                                    {imageCardPreview ? (
                                        <div className='image-preview' style={{ height: 'auto' }}>
                                            <img
                                                src={imageCardPreview}
                                                alt="Product Preview"
                                                style={{
                                                    maxWidth: '100%',
                                                    height: 'auto',
                                                    borderRadius: '8px',
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <p>  {language === 'en' ? 'No images uploaded yet.' : 'لم يتم تحميل أي صور حتى الآن.'}</p>
                                    )}

                                </div>
                                <Campaign language={language} Id={id} />
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
};

export default UpdatePage;

