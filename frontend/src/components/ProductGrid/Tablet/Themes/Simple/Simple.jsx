import React from "react";
import { TbHandClick } from "react-icons/tb";
import { Link } from "react-router-dom";
import Config from "../../../../config";
import "./Simple.css";

export default function Simple({ data, language }) {
  return (
    <div style={{ float: "right", width: "100%", marginBottom: "20px" }}>
      <div className="product-grid">

        <h2 className="section-title">
          {language === 'ar' ? 'الأكثر مبيعًا' : 'Best Seller'}
        </h2>
        {/* <p className="section-subtitle">Take 20% off all items starting today!</p> */}
        <div className="grid-container">
          {data.map((page) => {
            const product = page?.product;
            if (!product) return null; // Skip if product is undefined

            // Calculate discount price
            const price = parseFloat(product.price) || 0;
            const discount = parseFloat(product.discount) || 0;
            const discountedPrice =
              discount > 0 ? (price - (price * discount) / 100).toFixed(2) : price.toFixed(2);
            const savings = discount > 0 ? (price - discountedPrice).toFixed(2) : 0; // Calculate savings

            return (
              <div key={page.id} className="product-cards">
                {/* Product Image */}
                <div className="image-container">
                  <img
                    src={`${Config.baseURL}${product.image}`}
                    alt={product.name}
                    className="product-images"
                  />
                </div>

                {/* Product Details */}
                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>

                  {/* Price and Stock Info */}
                  <div className="price-stock-row">
                    <div className="price-info">
                      <span className="current-price">
                        {discountedPrice} <span className="currency">{page?.currency}</span>
                      </span>
                      {discount > 0 && (
                        <span className="original-price">{price.toFixed(2)}</span>
                      )}
                    </div>
                    {discount > 0 && (
                      <div>
                        <span className="product-save">
                          {language === 'ar' ? 'وفر' : 'Save'} {savings} {page?.currency}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Stock Status and Action Button */}
                  <div className="colors-button-row">
                    <div className="availability">
                      {product.inStock > 0 ? (
                        <span className="in-stock">
                          {language === 'ar' ? 'متوفر' : 'In stock'}
                        </span>
                      ) : (
                        <span className="out-stock">
                          {language === 'ar' ? 'غير متوفر' : 'Out of stock'}
                        </span>
                      )}
                    </div>
                    <Link to={`/page/${page?.title}/${page?.id}`}>
                      <button className="quick-add-button">
                        <TbHandClick />
                        {language === 'ar' ? 'عرض المزيد' : 'View More'}                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}