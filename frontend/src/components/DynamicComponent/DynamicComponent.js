import React from 'react';
import Banner from '../Banner/Banner';
import Header from '../Header/Header';
import Testimonial from '../Testimonial/Testimonial';


const DynamicComponent = ({ component }) => {

    switch (component.type) {
        case 'header':
            return <Header content={component.content} />;
        case 'banner':
            return <Banner content={component.content} />;
        case 'testimonial':
            return <Testimonial content={component.content} />;
        default:
            return null;


    }
};

export default DynamicComponent;