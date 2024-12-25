// Import necessary libraries and components
import { debounce } from 'lodash'; // Debounce function to limit the rate of API calls
import React, { useEffect, useState } from 'react'; // React for component lifecycle and state management
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'; // Icons for moving sections up/down
import AxiosInstance from '../../../../../../Authentication/AxiosInstance';
import Config from '../../../../../../components/config'; // Base URL configuration
import { IconButton, SectionContainerStyled, SectionTitle } from './SectionStyles'; // Styled components
import AddModule from './components/AddModule/AddModule'; // Component for adding new module to a section
import AddSection from './components/AddSection /AddSection'; // Component for adding a new section
import Clon from './components/Clon/Clon.js'; // Component for cloning a section
import Delete from './components/Delete/Delete'; // Component for deleting a section
import EditSection from './components/EditSection/EditSection'; // Component for editing a section
import Modules from './components/Modules/Modules'; // Component for displaying modules inside a section

const Section = ({ selected_Device, page, fetchPage, language }) => {
    // Declare state variables for holding sections and their sorted versions
    const [sections, setSections] = useState([]);
    const [sortedSections, setSortedSections] = useState([]);

    // Effect to load sections when the page data changes
    useEffect(() => {
        if (page?.sections) {  // Check if the page has sections
            setSections(page.sections);  // Update sections state with the new page data
        }
    }, [page]);  // Depend on page prop so it triggers when page data is updated

    // Effect to sort sections based on the selected device (mobile, tablet, desktop)
    useEffect(() => {
        if (sections.length > 0) {
            const sorted = [...sections].sort((a, b) => {
                let orderA, orderB;

                // Determine the sorting order based on the selected device
                switch (selected_Device) {
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

                // Compare the order values to sort the sections
                return orderA - orderB;
            });

            // Update sortedSections state with the new sorted sections
            setSortedSections(sorted);
        }
    }, [sections, selected_Device]);  // Trigger sorting when sections or selected_Device changes

    // Function to save the order of sections to the API (debounced to optimize performance)
    const saveOrderToAPI = debounce(async (orderedSections) => {
        try {
            const payload = {
                sections: orderedSections,  // Pass the updated sections order
                DeviceTYPES: selected_Device,  // Include the selected device type
            };
            // Make a POST request to save the section order to the server
            await AxiosInstance.post(`${Config.baseURL}/api/update-section-order/`, payload);
            fetchPage();  // Fetch the updated page data after saving
        } catch (error) {
            console.error("Error saving order:", error);  // Log error if saving fails
        }
    }, 300);  // 300ms delay to limit the frequency of API calls

    // Function to handle moving a section up or down within the sorted sections
    const handleMoveSection = (index, direction) => {
        const reorderedSections = [...sortedSections];  // Create a copy of sorted sections
        if (direction === 'up' && index > 0) {
            // Move the section up if not already at the top
            [reorderedSections[index - 1], reorderedSections[index]] = [reorderedSections[index], reorderedSections[index - 1]];
        } else if (direction === 'down' && index < sortedSections.length - 1) {
            // Move the section down if not already at the bottom
            [reorderedSections[index + 1], reorderedSections[index]] = [reorderedSections[index], reorderedSections[index + 1]];
        }
        setSortedSections(reorderedSections);  // Update the state with the new order

        const orderedSections = reorderedSections.map((section, idx) => ({
            unique_id: section.unique_id,  // Keep track of section unique ID
            order: idx + 1,  // Assign a new order based on its index
        }));
        saveOrderToAPI(orderedSections);  // Save the new order to the API
    };

    return (
        <SectionContainerStyled>
            {sortedSections.length > 0 ? (
                // If there are sections, map through each and render them
                sortedSections.map((section, index) => (
                    <div key={section.unique_id} style={{ marginBottom: '20px', padding: '10px', border: '2px dashed #000', borderRadius: '8px', backgroundColor: '#fff' }}>
                        <SectionTitle>
                            {/* Display section title */}
                            <span style={{ float: 'left', color: '#000', fontSize: '15px' }}>
                                {section.title}
                            </span>
                            <div>
                                {/* Render up/down buttons to reorder sections */}
                                <IconButton onClick={() => handleMoveSection(index, 'up')} disabled={index === 0} aria-label="Move up" data-tooltip="نقل لأعلى">
                                    <FaArrowUp />
                                </IconButton>
                                <IconButton onClick={() => handleMoveSection(index, 'down')} disabled={index === sortedSections.length - 1} aria-label="Move down" data-tooltip="نقل لأسفل">
                                    <FaArrowDown />
                                </IconButton>
                                {/* Render components for editing, deleting, cloning, and adding modules */}
                                <EditSection section={section} fetchPage={fetchPage} />
                                <Delete sectionId={section?.id} fetchPage={fetchPage} />
                                <Clon sectionId={section?.id} fetchPage={fetchPage} />
                                <AddModule pageId={page?.id} sectionId={section?.id} />
                            </div>
                        </SectionTitle>
                        {/* Render modules inside the section */}
                        <Modules section={section} selectedDevice={selected_Device} fetchPage={fetchPage} language={language} />
                    </div>
                ))
            ) : (
                // If no sections exist, display a message
                <div>
                    {language === 'ar' ? 'لا توجد أقسام' : 'No sections available.'}
                </div>
            )}
            {/* Render the component to add a new section */}
            <AddSection page={page} fetchPage={fetchPage} language={language} />
        </SectionContainerStyled>
    );
};

export default Section;