
import React, { useEffect, useState } from 'react';
import { FaMobileAlt } from 'react-icons/fa';
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { IoDesktopSharp } from 'react-icons/io5';
import { MdOutlineTabletMac } from 'react-icons/md';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../../../../Authentication/AxiosInstance';
import Config from '../../../../../../components/config';
import DasHeader from '../../../../components/DasHeader/DasHeader';
import Sidebar from '../../../../components/Sidebar/Sidebar';
import './CreateProduct.css';
import { IconButton, SectionTypeContainer } from './PagesDetalisStyles';
import Desktop from './deviceType/Desktop/Desktop';
import Mobile from './deviceType/Mobile/Mobile';
import Tablet from './deviceType/Tablet/Tablet';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const updateLanguage = (newLanguage) => setLanguage(newLanguage);
  const [currentTag, setCurrentTag] = useState('');
  // const [images, setImages] = useState([]); 
  const [imagesToSend, setImagesToSend] = useState([]); // Images to send to the server
  const [imagesForPreview, setImagesForPreview] = useState([]); // Images for preview only
  const [imageCard, setImageCard] = useState(null);
  const [imageCardPreview, setImageCardPreview] = useState(null);  // To store image preview
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [ProductLanguage, setProductLanguage] = useState(language);
  const URL = `${Config.baseURL}/api/products`;

  const fetchCategories = async () => {
    try {
      const response = await AxiosInstance.get(`${URL}/categories_dash/`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const [Data, setData] = useState({
    name: '',
    description: '',
    details: '',
    category: '',
    image: null,
    themes_desktop_Types: "Classic",
    themes_tablet_Types: "Classic",
    themes_mobile_Types: "Classic",
    is_mobile: true,
    is_tablet: true,
    is_desktop: true,
    price: 0,
    discount: 0,
    stock: 0,
    stock_alarm: 0,
    expiration_date_offer: '',
    ssku: '',
    images: [],
    tags: [],
    language: 'ar'
  });

  const addTag = () => {
    if (currentTag && !Data.tags.includes(currentTag)) {
      setData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag],
      }));
      setCurrentTag('');
    } else {
      alert('Tag is already added or empty!');
    }
  };
  const removeTag = (tagToRemove) => {
    setData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };



  // Handle image upload
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const previews = [];

    // Generate preview URLs using FileReader
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        previews.push(e.target.result);
        setImagesForPreview((prev) => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file); // Read the file as Data URL
    });

    // Save the images to send to backend
    setImagesToSend((prev) => [...prev, ...files]);
  };

  // Handle image removal
  const handleRemoveImage = (index) => {
    // Remove image from both send and preview arrays
    const updatedImagesToSend = imagesToSend.filter((_, i) => i !== index);
    const updatedImagesForPreview = imagesForPreview.filter((_, i) => i !== index);

    setImagesToSend(updatedImagesToSend);
    setImagesForPreview(updatedImagesForPreview);
  };

  // Handle single image change
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


  const validateForm = () => {
    const formErrors = {};

    // Product name
    if (!Data.name.trim()) formErrors.name = language === 'ar' ? 'اسم المنتج مطلوب.' : 'Product name is required.';

    // Product description
    if (!Data.description.trim()) formErrors.description = language === 'ar' ? 'وصف المنتج مطلوب.' : 'Product description is required.';

    // Product details
    if (!Data.details.trim()) formErrors.details = language === 'ar' ? 'تفاصيل المنتج مطلوبة.' : 'Product details are required.';

    // Product category
    if (!Data.category.trim()) formErrors.category = language === 'ar' ? 'فئة المنتج مطلوبة.' : 'Product category is required.';

    // Price validation
    if (Data.price <= 0) formErrors.price = language === 'ar' ? 'السعر يجب أن يكون أكبر من 0.' : 'Price must be greater than 0.';

    // Discount validation
    if (Data.discount < 0) formErrors.discount = language === 'ar' ? 'الخصم لا يمكن أن يكون سالباً.' : 'Discount cannot be negative.';

    // Stock validation
    if (Data.stock < 0) formErrors.stock = language === 'ar' ? 'المخزون لا يمكن أن يكون سالباً.' : 'Stock cannot be negative.';

    // SSKU validation
    if (!Data.ssku.trim()) formErrors.ssku = language === 'ar' ? 'SSKU مطلوب.' : 'SSKU is required.';

    // Tags validation
    if (Data.tags.length === 0) formErrors.tags = language === 'ar' ? 'يجب إضافة كلمة مفتاحية واحدة على الأقل.' : 'At least one tag is required.';

    // Images validation
    if (imagesToSend.length === 0 && !imageCard) formErrors.imagesToSend = language === 'ar' ? 'يجب إضافة صورة واحدة على الأقل.' : 'At least one image is required.';

    // Main image validation
    if (!imageCard) formErrors.imageCard = language === 'ar' ? 'الصورة الرئيسية مطلوبة.' : 'Main image is required.';

    return formErrors;
  };

  const handleSubmit = async () => {
    // Validate form before submitting
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Prepare form data for submission
    const formData = new FormData();
    // Append images to the form data
    imagesToSend.forEach((image) => formData.append('images', image));
    // Append the main image to the form data
    if (imageCard) formData.append('image', imageCard);
    // Append product details to the form data
    formData.append('name', Data.name);
    formData.append('description', Data.description);
    formData.append('details', Data.details);
    formData.append('category', Data.category);
    formData.append('price', Data.price);
    formData.append('discount', Data.discount);
    formData.append('stock', Data.stock);
    formData.append('ssku', Data.ssku);
    const tagsString = Data.tags.join(', ');  // Join tags with commas
    formData.append('tags', tagsString);
    // Handle theme types for desktop, tablet, and mobile
    formData.append('themes_desktop_Types', Data.themes_desktop_Types);
    formData.append('themes_tablet_Types', Data.themes_tablet_Types);
    formData.append('themes_mobile_Types', Data.themes_mobile_Types);
    // Set the device flags for mobile, tablet, and desktop
    formData.append('is_mobile', Data.is_mobile);
    formData.append('is_tablet', Data.is_tablet);
    formData.append('is_desktop', Data.is_desktop);
    formData.append('language', ProductLanguage);
    formData.append('stock_alarm', Data.stock_alarm);
    formData.append('expiration_date_offer', Data.expiration_date_offer);

    try {
      await AxiosInstance.post(`${URL}/create/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate(`/products`);
    } catch (error) {
      console.error('Error submitting Product:', error);
      // You can display additional error messages or handle it as needed
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
              <button className="add-product-btn" onClick={handleSubmit}> {language === 'en' ? 'Save' : 'حفظ'} </button>
            </header>

            <form className="product-form">
              <div className="Product-section Product-section-one">
                <div className='Product-section-row'>
                  <h2 style={{ color: '#000' }}>{language === 'en' ? 'General Information' : 'معلومات عامة'} </h2>
                  <label style={{ paddingTop: "15px" }}>{language === 'en' ? 'Select Language' : 'اختر اللغة'}  </label>

                  <span onClick={() => handleLanguageChange('en')}
                    className={`toggle-lang fi fi-us ${ProductLanguage === 'en' ? 'toggle-active' : ''}`} />

                  <span onClick={() => handleLanguageChange('ar')}
                    className={`toggle-lang fi fi-eg ${ProductLanguage === 'ar' ? 'toggle-active' : ''}`} />

                  <label>  {language === 'en' ? 'Product Name' : 'اسم المنتج'}</label>
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
                  <label>{language === 'en' ? 'Details Product' : 'تفاصيل المنتج'}</label>
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
                        direction: language === 'ar' ? 'rtl' : 'ltr', // اتجاه الكتابة
                        textAlign: language === 'ar' ? 'right' : 'left', // محاذاة النص
                      }}
                    />
                    {errors.details && <p className="error">{errors.details}</p>}
                  </div>

                </div>


                <div className='Product-section-row'>
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
                      <div onClick={addTag} className="add-product-btn " >
                        {language === 'en' ? 'Add' : 'إضافة'}
                      </div> </div>
                  </div>
                </div>

                <div className='Product-section-row'>
                  <div className='image-preview' style={{ height: 'auto', padding: '5px' }}>
                    {Data.tags.length > 0 ? (
                      Data.tags.map((tag, index) => (
                        <p className='tagify__tag' key={index}>
                          {tag} <span className='tagify__x' onClick={() => removeTag(tag)}>x</span>
                        </p>
                      ))
                    ) : (
                      <p>{language === 'en' ? 'No Tags yet.' : 'لا توجد علامات بعد.'}</p>
                    )}
                  </div>
                  {errors.tags && <p className="error">{errors.tags}</p>}
                </div>


                <div className='Product-section-row '>
                  <div className="upload-box">
                    <h2 style={{ color: '#000' }}>{language === 'en' ? 'Upload Images' : 'تحميل الصور'}</h2>
                    <label htmlFor="file-upload">
                      <input
                        id="file-upload"
                        type="file"
                        accept=".png, .jpg, .jpeg, .gif"
                        style={{ display: 'none' }}
                        multiple
                        onChange={handleImageUpload}
                      />
                      <span>
                        {language === 'en' ? 'Click to upload' : 'اضغط للتحميل'}
                        {/* or drag and drop */}
                      </span>
                      <span>SVG, PNG, JPG, or GIF (MAX. 800x400px)</span>
                    </label>

                  </div></div>

                <div className='Product-section-row '>
                  {imagesForPreview.length > 0 ? (
                    imagesForPreview.map((imagePreview, index) => (

                      <div key={index} className="thumbnail">
                        <div>
                          <img src={imagePreview} alt={`Uploaded ${index}`} className="img" />
                        </div>
                        <div className="but-remove">
                          <button
                            className="button-remove"
                            onClick={() => handleRemoveImage(index)}
                          >
                            {language === 'en' ? 'Remove Image' : 'حذف الصورة'}

                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>  {language === 'en' ? 'No images uploaded yet.' : 'لم يتم تحميل أي صور حتى الآن.'} </p>

                  )}
                </div>

                <div className='Product-section-row '>
                  <div className="type-device-container">
                    <label>{language === 'en' ? 'Choose Device Type' : 'اختار نوع الجهاز'}</label>

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
                        disabled={deviceType === 'mobile'}
                      >
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
                                  <label>{language === 'en' ? 'Themes Mobile' : 'تصميم الهاتف'}</label>
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
                                  <label>{language === 'en' ? 'Themes Tablet' : 'تصميم التابلت'}</label>
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
                                  <label>{language === 'en' ? 'Themes Desktop' : 'تصميم سطح المكتب'}</label>
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
                      <label>  {language === 'en' ? 'Choose Device Type' : 'اختار نوع الجهاز'}</label>

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
                          alt="Product Preview"
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
                    placeholder="0"
                  />
                  {errors.price && <p className="error">{errors.price}</p>}
                  <label> {language === 'en' ? 'Product discount' : 'خصم المنتج'}</label>
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
                  <label>{language === 'en' ? 'Category' : 'الفئة'}</label>
                  <select
                    name="category"
                    value={Data.category}
                    onChange={handleInputChange} >
                    <option value="">{language === 'en' ? 'Select Categories' : 'اختر الفئات'}</option>
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

export default CreateProduct;

