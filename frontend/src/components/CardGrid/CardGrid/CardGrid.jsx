
import React from "react";
import "./CardGrid.css";
import skincareImg from "./Collection05.webp";
import bodyCareImg from "./Collection06.webp";
import makeupImg from "./Collection07.webp";

const CardGrid = () => {
    const cards = [
        {
            title: "Skincare",
            description: "Radiate naturally with our skincare essentials.",
            image: skincareImg,
        },
        {
            title: "Body & Hair Care",
            description: "Nourish and revitalize from head to toe.",
            image: bodyCareImg,
        },
        {
            title: "Make-Up",
            description: "Enhance your allure with quality elegance.",
            image: makeupImg,
        },
    ];

    return (
        <div className="card-grid">
            {cards.map((card, index) => (
                <div className="card" key={index}>
                    <div
                        className="card-image"
                        style={{ backgroundImage: `url(${card.image})` }}
                    >
                        <div className="card-overlay">
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardGrid;