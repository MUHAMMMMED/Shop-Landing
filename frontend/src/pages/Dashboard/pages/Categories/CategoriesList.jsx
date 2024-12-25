import React, { useEffect, useState } from 'react'; // Importing necessary React hooks
import AxiosInstance from '../../../../Authentication/AxiosInstance'; // Axios instance for API requests
import useWindowSize from '../../../../Hooks/useWindowSize'; // Custom hook to get window size (for responsive design)
import ErrorPage from '../../../../components/Loading/ErrorPage'; // Component to display error page
import Loading from '../../../../components/Loading/Loading'; // Component to display loading spinner
import Config from '../../../../components/config'; // Configuration for API base URL
import DesktopTable from '../../../../dash-components/Categories/DesktopTable/DesktopTable'; // Component for the desktop view of the table
import HeaderTable from '../../../../dash-components/Categories/HeaderTable/HeaderTable'; // Header component for the table
import MobileTable from '../../../../dash-components/Categories/MobileTable/MobileTable'; // Component for the mobile view of the table
import TabletTable from '../../../../dash-components/Categories/TabletTable/TabletTable'; // Component for the tablet view of the table
import DasHeader from '../../components/DasHeader/DasHeader'; // Dashboard header component
import FooterNav from '../../components/DashFooterNav/DashFooterNav'; // Footer navigation component
import Sidebar from '../../components/Sidebar/Sidebar'; // Sidebar component for navigation

export default function CategoriesList() {
  const { width } = useWindowSize(); // Get the window width using custom hook
  const [language, setLanguage] = useState('en'); // Initialize state for language, default is English
  const updateLanguage = (newLanguage) => { setLanguage(newLanguage); }; // Function to update the language (from DasHeader)
  const [data, setData] = useState([]); // State to store the fetched categories data

  // State to track loading status
  const [loading, setLoading] = useState(true);

  // State to capture any error messages from the API
  const [error, setError] = useState(null);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get(`${Config.baseURL}/api/products/categories_dash/`); // API request to fetch categories data
      setData(response.data); // Update state with the fetched data
    } catch (error) {
      console.error('Fetch error:', error); // Log the error for debugging
      setError(
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "You do not have access to view this page."
      );
    } finally {
      setLoading(false); // Set loading to false after fetch attempt, whether successful or failed
    }
  };

  // useEffect hook to trigger the data fetch when the component mounts
  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  // Conditional rendering based on the loading or error states
  if (loading) {
    return <Loading />; // Show loading spinner if data is still being fetched
  }

  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />; // Show error page if there is an error
  }

  // Table columns definition with both English and Arabic labels
  const TableColumns = [
    { key: 'Rank', en: 'Rank', ar: 'الترتيب' },
    { key: 'Name', en: 'Name', ar: 'الاسم' },
    { key: 'Products', en: 'Products', ar: 'المنتجات' },
    { key: 'action', en: 'Action', ar: 'إجراء' }
  ];

  return (
    <>
      <DasHeader language={language} updateLanguage={updateLanguage} /> {/* Dashboard header component */}
      <div className={`dashboard ${language === 'ar' ? 'rtl' : 'ltr'}`}> {/* Main dashboard wrapper with RTL/LTR support */}
        <Sidebar language={language} /> {/* Sidebar for navigation */}
        <main className={`content ${language === 'ar' ? 'rtl' : 'ltr'}`}> {/* Main content area */}
          <HeaderTable name={'Category'} link={'/create-category'} language={language} fetch={fetchData} /> {/* Header for table with link */}

          {/* Responsive table rendering based on screen width */}
          {width > 1024 ? (
            <DesktopTable language={language} tableColumns={TableColumns} data={data} fetch={fetchData} /> // Desktop view
          ) : width > 768 ? (
            <TabletTable language={language} tableColumns={TableColumns} data={data} fetch={fetchData} /> // Tablet view
          ) : (
            <MobileTable language={language} tableColumns={TableColumns} data={data} fetch={fetchData} /> // Mobile view
          )}
        </main>
      </div>
      <FooterNav language={language} /> {/* Footer navigation */}
    </>
  );
}