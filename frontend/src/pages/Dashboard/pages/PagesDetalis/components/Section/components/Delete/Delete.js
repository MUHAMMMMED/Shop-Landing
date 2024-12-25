import React from 'react'; // Importing React to use JSX and React features
import { MdDeleteOutline } from "react-icons/md"; // Importing the MdDeleteOutline icon for the delete button
import AxiosInstance from '../../../../../../../../Authentication/AxiosInstance';
import Config from '../../../../../../../../components/config'; // Importing configuration file to access the base URL
import { IconButton } from '../../SectionStyles'; // Importing the styled IconButton component from SectionStyles

export default function Delete({ sectionId, fetchPage }) {
    // Function to handle the delete action
    const handleDelete = async () => {
        // Prompting the user with a confirmation dialog to ensure they want to delete the section
        const isConfirmed = window.confirm('Are you sure you want to delete this section?');
        if (isConfirmed) {  // If the user confirms, proceed with deletion
            try {
                // Sending a DELETE request to remove the section using the sectionId from the backend
                await AxiosInstance.delete(`${Config.baseURL}/api/content/sections/${sectionId}/`);
                // Refreshing the page data after successful deletion by calling fetchPage()
                fetchPage();
            } catch (error) {  // Handling errors if the deletion fails
                console.error('Error deleting section:', error);  // Logging the error to the console
            }
        }
    };

    return (
        <>
            {/* Rendering the IconButton which triggers the delete function when clicked */}
            <IconButton aria-label="Delete" data-tooltip="Delete" onClick={handleDelete}>
                <MdDeleteOutline />  {/* Displaying the delete icon inside the button */}
            </IconButton>
        </>
    );
}