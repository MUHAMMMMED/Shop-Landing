import React, { useEffect, useState } from 'react'; // Importing necessary React hooks (useEffect, useState)
import AxiosInstance from '../../../../Authentication/AxiosInstance'; // Axios instance to handle API requests
import useWindowSize from '../../../../Hooks/useWindowSize'; // Custom hook to track window size for responsiveness
import ErrorPage from '../../../../components/Loading/ErrorPage'; // Component for displaying error page
import Loading from '../../../../components/Loading/Loading'; // Component for displaying loading state
import Config from '../../../../components/config'; // Configuration file that contains the base URL for the API
import DesktopTable from '../../../../dash-components/Customers/DesktopTable/DesktopTable'; // Desktop view table component
import HeaderTable from '../../../../dash-components/Customers/HeaderTable/HeaderTable'; // Header for the table
import MobileTable from '../../../../dash-components/Customers/MobileTable/MobileTable'; // Mobile view table component
import TabletTable from '../../../../dash-components/Customers/TabletTable/TabletTable'; // Tablet view table component
import DasHeader from '../../components/DasHeader/DasHeader'; // Header component for the dashboard
import FooterNav from '../../components/DashFooterNav/DashFooterNav'; // Footer navigation component
import Sidebar from '../../components/Sidebar/Sidebar'; // Sidebar component for dashboard navigation

export default function CustomersList() {
  // useWindowSize custom hook to get the current width of the window (for responsive design)
  const { width } = useWindowSize();

  // State for storing the current language ('en' for English, 'ar' for Arabic)
  const [language, setLanguage] = useState('en');

  // Function to update the language state, called from the header component (DasHeader)
  const updateLanguage = (newLanguage) => { setLanguage(newLanguage); };

  // State to store the customer data fetched from the API
  const [data, setData] = useState([]);

  // State to track loading status (whether the data is still being fetched)
  const [loading, setLoading] = useState(true);

  // State to store any error messages from the API
  const [error, setError] = useState(null);

  // Function to fetch customer data from the API
  const fetchData = async () => {
    try {
      // Send GET request to fetch customer data from the API endpoint
      const response = await AxiosInstance.get(`${Config.baseURL}/api/orders/customer`);
      setData(response.data); // Set the response data into the state
    } catch (error) {
      console.error('Fetch error:', error); // Log the error to the console for debugging
      // If there's an error, set the error state with the message from the response
      setError(error.response?.data || "You do not have access to view this page.");
    } finally {
      setLoading(false); // Set loading to false once data has been fetched or error has occurred
    }
  };

  // useEffect hook to call fetchData when the component mounts
  useEffect(() => {
    fetchData(); // Trigger the fetch data function
  }, []); // Empty dependency array means this will only run once when the component mounts

  // Conditional rendering: if loading is true, show loading component
  if (loading) {
    return <Loading />; // Return the Loading component until the data is loaded
  }

  // Conditional rendering: if there is an error, display the ErrorPage component
  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />; // Show error page with the message
  }

  // Table column definitions, with both English and Arabic translations
  const TableColumns = [
    { key: 'ID', en: 'ID', ar: 'معرف' }, // ID column
    { key: 'Name', en: 'Name', ar: 'الاسم' }, // Name column
    { key: 'Email', en: 'Email', ar: 'البريد الإلكتروني' }, // Email column
    { key: 'Orders', en: 'Orders', ar: 'الطلبات' }, // Orders column
    { key: 'Amount', en: 'Amount', ar: 'المبلغ' }, // Amount column
    { key: 'Registered', en: 'Registered', ar: 'تاريخ التسجيل' }, // Registration date column
    { key: 'action', en: 'Action', ar: 'إجراء' } // Action column
  ];

  return (
    <>
      <DasHeader language={language} updateLanguage={updateLanguage} /> {/* Dashboard header with language selector */}
      <div className={`dashboard ${language === 'ar' ? 'rtl' : 'ltr'}`}> {/* Wrapper for the dashboard, adjusts for RTL/English */}
        <Sidebar language={language} /> {/* Sidebar for navigation */}
        <main className={`content ${language === 'ar' ? 'rtl' : 'ltr'}`}> {/* Main content area */}
          <HeaderTable name={'Customers'} link={'/'} language={language} /> {/* Header table for customers */}

          {/* Conditional rendering of table based on window width (responsive design) */}
          {width > 1024 ? (
            <DesktopTable language={language} tableColumns={TableColumns} data={data} /> // Render Desktop table if width > 1024px
          ) : width > 768 ? (
            <TabletTable language={language} tableColumns={TableColumns} data={data} /> // Render Tablet table if width > 768px
          ) : (
            <MobileTable language={language} tableColumns={TableColumns} data={data} /> // Render Mobile table if width <= 768px
          )}
        </main>
      </div>
      <FooterNav language={language} /> {/* Footer navigation component */}
    </>
  );
}