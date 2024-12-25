import React, { useEffect, useState } from 'react';
import Modules from '../Modules/Modules';

export default function Sections({ selected_Device, page, language, fetchData }) {
  const [sections, setSections] = useState([]);
  const [sortedSections, setSortedSections] = useState([]);

  // Load sections when the page changes
  useEffect(() => {
    if (page?.sections) {
      setSections(page.sections);
    }
  }, [page]);

  // Sort sections based on the selected device when the device type changes
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
          default:
            return 0; // Default case to avoid errors
        }

        // Compare the order values
        return orderA - orderB;
      });

      setSortedSections(sorted);
    }
  }, [sections, selected_Device]);

  return (
    <>
      {sortedSections.length > 0 ? (
        sortedSections.map((section) => (
          <div key={section.unique_id}  >
            <Modules section={section} selectedDevice={selected_Device} language={language} fetchData={fetchData} />
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
}