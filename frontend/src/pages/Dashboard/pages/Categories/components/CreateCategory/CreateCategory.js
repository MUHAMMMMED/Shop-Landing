
import axios from 'axios';
import React, { useState } from 'react';
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate } from 'react-router-dom';
import Config from '../../../../../../components/config';
import DasHeader from '../../../../components/DasHeader/DasHeader';
import Sidebar from '../../../../components/Sidebar/Sidebar';

const CreateCategory = () => {
    const navigate = useNavigate();
    const [language, setLanguage] = useState('en');
    const updateLanguage = (newLanguage) => setLanguage(newLanguage);

    const [Data, setData] = useState({
        name: '',
        description: '',
        image: null,
    });

    const [imageCardPreview, setImageCardPreview] = useState(null);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
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

        // Category name validation
        if (!Data.name.trim()) formErrors.title = language === 'ar' ? 'اسم الفئة مطلوب.' : 'Category name is required.';

        // Category description validation
        if (!Data.description.trim()) formErrors.description = language === 'ar' ? 'وصف الفئة مطلوب.' : 'Category description is required.';

        // Main image validation
        if (!Data.image) formErrors.image = language === 'ar' ? 'الصورة الرئيسية مطلوبة.' : 'Main image is required.';

        return formErrors;
    };

    const handleSubmit = async () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const formData = new FormData();
        formData.append('name', Data.name);
        formData.append('description', Data.description);
        formData.append('image', Data.image);

        try {
            const response = await axios.post(`${Config.baseURL}/api/products/categories_dash/`, formData, {

                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data?.id) {
                navigate(`/categories`);
            } else {
                console.error('ID not found in the response:', response);
            }
        } catch (error) {
            console.error('Error submitting category:', error);
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
                                <Link to={'/categories'}>
                                    <button className="add-product-btn">
                                        {language === 'ar' ? <HiArrowRight /> : <HiArrowLeft />}
                                    </button></Link>
                                {language === 'ar' ? 'إنشاء فئة' : 'Create category'}
                            </h1>
                            <button className="add-product-btn" onClick={handleSubmit}>
                                {language === 'en' ? 'Save' : 'حفظ'}
                            </button>
                        </header>


                        <form className="product-form">
                            <div className="Product-section Product-section-one">
                                <div className='Product-section-row'>
                                    <h2 style={{ color: '#000' }}>{language === 'en' ? 'General Information' : 'معلومات عامة'} </h2>
                                    <label> {language === 'en' ? 'Category Name' : 'اسم الفئة'} </label>                                    <input
                                        type="text"
                                        name="name"
                                        value={Data.name}
                                        onChange={handleInputChange}
                                        placeholder={language === 'en' ? 'Category Name' : 'اسم الفئة'}
                                    />
                                    {errors.name && <p className="error">{errors.name}</p>}
                                    <label>
                                        <label> {language === 'en' ? 'Category Description' : 'وصف الفئة'} </label>

                                    </label>
                                    <textarea
                                        name="description"
                                        value={Data.description}
                                        onChange={handleInputChange}
                                        placeholder={language === 'en' ? 'Category Description' : 'وصف الفئة'}
                                    />
                                    {errors.description && <p className="error">{errors.description}</p>}
                                </div>
                            </div>
                            <div className="Product-section Product-section-two ">
                                {errors.image && <p className="error">{errors.image}</p>}
                                <div className='Product-section-row '>
                                    <div className="upload-box">
                                        {/* Display the uploaded image preview */}
                                        <>
                                            <h2 style={{ color: '#000' }}>{language === 'en' ? 'Upload Images' : 'تحميل الصور'}</h2>
                                            <label htmlFor="upload">
                                                <input
                                                    id="upload"
                                                    type="file"
                                                    onChange={handleImageChange}
                                                    accept=".png, .jpg, .jpeg, .gif"
                                                    style={{ display: 'none' }} // Hide the input for better UX
                                                />
                                                <span>{language === 'en' ? 'Click to upload' : 'اضغط للتحميل'}
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
                                                    alt=" category Preview"
                                                    style={{
                                                        maxWidth: '100%',
                                                        height: 'auto',
                                                        borderRadius: '8px',
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <p>  {language === 'en' ? 'No images uploaded yet.' : 'لم يتم تحميل أي صور حتى الآن.'} </p>
                                        )}
                                    </div>

                                </>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
};

export default CreateCategory;
