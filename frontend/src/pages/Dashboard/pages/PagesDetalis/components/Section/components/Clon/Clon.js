import React, { useEffect, useState } from 'react'; // Importing React hooks
import { FaCopy } from 'react-icons/fa'; // Importing the FaCopy icon for the button
import AxiosInstance from '../../../../../../../../Authentication/AxiosInstance'; // Importing custom AxiosInstance for API requests
import Config from '../../../../../../../../components/config'; // Importing configuration file to access the base URL
import { IconButton } from '../../SectionStyles'; // Importing styled IconButton from SectionStyles
import './styles.css'; // Importing CSS file for styling the component

export default function Clon({ sectionId, fetchPage, currentPageId }) {
    // States for managing page data, showing the select popup, selected page, success/error messages, and loading state
    const [pages, setPages] = useState([]);  // State to store the list of pages
    const [showSelect, setShowSelect] = useState(false);  // State to control showing the select page popup
    const [selectedPageId, setSelectedPageId] = useState(null); // State to store the selected page ID (default is null)
    const [successMessage, setSuccessMessage] = useState('');  // State to store success message
    const [loading, setLoading] = useState(false);  // State to manage loading status for the cloning process

    // Function to fetch the list of pages from the backend
    const fetchPagesList = async () => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/content/pages/`);  // Sending GET request to fetch pages
            const pagesList = response.data;  // Storing the fetched list of pages in the state
            setPages(pagesList);

            // If there is only one page, set its ID as the selected page
            if (pagesList.length === 1) {
                setSelectedPageId(pagesList[0].id);  // Automatically selecting the first page
            }
        } catch (error) {
            console.error('Error fetching pages', error);  // Handling any error during page fetching
        }
    };

    // Function to handle the clone action when the user submits the form
    const handleClone = async () => {
        // If no page is selected, show a message and stop the process
        if (!selectedPageId) {
            setSuccessMessage('يرجى اختيار صفحة.');  // Arabic message asking to select a page
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);  // Resetting the success message after 3 seconds
            return;
        }

        setLoading(true);  // Setting loading state to true while processing the cloning action
        try {
            // Making a POST request to clone the section to the selected page
            await AxiosInstance.post(`${Config.baseURL}/api/sections/${sectionId}/clone/`, {
                page_id: selectedPageId,  // Sending the selected page ID in the request
            });
            fetchPage();  // Fetching the updated page after cloning
            setShowSelect(false);  // Hiding the select page popup
            setSuccessMessage('تم النسخ بنجاح!');  // Arabic success message
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);  // Resetting the success message after 3 seconds
        } catch (error) {
            console.error('Error cloning section:', error);  // Logging any error during the cloning process
            setSuccessMessage('فشل النسخ. حاول مرة أخرى.');  // Arabic failure message
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);  // Resetting the failure message after 3 seconds
        } finally {
            setLoading(false);  // Resetting loading state after the process is complete
        }
    };

    // Using useEffect to fetch the list of pages when the component is mounted
    useEffect(() => {
        fetchPagesList();  // Calling the function to fetch the pages list
    }, []);  // Empty dependency array to run only once when the component is mounted

    // Using useEffect to update the selected page when the currentPageId prop changes
    useEffect(() => {
        if (currentPageId) {
            setSelectedPageId(currentPageId);  // Setting the selected page ID to the current page ID
        }
    }, [currentPageId]);  // Re-running this effect when currentPageId changes

    return (
        <>
            {/* IconButton to trigger the popup for selecting a page */}
            <IconButton
                className="icon-button"
                aria-label="Copy"
                data-tooltip="Copy"
                onClick={() => {
                    setShowSelect(true);  // Showing the select page popup
                    if (pages.length === 1) {
                        setSelectedPageId(pages[0].id);  // Automatically select the first page if only one page exists
                    }
                }}
            >
                <FaCopy />  {/* Rendering the copy icon */}
            </IconButton>

            {/* Conditionally rendering the select page popup if showSelect is true */}
            {showSelect && (
                <div className="popup-overlay">
                    <div className="clone-popup">
                        {/* Button to close the popup */}
                        <button className="close-button" onClick={() => setShowSelect(false)}>X</button>
                        <h4 style={{ color: '#000', fontSize: '13px' }}>اختر صفحة للنسخ إليها</h4>  {/* Header for the select page popup */}

                        {/* Dropdown to select a page */}
                        <select
                            className="device-select"
                            value={selectedPageId || ''}  // Setting the value of the select dropdown to the selected page ID
                            onChange={(e) => setSelectedPageId(e.target.value)}  // Updating selectedPageId when user selects a page
                        >
                            <option value=''>اختر صفحة</option>  {/* Placeholder option */}
                            {pages.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.title}  {/* Displaying the title of each page as an option */}
                                </option>
                            ))}
                        </select>

                        {/* Button to trigger the cloning action */}
                        <button className="clone-button" onClick={handleClone}>
                            {loading ? (
                                <div className="loader"></div>

                            ) : (
                                'نسخ'

                            )}
                        </button>

                        {/* Displaying success or failure message */}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                    </div>
                </div>
            )}
        </>
    );
}