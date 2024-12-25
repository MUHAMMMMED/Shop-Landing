import React from 'react'; // Import React to define the component
import Content from '../../../../../../../components/Content/Content'; // Import the Content component
import Footer from '../../../../../../../components/Footer/Footer'; // Import the Footer component
import Header from '../../../../../../../components/Header/Header'; // Import the Header component
import Slider from '../../../../../../../components/Slider/Slider'; // Import the Slider component

// ModuleContent component which renders different modules based on the module type and selected device
export default function ModuleContent({ module = {}, selectedDevice }) {
  // Default to an empty object if module is not provided, ensuring no errors during render

  // Helper function to render the appropriate component based on the device type and module data
  const renderByDeviceType = (Component, themesType) => {
    if (!selectedDevice) return null;  // Check if selectedDevice is provided, if not return null
    // Return the appropriate component, passing data, device type, and theme information as props
    return <Component data={module} device_Types={selectedDevice} module_Type={module?.module_type} ThemesTYPES={themesType} />;
  };

  // Switch statement to render the appropriate component based on the module type
  switch (module?.module_type) {
    case 'header':
      // If module type is 'header', render the Header component
      return renderByDeviceType(Header, module?.header?.themes_mobile_Types);

    case 'slider':
      // If module type is 'slider', render the Slider component
      return renderByDeviceType(Slider, module?.slider?.themes_mobile_Types);

    case 'content':
      // If module type is 'content', render the Content component
      return renderByDeviceType(Content, module?.content?.themes_mobile_Types);

    case 'footer':
      // If module type is 'footer', render the Footer component
      return renderByDeviceType(Footer, module?.footer?.themes_mobile_Types);

    default:
      // If no valid module type is found, render a fallback message
      return <p>No module type available</p>;
  }
}