
import React, { useEffect, useState } from 'react';
import CardGrid from '../../../CardGrid/CardGrid';
import Content from '../../../Content/Content';
import CountdownBanner from '../../../CountdownBanner/CountdownBanner';
import FAQ from '../../../FAQ/FAQ';
import Features from '../../../Features/Features';
import Footer from '../../../Footer/Footer';
import Header from '../../../Header/Header';
import HeightImage from '../../../HeightImage/HeightImage';
import Product from '../../../Product/Product';

import ProductFeatures from '../../../ProductFeatures/ProductFeatures';
import ProductGrid from '../../../ProductGrid/ProductGrid';
import Slider from '../../../Slider/Slider';
import VideoPlayer from '../../../VideoPlayer/VideoPlayer';
import YouTubePlayer from '../../../YouTubePlayer/YouTubePlayer';


// Main Component
export default function Modules({ section, selectedDevice, language, fetchData }) {
  const [sortedModules, setSortedModules] = useState([]);

  // Sort modules based on the selected device when the device type changes
  useEffect(() => {
    if (section?.modules?.length > 0) {
      const sorted = [...section.modules].sort((a, b) => {
        let orderA, orderB;

        // Determine the sorting order based on the selected device
        switch (selectedDevice) {
          case 'mobile':
            orderA = a.mobile_order ?? Infinity;
            orderB = b.mobile_order ?? Infinity;
            break;
          case 'tablet':
            orderA = a.tablet_order ?? Infinity;
            orderB = b.tablet_order ?? Infinity;
            break;
          case 'desktop':
            orderA = a.desktop_order ?? Infinity;
            orderB = b.desktop_order ?? Infinity;
            break;
          default:
            return 0; // Default case if no device is selected
        }

        // Compare the order values
        return orderA - orderB;
      });

      setSortedModules(sorted);
    }
  }, [section?.modules, selectedDevice]);

  // Helper function to render module based on device type
  const renderByDeviceType = (Component, module) => {
    if (!selectedDevice) return null; // Ensure selectedDevice is provided
    return <Component data={module} device_Types={selectedDevice} language={language} fetchData={fetchData} />;
  };




  // Function to render content based on module type
  const ModuleContent = ({ module }) => {
    const moduleType = module?.module_type?.toLowerCase?.(); // Safely access and convert to lowercase

    switch (moduleType) {
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
      case 'features':
        return renderByDeviceType(Features, module);
      case 'featurescard':
        return renderByDeviceType(ProductFeatures, module);
      case 'productgrid':
        return renderByDeviceType(ProductGrid, module);


      default:
        return null;
    }
  };

  return (
    <>
      {sortedModules.length > 0 ? (
        sortedModules.map((module) => (
          <div key={module.unique_id}>
            {/* Render module content based on type */}
            <ModuleContent module={module} />
          </div>
        ))
      ) : (
        <>
        </>
      )}
    </>
  );
}