import React, { useEffect, useState } from 'react'; // Importing React and hooks
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'; // Importing icons for up and down buttons
import {
    ContainerModules,
    IconButton,
    IconsContainer,
    ModuleHeader,
    ModuleItem,
    ThemesContainer
} from './ModulesStyles'; // Importing styled-components for module layout
import Active from './components/Active/Active'; // Importing Active component (handles active state)
import Delete from './components/Delete/Delete'; // Importing Delete component (for module deletion)
import EditModules from './components/EditModules/EditModules'; // Importing Edit component (for module editing)
import ThemesTYPES from './components/ThemesTYPES/ThemesTYPES'; // Importing ThemesTYPES component

import AxiosInstance from '../../../../../../../../Authentication/AxiosInstance'; // Importing Axios instance for API requests
import CardGrid from '../../../../../../../../components/CardGrid/CardGrid'; // Importing CardGrid component
import Content from '../../../../../../../../components/Content/Content'; // Importing Content component
import CountdownBanner from '../../../../../../../../components/CountdownBanner/CountdownBanner'; // Importing CountdownBanner component
import FAQ from '../../../../../../../../components/FAQ/FAQ'; // Importing FAQ component
import Features from '../../../../../../../../components/Features/Features';
import Footer from '../../../../../../../../components/Footer/Footer'; // Importing Footer component
import Header from '../../../../../../../../components/Header/Header'; // Importing Header component
import HeightImage from '../../../../../../../../components/HeightImage/HeightImage'; // Importing HeightImage component
import Product from '../../../../../../../../components/Product/Product'; // Importing Product component
import ProductFeatures from '../../../../../../../../components/ProductFeatures/ProductFeatures'; // Importing ProductFeatures component
import ProductGrid from '../../../../../../../../components/ProductGrid/ProductGrid'; // Importing YouTubePlayer component
import Slider from '../../../../../../../../components/Slider/Slider'; // Importing Slider component
import VideoPlayer from '../../../../../../../../components/VideoPlayer/VideoPlayer'; // Importing VideoPlayer component
import YouTubePlayer from '../../../../../../../../components/YouTubePlayer/YouTubePlayer'; // Importing YouTubePlayer component

import Config from '../../../../../../../../components/config'; // Importing Config for baseURL


// Main Modules component that renders different modules based on the section and device type
const Modules = ({ section, selectedDevice, fetchPage }) => {
    // State variables for managing modules, sorted order, loading status, and errors
    const [modules, setModules] = useState([]);
    const [sortedModules, setSortedModules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Effect hook to sort modules when section or selectedDevice changes
    useEffect(() => {
        if (section?.modules.length > 0) {
            const sorted = [...section?.modules].sort((a, b) => {
                let orderA, orderB;

                // Determine the sorting order based on the selected device
                switch (selectedDevice) {
                    case 'mobile':
                        orderA = a.mobile_order;
                        orderB = b.mobile_order;
                        break;
                    case 'tablet':
                        orderA = a.tablet_order;
                        orderB = b.tablet_order;
                        break;
                    case 'desktop':
                        orderA = a.desktop_order;
                        orderB = b.desktop_order;
                        break;
                }

                // Return comparison result to sort modules based on device order
                return orderA - orderB;
            });

            // Set the sorted modules to the state
            setSortedModules(sorted);
        }
    }, [section.modules, selectedDevice]); // Re-run effect when modules or device changes

    // Function to update the order of modules and save the new order
    const updateModulesOrder = (updatedModules) => {
        setModules(updatedModules); // Update the local state with the new order
        saveOrder(updatedModules); // Save the new order to the server
    };

    // Function to move a module up or down in the sorted list
    const moveModule = (index, direction) => {
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= sortedModules.length) return; // Prevent out-of-bound errors
        const reorderedModules = [...sortedModules];
        const [movedModule] = reorderedModules.splice(index, 1); // Remove the module from its original position
        reorderedModules.splice(newIndex, 0, movedModule); // Insert the module at the new position
        updateModulesOrder(reorderedModules); // Update order and save
    };

    // Function to save the new order of modules to the server
    const saveOrder = async (modulesToSave) => {
        setLoading(true); // Set loading state to true while saving
        const orderedModules = modulesToSave.map((module, index) => {
            if (!module.unique_id) {
                console.error("Module is missing unique_id:", module);
                throw new Error("Module is missing unique_id.");
            }
            return {
                unique_id: module.unique_id,
                order: index + 1, // Set the new order (index + 1 for 1-based order)
            };
        });

        const payload = {
            modules: orderedModules,
            DeviceTYPES: selectedDevice, // Include selected device type in the payload
        };

        try {
            // Make the API request to save the order of modules
            await AxiosInstance.post(`${Config.baseURL}/api/content/update-module-order/`, payload);
            fetchPage(); // Refresh the page after saving
            console.log('Order saved successfully!');
        } catch (error) {
            // Handle error if the API request fails
            console.error("Error saving order:", error);
            alert('حدث خطأ أثناء حفظ الترتيب.');
        } finally {
            setLoading(false); // Set loading state back to false after the operation is complete
        }
    };

    // Helper function to render the appropriate component based on device type
    const renderByDeviceType = (Component, module) => {
        if (!selectedDevice) return null;  // If no device is selected, return null
        return <Component data={module} device_Types={selectedDevice} />;  // Render the component with data and device type
    };

    // Function to render the content for each module based on its type
    const ModuleContent = ({ module }) => {
        switch (module?.module_type) {

            case 'header':
                return renderByDeviceType(Header, module);
            case 'slider':
                return renderByDeviceType(Slider, module);
            case 'content':
                return renderByDeviceType(Content, module);
            case 'footer':
                return renderByDeviceType(Footer, module);
            case 'product':
                return renderByDeviceType(Product, module);
            case 'video':
                return renderByDeviceType(VideoPlayer, module);
            case 'youtube':
                return renderByDeviceType(YouTubePlayer, module);
            case 'hight':
                return renderByDeviceType(HeightImage, module);
            case 'freq':
                return renderByDeviceType(FAQ, module);
            case 'countdown':
                return renderByDeviceType(CountdownBanner, module);
            case 'card':
                return renderByDeviceType(CardGrid, module);
            case 'featurescard':
                return renderByDeviceType(ProductFeatures, module);
            case 'features':
                return renderByDeviceType(Features, module);
            case 'productgrid':
                return renderByDeviceType(ProductGrid, module);

            default:
                return null; // Return null if no matching module type is found

        }
    };

    return (
        <ContainerModules>
            {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error if there's any */}
            {sortedModules.map((module, index) => (
                <ModuleItem key={module.unique_id}>
                    <ModuleHeader>
                        <IconsContainer>
                            {/* Move Up Button */}
                            <IconButton
                                onClick={() => moveModule(index, -1)}  // Move module up
                                disabled={index === 0}  // Disable button if it's the first module
                                aria-label="Move up"
                                data-tooltip="نقل لأعلى"
                            >
                                <FaArrowUp />
                            </IconButton>

                            {/* Move Down Button */}
                            <IconButton
                                onClick={() => moveModule(index, 1)}  // Move module down
                                disabled={index === sortedModules.length - 1}  // Disable button if it's the last module
                                aria-label="Move down"
                                data-tooltip="نقل لأسفل"
                            >
                                <FaArrowDown />
                            </IconButton>

                            {/* Active, Edit, and Delete Components */}
                            <Active module={module} selectedDevice={selectedDevice} fetchPage={fetchPage} />
                            <EditModules />
                            <Delete moduleId={module.id} fetchPage={fetchPage} />
                        </IconsContainer>
                        <ThemesContainer>
                            <ThemesTYPES />  {/* Render ThemesTYPES component */}
                        </ThemesContainer>
                    </ModuleHeader>

                    {/* Render the module content based on module type */}
                    <ContainerModules>
                        <ModuleContent module={module} />
                    </ContainerModules>
                </ModuleItem>
            ))}
            {loading && <p>جاري الحفظ...</p>} {/* Show loading message when saving */}
        </ContainerModules>
    );
};

export default Modules;  // Export the Modules component