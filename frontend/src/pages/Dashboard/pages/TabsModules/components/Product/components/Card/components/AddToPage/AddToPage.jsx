
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../../../../../../../../Authentication/AxiosInstance';
import Config from '../../../../../../../../../../components/config';

export default function AddToPage({ Id, pageId, sectionId, module_name }) {
    const navigate = useNavigate();

    const data = {
        pageId: pageId,
        sectionId: sectionId,
        Id: Id,
        moduleName: module_name
    }

    const handleAddToPage = async () => {
        try {
            // Send POST request with data to API endpoint
            await AxiosInstance.post(`${Config.baseURL}/api/content/add-module-to-page/`, data);
            // Navigate to the page after successful response
            navigate(`/page-edit/${pageId}`);
        } catch (error) {
            // Handle errors
            console.error('Error adding product to page', error);
        }
    };

    return (
        <button className="tab-card-button" onClick={handleAddToPage}>
            Add to page {pageId}, {sectionId}
        </button>
    );
}