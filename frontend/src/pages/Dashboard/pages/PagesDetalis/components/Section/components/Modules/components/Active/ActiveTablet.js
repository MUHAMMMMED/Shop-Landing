import React, { useState } from 'react'; // Import React and useState hook for managing state
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import icons for active and inactive states
import AxiosInstance from '../../../../../../../../../../Authentication/AxiosInstance'; // Import the Axios instance for making API calls
import Config from '../../../../../../../../../../components/config'; // Import configuration settings such as base URL
import { IconButton } from '../../ModulesStyles'; // Import custom styled IconButton component

// The ActiveTablet component is responsible for managing the active state of tablet modules.
export default function ActiveTablet({ module, componentType, fetchPage }) {
    // Check if the component is active (if the is_desktop property is set to 'True')
    const isActive = module?.[componentType]?.is_desktop === 'True';

    // useState hooks to manage loading state and active state
    const [loading, setLoading] = useState(false); // Track if the action is in progress
    const [activeState, setActiveState] = useState(isActive); // Track whether the module is active or inactive

    let Type; // Variable to store the module type

    // Function to handle the toggling of active/inactive state
    const toggleActiveState = async () => {
        setLoading(true); // Set loading state to true when an action is in progress

        // Assign the Type based on the componentType
        if (componentType === 'header') {
            Type = 1; // Type 1 for header component
        } else if (componentType === 'content') {
            Type = 2; // Type 2 for content component
        } else if (componentType === 'slide') {
            Type = 3; // Type 3 for slide component
        } else if (componentType === 'footer') {
            Type = 4; // Type 4 for footer component
        } else {
            console.error("Unknown component type:", componentType); // Log error for unknown componentType
            return; // Stop further execution if the componentType is unknown
        }

        // Toggle the current active state (if active, make it inactive and vice versa)
        const newActiveState = !activeState;

        // Prepare the payload for the API request to update the module's active state
        const payload = {
            moduleName: Type, // Use the appropriate Type for the module
            moduleId: module[componentType]?.id, // Access the module ID based on the componentType
            isActive: newActiveState, // Set the new active state
            DeviceTYPES: 'tablet', // Specify that this is for the tablet device
        };

        try {
            // Send a POST request using AxiosInstance to update the active state of the module
            await AxiosInstance.post(`${Config.baseURL}/api/content/modules/active-state/`, payload);
            setActiveState(newActiveState); // Update the local active state after a successful request
            fetchPage(); // Refresh the page or data after the status is updated
            console.log('Status updated successfully!'); // Log success message
        } catch (error) {
            // Log error if the request fails
            console.error("Error updating status:", error);
        } finally {
            setLoading(false); // Set loading state to false after the request is completed
        }
    };

    // This section is redundant and should be removed since Type is already set inside toggleActiveState.
    // Here, Type is being set again based on componentType, but it should be handled only inside the toggleActiveState function.

    return (
        <>
            {/* IconButton component used for the button to toggle the active state */}
            <IconButton
                onClick={toggleActiveState} // Trigger the toggleActiveState function when the button is clicked
                aria-label={activeState ? "Active" : "Inactive"} // Accessibility label for the button (Active/Inactive)
                data-tooltip={activeState ? "Active" : "Inactive"} // Tooltip text displayed on hover
                disabled={loading} // Disable the button while the request is in progress (loading)
            >
                {/* Conditionally render loading text or icons based on loading state and activeState */}
                {loading ? (
                    <span>...</span> // Show a loading text while the request is being processed
                ) : activeState ? (
                    <FiEye /> // Display the 'eye' icon when the module is active
                ) : (
                    <FiEyeOff /> // Display the 'eye off' icon when the module is inactive
                )}
            </IconButton>
        </>
    );
}