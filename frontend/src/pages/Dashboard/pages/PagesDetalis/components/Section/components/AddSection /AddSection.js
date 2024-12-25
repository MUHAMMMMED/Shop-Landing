import { useState } from 'react'; // Importing useState hook for managing state in the component
import AxiosInstance from '../../../../../../../../Authentication/AxiosInstance'; // Importing AxiosInstance to make API requests
import Config from '../../../../../../../../components/config'; // Importing configuration file for base URL
import './AddSection.css'; // Importing CSS file for styling the component

export default function AddSection({ page, fetchPage, language }) {
    // Setting up state variables to manage form inputs, success, and error messages
    const [title, setTitle] = useState('');  // State to hold the title of the new section
    const [error, setError] = useState(null);  // State to manage error messages
    const [success, setSuccess] = useState(null);  // State to manage success messages

    // Function to get the next order for the sections based on the last section order for each device type
    const getNextOrder = (type) => {
        if (page.sections && page.sections.length > 0) {
            const sortedSections = [...page.sections].sort((a, b) => b[type] - a[type]); // Sorting sections by type (e.g., mobile_order)
            const lastOrder = sortedSections[0][type];  // Fetching the order of the last section
            return lastOrder + 1;  // Incrementing the order for the new section
        }
        return 1;  // Returning 1 if no sections exist yet
    };

    // Getting the next order for each type of device (desktop, tablet, mobile)
    const order = getNextOrder('order');
    const mobileOrder = getNextOrder('mobile_order');
    const tabletOrder = getNextOrder('tablet_order');
    const desktopOrder = getNextOrder('desktop_order');

    // Function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Preventing the default form submission behavior

        // Creating the new section object with the input values and next order values
        const newSection = {
            title,
            page: page.id,  // Associating the new section with the current page
            order: order,  // Setting the order for the new section
            mobile_order: mobileOrder,  // Setting the mobile order for the new section
            tablet_order: tabletOrder,  // Setting the tablet order for the new section
            desktop_order: desktopOrder  // Setting the desktop order for the new section
        };

        try {
            // Making a POST request to add the new section to the database
            await AxiosInstance.post(`${Config.baseURL}/api/content/sections/`, newSection);
            setSuccess(language === 'ar' ? 'تم إضافة القسم بنجاح!' : 'Section added successfully!');  // Setting success message
            fetchPage();  // Fetching updated page data after adding the section
            setError(null);  // Resetting any previous error messages
            setTitle('');  // Clearing the title input field
        } catch (error) {
            // Handling any errors during the API request
            setError(language === 'ar' ? 'حدث خطأ أثناء إضافة القسم. يرجى المحاولة مرة أخرى.' : 'Error adding section. Please try again.');
            setSuccess(null);  // Resetting the success message
        }
    };

    return (
        <div className="add-section-container">
            {/* Header for the Add Section form */}
            <h4 className="add-section-header">{language === 'ar' ? 'إضافة قسم جديد' : 'Add New Section'}</h4>

            {/* Form to add a new section */}
            <form className="add-section-form" onSubmit={handleSubmit}>
                {/* Label and input field for the section title */}
                <label> {language === 'ar' ? 'عنوان' : 'Title'}</label>
                <input
                    type="text"  // Input field type is text
                    value={title}  // Binding the value of input to the title state
                    onChange={(e) => setTitle(e.target.value)}  // Updating the title state when the input changes
                    required  // Marking the field as required
                />

                {/* Displaying error or success message */}
                {error && <p className="error-message">{error}</p>}  {/* Error message if there is an error */}
                {success && <p className="success-message">{success}</p>}  {/* Success message if the section is added successfully */}

                {/* Submit button to add the section */}
                <button className="submit-button" type="submit"> {language === 'ar' ? 'إضافة قسم' : 'Add Section'}</button>
            </form>
        </div>
    );
}