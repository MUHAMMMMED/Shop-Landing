import React, { useState } from 'react'; // Importing React and useState hook for managing component state
import { FiEdit2, FiTrash } from "react-icons/fi"; // Importing icons for edit and delete actions
import AxiosInstance from '../../../../../../../../../Authentication/AxiosInstance';
import Config from '../../../../../../../../../components/config';

// 
export default function UpdateCoupon({ item, fetchData }) {

    // State to manage modal visibility and form data
    const [showModalUpdate, setShowModalUpdate] = useState(false);  // Modal visibility state
    const [formData, setFormData] = useState({

        code: item.code,
        discount: item.discount,
        coupon_usage: item.coupon_usage,
        expiryDate: item.expiryDate,
    });

    // Handle changes to the form inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });  // Update specific field in the form data
    };

    // Handle form submission to update country data
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the default form submission behavior
        try {
            // API call to submit the form data and update country information
            await AxiosInstance.put(`${Config.baseURL}/api/cart/coupon/${item.id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',  // Content type for form submission
                },
            });

            setShowModalUpdate(false);  // Close the modal after successful update
            fetchData();  // Fetch the updated list of countries
        } catch (error) {
            console.error('Error updating  :', error);  // Log any errors during the API request
        }
    };

    // Handle deletion of the country
    const handleDelete = async () => {
        // Confirm deletion action before proceeding
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذه      ؟')) {
            try {
                // API call to delete the country by its ID
                await AxiosInstance.delete(`${Config.baseURL}/api/cart/coupon/${item.id}/`);
                fetchData();  // Fetch the updated list of countries after deletion
            } catch (error) {
                console.error('Error deleting  :', error);  // Log any errors during the deletion process
            }
        }
    };

    // Handle modal close action
    const handleCloseModal = () => {
        setShowModalUpdate(false);  // Close the modal when cancel is clicked
    };

    return (
        <>
            {/* Edit and Delete Icons */}
            <span className="table-icon" onClick={() => setShowModalUpdate(true)}> <FiEdit2 /> </span>  {/* Edit button */}
            <span className="table-icon" onClick={handleDelete}>  <FiTrash /> </span>  {/* Delete button */}

            {/* Modal for updating country details */}
            <div className={`modal_dash ${showModalUpdate ? 'show_dash' : ''}`} style={{ color: '#000' }}>
                <form className="modal-content_dash animate" onSubmit={handleSubmit}>
                    <div className='form_title'>تحديث البيانات</div>

                    {/* Form fields for updating country data */}
                    {/* Form fields to collect country details */}
                    <div className="FOrm-container_dash">
                        <div className="form-container-half">
                            <label className='label_dash' htmlFor="code" style={{ paddingTop: '15px' }}> code </label>

                            <input type="text" className='text_dash' name="code" value={formData.code} onChange={handleChange} placeholder=" code" />
                        </div>

                        <div className="form-container-half">
                            <label className='label_dash' htmlFor="discount" style={{ paddingTop: '15px' }}>discount</label>

                            <input type="number" className='text_dash' name="discount" value={formData.discount} onChange={handleChange} />
                        </div>

                        <div className="form-container-half">
                            <label className='label_dash' htmlFor="coupon_usage" style={{ paddingTop: '15px' }}>coupon_usage</label>

                            <input type="number" className='text_dash' name="coupon_usage" value={formData.coupon_usage} onChange={handleChange} />
                        </div>

                        <div className="form-container-half">
                            <label className='label_dash' htmlFor="expiryDate" style={{ paddingTop: '15px' }}>expiryDate</label>

                            <input type="date" className='text_dash' name="expiryDate" value={formData.expiryDate} onChange={handleChange} />
                        </div>


                    </div>


                    {/* Buttons for saving or canceling changes */}
                    <br /><br />
                    <div className="FOrm-container_dash" style={{ paddingTop: '20px' }}>
                        <div style={{ width: '78%' }}>
                            <button className="button-form" type="submit">حفظ</button>  {/* Save button */}
                        </div>
                        <div style={{ width: '20%' }}>
                            <button className="cancel-button" onClick={handleCloseModal}>الغاء</button>  {/* Cancel button */}
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}