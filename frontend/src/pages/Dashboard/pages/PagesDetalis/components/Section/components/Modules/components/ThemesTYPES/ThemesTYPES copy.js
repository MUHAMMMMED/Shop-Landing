// ThemesTYPES.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
    const { id } = useParams();

    const [page, setPage] = useState([]);


    // Details


    const fetchPagesDetalis = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/pages/${id}/`);
            setPage(response.data); // Set the state to response.data
        } catch (error) {
            console.error('Error fetching page', error);
        }
    };

    useEffect(() => {
        fetchPagesDetalis();
    }, [id]);


    return (
        <DeviceSelector>
            <IconSelector>
                {page.title}
                {/* If you have an icon, include it here */}
                {/* <RiFocusMode size={20} /> */}
                {/* Example: Add an icon component if needed */}
            </IconSelector>
            <DeviceSelect className="device-select">
                <option value="classic">كلاسيكو</option>
                <option value="modern">مودرن</option>
                <option value="third">التالتة</option>
            </DeviceSelect>
            {/* <ThemesTYPESLabel>ThemesTYPES</ThemesTYPESLabel> */}
        </DeviceSelector>
    );
};

export default ThemesTYPES;