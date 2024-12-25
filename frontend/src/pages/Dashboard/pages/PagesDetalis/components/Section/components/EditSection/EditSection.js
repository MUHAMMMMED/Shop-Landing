import React, { useState } from 'react'; // Importing React and useState hook for state management
import { TbEdit } from "react-icons/tb"; // Importing the TbEdit icon for the edit button
import styled from 'styled-components'; // Importing styled-components to style the modal and other elements
import AxiosInstance from '../../../../../../../../Authentication/AxiosInstance'; // Axios instance for API calls
import Config from '../../../../../../../../components/config'; // Configuration for base URL
import { IconButton } from '../../SectionStyles'; // Styled IconButton component for UI

export default function EditableSection({ section, fetchPage }) {
    // State hooks to manage the modal visibility, form data, and feedback messages
    const [isModalOpenSection, setIsModalOpenSection] = useState(false);
    const [title, setTitle] = useState(section?.title);  // Initialize title with the current section title (optional chaining)
    const [error, setError] = useState(null);  // State for error message
    const [success, setSuccess] = useState(null);  // State for success message

    // Function to open the modal when the "Edit" button is clicked
    const handleEditClick = () => {
        setIsModalOpenSection(true);
    };

    // Function to close the modal and reset any feedback/error messages
    const handleClose = () => {
        setIsModalOpenSection(false);
        setError(null);
        setSuccess(null);
        setTitle(section?.title);  // Reset the title to the original section title
    };

    // Function to handle saving the edited section data
    const handleSave = async (e) => {
        e.preventDefault();  // Prevent the form from reloading the page

        // Object containing the updated section data
        const updatedSection = {
            title,
            page: section?.page,
            unique_id: section?.unique_id,
            order: section?.order,
            mobile_order: section?.mobile_order,
            tablet_order: section?.tablet_order,
            desktop_order: section?.desktop_order
        };

        try {
            // Making an API call to update the section with the new data
            await AxiosInstance.put(`${Config.baseURL}/api/content/sections/${section.id}/`, updatedSection);
            setSuccess('Section updated successfully!');  // Success feedback message
            fetchPage();  // Fetch updated page data
            handleClose();  // Close the modal on successful save
        } catch (error) {
            console.error('Error updating Section:', error.response ? error.response.data : error);
            setError('Error updating section. Please try again.');  // Error feedback message
        }
    };

    return (
        <>
            {/* IconButton triggers the handleEditClick function when clicked */}
            <IconButton aria-label="Edit" data-tooltip="Edit" onClick={handleEditClick}>
                <TbEdit />  {/* Displaying the edit icon inside the button */}
            </IconButton>

            {/* Modal window appears if isModalOpenSection state is true */}
            {isModalOpenSection && (
                <OverlaySection>
                    <ModalSection>
                        <h2>Update Section</h2>
                        {/* Display error and success messages if they exist */}
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                        {success && <SuccessMessage>{success}</SuccessMessage>}
                        <form onSubmit={handleSave}>  {/* Form to edit the section */}
                            <div>
                                <label className='Section-label'>Title:</label>
                                <input
                                    style={{ height: "40px" }}
                                    type="text"
                                    value={title}  // Binding input value to title state
                                    onChange={(e) => setTitle(e.target.value)}  // Updating the title state when input changes
                                    required />  {/* Input field for title */}

                            </div>
                            {/* Button group for save and cancel actions */}
                            <ButtonGroup>
                                <button type="submit" className="section-btn save-btn">Save</button>
                                <button type="button" onClick={handleClose} className="section-btn cancel-btn">Cancel</button>
                            </ButtonGroup>
                        </form>
                    </ModalSection>
                </OverlaySection>
            )}
        </>
    );
}

// Styled-components to define custom styles for the modal and its components
const OverlaySection = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);  // Semi-transparent background for the modal overlay
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;  // Ensuring the modal appears above other content
`;

const ModalSection = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    text-align: center;

    h2 {
        margin-bottom: 15px;
        color: #333;
    }
    .Section-label { color: #333; font-size: 15px; }

    input {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
    }

    input:focus {
        border-color: #0000;
        outline: none;
    }

    .section-btn {
        font-size: 16px;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    .save-btn {
        background-color: #000;
        color: #fff;
    }

    .cancel-btn {
        background-color: red;
        color: #fff;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
`;

const ErrorMessage = styled.p`
    color: red;
    font-weight: bold;
`;

const SuccessMessage = styled.p`
    color: green;
    margin-bottom: 15px;
`;