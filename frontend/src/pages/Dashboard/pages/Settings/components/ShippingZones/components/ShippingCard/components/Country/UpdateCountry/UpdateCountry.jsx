import React, { useState } from 'react'; // Importing React and useState hook for managing component state
import { FiEdit2, FiTrash } from "react-icons/fi"; // Importing icons for edit and delete actions
import AxiosInstance from '../../../../../../../../../../../Authentication/AxiosInstance'; // Importing AxiosInstance for API requests
import Config from '../../../../../../../../../../../components/config'; // Importing configuration for base URL

// Functional component to update or delete a country
export default function UpdateCountry({ item, fetchCountry }) {

    // State to manage modal visibility and form data
    const [showModalUpdate, setShowModalUpdate] = useState(false);  // Modal visibility state
    const [formData, setFormData] = useState({
        name: item.name,  // Initialize form data with values from the passed 'item'
        tax: item.tax,    // Initialize tax field from the 'item'
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
            await AxiosInstance.put(`${Config.baseURL}/api/orders/shipping-countries_dash/${item.id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',  // Content type for form submission
                },
            });

            setShowModalUpdate(false);  // Close the modal after successful update
            fetchCountry();  // Fetch the updated list of countries
        } catch (error) {
            console.error('Error updating Country:', error);  // Log any errors during the API request
        }
    };

    // Handle deletion of the country
    const handleDelete = async () => {
        // Confirm deletion action before proceeding
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذه  الدوله   ؟')) {
            try {
                // API call to delete the country by its ID
                await AxiosInstance.delete(`${Config.baseURL}/api/orders/shipping-countries_dash/${item.id}/`);
                fetchCountry();  // Fetch the updated list of countries after deletion
            } catch (error) {
                console.error('Error deleting Country:', error);  // Log any errors during the deletion process
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
                    <div className="FOrm-container_dash">
                        <div className="form-container-half">
                            <label className='label_dash' htmlFor="name" style={{ paddingTop: '15px' }}>  اسم الدوله  </label>
                            {/* Country name input field */}
                            <input type="text" className='text_dash' name="name" value={formData.name} onChange={handleChange} placeholder="  اسم الدوله " />
                        </div>

                        <div className="form-container-half">
                            <label className='label_dash' htmlFor="tax" style={{ paddingTop: '15px' }}>الضريبه</label>
                            {/* Tax input field */}
                            <input type="number" className='text_dash' name="tax" value={formData.tax} onChange={handleChange} />
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