
import React from 'react';
import styled from 'styled-components';

const DeviceSelector = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    padding: 10px;

    /* Responsive Styles */
    @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const IconSelector = styled.div`
    display: flex;
    align-items: center;

    /* Optional: Add responsive styles if needed */
`;

const DeviceSelect = styled.select`
    padding: 5px;
    font-size: 16px;
    width: 150px; /* Adjust as needed */

    @media (max-width: 600px) {
        width: 100%;
        margin-top: 10px;
    }
`;

const ThemesTYPESLabel = styled.span`
    font-size: 16px;
    /* Adjust font size or other styles as needed */

    @media (max-width: 600px) {
        margin-top: 10px;
    }
`;

const ThemesTYPES = () => {


    return (
        <DeviceSelector>
            <IconSelector>

            </IconSelector>
            <DeviceSelect className="device-select">
                <option value="classic">كلاسيكو</option>
                <option value="modern">مودرن</option>
                <option value="simple">التالتة</option>



            </DeviceSelect>

        </DeviceSelector>
    );
};

export default ThemesTYPES;