import React, { useState } from 'react'; // Importing React and useState for managing component state
import AxiosInstance from '../../../../../../../../../Authentication/AxiosInstance';
import Config from '../../../../../../../../../components/config';
// Functional component to create a new country for shipping
export default function CreateCoupon({ fetchData }) {
    // State to manage modal visibility and form data
    const [showModalCreate, setShowModalCreate] = useState(false);  // Modal visibility state
    const [formData, setFormData] = useState({
        code: '',
        discount: 0,
        coupon_usage: 0,
        expiryDate: '',

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
            await AxiosInstance.post(`${Config.baseURL}/api/cart/coupon/`, formData);
            setShowModalCreate(false);
            fetchData();
            setFormData({
                code: '',
                discount: 0,
                coupon_usage: 0,
                expiryDate: '',
            });
        } catch (error) {
            console.error("Error creating Country:", error);  // Log any errors during the API request
        }
    };


    const handleCloseModal = () => {
        setShowModalCreate(false);
    };

    return (
        <>
            {/* Button to trigger the modal for adding a new country */}
            <button className="add-rate" onClick={() => setShowModalCreate(true)}>Add Coupon</button>

            {/* Modal to display the country creation form */}
            <div className={`modal_dash ${showModalCreate ? 'show_dash' : ''}`}>
                <form className="modal-content_dash animate" onSubmit={handle_Submit}>
                    <div className='form_title'>انشاء جديد</div>

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