import React, { useEffect, useState } from 'react'; // Import React and necessary hooks (useState, useEffect)
import AxiosInstance from '../../../../../../../Authentication/AxiosInstance'; // Import a pre-configured Axios instance for API calls
import Config from '../../../../../../../components/config'; // Import configuration for API base URL
import './Images.css'; // Import CSS for styling the component

// Functional component for handling image uploads and display
export default function Images({ images = [], Id, language }) {
    const [imageList, setImageList] = useState(images); // Manage local state for image list, initialized from props
    const URL = `${Config.baseURL}/api/products/image/`; // Construct the API URL for handling image requests

    // Function to handle image removal
    const handleRemoveImage = async (id) => {
        try {
            // Send DELETE request to API to remove the image by ID
            await AxiosInstance.delete(`${URL}${id}/`);
            // Update the image list in the state to exclude the removed image
            setImageList(imageList.filter((image) => image.id !== id));
        } catch (error) {
            console.error('Error removing Product image:', error); // Log errors in case of failure
        }
    };

    // Function to handle file upload
    const handleFileUpload = async (event) => {
        const file = event.target.files[0]; // Get the selected file from input
        if (file) {
            const formData = new FormData();
            formData.append('image', file); // Append the selected file to the FormData object
            formData.append('product_id', Id); // Append the product ID to associate with the image

            try {
                // Send POST request to upload the image
                const response = await AxiosInstance.post(URL, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }, // Set appropriate header for file upload
                });
                // Update the image list with the newly uploaded image
                setImageList((prevList) => [...prevList, response.data]);
            } catch (error) {
                console.error('Error uploading product image:', error); // Log errors in case of failure
            }
        }
    };

    // useEffect to sync the image list whenever the 'images' prop changes
    useEffect(() => {
        setImageList(images); // Update state with the new images passed as props
    }, [images]);

    return (
        <>
            {/* Image upload section */}
            <div className='Product-section-row'>
                <div className="upload-box">
                    <h2 style={{ color: '#000' }}>
                        {/* Conditional rendering for language-based text */}
                        {language === 'en' ? 'Upload Images' : 'تحميل الصور'}
                    </h2>
                    <label htmlFor="file-upload">
                        {/* Hidden file input */}
                        <input
                            id="file-upload"
                            type="file"
                            accept=".png, .jpg, .jpeg, .gif" // Supported file types
                            style={{ display: 'none' }} // Hide the input for better UX
                            onChange={handleFileUpload} // Trigger file upload handler on file selection
                        />
                        <span>{language === 'en' ? 'Click to upload' : 'اضغط للتحميل'}</span>
                        {/* Display supported formats and size constraints */}
                        <span>SVG, PNG, JPG, or GIF (MAX. 800x400px)</span>
                    </label>
                </div>
            </div>

            {/* Display uploaded images */}
            <div className='Product-section-row'>
                {imageList.length > 0 ? (
                    imageList.map((imagePreview, index) => (
                        <div key={index} className="thumbnail">
                            <div>
                                <img
                                    src={imagePreview.image} // Image URL
                                    alt={`Uploaded ${index}`} // Alt text for accessibility
                                    className="img" // CSS class for styling
                                />
                            </div>
                            <div className="but-remove">
                                <div
                                    className="button-remove"
                                    onClick={() => handleRemoveImage(imagePreview.id)} // Handle image removal on click
                                >
                                    {/* Conditional rendering for language-based text */}
                                    {language === 'en' ? 'Remove Image' : 'حذف الصورة'}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    // Show message if no images are uploaded
                    <p>{language === 'en' ? 'No images uploaded yet.' : 'لم يتم تحميل أي صور حتى الآن.'}</p>
                )}
            </div>
        </>
    );
}