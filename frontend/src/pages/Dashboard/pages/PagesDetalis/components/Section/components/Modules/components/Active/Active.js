import React from 'react'; // Import React for building the component
import ActiveDesktop from './ActiveDesktop'; // Import the component for desktop view
import ActiveMobile from './ActiveMobile'; // Import the component for mobile view
import ActiveTablet from './ActiveTablet'; // Import the component for tablet view

// The main Active component renders different components based on the selected device (mobile, tablet, or desktop)
export default function Active({ module, selectedDevice, fetchPage }) {
    // Helper function to render the appropriate component based on the selected device type and the module
    const renderComponent = (componentType) => {
        if (!module[componentType]) return null; // Early return if the module does not contain the component type

        const deviceType = selectedDevice;  // Retrieve the selected device type (mobile, tablet, or desktop)

        // Switch statement to return the correct component based on the device type
        switch (deviceType) {
            case 'mobile':
                // If the selected device is mobile, render the ActiveMobile component
                return (
                    <ActiveMobile
                        module={module}
                        fetchPage={fetchPage}
                        componentType={componentType}
                        {...{ [componentType]: module[componentType] }}
                    />
                );
            case 'tablet':
                // If the selected device is tablet, render the ActiveTablet component
                return (
                    <ActiveTablet
                        module={module}
                        fetchPage={fetchPage}
                        componentType={componentType}
                        {...{ [componentType]: module[componentType] }}
                    />
                );
            case 'desktop':
                // If the selected device is desktop, render the ActiveDesktop component
                return (
                    <ActiveDesktop
                        module={module}
                        fetchPage={fetchPage}
                        componentType={componentType}
                        {...{ [componentType]: module[componentType] }}
                    />
                );
            default:
                return null;  // If no valid device type is selected, return null (nothing is rendered)
        }
    };

    // Render the components for header, content, footer, and slide based on the selected device
    return (
        <>
            {/* Render header component */}
            {renderComponent('header')}
            {/* Render content component */}
            {renderComponent('content')}
            {/* Render footer component */}
            {renderComponent('footer')}
            {/* Render slide component */}
            {renderComponent('slide')}
        </>
    );
}