import React, { useState } from 'react';
import AxiosInstance from "../../../../../../../../Authentication/AxiosInstance";
import Config from "../../../../../../../../components/config";

const FeaturesCardForm = () => {
    const [formData, setFormData] = useState({
        themes_desktop_Types: "classic",
        themes_tablet_Types: "classic",
        themes_mobile_Types: "classic",
        is_mobile: true,
        is_tablet: true,
        is_desktop: true,
        content: [], // list of nested lists
    });

    const [newContent, setNewContent] = useState({
        image: null,
        title: "",
        description: "",
    });

    const handleContentChange = (e) => {
        const { name, value, files } = e.target;
        setNewContent((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const addContentToList = () => {
        if (!newContent.title || !newContent.description || !newContent.image) {
            alert("Please fill in all fields before adding content.");
            return;
        }

        // Create new list (one item) for the content
        const updatedContent = {
            title: newContent.title,
            description: newContent.description,
            image: newContent.image,
        };

        // Add the new list (with a single content item) to formData.content
        setFormData((prev) => ({
            ...prev,
            content: [
                ...prev.content,
                [{ ...updatedContent }] // Add new nested list inside content
            ],
        }));

        // Reset the content input fields
        setNewContent({ image: null, title: "", description: "" });
    };

    const removeContentFromList = (outerIndex, innerIndex) => {
        setFormData((prev) => ({
            ...prev,
            content: prev.content.map((list, index) =>
                index === outerIndex
                    ? list.filter((_, i) => i !== innerIndex) // Remove the item from the nested list
                    : list
            ),
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const payload = new FormData();

        formData.content.forEach((list) => {
            list.forEach((item) => {
                payload.append('title', item.title);
                payload.append('description', item.description);
                payload.append('image', item.image); // Append file directly
            });
        });

        try {
            const response = await AxiosInstance.post(
                `${Config.baseURL}/api/content/features_card/`,
                payload,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            console.log('Data submitted:', response.data);
        } catch (error) {
            console.error('Error submitting data:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Create Features Card</h2>

            {/* Main Form */}
            <div style={styles.form}>
                <h3>Features Card Settings</h3>
                <input
                    type="text"
                    name="themes_desktop_Types"
                    placeholder="Desktop Theme Type"
                    value={formData.themes_desktop_Types}
                    onChange={handleTextChange}
                />
                <input
                    type="text"
                    name="themes_tablet_Types"
                    placeholder="Tablet Theme Type"
                    value={formData.themes_tablet_Types}
                    onChange={handleTextChange}
                />
                <input
                    type="text"
                    name="themes_mobile_Types"
                    placeholder="Mobile Theme Type"
                    value={formData.themes_mobile_Types}
                    onChange={handleTextChange}
                />
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="is_mobile"
                            checked={formData.is_mobile}
                            onChange={handleCheckboxChange}
                        />
                        Is Mobile
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="is_tablet"
                            checked={formData.is_tablet}
                            onChange={handleCheckboxChange}
                        />
                        Is Tablet
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="is_desktop"
                            checked={formData.is_desktop}
                            onChange={handleCheckboxChange}
                        />
                        Is Desktop
                    </label>
                </div>
            </div>

            {/* New Content Form */}
            <div style={styles.form}>
                <h3>Add New Content</h3>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleContentChange}
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newContent.title}
                    onChange={handleContentChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={newContent.description}
                    onChange={handleContentChange}
                />
                <button type="button" onClick={addContentToList} style={styles.addButton}>
                    Add to List
                </button>
            </div>

            {/* Content List */}
            <div style={styles.listContainer}>
                <h3>Content List</h3>
                {formData.content.map((list, outerIndex) => (
                    <div key={outerIndex} style={styles.listItem}>
                        <h4>List {outerIndex + 1}</h4>
                        {list.map((content, innerIndex) => (
                            <div key={innerIndex} style={styles.listItem}>
                                <p><strong>Title:</strong> {content.title}</p>
                                <p><strong>Description:</strong> {content.description}</p>
                                <p><strong>Image:</strong> {content.image ? content.image.name : 'No image'}</p> {/* Display file name */}
                                <button
                                    type="button"
                                    onClick={() => removeContentFromList(outerIndex, innerIndex)}
                                    style={styles.removeButton}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Submit Button */}
            <button
                type="button"
                onClick={handleSubmit}
                style={styles.submitButton}
                disabled={formData.content.length === 0}
            >
                Submit All Data
            </button>
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "20px",
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: "8px",
    },
    listContainer: {
        marginBottom: "20px",
    },
    listItem: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "10px",
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "5px",
    },
    addButton: {
        background: "blue",
        color: "white",
        padding: "10px",
        border: "none",
        cursor: "pointer",
    },
    removeButton: {
        background: "red",
        color: "white",
        border: "none",
        padding: "5px 10px",
        cursor: "pointer",
    },
    submitButton: {
        background: "green",
        color: "white",
        padding: "10px",
        border: "none",
        cursor: "pointer",
    },
};

export default FeaturesCardForm;