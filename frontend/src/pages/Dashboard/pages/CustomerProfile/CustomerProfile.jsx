import React, { useEffect, useState } from 'react'; // Import React and necessary hooks
import { useParams } from 'react-router-dom'; // Import useParams hook for extracting parameters from the URL
import AxiosInstance from '../../../../Authentication/AxiosInstance'; // Axios instance for making API calls
import ErrorPage from '../../../../components/Loading/ErrorPage'; // Error page component to display errors
import Loading from '../../../../components/Loading/Loading'; // Loading component to show during data fetch
import Config from '../../../../components/config'; // Configuration file containing the API base URL
import DasHeader from '../../components/DasHeader/DasHeader'; // Import dashboard header component
import Sidebar from '../../components/Sidebar/Sidebar'; // Import sidebar component
import ProfileCard from './components/ProfileCard/ProfileCard'; // Profile card component to display customer details

export default function CustomerProfile() {
    // State for managing the selected language (default is English)
    const [language, setLanguage] = useState('en');

    // useParams hook to extract the 'id' from the URL
    const { id } = useParams();

    // State to store the customer profile data fetched from the API
    const [customer, setCustomer] = useState(null);

    // State to track loading status (whether data is still being fetched)
    const [loading, setLoading] = useState(true);

    // State to store any error messages from the API
    const [error, setError] = useState(null);

    // Function to update the language state when selected in the DasHeader component
    const updateLanguage = (newLanguage) => {
        setLanguage(newLanguage);
    };

    // Function to fetch customer data from the API
    const fetchData = async () => {
        try {
            // Check if the 'id' is available before making the request
            if (!id) return;

            // Make a GET request to fetch the customer data by id
            const response = await AxiosInstance.get(`${Config.baseURL}/api/orders/customer/${id}/`);

            // Update the customer state with the fetched data
            setCustomer(response.data);
        } catch (error) {
            // Log error for debugging purposes
            console.error('Fetch error:', error);

            // Set error state with error message from the response (or a default message)
            setError(error.response?.data || "You do not have access to view this page.");
        } finally {
            // Set loading to false after the fetch attempt (success or failure)
            setLoading(false);
        }
    };

    // useEffect hook to call fetchData when the component mounts or when 'id' changes
    useEffect(() => {
        fetchData(); // Trigger the fetchData function
    }, [id]); // Dependency array contains 'id', so the fetchData function runs again if 'id' changes

    // Conditional rendering: show Loading component while data is being fetched
    if (loading) {
        return <Loading />; // Return Loading component until data is fetched
    }

    // Conditional rendering: show ErrorPage component if there was an error during data fetch
    if (error) {
        return <ErrorPage head="Error Occurred" error={error} />; // Display error page with error message
    }

    return (
        <>
            {/* DasHeader component displays the dashboard header with language selection */}
            <DasHeader language={language} updateLanguage={updateLanguage} />

            {/* Dashboard wrapper, adjusts for RTL (Right-To-Left) or LTR (Left-To-Right) based on the selected language */}
            <div className={`dashboard ${language === 'ar' ? 'rtl' : 'ltr'}`}>

                {/* Sidebar for navigation in the dashboard */}
                <Sidebar language={language} />

                {/* Main content area */}
                <main className={`content ${language === 'ar' ? 'rtl' : 'ltr'}`}>

                    {/* ProfileCard component to display the fetched customer data */}
                    <div style={{ width: '100%', padding: '5px', margin: '0' }}>
                        <ProfileCard language={language} data={customer} />
                    </div>
                </main>
            </div>
        </>
    );
}