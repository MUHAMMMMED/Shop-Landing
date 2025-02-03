import React, { useEffect, useState } from 'react';
import useWindowSize from "../../Hooks/useWindowSize";
import { trackFacebookPixel } from '../../utils/pixels/facebookPixel';
import { trackGooglePixel } from '../../utils/pixels/googlePixel';
import { trackSnapchatPixel } from '../../utils/pixels/snapchatPixel';
import { trackTikTokPixel } from '../../utils/pixels/tiktokPixel';
import Headertop from '../Headertop/Headertop';
import ProductSEO from '../SEO/ProductSEO';
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

  useEffect(() => {
    const pageData = { page: page?.title };

    trackFacebookPixel('PageView', pageData);
    trackGooglePixel('page_view', pageData);
    trackTikTokPixel('PageView', pageData);
    trackSnapchatPixel('PAGE_VIEW', pageData);
  }, [page?.title]);

  return (
  
    <div>
<Headertop/>
 <ProductSEO
title={ page?.title}
description={page?.description}
price={'0'}
image={page?.image}
productUrl={`https://smartcardnfc.com/page/${page?.title}/${page?.id}`}
/> 
  <Sections page={page} language={language} selected_Device={selectedDevice} fetchData={fetchData} />
    </div>
  );
} 