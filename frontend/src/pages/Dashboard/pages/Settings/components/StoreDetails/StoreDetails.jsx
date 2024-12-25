import React, { useEffect, useRef, useState } from 'react'; // Import React hooks: useEffect, useRef, useState
import AxiosInstance from '../../../../../../Authentication/AxiosInstance'; // Import custom Axios instance for API calls
import Config from "../../../../../../components/config"; // Import configuration to get the base URL of the API
import "./StoreDetails.css"; // Import the CSS file for styling

const StoreDetails = () => {
    // State hooks to manage the component's state
    const [Pages, setPages] = useState([]); // Stores the list of pages fetched from the API
    const [data, setData] = useState({ // Stores the current settings for the store
        home: "",
        about: "",
        privacy: "",
        contactUs: "",
        currency_ar: "",
        currency_en: "",
    });
    const [isNew, setIsNew] = useState(false); // Tracks whether it's a new store settings or updating existing settings
    const [loading, setLoading] = useState(false); // Tracks loading state for API requests
    const [message, setMessage] = useState(""); // Stores success or error messages to be displayed
    const debounceTimeout = useRef(null); // Reference to store the timeout for debouncing user input

    // Function to fetch the list of pages from the API
    const fetchPagesList = async () => {
        try {
            setLoading(true); // Set loading state to true before fetching data
            const response = await AxiosInstance.get(`${Config.baseURL}/api/content/pages/`); // Fetch pages from API
            setPages(response.data); // Store the fetched pages in the state
        } catch (error) {
            console.error('Error fetching pages:', error); // Log any errors that occur during fetch
        } finally {
            setLoading(false); // Set loading state to false after fetching data
        }
    };

    useEffect(() => {
        fetchPagesList(); // Call the function to fetch the pages when the component mounts
    }, []); // Empty dependency array ensures the function is called once after the initial render

    // Function to fetch the store settings from the API
    const fetchSettings = async () => {
        try {
            setLoading(true); // Set loading to true while fetching settings
            const response = await AxiosInstance.get(`${Config.baseURL}/api/content/settings/`); // Fetch store settings
            if (response.data) {
                setData(response.data); // If settings exist, store them in the state
                setIsNew(false); // Mark as existing settings
            } else {
                setIsNew(true); // If no settings exist, set to "new" state
            }
        } catch (error) {
            console.error('Error fetching settings:', error); // Log any errors during settings fetch
            setIsNew(true); // Mark as "new" if there is an error fetching settings
        } finally {
            setLoading(false); // Set loading to false after the API request
        }
    };

    useEffect(() => {
        fetchSettings(); // Fetch settings when the component mounts
    }, []); // Empty dependency array ensures the function is called once on mount

    // Function to handle saving the settings

    const handleSave = async () => {
        try {
            const method = isNew ? 'post' : 'put';
            const url = `${Config.baseURL}/api/content/settings/`;
            await AxiosInstance[method](url, data, {
                headers: { 'Content-Type': 'application/json' },
            });
            setMessage("Changes saved successfully!");
            setIsNew(false);
        } catch (error) {
            console.error('Error saving settings:', error);
            setMessage("Failed to save changes. Please try again.");
        }
    };

    // Function to handle changes in form fields with debouncing to delay save action
    const handleChange = (field, value) => {
        const updatedData = { ...data, [field]: value }; // Update the state with the changed field value
        setData(updatedData); // Set the updated data in the state

        // Clear previous timeout if it exists
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        // Set a new timeout for saving the changes after 1 second
        debounceTimeout.current = setTimeout(() => {
            handleSave(updatedData); // Trigger the save after the delay
        }, 1000);
    };

    return (
        <div className="notification-settings">
            <div className="category">
                <h2>Pages</h2>
                {/* Display message if there is a success or error message */}
                {message && <p style={{ textAlign: 'center', width: '100%', padding: '5px' }}>{message}</p>}
                {loading && <p>Loading...</p>} {/* Show loading message if data is being fetched */}

                <table> {/* Table to display pages */}
                    <thead>
                        <tr>
                            <th>Page Name</th>
                            <th>Page Selected</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map through fields to create table rows for each page */}
                        {["home", "about", "privacy", "contactUs"].map((field) => (
                            <tr key={field}>
                                <td>{field.charAt(0).toUpperCase() + field.slice(1)}</td>
                                <td>
                                    {/* Dropdown to select the page for each section */}
                                    <select
                                        name={field}
                                        value={data[field]} // Bind the current value to the data state
                                        onChange={(e) => handleChange(field, e.target.value)} // Handle change when the user selects a page
                                    >
                                        <option value="">Select page</option>
                                        {/* Map through Pages and create options for the dropdown */}
                                        {Pages.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.title}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>Currency</td>
                            <td>
                                {/* Input fields for currency in Arabic and English */}
                                <input style={{ width: '49%', marginRight: '2%' }}
                                    type="text"
                                    placeholder="Currency (AR)"
                                    value={data.currency_ar} // Bind value to currency_ar in the state
                                    onChange={(e) => handleChange("currency_ar", e.target.value)} // Handle change for Arabic currency
                                />
                                <input style={{ width: '49%' }}
                                    type="text"
                                    placeholder="Currency (EN)"
                                    value={data.currency_en} // Bind value to currency_en in the state
                                    onChange={(e) => handleChange("currency_en", e.target.value)} // Handle change for English currency
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StoreDetails;