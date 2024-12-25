import React from 'react';
import { Helmet } from 'react-helmet';

{/* <PropertySEO 
title={property.title}
description={property.description}
price={property.price}
location={property.location}
bedrooms={property.bedrooms}
bathrooms={property.bathrooms}
image={property.image}
propertyUrl={property.url}
/> */}




const PropertySEO = ({ title, description, price, location, image, propertyUrl, bedrooms, bathrooms }) => {
    return (
        <Helmet>
            {/* Title */}
            <title>{title}</title>

            {/* Meta Tags */}
            <meta name="description" content={description} />
            <meta name="keywords" content={`real estate, ${title}, buy property, ${location}`} />

            {/* Open Graph Tags for social media */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="property" />
            <meta property="og:price:amount" content={price} />
            <meta property="og:price:currency" content="USD" /> {/* أو العملة المحلية */}
            <meta property="og:location" content={location} />
            <meta property="og:property:bedrooms" content={bedrooms} />
            <meta property="og:property:bathrooms" content={bathrooms} />
            {image && <meta property="og:image" content={image} />}
            <meta property="og:url" content={propertyUrl || window.location.href} />
            <meta property="og:site_name" content="Real Estate Platform" />

            {/* Optional Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {image && <meta name="twitter:image" content={image} />}
            <meta name="twitter:site" content="@realestateplatform" />

            {/* Optional structured data for search engines (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org/",
                    "@type": "Offer",
                    "name": title,
                    "description": description,
                    "price": price,
                    "priceCurrency": "USD",
                    "url": propertyUrl || window.location.href,
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": location
                    },
                    "numberOfRooms": bedrooms,
                    "bathroomCount": bathrooms,
                    "image": [image],
                    "offers": {
                        "@type": "Offer",
                        "priceCurrency": "USD",
                        "price": price
                    }
                })}
            </script>
        </Helmet>
    );
};

export default PropertySEO;