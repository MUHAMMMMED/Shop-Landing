// import axios from 'axios';
import React from 'react';
import { FaCopy } from 'react-icons/fa';
import { IconButton } from '../../ModulesStyles';
export default function Clon({ ModuleId, fetchPage }) {
    // const handleClone = async () => {
    //     try {
    //         await axios.post(`http://127.0.0.1:8000/api/content/modules/${ModuleId}/clone/`);
    //         fetchPage();  
    //     } catch (error) {
    //         console.error('Error cloning Module:', error);
    //     }
    // };
    return (
        <>
            <IconButton aria-label="Copy" data-tooltip="Copy"
            // onClick={handleClone}
            >
                <FaCopy />
            </IconButton>
        </>
    )
}

