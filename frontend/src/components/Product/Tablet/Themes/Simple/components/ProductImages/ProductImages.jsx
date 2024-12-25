import React, { useState } from 'react';
import Config from '../../../../../../config';
import './ProductImages.css';

const ProductImages = ({ data }) => {

  // Ensure data exists and access the 'image' property from each object in the 'images' array.
  const images = data?.images?.map((imgObj) => imgObj.image) || [];

  // دالة للتحقق من وجود URL كامل أو إضافة الدومين إذا كان مسارًا نسبيًا
  const getFullImageUrl = (image) => {
    // تحقق من إذا كان الصورة تحتوي على مسار نسبي فقط
    if (image && !image.startsWith('http')) {
      return `${Config.baseURL}${image}`;
    }

    return image; // إذا كانت الصورة تحتوي على URL كامل نرجع الصورة كما هي
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // تغيير الصورة عند الضغط على صورة مصغرة
  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  // التنقل إلى الصورة التالية
  const nextImage = () => {
    setSelectedImageIndex((selectedImageIndex + 1) % images.length);
  };

  // التنقل إلى الصورة السابقة
  const prevImage = () => {
    setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
  };
  return (

    <div className="Mobile-product-images">
      <div className="Mobile-main-image">
        <button className="Mobile-nav-arrow Mobile-left-arrow" onClick={prevImage}>&lt;</button>
        <img src={getFullImageUrl(images[selectedImageIndex])} alt="Product" />
        <button className="Mobile-nav-arrow Mobile-right-arrow" onClick={nextImage}>&gt;</button>
      </div>

      <div className="Mobile-thumbnail-list">
        {images.map((image, index) => (
          <img
            key={index}
            src={getFullImageUrl(image)}
            alt={`Thumbnail ${index + 1}`}
            className={`Mobile-thumbnail-image ${index === selectedImageIndex ? 'selected' : ''}`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>

    </div>
  );
};

export default ProductImages;



