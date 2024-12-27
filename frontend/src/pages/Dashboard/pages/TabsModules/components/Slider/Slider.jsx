import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../../../../Authentication/AxiosInstance';
import useWindowSize from '../../../../../../Hooks/useWindowSize';
import ClassicDesktop from '../../../../../../components/Slider/Desktop/Themes/Classic/Classic';
import ModernDesktop from '../../../../../../components/Slider/Desktop/Themes/Modern/Modern';
import SimpleDesktop from '../../../../../../components/Slider/Desktop/Themes/Simple/Simple';
import ClassicMobile from '../../../../../../components/Slider/Mobile/Themes/Classic/Classic';
import ModernMobile from '../../../../../../components/Slider/Mobile/Themes/Modern/Modern';
import SimpleMobile from '../../../../../../components/Slider/Mobile/Themes/Simple/Simple';
import ClassicTablet from '../../../../../../components/Slider/Tablet/Themes/Classic/Classic';
import ModernTablet from '../../../../../../components/Slider/Tablet/Themes/Modern/Modern';
import SimpleTablet from '../../../../../../components/Slider/Tablet/Themes/Simple/Simple';
import Config from '../../../../../../components/config';
import Add from './components/Add/Add';
import './styles.css';

const Slider = ({ pageId, sectionId }) => {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { width } = useWindowSize();
    const language = 'ar';

    useEffect(() => {
        AxiosInstance.get(`${Config.baseURL}/api/content/slider/`)
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching sliders:', error);
                setError('Failed to load sliders');
                setLoading(false);
            });
    }, []);

    const currentData = data[currentIndex];

    const render = () => {
        if (!currentData) return null;

        if (width > 1024) {
            switch (currentData.themes_desktop_Types) {
                case 'simple':
                    return <SimpleDesktop data={currentData} language={language} />;
                case 'modern':
                    return <ModernDesktop data={currentData} language={language} />;
                case 'classic':
                    return <ClassicDesktop data={currentData} language={language} />;
                default:
                    return null;
            }
        } else if (width > 768) {
            switch (currentData.themes_tablet_Types) {
                case 'simple':
                    return <SimpleTablet data={currentData} language={language} />;
                case 'modern':
                    return <ModernTablet data={currentData} language={language} />;
                case 'classic':
                    return <ClassicTablet data={currentData} language={language} />;
                default:
                    return null;
            }
        } else {
            switch (currentData.themes_mobile_Types) {
                case 'simple':
                    return <SimpleMobile data={currentData} language={language} />;
                case 'modern':
                    return <ModernMobile data={currentData} language={language} />;
                case 'classic':
                    return <ClassicMobile data={currentData} language={language} />;
                default:
                    return null;
            }
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    const module_name = 'Slider';

    return (
        <div className="Main-container ">
            {/* <h1 style={{ color: '#000' }}>{language === 'ar' ? 'عرض السلايدر' : 'Slider Display'}</h1> */}

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
    );
};

export default Slider;