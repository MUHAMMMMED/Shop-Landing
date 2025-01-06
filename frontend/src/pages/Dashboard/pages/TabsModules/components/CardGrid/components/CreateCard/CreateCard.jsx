import React, { useState } from 'react';
import AxiosInstance from '../../../../../../../../Authentication/AxiosInstance';
import Config from '../../../../../../../../components/config';
const CreateCard = () => {
    const [contents, setContents] = useState([]);
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contact, setContact] = useState('');

    // Add new content (title, description, image) to the list
    const handleAddContent = () => {
        if (title && description && image) {
            setContents([...contents, { title, description, image }]);
            setTitle(''); // Clear input fields after adding
            setDescription('');
            setImage('');
        } else {
            alert("Title, description, and image are required.");
        }
    };

    // Delete a specific content from the list
    const handleDeleteContent = (index) => {
        const updatedContents = contents.filter((_, i) => i !== index);
        setContents(updatedContents);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            content: contents,
        };

        try {
            // Send the data to the backend API
            await AxiosInstance.post(`${Config.baseURL}/api/content/card/`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Created successfully!');
            // Optionally reset the form after submission
            setTitle('');
            setDescription('');
            setContact('');
            setImage('');
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the content.');
        }
    };

    return (
        <div className="faq-form-container" style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="mb-4">Create New Card</h2>
            <form onSubmit={handleSubmit}>
                {/* Contact Input */}
                <div className="form-group">
                    <label>Contact</label>
                    <input
                        type="text"
                        className="form-control"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                </div>

                {/* Add Content Form */}
                <h3 className="mt-4">Add Content</h3>
                <div className="form-group">
                    {/* Title Input */}
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    {/* Description Input */}
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    {/* Image Input */}
                    <label>Image</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </div>

                <button
                    type="button"
                    className="btn btn-primary mb-3"
                    onClick={handleAddContent}
                >
                    Add
                </button>

                {/* Render Content List */}
                {contents.length > 0 && (
                    <div className="contents-list">
                        <h4>Added Content</h4>
                        <ul className="list-group">
                            {contents.map((content, index) => (
                                <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                    <div>
                                        <strong>Title:</strong> {content.title}
                                        <br />
                                        <strong>Description:</strong> {content.description}
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteContent(index)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Submit Button */}
                <div className="submit-btn mt-4">
                    <button type="submit" className="btn btn-success">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCard;