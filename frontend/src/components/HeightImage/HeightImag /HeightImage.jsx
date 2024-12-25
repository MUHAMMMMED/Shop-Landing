import React from 'react';
import "./HeightImage.css";
import Image from "./HeightImage.png";

export default function HeightImage() {
    return (
        <div className='height_image-grid'>

            <img src={Image} alt='' className="height_image-grid-image" />

        </div>
    )
}
