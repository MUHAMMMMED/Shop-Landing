import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaMobileAlt } from 'react-icons/fa';
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { IoDesktopSharp } from 'react-icons/io5';
import { MdOutlineTabletMac } from 'react-icons/md';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AxiosInstance from '../../../../../../Authentication/AxiosInstance';
import Config from '../../../../../../components/config';
import DasHeader from '../../../../components/DasHeader/DasHeader';
import Sidebar from '../../../../components/Sidebar/Sidebar';
import Images from '../CreateProduct/Images/Images';
import Desktop from '../CreateProduct/deviceType/Desktop/Desktop';
import Mobile from '../CreateProduct/deviceType/Mobile/Mobile';
import Tablet from '../CreateProduct/deviceType/Tablet/Tablet';
import { IconButton, SectionTypeContainer } from './PagesDetalisStyles';


const UpdateProduct = () => {


    const navigate = useNavigate();
    const { id } = useParams();
    const [language, setLanguage] = useState('en');
    const updateLanguage = (newLanguage) => setLanguage(newLanguage);
    const [tags, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState("");
    const [imageCard, setImageCard] = useState(null);
    const [imageCardPreview, setImageCardPreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState(null);
    const [Data, setData] = useState({});
    const [ProductLanguage, setProductLanguage] = useState('ar');

    const URL = `${Config.baseURL}/api/products`;

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${URL}/categories/`);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await AxiosInstance.get(`${URL}/products-dash/${id}/`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product', error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, [id]);



    useEffect(() => {
        if (product) {
            setData({
                name: product?.name,
                description: product?.description || '',
                details: product?.details || '',
                category: product?.category || '',
                price: product?.price || 0,
                discount: product?.discount || 0,
                stock: product?.stock || 0,
                ssku: product?.ssku || '',
                themes_desktop_Types: product?.themes_desktop_Types || '',
                themes_tablet_Types: product?.themes_tablet_Types || '',
                themes_mobile_Types: product?.themes_mobile_Types || '',
                image: product?.image || null,
                stock_alarm: product?.stock_alarm || 0,
                expiration_date_offer: product?.expiration_date_offer || '',
            });
            setImageCardPreview(product?.image);
            setProductLanguage(product?.language);
        }
    }, [product]);








    useEffect(() => {
        if (product && product.tags) {
            // Clean up and parse the tags string
            try {
                // Split the tags string by commas and clean up extra spaces and characters
                const parsedTags = product.tags
                    .split(',') // Split by comma
                    .map(tag => tag.replace(/[^a-zA-Z0-9]/g, '').trim()) // Clean up non-alphanumeric characters and trim spaces
                    .filter(tag => tag !== ''); // Remove empty strings

                setTags(parsedTags); // Set the cleaned tags
            } catch (error) {
                console.error('Error parsing tags:', error);
                setTags([]); // Set to an empty array in case of error
            }
        }
    }, [product]);





    const addTag = () => {
        if (currentTag && !tags.includes(currentTag)) {
            setTags([...tags, currentTag]);
            setCurrentTag("");
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageCard(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImageCardPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    // const validateForm = () => {
    //     const formErrors = {};

    //     //     // Product name validation
    //     //     if (!Data.name?.trim()) formErrors.name = language === 'ar' ? 'اسم المنتج مطلوب.' : 'Product name is required.';

    //     //     // Product description validation
    //     //     if (!Data.description?.trim()) formErrors.description = language === 'ar' ? 'وصف المنتج مطلوب.' : 'Product description is required.';

    //     //     // Product details validation
    //     //     if (!Data.details?.trim()) formErrors.details = language === 'ar' ? 'تفاصيل المنتج مطلوبة.' : 'Product details are required.';

    //     // Price validation
    //     if (Data.price <= 0) formErrors.price = language === 'ar' ? 'السعر يجب أن يكون أكبر من 0.' : 'Price must be greater than 0.';

    //     //     // Discount validation
    //     //     if (Data.discount < 0) formErrors.discount = language === 'ar' ? 'الخصم لا يمكن أن يكون سالباً.' : 'Discount cannot be negative.';

    //     //     // Stock validation
    //     //     if (Data.stock < 0) formErrors.stock = language === 'ar' ? 'المخزون لا يمكن أن يكون سالباً.' : 'Stock cannot be negative.';

    //     //     // SSKU validation
    //     //     if (!Data.ssku?.trim()) formErrors.ssku = language === 'ar' ? 'SSKU مطلوب.' : 'SSKU is required.';

    //     //     // Tags validation
    //     //     if (tags.length === 0) formErrors.tags = language === 'ar' ? 'يجب إضافة كلمة مفتاحية واحدة على الأقل.' : 'At least one tag is required.';

    //     return formErrors;
    // };






    // const handleSubmit = async () => {
    //     const formErrors = validateForm();
    //     if (Object.keys(formErrors).length > 0) {
    //         setErrors(formErrors);
    //         return;
    //     }
    //     try {

    //         const formData = new FormData();
    //         formData.append("name", Data?.name);
    //         formData.append("description", Data?.description);
    //         formData.append("details", Data.details);
    //         formData.append("category", Data.category);
    //         formData.append("price", Data.price);
    //         formData.append("discount", Data.discount);
    //         formData.append("stock", Data.stock);
    //         formData.append("ssku", Data?.ssku);
    //         formData.append('stock_alarm', Data.stock_alarm);
    //         formData.append('expiration_date_offer', Data.expiration_date_offer);
    //         formData.append('language', ProductLanguage);
    //         formData.append("tags", JSON.stringify(tags)); // Ensure to handle tags as an array
    //         if (imageCard) formData.append("image", imageCard);

    //         await AxiosInstance.put(`${Config.baseURL}/api/products/update/${id}/`, formData, {
    //             headers: { 'Content-Type': 'multipart/form-data' },
    //         });
    //         navigate(`/products`);
    //     } catch (error) {
    //         console.error('Error updating product:', error);
    //     }
    // };





    const handleSubmit = async () => {
        // const formErrors = validateForm();
        // if (Object.keys(formErrors).length > 0) {
        //     setErrors(formErrors);
        //     return;
        // }
        try {
            const formData = new FormData();
            formData.append("name", Data?.name);
            formData.append("description", Data?.description);
            formData.append("details", Data.details);
            formData.append("category", Data.category);
            formData.append("price", Data.price);
            formData.append("discount", Data.discount);
            formData.append("stock", Data.stock);
            formData.append("ssku", Data?.ssku);
            formData.append('stock_alarm', Data.stock_alarm);
            formData.append('expiration_date_offer', Data.expiration_date_offer);
            formData.append('language', ProductLanguage);
            formData.append("tags", tags.join(',')); // إرسال العلامات كـ سلسلة مفصولة بفواصل
            if (imageCard) formData.append("image", imageCard);

            await AxiosInstance.put(`${Config.baseURL}/api/products/update/${id}/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            navigate(`/products`);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };


    const handleInputChange = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value });
    };

    const handleDetailsChange = (value) => {
        setData({ ...Data, details: value });
    };

    const [deviceType, setDeviceType] = useState('desktop');
    const handleDeviceChange = (type) => setDeviceType(type);
    const handleLanguageChange = (lang) => {
        setProductLanguage(lang);
        updateLanguage(lang);
    };

    return (

        <>
            <DasHeader language={language} updateLanguage={updateLanguage} />
            <div className={`dashboard ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                <Sidebar language={language} />
                <main className={`content ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                    <div className="create-product">
                        <header className='create-header'>
                            <h1>
                                <Link to={'/products'}>
                                    <button className="add-product-btn">
                                        {language === 'ar' ? <HiArrowRight /> : <HiArrowLeft />}
                                    </button>
                                </Link>

                                {language === 'ar' ? 'إنشاء منتج' : 'Create Product'}
                            </h1>
                            <button className="add-product-btn" onClick={handleSubmit}>
                                {language === 'en' ? 'Save' : 'حفظ'}
                            </button>
                        </header>


                        <form className="product-form">
                            <div className="Product-section Product-section-one">
                                <div className='Product-section-row'>
                                    <h2 style={{ color: '#000' }}>{language === 'en' ? 'General Information' : 'معلومات عامة'} </h2>

                                    <label style={{ paddingTop: "15px" }}>{language === 'en' ? 'Select Language' : 'اختر اللغة'}  </label>
                                    <span
                                        onClick={() => handleLanguageChange('en')}
                                        className={`toggle-lang fi fi-us ${ProductLanguage === 'en' ? 'toggle-active' : ''}`}

                                    />

                                    <span
                                        onClick={() => handleLanguageChange('ar')}
                                        className={`toggle-lang fi fi-eg ${ProductLanguage === 'ar' ? 'toggle-active' : ''}`}

                                    />

                                    <label>{language === 'en' ? 'Product Name' : 'اسم المنتج'} </label>


                                    <input
                                        type="text"
                                        name="name"
                                        value={Data.name}
                                        onChange={handleInputChange}
                                        placeholder={language === 'en' ? 'Product Name' : 'اسم المنتج'}
                                    />
                                    {errors.name && <p className="error">{errors.name}</p>}
                                    <label>{language === 'en' ? 'Product Description' : 'وصف المنتج'}</label>
                                    <textarea
                                        name="description"
                                        value={Data.description}
                                        onChange={handleInputChange}
                                        placeholder={language === 'en' ? 'Product Description' : 'وصف المنتج'}
                                    />
                                    {errors.description && <samp className="error">{errors.description}</samp>}
                                    <label>{language === 'en' ? 'Details Product' : 'تفاصيل المنتج'}
                                    </label>
                                    <div style={{ float: 'left', width: '100%', height: '400px', background: '#fff' }}>

                                        <ReactQuill
                                            value={Data.details}
                                            onChange={handleDetailsChange}
                                            modules={{
                                                toolbar: [
                                                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                                    [{ 'size': [] }],
                                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                                    [{ 'align': [] }],
                                                    [{ 'color': [] }, { 'background': [] }],
                                                    ['link', 'image'],
                                                    ['clean']
                                                ]
                                            }}
                                            formats={[
                                                'header', 'font', 'size',
                                                'bold', 'italic', 'underline', 'strike', 'blockquote',
                                                'list', 'bullet', 'align', 'color', 'background',
                                                'link', 'image'
                                            ]}
                                            placeholder={language === 'en' ? 'Enter product details here...' : 'أدخل تفاصيل المنتج هنا...'}
                                            style={{
                                                height: '300px',
                                                marginBottom: '20px',
                                                backgroundColor: '#fbfafa',
                                                direction: language === 'ar' ? 'rtl' : 'ltr',
                                                textAlign: language === 'ar' ? 'right' : 'left',
                                            }}
                                        />
                                        {errors.details && <p className="error">{errors.details}</p>}
                                    </div>

                                </div>



                                <div className="Product-section-row">
                                    <label>{language === 'en' ? 'Tags' : 'العلامات'}</label>
                                    <div className='Tags'>
                                        <div className='Tags-input'>
                                            <input
                                                type="text"
                                                value={currentTag}
                                                onChange={(e) => setCurrentTag(e.target.value)}
                                                placeholder={language === 'en' ? 'Enter tags' : 'أدخل العلامات'}
                                            />
                                        </div>
                                        <div className="  Tags-btn" >
                                            <div
                                                onClick={addTag}
                                                className="add-product-btn  "
                                            >
                                                {language === 'en' ? 'Add' : 'إضافة'}
                                            </div>  </div>
                                    </div>
                                </div>



                                <div className="Product-section-row">
                                    <div className="image-preview" style={{ height: 'auto', padding: '5px' }}>


                                        {Array.isArray(tags) && tags.length > 0 ? (
                                            tags.map((tag, index) => (
                                                <p className="tagify__tag" key={index}>
                                                    {tag}{" "}
                                                    <span className="tagify__x" onClick={() => removeTag(tag)}> x </span>
                                                </p>
                                            ))
                                        ) : (
                                            <p>{language === 'en' ? 'No Tags yet.' : 'لا توجد علامات بعد.'}</p>
                                        )}

                                    </div>
                                    {errors.tags && <p className="error">{errors.tags}</p>}
                                </div>

                                <Images images={product?.images} Id={product?.id} language={language} />

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
                                                                        value={Data.themes_mobile_Types}
                                                                        onChange={handleInputChange}
                                                                    >
                                                                        <option value="">{language === 'en' ? 'Select Themes' : 'اختر التصميم'}</option>
                                                                        <option value="classic">{language === 'en' ? 'Classic' : 'كلاسيك'}</option>
                                                                        <option value="simple">{language === 'en' ? 'Simple' : 'بسيط'}</option>
                                                                        <option value="modern">{language === 'en' ? 'Modern' : 'حديث'}</option>
                                                                    </select>
                                                                    {errors.themes_mobile_Types && <p className="error">{errors.themes_mobile_Types}</p>}
                                                                </div>
                                                                <Mobile selected_Device="mobile" themes_Types={Data.themes_mobile_Types} />;
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
                                                                        value={Data.themes_tablet_Types}
                                                                        onChange={handleInputChange}
                                                                    >
                                                                        <option value="">{language === 'en' ? 'Select Themes' : 'اختر التصميم'}</option>
                                                                        <option value="classic">{language === 'en' ? 'Classic' : 'كلاسيك'}</option>
                                                                        <option value="simple">{language === 'en' ? 'Simple' : 'بسيط'}</option>
                                                                        <option value="modern">{language === 'en' ? 'Modern' : 'حديث'}</option>
                                                                    </select>
                                                                    {errors.themes_tablet_Types && <p className="error">{errors.themes_tablet_Types}</p>}

                                                                </div>
                                                                <Tablet selected_Device="tablet" themes_Types={Data.themes_tablet_Types} />
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
                                                                        value={Data.themes_desktop_Types}
                                                                        onChange={handleInputChange}
                                                                    >
                                                                        <option value="">{language === 'en' ? 'Select Themes' : 'اختر التصميم'}</option>
                                                                        <option value="classic">{language === 'en' ? 'Classic' : 'كلاسيك'}</option>
                                                                        <option value="simple">{language === 'en' ? 'Simple' : 'بسيط'}</option>
                                                                        <option value="modern">{language === 'en' ? 'Modern' : 'حديث'}</option>
                                                                    </select>
                                                                    {errors.themes_desktop_Types && <p className="error">{errors.themes_desktop_Types}</p>}
                                                                </div>

                                                                <Desktop selected_Device="desktop" themes_Types={Data.themes_desktop_Types} />
                                                            </>
                                                        );

                                                    default:
                                                        return null;
                                                }
                                            })()}

                                        </div></div></div></div>



                            <div className="Product-section Product-section-two ">
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
                                                    alt="Product Preview"
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
                                </>



                                <div className='Product-section-row '>
                                    <label>
                                        {language === 'en' ? 'Pricing Info' : 'معلومات التسعير'}

                                    </label>
                                    <label>
                                        {language === 'en' ? 'Price' : 'السعر'}

                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={Data.price}
                                        onChange={handleInputChange}

                                    />
                                    {errors.price && <p className="error">{errors.price}</p>}
                                    <label>
                                        {language === 'en' ? 'Product discount' : 'خصم المنتج'}
                                    </label>
                                    <input
                                        type="number"
                                        name="discount"
                                        value={Data.discount}
                                        onChange={handleInputChange}

                                    />

                                </div>


                                <div className='Product-section-row '>
                                    <label>{language === 'en' ? 'SSKU' : 'كود المنتج'}</label>

                                    <input
                                        type="text"
                                        name="ssku"
                                        value={Data.ssku}
                                        onChange={handleInputChange}
                                        placeholder="SSKU"
                                    />
                                    {errors.ssku && <p className="error">{errors.ssku}</p>}

                                    <label>{language === 'en' ? 'Total Stock Quantity' : 'إجمالي كمية المخزون'}</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={Data.stock}
                                        onChange={handleInputChange}
                                        placeholder="Stock"
                                    />
                                    {errors.stock && <p className="error">{errors.stock}</p>}
                                    <label>{language === 'en' ? 'stock alarm' : 'تنبيه المخزون'}</label>
                                    <input
                                        type="number"
                                        name="stock_alarm"
                                        value={Data.stock_alarm}
                                        onChange={handleInputChange}
                                        placeholder="stock_alarm"
                                    />


                                </div>

                                <div className='Product-section-row '>
                                    <label>{language === 'en' ? 'expiration date offer' : 'تاريخ انتهاء العرض'}</label>
                                    <input
                                        type="date" name="expiration_date_offer"
                                        value={Data.expiration_date_offer}
                                        onChange={handleInputChange}
                                    />
                                </div>







                                <div className='Product-section-row '>
                                    <label>
                                        {language === 'en' ? 'Category' : 'الفئة'}

                                    </label>
                                    <select
                                        name="category"
                                        value={Data.category}
                                        onChange={handleInputChange} >
                                        <option value="">{language === 'en' ? 'Category' : 'الفئة'}
                                        </option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    {errors.category && <p className="error">{errors.category}</p>}
                                </div>

                            </div>
                        </form >
                    </div >
                </main >
            </div >
        </>
    );
};

export default UpdateProduct;


