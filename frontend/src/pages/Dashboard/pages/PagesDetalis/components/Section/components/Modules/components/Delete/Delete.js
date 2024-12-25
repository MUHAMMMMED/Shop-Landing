import React from 'react'; // Import React to define the component
import { MdDeleteOutline } from "react-icons/md"; // Import the delete icon from react-icons
import AxiosInstance from '../../../../../../../../../../Authentication/AxiosInstance'; // Import AxiosInstance for making authenticated API calls
import Config from '../../../../../../../../../../components/config'; // Import configuration settings like base URL
import { IconButton } from '../../ModulesStyles'; // Import a custom-styled button component (IconButton)

// The Delete component handles the deletion of a module by its moduleId.
export default function Delete({ moduleId, fetchPage }) {

    // handleDelete function is triggered when the delete button is clicked
    const handleDelete = async () => {
        // Ask the user for confirmation before proceeding with deletion
        const isConfirmed = window.confirm('Are you sure you want to delete this Modules?');

        // If the user confirms the deletion, proceed with making the delete request
        if (isConfirmed) {
            try {
                // Send a DELETE request to the server to delete the module with the given moduleId
                await AxiosInstance.delete(`${Config.baseURL}/api/content/modules/${moduleId}/`);

                // After the deletion is successful, call fetchPage to refresh the data (e.g., re-fetch the updated list of modules)
                fetchPage();
            } catch (error) {
                // Log any errors that occur during the delete request
                console.error('Error deleting Modules:', error);
                // Optionally, display an error message if the deletion fails (commented out here)
                // alert('Failed to delete Modules. Please try again.');
            }
        }
    };

    return (
        <>
            {/* The IconButton triggers the handleDelete function when clicked */}
            <IconButton aria-label="Delete" data-tooltip="Delete" onClick={handleDelete}>
                {/* The MdDeleteOutline icon is displayed inside the button */}
                <MdDeleteOutline />
            </IconButton>
        </>
    );
}