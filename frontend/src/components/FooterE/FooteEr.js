import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    background-color: var(--secondary-color);
    color: red;
    padding: 20px;
    text-align: center;
    font-family: var(--font-family);
    box-shadow: var(--box-shadow);
`;

const Footer = () => {
    return (
        <FooterContainer>
            <p>&copy; 2024 جميع الحقوق محفوظة.</p>
        </FooterContainer>
    );
};

export default Footer;