import React, { useState } from 'react';
import AxiosInstance from '../../../../../../../../../../../Authentication/AxiosInstance'; // Importing AxiosInstance for API calls
import Config from '../../../../../../../../../../../components/config'; // Importing the Config for base URL

// Functional component to create a new company
export default function CreateCompany({ item, fetchCompany }) {
    // State for managing modal visibility and form data
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [formData, setFormData] = useState({
        Country_id: item?.id,  // Country ID passed as a prop to the component
        image: null,  // Placeholder for image data
        name: '',  // Company name input
        description: '',  // Description input
        shipping_price: 0,  // Shipping price input
        discount_price: 0,  // Discount price input
        work_days: '',  // Work days input
    });

    // Handle form field changes
    const handleChange = (e) => {
        if (e.target.type === 'file') {  // If input type is file, update image field
            setFormData({ ...formData, image: e.target.files[0] });
        } else {  // For other form fields, update the respective value
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission behavior
        try {
            const data = new FormData();  // Create a new FormData instance for handling file uploads
            if (formData.image) {  // Append the image if it's provided
                data.append('image', formData.image);
            }
            // Append all other form data
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('shipping_price', formData.shipping_price);
            data.append('discount_price', formData.discount_price);
            data.append('work_days', formData.work_days);

            // Ensure Country_id is included in the request
            if (formData.Country_id) {
                data.append('Country_id', formData.Country_id);
            } else {
                throw new Error('Country ID is missing');
            }

            // API call to submit the form data using AxiosInstance
            await AxiosInstance.post(`${Config.baseURL}/api/orders/shipping-companies_dash/`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',  // Setting Content-Type for file uploads
                },
            });

            // Close the modal and reset the form upon successful submission
            setShowModalCreate(false);
            setFormData({
                Country_id: item?.id,
                image: null,
                name: '',
                description: '',
                shipping_price: 0,
                discount_price: 0,
                work_days: '',
            });

            fetchCompany();  // Fetch updated company data after submission
        } catch (error) {
            console.error('Error creating Company:', error);  // Handle any errors that occur during submission
        }
    };

    // Handle closing the modal
    const handleCloseModal = () => {
        setShowModalCreate(false);
    };

    return (
        <>
            {/* Button to trigger the modal */}
            <button onClick={() => setShowModalCreate(true)} className="add-rate">Add shipping Country </button>

            {/* Modal to display the form */}
            <div className={`modal_dash ${showModalCreate ? 'show_dash' : ''}`}>
                <form className="modal-content_dash animate" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className='form_title'>انشاء جديد</div>
                    <div className="FOrm-container_dash">
                        <div className="form-container-half">
                            <label className='label_dash' htmlFor="name" style={{ paddingTop: '15px' }}>اسم الشركه</label>
                            <input type="text" className='text_dash' name="name" value={formData.name} onChange={handleChange} placeholder="الاسم" />
                        </div>
                        <div className="form-container-half">
                            <label className='label_dash' htmlFor="image" style={{ paddingTop: '15px', textAlign: 'center' }}>لوجو الشركه</label>
                            <input type="file" className='text_dash' name="image" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="FOrm-container_dash">
                        <div className="form-container-half" style={{ float: 'right' }}>
                            <label className='label_dash' htmlFor="work_days" style={{ paddingTop: '15px', textAlign: 'center' }}>ايام العمل</label>
                            <input type="text" className='text_dash' name="work_days" value={formData.work_days} onChange={handleChange} placeholder="ايام العمل" />
                        </div>
                        <div className="form-container-half" style={{ float: 'right' }}>
                            <label className='label_dash' htmlFor="shipping_price" style={{ paddingTop: '15px', textAlign: 'center' }}>سعر الشحن</label>
                            <input type="number" className='text_dash' name="shipping_price" value={formData.shipping_price} onChange={handleChange} />
                        </div>
                        <div className="form-container-half" style={{ float: 'right' }}>
                            <label className='label_dash' htmlFor="discount_price" style={{ paddingTop: '15px', textAlign: 'center' }}>سعر الخصم</label>
                            <input type="number" className='text_dash' name="discount_price" value={formData.discount_price} onChange={handleChange} />
                        </div>
                    </div>
                    <br /><br />
                    <div className="FOrm-container_dash" style={{ paddingTop: '20px' }}>
                        <div style={{ width: '78%' }}><button className="button-form" type="submit">حفظ</button></div>
                        <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>الغاء</button></div>
                    </div>
                </form>
            </div>
        </>
    );
}