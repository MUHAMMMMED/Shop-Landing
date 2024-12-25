
import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../../../../Authentication/AxiosInstance';
import Config from '../../../../../../components/config';
import CampaignLinks from './CampaignLinks';

export default function Campaign({ language, Id }) {
    const [medium, setMedium] = useState([]);
    const [source, setSource] = useState([]);
    const [campaign, setCampaign] = useState([]);
    const [formData, setFormData] = useState({
        page: Id,       // Use 'page_id' to match the serializer
        campaign: '',
        source: '',
        medium: '',

    });

    // Function to fetch data
    const fetchData = async () => {
        try {
            const [mediumResponse, sourceResponse, campaignResponse] = await Promise.all([
                AxiosInstance.get(`${Config.baseURL}/api/visitors/medium/`),
                AxiosInstance.get(`${Config.baseURL}/api/visitors/source/`),
                AxiosInstance.get(`${Config.baseURL}/api/visitors/campaign/`),
            ]);
            setMedium(mediumResponse.data);
            setSource(sourceResponse.data);
            setCampaign(campaignResponse.data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            const response = await AxiosInstance.post(`${Config.baseURL}/api/content/links/`, formData);

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };



    return (
        <>
            <div className="Product-section-row">
                {language === 'en' ? 'Ads Link Information' : 'معلومات رابط الإعلان'}


                <br />
                <label>
                    {language === 'en'
                        ? 'Campaign Source (e.g., facebook, twitter, google)'
                        : 'مصدر الحملة (مثل facebook, twitter, google)'}
                </label>
                <select
                    name="source"
                    value={formData.source}
                    onChange={handleInputChange}
                >

                    <option value="">
                        {language === 'en' ? 'Select Categories' : 'اختر الفئات'}
                    </option>
                    {source.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.dictionary_source_name}
                        </option>
                    ))}
                </select>

                <label>
                    {language === 'en'
                        ? 'Campaign Medium (e.g., cpc, social, email)'
                        : 'وسيلة الحملة (مثل cpc, social, email)'}
                </label>

                <select
                    name="medium"
                    value={formData.medium}
                    onChange={handleInputChange}
                >
                    <option value="">
                        {language === 'en' ? 'Select Categories' : 'اختر الفئات'}
                    </option>
                    {medium.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.dictionary_medium_name}
                        </option>
                    ))}
                </select>

                <label>
                    {language === 'en'
                        ? 'Campaign Name (e.g., spring_sale, launch)'
                        : 'اسم الحملة التسويقية (مثل spring_sale, launch)'}
                </label>

                <select
                    name="campaign"
                    value={formData.campaign}
                    onChange={handleInputChange}
                >
                    <option value="">
                        {language === 'en' ? 'Select Categories' : 'اختر الفئات'}
                    </option>
                    {campaign.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.dictionary_campaign_name}
                        </option>
                    ))}
                </select>
                <br />
                <div
                    className="add-product-btn"
                    style={{ width: '100%', textAlign: 'center' }}
                    onClick={handleSubmit}
                >
                    {language === 'en' ? 'Create Link' : 'إنشاء الرابط'}
                </div>
            </div>

            <div className="Product-section-row">
                <CampaignLinks Id={Id} />
            </div>
        </>
    );
}
