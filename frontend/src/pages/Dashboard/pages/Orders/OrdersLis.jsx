// Importing necessary dependencies and components
import React, { useEffect, useState } from 'react'; // React library and hooks for state and lifecycle management
import AxiosInstance from '../../../../Authentication/AxiosInstance'; // Custom Axios instance for API requests
import useWindowSize from '../../../../Hooks/useWindowSize'; // Custom hook to detect current window size for responsive rendering
import ErrorPage from '../../../../components/Loading/ErrorPage'; // Component to handle and display error messages
import Loading from '../../../../components/Loading/Loading'; // Component to show a loading indicator during data fetching
import Config from '../../../../components/config'; // Configuration file containing application-wide settings like base URLs
import DesktopTable from '../../../../dash-components/Orders/DesktopTable/DesktopTable'; // Component to display order data in a desktop-friendly format
import HeaderTable from '../../../../dash-components/Orders/HeaderTable/HeaderTable'; // Component to display the header of the orders table
import MobileTable from '../../../../dash-components/Orders/MobileTable/MobileTable'; // Component to display order data optimized for mobile devices
import TabletTable from '../../../../dash-components/Orders/TabletTable/TabletTable'; // Component to display order data optimized for tablet devices
import DasHeader from '../../components/DasHeader/DasHeader'; // Dashboard header component with language toggle
import FooterNav from '../../components/DashFooterNav/DashFooterNav'; // Footer navigation for the dashboard
import Sidebar from '../../components/Sidebar/Sidebar'; // Sidebar for navigation within the dashboard

// Defining the OrdersLis component
export default function OrdersLis() {
  // Using custom hook to get the current window width for responsive rendering
  const { width } = useWindowSize();

  // State for managing the selected language, defaulting to English ('en')
  const [language, setLanguage] = useState('en');

  // Function to update the language, passed down as a prop to the DasHeader component
  const updateLanguage = (newLanguage) => { setLanguage(newLanguage); };

  // State for holding fetched order data
  const [data, setData] = useState([]);

  // State to track whether data is still being loaded
  const [loading, setLoading] = useState(true);

  // State to capture any error messages from the API
  const [error, setError] = useState(null);

  // Function to fetch orders data from the API
  const fetchData = async () => {
    try {
      // Making a GET request using Axios to fetch order data
      const response = await AxiosInstance.get(`${Config.baseURL}/api/orders/orders-list/`);
      setData(response.data); // Updating the data state with the response
    } catch (error) {
      // Logging error for debugging purposes and setting error state
      console.error('Fetch error:', error);
      setError(error.response?.data || "You do not have access to view this page."); // Error message fallback
    } finally {
      // Setting loading state to false after the API call
      setLoading(false);
    }
  };

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData(); // Initiates the data fetch
  }, []); // Empty dependency array ensures this runs only once on mount

  // Display loading spinner while data is being fetched
  if (loading) {
    return <Loading />;
  }

  // Display error page if fetching data fails
  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }

  // Column definitions for the orders table, supporting multilingual labels (English and Arabic)
  const TableColumns = [
    { key: 'id', en: 'ID', ar: 'معرف' }, // Column for order ID
    { key: 'customer_name', en: 'Customer', ar: 'العميل' }, // Column for customer name
    { key: 'order_items', en: 'Items', ar: 'البنود' }, // Column for ordered items
    { key: 'total', en: 'Amount', ar: 'المبلغ' }, // Column for order total
    { key: 'created_at', en: 'Date', ar: 'التاريخ' }, // Column for creation date
    { key: 'status', en: 'Status', ar: 'الحالة' }, // Column for order status
    { key: 'action', en: 'Action', ar: 'إجراء' } // Column for available actions
  ];

  // Main component rendering
  return (
    <>
      {/* Dashboard header with language toggle functionality */}
      <DasHeader language={language} updateLanguage={updateLanguage} />

      {/* Dashboard layout with dynamic language-based text direction */}
      <div className={`dashboard ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        {/* Sidebar navigation */}
        <Sidebar language={language} />

        {/* Main content area */}
        <main className={`content ${language === 'ar' ? 'rtl' : 'ltr'}`}>
          {/* Orders table header */}
          <HeaderTable name={'Orders'} link={'/'} language={language} />

          {/* Conditionally render table based on screen width */}
          {width > 1024 ? (
            <DesktopTable language={language} tableColumns={TableColumns} data={data} /> // Desktop view
          ) : width > 768 ? (
            <TabletTable language={language} tableColumns={TableColumns} data={data} /> // Tablet view
          ) : (
            <MobileTable language={language} tableColumns={TableColumns} data={data} /> // Mobile view
          )}
        </main>
      </div>

      {/* Footer navigation */}
      <FooterNav language={language} />
    </>
  );
}