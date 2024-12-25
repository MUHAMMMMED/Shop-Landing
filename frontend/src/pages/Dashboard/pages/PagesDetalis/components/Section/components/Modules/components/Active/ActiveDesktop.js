import React, { useState } from 'react'; // Importing React and useState for managing state
import { FiEye, FiEyeOff } from "react-icons/fi"; // Importing icons for showing active/inactive states
import AxiosInstance from '../../../../../../../../../../Authentication/AxiosInstance'; // Importing an Axios instance for authenticated requests
import Config from '../../../../../../../../../../components/config'; // Importing the config for base URL
import { IconButton } from '../../ModulesStyles'; // Importing a styled IconButton component

// Functional component to manage the active state of a desktop module
export default function ActiveDesktop({ module, componentType, fetchPage }) {
    // Determine if the component is initially active or inactive based on the module prop
    const isActive = module?.[componentType]?.is_desktop === 'True';

    // Local state to manage the loading state and active state of the component
    const [loading, setLoading] = useState(false); // Loading state to show loading indicator
    const [activeState, setActiveState] = useState(isActive); // Active state to manage whether the component is active or not
    let Type; // Declaring a variable to store the component type based on the componentType prop

    // Function to toggle the active state of the component
    const toggleActiveState = async () => {
        setLoading(true); // Set loading state to true when the user clicks the button

        // Set the Type variable based on the componentType prop
        if (componentType === 'header') {
            Type = 1; // If componentType is 'header', set Type to 1
        } else if (componentType === 'content') {
            Type = 2; // If componentType is 'content', set Type to 2
        } else if (componentType === 'slide') {
            Type = 3; // If componentType is 'slide', set Type to 3
        } else if (componentType === 'footer') {
            Type = 4; // If componentType is 'footer', set Type to 4
        } else {
            console.error("Unknown component type:", componentType); // Log an error if the component type is unknown
            return; // Exit the function if the componentType is unknown
        }

        const newActiveState = !activeState; // Toggle the active state (if it's active, make it inactive and vice versa)

        // Prepare the payload to send in the API request
        const payload = {
            moduleName: Type, // Set moduleName based on the component type
            moduleId: module[componentType]?.id, // Get the module ID for the specified component type
            isActive: newActiveState, // Set the new active state
            DeviceTYPES: 'desktop', // Specify that the device type is desktop
        };

        try {
            // Send the payload to the server using the authenticated Axios instance
            await AxiosInstance.post(`${Config.baseURL}/api/content/modules/active-state/`, payload);
            setActiveState(newActiveState); // Update the active state after the successful API request
            fetchPage(); // Refresh the page to reflect the changes
            console.log('Status updated successfully!'); // Log success message
        } catch (error) {
            console.error("Error updating status:", error); // Log error if the request fails
        } finally {
            setLoading(false); // Set loading state to false after the request is completed (success or failure)
        }
    };

    // This part is redundant as Type is already being set inside the function above
    if (componentType === 'header') {
        Type = 1;
    } else if (componentType === 'content') {
        Type = 2;
    } else if (componentType === 'slide') {
        Type = 3;
    } else if (componentType === 'footer') {
        Type = 4;
    }

    return (
        <>
            {/* IconButton is a styled button that triggers the toggleActiveState function when clicked */}
            <IconButton
                onClick={toggleActiveState} // Handle button click
                aria-label={activeState ? "Active" : "Inactive"} // Provide an accessible label based on the active state
                data-tooltip={activeState ? "Active" : "Inactive"} // Tooltip text based on the active state
                disabled={loading} // Disable the button during the loading state
            >
                {/* Conditionally render loading text or icons based on the loading and activeState */}
                {loading ? (
                    <span>...</span>  // Display '...' text during loading
                ) : activeState ? (
                    <FiEye />  // Show FiEye icon if the component is active
                ) : (
                    <FiEyeOff />  // Show FiEyeOff icon if the component is inactive
                )}
            </IconButton>
        </>
    );
}