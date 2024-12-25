import React, { useEffect, useRef } from 'react';
import './ImageComparison.css';

const afterImage = "https://www.w3schools.com/howto/img_forest.jpg"; // After image
const beforeImage = "https://www.w3schools.com/howto/img_snow.jpg"; // Before image

const ImageComparison = () => {
    const overlayRef = useRef(null);
    const sliderRef = useRef(null);
    const imgRef = useRef(null);
    let clicked = 0;

    useEffect(() => {
        // Initialize comparisons once the component is mounted
        initComparisons();

        return () => {
            window.removeEventListener("mouseup", slideFinish);
            window.removeEventListener("touchend", slideFinish);
        };
    }, []);

    const initComparisons = () => {
        const img = imgRef.current;
        const overlay = overlayRef.current;
        if (img && overlay) {
            compareImages(img, overlay);
        }
    };

    const compareImages = (img, overlay) => {
        const w = img.offsetWidth;
        const h = img.offsetHeight;

        // Set initial width to 50%
        overlay.style.width = (w / 2) + "px";

        // Create slider and set its initial position
        const slider = document.createElement("DIV");
        slider.setAttribute("class", "img-comp-slider");
        overlay.parentElement.insertBefore(slider, overlay);

        slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
        slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";

        // Save reference to the slider
        sliderRef.current = slider;

        // Attach event listeners
        slider.addEventListener("mousedown", slideReady);
        window.addEventListener("mouseup", slideFinish);
        slider.addEventListener("touchstart", slideReady);
        window.addEventListener("touchend", slideFinish);
    };

    const slideReady = (e) => {
        e.preventDefault();
        clicked = 1;
        window.addEventListener("mousemove", slideMove);
        window.addEventListener("touchmove", slideMove);
    };

    const slideFinish = () => {
        clicked = 0;
        window.removeEventListener("mousemove", slideMove);
        window.removeEventListener("touchmove", slideMove);
    };

    const slideMove = (e) => {
        if (clicked === 0) return;

        const pos = getCursorPos(e);
        const w = imgRef.current.offsetWidth;
        if (pos < 0) return;
        if (pos > w) return;

        slide(pos);
    };

    const getCursorPos = (e) => {
        const a = imgRef.current.getBoundingClientRect();
        const x = e.pageX - a.left;
        return x - window.pageXOffset;
    };

    const slide = (x) => {
        const img = imgRef.current;
        const slider = sliderRef.current;

        img.style.width = x + "px";
        slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    };

    return (
        <div className="img-comp-container">
            <div className="img-comp-img">
                <img
                    ref={imgRef}
                    src={afterImage}
                    width="300"
                    height="200"
                    alt="After"
                />
            </div>
            <div ref={overlayRef} className="img-comp-img img-comp-overlay">
                <img
                    src={beforeImage}
                    width="300"
                    height="200"
                    alt="Before"
                />
            </div>
        </div>
    );
};

export default ImageComparison;