
import React from 'react';
import { RiAddCircleFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../../../../../../Authentication/AxiosInstance';
import Config from '../../../../../../../../components/config';
import './Add.css';
export default function Add({ Id, pageId, sectionId, module_name, language }) {
    const navigate = useNavigate();

    const data = {
        pageId: pageId,
        sectionId: sectionId,
        Id: Id,
        moduleName: module_name
    }

    const handleAdd = async () => {
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
        <>

            <button className="Add-button" onClick={handleAdd}>
                {language === 'ar' ? 'إضافة ' : 'Add '}
                <RiAddCircleFill />
            </button>

        </>
    );
}