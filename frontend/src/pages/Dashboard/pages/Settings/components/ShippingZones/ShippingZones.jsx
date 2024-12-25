import React, { useEffect, useState } from 'react'; // Import React and hooks (useEffect, useState)
import AxiosInstance from '../../../../../../Authentication/AxiosInstance';
import ErrorPage from '../../../../../../components/Loading/ErrorPage'; // Import ErrorPage component to display error messages
import Loading from '../../../../../../components/Loading/Loading'; // Import Loading component to show a loading state
import Config from "../../../../../../components/config"; // Import configuration containing the base URL for API
import './ShippingZones.css'; // Import the CSS file for styling
import ShippingCard from "./components/ShippingCard/ShippingCard"; // Import ShippingCard component for rendering country data
import CreateCountry from './components/ShippingCard/components/Country/CreateCountry/CreateCountry'; // Import component to create new countries

const ShippingZones = () => {
    // State for storing country data fetched from the API
    const [countryData, setCountryData] = useState([]);

    // State to track loading status (whether the data is still being fetched)
    const [loading, setLoading] = useState(true);

    // State to store any error messages from the API
    const [error, setError] = useState(null);

    // Function to fetch country data from the API
    const fetchCountry = async () => {
        try {
            // Send a GET request to fetch shipping countries
            const response = await AxiosInstance.get(`${Config.baseURL}/api/orders/shipping-countries_dash/`);


            // Set the fetched country data into state
            setCountryData(response.data);
        } catch (error) {
            // Log error for debugging purposes
            console.error('Fetch error:', error);

            // Set error state with the error message from the response (or a default message if none)
            setError(error.response?.data || "You do not have access to view this page.");
        } finally {
            // Set loading to false after the fetch attempt (whether it was successful or not)
            setLoading(false);
        }
    };

    // useEffect hook to fetch the country data when the component mounts
    useEffect(() => {
        fetchCountry(); // Trigger the fetchCountry function
    }, []); // Empty dependency array ensures the function runs only once when the component is mounted

    // Conditional rendering: show the Loading component while data is being fetched
    if (loading) {
        return <Loading />; // Show the Loading component until data is fetched
    }

    // Conditional rendering: show ErrorPage if there was an error during data fetch
    if (error) {
        return <ErrorPage head="Error Occurred" error={error} />; // Display error page with error message
    }

    return (
        <div className="shipping-zones">
            {/* Main container for shipping zones */}
            <div className="shipping-header">
                {/* Shipping header section */}
                <h3>Shipping & Delivery</h3>

                {/* CreateCountry component to allow creating a new country */}
                <CreateCountry fetchCountry={fetchCountry} />
            </div>

            {/* Map through the countryData array and render ShippingCard for each item */}
            {countryData.map(item => (
                <ShippingCard key={item.id} data={item} fetchCountry={fetchCountry} />
            ))}
        </div>
    );
};

export default ShippingZones;