

import React from 'react';
import { Helmet } from 'react-helmet';


{/* <ProductSEO 
title={product.title}
description={product.description}
price={product.price}
image={product.image}
productUrl={product.url}
/> */}




const ProductSEO = ({ title, description, price, image, productUrl }) => {
    return (
        <Helmet>
            {/* Title */}
            <title>{title}</title>

            {/* Meta Tags */}
            <meta name="description" content={description} />
            <meta name="keywords" content={`${title}, buy, ecommerce, product`} />

            {/* Open Graph Tags for social media */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="product" />
            <meta property="og:price:amount" content={price} />
            <meta property="og:price:currency" content="USD" /> {/* أو العملة التي تريد استخدامها */}
            {image && <meta property="og:image" content={image} />}
            <meta property="og:url" content={productUrl || window.location.href} />
            <meta property="og:site_name" content="Your Online Store" />

            {/* Optional Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {image && <meta name="twitter:image" content={image} />}
            <meta name="twitter:site" content="@yourstore" />

            {/* Optional structured data for search engines (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org/",
                    "@type": "Product",
                    "name": title,
                    "image": [image],
                    "description": description,
                    "offers": {
                        "@type": "Offer",
                        "priceCurrency": "USD",
                        "price": price,
                        "url": productUrl || window.location.href
                    }
                })}
            </script>
        </Helmet>
    );
};

export default ProductSEO;