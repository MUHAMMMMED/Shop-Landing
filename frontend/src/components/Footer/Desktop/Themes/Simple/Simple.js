import React from 'react';
import styled from 'styled-components';
import './Simple.css';
import { } from './SimpleStyles';

const FooterContainer = styled.footer`
    background-color: var(--secondary-color);
    color: red;
    padding: 20px;
    text-align: center;
    font-family: var(--font-family);
    box-shadow: var(--box-shadow);
`;
export default function Simple({ Type, Device }) {
  return (
    <div style={{ background: "green", color: '#fff', float: 'right', width: '100%', marginBottom: '20px' }}>
      <FooterContainer>
        <p>&copy; 2024 جميع الحقوق محفوظة.</p>
      </FooterContainer>
    </div>



  )
}


