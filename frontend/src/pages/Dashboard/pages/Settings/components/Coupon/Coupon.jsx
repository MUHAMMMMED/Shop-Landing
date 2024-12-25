
import React, { useEffect, useState } from 'react'; // Import React and hooks (useEffect, useState)
import AxiosInstance from '../../../../../../Authentication/AxiosInstance';
import ErrorPage from '../../../../../../components/Loading/ErrorPage'; // Import ErrorPage component to display error messages
import Loading from '../../../../../../components/Loading/Loading'; // Import Loading component to show a loading state
import Config from "../../../../../../components/config"; // Import configuration containing the base URL for API
import './Coupon.css'; // Import the CSS file for styling
import CouponCard from './components/CouponCard';
import CreateCoupon from './components/form/CreateCoupon/CreateCoupon';

const Coupon = () => {

    const [data, setData] = useState([]);


    const [loading, setLoading] = useState(true);


    const [error, setError] = useState(null);

    // Function to fetch  data from the API
    const fetchData = async () => {
        try {

            const response = await AxiosInstance.get(`${Config.baseURL}/api/cart/coupon/`);
            setData(response.data);
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
        fetchData();
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
                <h3>Coupon  </h3>
                {/* CreateCountry component to allow creating a new country */}
                <CreateCoupon fetchData={fetchData} />
            </div>

            {/* Map through the countryData array and render ShippingCard for each item */}

            <CouponCard data={data} fetchData={fetchData} />

        </div>
    );
};

export default Coupon;