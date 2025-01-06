import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../../../../Authentication/AxiosInstance';
import useWindowSize from '../../../../../../Hooks/useWindowSize';
import ClassicDesktop from '../../../../../../components/ProductGrid/Desktop/Themes/Classic/Classic';
import ModernDesktop from '../../../../../../components/ProductGrid/Desktop/Themes/Modern/Modern';
import SimpleDesktop from '../../../../../../components/ProductGrid/Desktop/Themes/Simple/Simple';
import ClassicMobile from '../../../../../../components/ProductGrid/Mobile/Themes/Classic/Classic';
import ModernMobile from '../../../../../../components/ProductGrid/Mobile/Themes/Modern/Modern';
import SimpleMobile from '../../../../../../components/ProductGrid/Mobile/Themes/Simple/Simple';
import ClassicTablet from '../../../../../../components/ProductGrid/Tablet/Themes/Classic/Classic';
import ModernTablet from '../../../../../../components/ProductGrid/Tablet/Themes/Modern/Modern';
import SimpleTablet from '../../../../../../components/ProductGrid/Tablet/Themes/Simple/Simple';
import Config from '../../../../../../components/config';
import Add from '../Add/Add';
import TabHeader from '../TabHeader/TabHeader';
import './styles.css';

const BestSeller = ({ pageId, sectionId, language }) => {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { width } = useWindowSize();

    useEffect(() => {
        AxiosInstance.get(`${Config.baseURL}/api/content/product_grid/`)
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching product_grid:', error);
                setError('Failed to load product_grid');
                setLoading(false);
            });
    }, []);

    const currentData = data[currentIndex];

    const render = () => {
        if (!currentData) return null;

        if (width > 1024) {
            switch (currentData.themes_desktop_Types) {
                case 'simple':
                    return <SimpleDesktop data={currentData?.page} language={language} />;
                case 'modern':
                    return <ModernDesktop data={currentData?.page} language={language} />;
                case 'classic':
                    return <ClassicDesktop data={currentData?.page} language={language} />;
                default:
                    return null;
            }
        } else if (width > 768) {
            switch (currentData.themes_tablet_Types) {
                case 'simple':
                    return <SimpleTablet data={currentData?.page} language={language} />;
                case 'modern':
                    return <ModernTablet data={currentData?.page} language={language} />;
                case 'classic':
                    return <ClassicTablet data={currentData?.page} language={language} />;
                default:
                    return null;
            }
        } else {
            switch (currentData.themes_mobile_Types) {
                case 'simple':
                    return <SimpleMobile data={currentData?.page} language={language} />;
                case 'modern':
                    return <ModernMobile data={currentData?.page} language={language} />;
                case 'classic':
                    return <ClassicMobile data={currentData?.page} language={language} />;
                default:
                    return null;
            }
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    const module_name = 'Slider';


    return (
        <> <TabHeader name={language === "ar" ? "الأكثر مبيعًا" : "BestSeller"} link={'/create-product'} language={language} /> {/* Header for the table */}

            <div className="Main-container ">

                <div className="button-container">
                    <button className='Main-button'
                        onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                        disabled={currentIndex === 0}   >

                        &#8592; {language === 'ar' ? 'السابق' : 'Prev'}
                    </button>

                    <Add
                        Id={currentData?.id}
                        pageId={pageId}
                        sectionId={sectionId}
                        module_name={module_name}
                        language={language}
                    />
                    <button
                        className='Main-button'
                        onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, data.length - 1))}
                        disabled={currentIndex === data.length - 1}
                    >
                        {language === 'ar' ? 'التالي' : 'Next'} &#8594;
                    </button>
                </div>

                {render()}
            </div>
        </>
    );
};

export default BestSeller;