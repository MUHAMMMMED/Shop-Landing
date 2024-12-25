import React, { useState } from 'react'; // Importing React and useState for managing component state
import { FiEye, FiEyeOff } from "react-icons/fi"; // Importing icons to display when active or inactive
import AxiosInstance from '../../../../../../../../../../Authentication/AxiosInstance'; // Importing Axios instance for making authenticated requests
import Config from '../../../../../../../../../../components/config'; // Importing config to use base URL
import { IconButton } from '../../ModulesStyles'; // Importing a custom-styled IconButton component

// Functional component for handling active/inactive state of a mobile module
export default function ActiveMobile({ module, componentType, fetchPage }) {
    // Check if the component is currently active based on the is_desktop property (if it's 'True')
    const isActive = module?.[componentType]?.is_desktop === 'True';

    // Set up state variables for loading and active state
    const [loading, setLoading] = useState(false); // Loading state to manage button's loading state
    const [activeState, setActiveState] = useState(isActive); // Active state to manage whether the component is active or inactive
    let Type; // Variable to hold the module type value

    // Function to toggle the active state when the button is clicked
    const toggleActiveState = async () => {
        setLoading(true); // Set loading state to true when the request is being processed

        // Set the Type value based on the componentType (header, content, slide, footer)
        if (componentType === 'header') {
            Type = 1; // For 'header', Type is 1
        } else if (componentType === 'content') {
            Type = 2; // For 'content', Type is 2
        } else if (componentType === 'slide') {
            Type = 3; // For 'slide', Type is 3
        } else if (componentType === 'footer') {
            Type = 4; // For 'footer', Type is 4
        } else {
            console.error("Unknown component type:", componentType); // Log an error if the componentType is unknown
            return; // Exit the function if the type is unknown
        }

        const newActiveState = !activeState; // Toggle the active state (if active, make inactive and vice versa)

        // Prepare the payload to send in the API request
        const payload = {
            moduleName: Type, // Set moduleName based on the component type
            moduleId: module[componentType]?.id, // Use the correct key to access the module ID
            isActive: newActiveState, // The new active state
            DeviceTYPES: 'mobile', // Specify that this is for the mobile device
        };

        try {
            // Make the API request to update the active state using AxiosInstance
            await AxiosInstance.post(`${Config.baseURL}/api/content/modules/active-state/`, payload);
            setActiveState(newActiveState); // Update the active state after a successful request
            fetchPage(); // Call the fetchPage function to refresh the data
            console.log('Status updated successfully!'); // Log a success message
        } catch (error) {
            console.error("Error updating status:", error); // Log the error if the request fails

        } finally {
            setLoading(false); // Set loading to false after the request is completed (whether successful or not)
        }
    };

    // This section is redundant since Type is already being set inside the toggleActiveState function above.
    // If we wanted to keep this structure, we would move this logic inside the function itself, not here.

    return (
        <>
            {/* IconButton is a styled button component, used to trigger the toggleActiveState function when clicked */}
            <IconButton
                onClick={toggleActiveState} // Call toggleActiveState when the button is clicked
                aria-label={activeState ? "Active" : "Inactive"} // Accessibility label for the button (active or inactive)
                data-tooltip={activeState ? "Active" : "Inactive"} // Tooltip text displayed when hovering over the button
                disabled={loading} // Disable the button if it's in a loading state
            >
                {/* Conditionally render loading text or icons based on loading state and activeState */}
                {loading ? (
                    <span>...</span>  // Show '...' while the request is loading
                ) : activeState ? (
                    <FiEye />  // Show 'FiEye' icon when the component is active
                ) : (
                    <FiEyeOff />  // Show 'FiEyeOff' icon when the component is inactive
                )}
            </IconButton>
        </>
    );
}