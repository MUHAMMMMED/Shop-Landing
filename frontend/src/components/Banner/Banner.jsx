
// import React from "react";
// import "./Banner.css";

// const Banner = () => {
//     return (
//         <div className="banner-container">
//             <div className="banner-content">
//                 <h1 className="banner-title">
//                     Rejuvenate & Revitalize: Luxury Health & Beauty Unleashed
//                 </h1>
//                 <p className="banner-description">
//                     Elevate your self-care regime with our luxury health and beauty
//                     collections.
//                 </p>
//                 <button className="banner-button">Shop All</button>
//             </div>
//             <div className="banner-scroll">
//                 <span>Scroll</span>
//                 <div className="scroll-icon">⬇️</div>
//             </div>
//         </div>
//     );
// };

// export default Banner;



// import React, { useState } from "react";
// import "./Banner.css";

// // Correct image imports
// import slide1 from "./slide1.webp";
// import slide2 from "./slide2.webp";
// import slide3 from "./slide3.webp";

// const Banner = () => {
//     const items = [
//         {
//             image: slide1,
//             title: "Rejuvenate & Revitalize",
//             description: "Elevate your self-care regime with our luxury collections.",
//         },
//         {
//             image: slide2,
//             title: "Pure Elegance",
//             description: "Discover the essence of beauty with natural products.",
//         },
//         {
//             image: slide3,
//             title: "Glow from Within",
//             description: "Unleash your inner glow with premium health essentials.",
//         },
//     ];

//     const [currentIndex, setCurrentIndex] = useState(0);

//     const handlePrev = () => {
//         setCurrentIndex((prevIndex) =>
//             prevIndex === 0 ? items.length - 1 : prevIndex - 1
//         );
//     };

//     const handleNext = () => {
//         setCurrentIndex((prevIndex) =>
//             prevIndex === items.length - 1 ? 0 : prevIndex + 1
//         );
//     };

//     return (
//         <div className="carousel">
//             <h1 style={{ width: '100%', textAlign: 'center', color: 'red' }}>Banner</h1>
//             <div className="carousel-container">
//                 {/* Image Section */}
//                 <div
//                     className="carousel-image"
//                     style={{ backgroundImage: `url(${items[currentIndex].image})` }}
//                 ></div>

//                 {/* Content Section */}
//                 <div className="carousel-content">
//                     <h1>{items[currentIndex].title}</h1>
//                     <p>{items[currentIndex].description}</p>
//                     <div className="carousel-controls">
//                         <button onClick={handlePrev} className="carousel-button">
//                             &#8592; Prev
//                         </button>
//                         <button onClick={handleNext} className="carousel-button">
//                             Next &#8594;
//                         </button>
//                     </div>
//                 </div>
//             </div></div>
//     );
// };

// export default Banner;


import React, { useEffect, useState } from "react";
import "./Banner.css";

// Import images
import slide1 from "./slide1.webp";
import slide2 from "./slide2.webp";
import slide3 from "./slide3.webp";

const Banner = () => {
    const items = [
        {
            image: slide1,
            title: "Rejuvenate & Revitalize",
            description: "Elevate your self-care regime with our luxury collections.",
        },
        {
            image: slide2,
            title: "Pure Elegance",
            description: "Discover the essence of beauty with natural products.",
        },
        {
            image: slide3,
            title: "Glow from Within",
            description: "Unleash your inner glow with premium health essentials.",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [items.length]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? items.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === items.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <>
            <div className="carousel">
                <div className="carousel-container">
                    {/* Image Section with Text Overlay */}
                    <div
                        className="carousel-image"
                        style={{ backgroundImage: `url(${items[currentIndex].image})` }}
                    >
                        <div className="carousel-text-overlay">
                            <h1>{items[currentIndex].title}</h1>
                            <p>{items[currentIndex].description}</p>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="carousel-controls">
                        <button onClick={handlePrev} className="carousel-button">
                            &#8592; Prev
                        </button>
                        <button onClick={handleNext} className="carousel-button">
                            Next &#8594;
                        </button>
                    </div>
                </div>
            </div>
            {/* <ProductGrid />
            <HeightImage />
            <ProductFeatures />
            <VideoPlayer />
            <YouTubePlayer />
            <CardGrid />
            <Reviews />
            <FAQ />
            <CountdownBanner />
 */}

        </>
    );
};

export default Banner;