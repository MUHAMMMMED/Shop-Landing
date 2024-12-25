import React, { useEffect, useState } from 'react';
import useWindowSize from "../../Hooks/useWindowSize";
import Sections from "./components/Sections/Sections";

export default function LandingPage({ page, fetchData }) {
  const { width } = useWindowSize();
  const [selectedDevice, setSelectedDevice] = useState('');
  useEffect(() => {
    // Determine the device type based on the window width
    if (width > 1024) {
      setSelectedDevice('desktop');
    } else if (width > 768) {
      setSelectedDevice('tablet');
    } else {
      setSelectedDevice('mobile');
    }
  }, [width]); // This will re-run whenever the window width changes
  const language = "ar"
  // const language = "en"
  return (
    <div>
      <Sections page={page} language={language} selected_Device={selectedDevice} fetchData={fetchData} />
    </div>
  );
}