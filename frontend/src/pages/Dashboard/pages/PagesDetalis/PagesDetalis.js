
// Importing necessary libraries and components
import React, { useEffect, useState } from 'react'; // React library and hooks for state and lifecycle management
import { FaMobileAlt } from 'react-icons/fa'; // Mobile icon
import { HiArrowLeft, HiArrowRight } from "react-icons/hi"; // Navigation icons
import { IoDesktopSharp } from 'react-icons/io5'; // Desktop icon
import { MdOutlineTabletMac } from 'react-icons/md'; // Tablet icon
import { Link, useParams } from 'react-router-dom'; // React Router for navigation and params
import AxiosInstance from '../../../../Authentication/AxiosInstance'; // Custom Axios instance for API requests
import ErrorPage from '../../../../components/Loading/ErrorPage';
import Loading from '../../../../components/Loading/Loading';
import Config from '../../../../components/config'; // Configuration for base URL
import DasHeader from '../../components/DasHeader/DasHeader'; // Dashboard header component
import './PagesDetalis.css'; // Styling for the component
import { IconButton, SectionTypeContainer } from './PagesDetalisStyles'; // Styled components for buttons and containers
import Section from './components/Section/Section'; // Section component to display page content
const PagesDetalis = () => {
    // Extracting 'id' parameter from URL for the current page
    const { id } = useParams();

    // State for managing page data, language, and device type
    const [page, setPage] = useState([]); // Stores the page details fetched from the API
    const [loading, setLoading] = useState(true); // State to track whether data is still loading
    const [error, setError] = useState(null); // State to capture any error messages from the API
    const [language, setLanguage] = useState('en'); // Language state (default to 'en')
    const [deviceType, setDeviceType] = useState('desktop'); // Default to 'desktop'

    // Function to fetch page details from the API
    const fetchPagesDetalis = async () => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/content/pages/${id}/`);
            setPage(response.data); // Set the fetched page data in state
        } catch (error) {
            console.error('Fetch error:', error);
            setError(error.response?.data || "You do not have access to view this page.");
        } finally {
            setLoading(false);
        }
    };

    // UseEffect hook to fetch page details on component mount or when 'id' changes
    useEffect(() => {
        fetchPagesDetalis();
    }, [id]);

    // Display a loading spinner while data is being fetched
    if (loading) {
        return <Loading />;
    }

    // Display an error page if there is an issue fetching data
    if (error) {
        return <ErrorPage head="Error Occurred" error={error} />;
    }

    // Function to handle device type change
    const handleDeviceChange = (type) => {
        setDeviceType(type);
    };

    // Function to render the appropriate section based on the selected device type
    const renderDeviceType = () => {
        switch (deviceType) {
            case 'mobile':
                return <Section selected_Device="mobile" page={page} fetchPage={fetchPagesDetalis} language={language} />;
            case 'tablet':
                return <Section selected_Device="tablet" page={page} fetchPage={fetchPagesDetalis} language={language} />;
            case 'desktop':
                return <Section selected_Device="desktop" page={page} fetchPage={fetchPagesDetalis} language={language} />;
            default:
                return null;
        }
    };

    return (
        <>
            <DasHeader language={language} updateLanguage={setLanguage} />
            <div className={`dashboard ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                <main className={`content ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                    <div className="create-product">
                        <header className="create-header">
                            <h1>
                                <Link to={'/pages'}>
                                    <button className="add-product-btn">
                                        {language === 'ar' ? <HiArrowRight /> : <HiArrowLeft />}
                                    </button>
                                </Link>
                            </h1>
                        </header>
                    </div>

                    <div className="type-device-container">
                        <SectionTypeContainer>
                            <IconButton
                                onClick={() => handleDeviceChange('desktop')}
                                data-tooltip={language === 'ar' ? 'سطح المكتب' : 'Desktop'}
                                aria-label="Desktop View"
                                disabled={deviceType === 'desktop'}
                            >
                                <IoDesktopSharp />
                            </IconButton>

                            <IconButton
                                onClick={() => handleDeviceChange('tablet')}
                                data-tooltip={language === 'ar' ? 'جهاز لوحي' : 'Tablet'}
                                aria-label="Tablet View"
                                disabled={deviceType === 'tablet'}
                            >
                                <MdOutlineTabletMac />
                            </IconButton>

                            <IconButton
                                onClick={() => handleDeviceChange('mobile')}
                                data-tooltip={language === 'ar' ? 'موبايل' : 'Mobile'}
                                aria-label="Mobile View"
                                disabled={deviceType === 'mobile'}
                            >
                                <FaMobileAlt />
                            </IconButton>
                        </SectionTypeContainer>

                        <div className="device-wrapper">
                            <div className={`device ${deviceType}`}>
                                <div className="screen">
                                    {renderDeviceType()}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};
export default PagesDetalis;




