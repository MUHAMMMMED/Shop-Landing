import React, { useState } from 'react'; // Importing React and useState hook to manage state
import { FiEdit2, FiTrash } from "react-icons/fi"; // Importing edit and trash icons from react-icons
import AxiosInstance from '../../../../../../../../../../../Authentication/AxiosInstance'; // Importing Axios instance for API requests with authentication
import Config from '../../../../../../../../../../../components/config'; // Importing configuration file for base URL

export default function UpdateCompany({ item, fetchCompany }) {
    // Initializing state variables for modal visibility and form data
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [formData, setFormData] = useState({
        image: null,
        name: item.name,
        description: item.description,
        shipping_price: item.shipping_price,
        discount_price: item.discount_price,
        work_days: item.work_days,
    });

    // Handling form field changes (for text and file inputs)
    const handleChange = (e) => {
        if (e.target.type === 'file') {
            setFormData({ ...formData, image: e.target.files[0] }); // Updating the formData with the selected file
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value }); // Updating the formData with text input values
        }
    };

    // Handling form submission to update company details
    const handleSubmit = async (e) => {
        e.preventDefault(); // Preventing default form submission behavior
        try {
            const data = new FormData(); // Creating a FormData object to send files with the form data
            if (formData.image) {
                data.append('image', formData.image); // Appending image if it's provided
            }
            // Appending other form fields to the FormData
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('shipping_price', formData.shipping_price);
            data.append('discount_price', formData.discount_price);
            data.append('work_days', formData.work_days);

            // Sending the form data using PUT request to update the company details
            await AxiosInstance.put(`${Config.baseURL}/api/orders/shipping-companies_dash/${item?.id}/`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensuring the request is sent with correct content type for file upload
                },
            });

            setShowModalUpdate(false); // Closing the modal after successful update
            fetchCompany(); // Refreshing the company list after update
        } catch (error) {
            console.error('Error updating company:', error); // Logging any error that occurs during the update
        }
    };

    // Handling the delete action for the shipping company
    const handleDelete = async () => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذه الشركه')) { // Asking for confirmation before deleting
            try {
                // Sending a DELETE request to remove the company
                await AxiosInstance.delete(`${Config.baseURL}/api/orders/shipping-companies_dash/${item?.id}/`);
                fetchCompany(); // Refreshing the company list after deletion
            } catch (error) {
                console.error('Error deleting company:', error); // Logging any error that occurs during the delete operation
            }
        }
    };

    // Closing the modal without making any changes
    const handleCloseModal = () => {
        setShowModalUpdate(false); // Setting showModalUpdate to false to hide the modal
    };

    return (
        <>
            {/* Edit icon to trigger modal visibility */}
            <span className="table-icon" onClick={() => setShowModalUpdate(true)}> <FiEdit2 /> </span>

            {/* Trash icon to trigger delete action */}
            <span className="table-icon" onClick={handleDelete}>  <FiTrash /> </span>

            {/* Modal for updating company details, shown only when showModalUpdate is true */}
            <div className={`modal_dash ${showModalUpdate ? 'show_dash' : ''}`}>
                {/* Form inside the modal */}
                <form className="modal-content_dash animate" onSubmit={handleSubmit} encType="multipart/form-data" style={{ color: '#000' }}>
                    <div className='form_title'>تحديث البيانات</div> {/* Modal title */}
                    <div className="FOrm-container_dash">
                        {/* Left side of the form (company name and logo) */}
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
                        {/* Right side of the form (work days, shipping price, and discount price) */}
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
                    {/* Buttons for submitting or canceling the update */}
                    <div className="FOrm-container_dash" style={{ paddingTop: '20px' }}>
                        <div style={{ width: '78%' }}><button className="button-form" type="submit">حفظ</button></div>
                        <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>الغاء</button></div>
                    </div>
                </form>
            </div>
        </>
    );
}