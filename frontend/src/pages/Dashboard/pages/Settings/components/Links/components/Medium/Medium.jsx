import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../../../../../../Authentication/AxiosInstance';
import Config from '../../../../../../../../components/config';

export default function Medium() {
    // State to store the fetched data
    const [data, setData] = useState([]);
    const [name, setName] = useState('');

    // Function to fetch the list of Medium from the API
    const fetchData = async () => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/visitors/medium/`);
            setData(response.data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    // Handle input change for name field
    const handleChange = (e) => {
        setName(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            const response = await AxiosInstance.post(`${Config.baseURL}/api/visitors/medium/`, {
                dictionary_medium: name, // Match backend field name
            });

            if (response.data?.id) {
                fetchData();
                setName(''); // Clear input on success
            } else {
                console.error('ID not found in the response:', response);
            }
        } catch (error) {
            console.error('Error submitting medium:', error);
        }
    };

    // Handle delete action
    const handleDelete = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this medium?');
        if (isConfirmed) {
            try {
                await AxiosInstance.delete(`${Config.baseURL}/api/visitors/medium/${id}/`);
                fetchData(); // Refresh data after successful deletion
            } catch (error) {
                console.error('Error deleting medium:', error);
            }
        }
    };

    return (
        <>

            <div className="Product-section-row">
                <label> Medium </label>
                <p style={{ width: '100%', float: 'left', textAlign: 'center', paddingBottom: '5px' }}> وسيلة الحملة (مثل cpc, social, email) </p>

                <div className="Tags">
                    <div className="Tags-input">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="Tags-btn">
                        <div className="add-product-btn" onClick={handleSubmit}>
                            Add
                        </div>
                    </div>
                </div>
            </div>

            <div className="Product-section-row">
                <div className="image-preview" style={{ height: 'auto', padding: '5px' }}>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <p key={item.id} className="tagify__tag">
                                {item?.dictionary_medium_name}
                                <span className="tagify__x" onClick={() => handleDelete(item.id)}>x</span>
                            </p>
                        ))
                    ) : (
                        <p>No Medium found</p>
                    )}
                </div>
            </div>
        </>
    );
}