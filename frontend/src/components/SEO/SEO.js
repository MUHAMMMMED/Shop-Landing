
import React from 'react';
import { Helmet } from 'react-helmet';



// {/* استخدام مكون SEO */}
// <SEO
//     title={pageData.title}
//     description={pageData.description}
//     keywords={pageData.meta_keywords}
//     image={`http://127.0.0.1:8000/media/${pageData.meta_image}`}
// />



const SEO = ({ domain, title, description, keywords, image }) => {
    return (
        <Helmet>
            {/* Title */}
            <title>{domain} | {title}</title>

            {/* Meta Tags */}
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph Tags for social media */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {image && <meta property="og:image" content={image} />}

            {/* Optional Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {image && <meta name="twitter:image" content={image} />}
        </Helmet>
    );
};

export default SEO;


// import React from 'react';
// import { Helmet } from 'react-helmet';

// const SEO = ({ title, description, keywords, image }) => {
//     return (
//         <Helmet>
//             {/* Title */}
//             <title>{title}</title>

//             {/* Meta Tags */}
//             <meta name="description" content={description} />
//             <meta name="keywords" content={keywords} />

//             {/* Open Graph Tags for social media */}
//             <meta property="og:title" content={title} />
//             <meta property="og:description" content={description} />
//             <meta property="og:type" content="website" />
//             {image && <meta property="og:image" content={image} />}
//             <meta property="og:url" content={window.location.href} />
//             <meta property="og:site_name" content="Your Website Name" />

//             {/* Optional Twitter Cards */}
//             <meta name="twitter:card" content="summary_large_image" />
//             <meta name="twitter:title" content={title} />
//             <meta name="twitter:description" content={description} />
//             {image && <meta name="twitter:image" content={image} />}
//             <meta name="twitter:site" content="@yourtwitterhandle" />
//         </Helmet>
//     );
// };

// export default SEO;


