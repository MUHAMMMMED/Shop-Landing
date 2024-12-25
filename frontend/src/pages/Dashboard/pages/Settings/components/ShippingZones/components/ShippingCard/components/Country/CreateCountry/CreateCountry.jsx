import React, { useState } from 'react'; // Importing React and useState for managing component state
import AxiosInstance from '../../../../../../../../../../../Authentication/AxiosInstance'; // Importing AxiosInstance for custom API requests
import Config from '../../../../../../../../../../../components/config'; // Importing configuration for base URL

// Functional component to create a new country for shipping
export default function CreateCountry({ fetchCountry }) {
    // State to manage modal visibility and form data
    const [showModalCreate, setShowModalCreate] = useState(false);  // Modal visibility state
    const [formData, setFormData] = useState({
        name: '',  // Country name input
        tax: 0,    // Tax input
    });

    // Handle changes to the form inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });  // Update specific field in the form data
    };

    // Handle form submission
    const handle_Submit = async (e) => {
        e.preventDefault();  // Prevent the default form submission behavior
        try {
            // API call to submit the form data
            await AxiosInstance.post(`${Config.baseURL}/api/orders/shipping-countries_dash/`, formData);
            setShowModalCreate(false);  // Close the modal on successful submission
            fetchCountry();  // Fetch the updated list of countries
            setFormData({
                name: '',  // Reset form data after submission
                tax: 0,
            });
        } catch (error) {
            console.error("Error creating Country:", error);  // Log any errors during the API request
        }
    };

    // Handle modal close action
    const handleCloseModal = () => {
        setShowModalCreate(false);  // Close the modal when cancel is clicked
    };

    return (
        <>
            {/* Button to trigger the modal for adding a new country */}
            <button className="add-rate" onClick={() => setShowModalCreate(true)}>Add shipping Country </button>

            {/* Modal to display the country creation form */}
            <div className={`modal_dash ${showModalCreate ? 'show_dash' : ''}`}>
                <form className="modal-content_dash animate" onSubmit={handle_Submit}>
                    <div className='form_title'>انشاء جديد</div>

                    {/* Form fields to collect country details */}
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

                    {/* Submit and cancel buttons */}
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