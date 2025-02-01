
import React, { useEffect } from 'react';
import CartPage from '../../pages/CartPage/CartPage';
import { trackFacebookPixel } from '../../utils/pixels/facebookPixel';
import { trackGooglePixel } from '../../utils/pixels/googlePixel';
import { trackSnapchatPixel } from '../../utils/pixels/snapchatPixel';
import { trackTikTokPixel } from '../../utils/pixels/tiktokPixel';
import FloatButton from '../FloatButton/FloatButton';
import DesktopThemesTypes from './Desktop/Themes/DesktopThemesTypes';
import MobileThemesTypes from './Mobile/Themes/MobileThemesTypes';
import TabletThemesTypes from './Tablet/Themes/TabletThemesTypes';

export default function Product({ data, device_Types, language, fetchData }) {

  const renderCart = () => {
    if (data?.product?.is_active_cart === true) {
      return <CartPage fetchData={fetchData} />;
    }
    return null;
  };

  const renderThemes = () => {
    switch (device_Types) {
      case 'mobile':
        return <MobileThemesTypes data={data?.product} TYPES={data?.product?.themes_mobile_Types} DeviceTypes={device_Types} language={language} fetchData={fetchData} />;
      case 'tablet':
        return <TabletThemesTypes data={data?.product} TYPES={data?.product?.themes_tablet_Types} DeviceTypes={device_Types} language={language} fetchData={fetchData} />;
      case 'desktop':
        return <DesktopThemesTypes data={data?.product} TYPES={data?.product?.themes_desktop_Types} DeviceTypes={device_Types} language={language} fetchData={fetchData} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (data?.product?.id && data?.product?.name && data?.product?.price) {
      const productData = {
        product_id: data?.product.id,
        name: data?.product.name,
        price: data?.product?.price,
      };
  
      trackFacebookPixel('ViewContent', productData);
      trackGooglePixel('view_item', productData);
      trackTikTokPixel('ViewContent', productData);
      trackSnapchatPixel('VIEW_CONTENT', productData);
    }
  }, [data?.product.id, data?.product.name, data?.product?.price]);

  return (
    <>

      {renderThemes()}
      {renderCart()}
      <FloatButton   />
    </>
  );
}