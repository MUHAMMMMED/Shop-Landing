import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../themes/ThemeContext';

const TestimonialWrapper = styled.div`
  background-color: ${props => props.theme.secondary_color};
  color: white;
  padding: 50px 20px;
  text-align: center;
`;

const Testimonial = ({ content }) => {
    const theme = useContext(ThemeContext);
    return (
        <TestimonialWrapper theme={theme}>
            <p>"{content.quote}"</p>
            <h4>- {content.author}</h4>
        </TestimonialWrapper>
    );
};

export default Testimonial;