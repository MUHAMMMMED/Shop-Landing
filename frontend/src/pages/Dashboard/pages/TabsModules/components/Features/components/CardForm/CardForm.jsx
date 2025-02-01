import axios from 'axios';
import React, { useState } from 'react';

const CardForm = () => {
    const [cardData, setCardData] = useState({
        themes_desktop_Types: 'classic',
        themes_tablet_Types: 'classic',
        themes_mobile_Types: 'classic',
        is_mobile: true,
        is_tablet: true,
        is_desktop: true,
        content: []
    });

    const [content, setContent] = useState({
        title: '',
        description: '',
        image: null
    });

    const handleContentChange = (e) => {
        const { name, value } = e.target;
        setContent({
            ...content,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        setContent({
            ...content,
            image: e.target.files[0]
        });
    };

    const addContent = () => {
        setCardData({
            ...cardData,
            content: [...cardData.content, content]
        });
        setContent({
            title: '',
            description: '',
            image: null
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('themes_desktop_Types', cardData.themes_desktop_Types);
        formData.append('themes_tablet_Types', cardData.themes_tablet_Types);
        formData.append('themes_mobile_Types', cardData.themes_mobile_Types);
        formData.append('is_mobile', cardData.is_mobile);
        formData.append('is_tablet', cardData.is_tablet);
        formData.append('is_desktop', cardData.is_desktop);

        cardData.content.forEach((content, index) => {
            formData.append(`content[${index}][title]`, content.title);
            formData.append(`content[${index}][description]`, content.description);
            formData.append(`content[${index}][image]`, content.image);
        });

        try {
            const response = await axios.post('/api/cards/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Card created successfully:', response.data);
        } catch (error) {
            console.error('Error creating card:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Desktop Theme:</label>
                <select
                    name="themes_desktop_Types"
                    value={cardData.themes_desktop_Types}
                    onChange={(e) => setCardData({ ...cardData, themes_desktop_Types: e.target.value })}
                >
                    <option value="classic">Classic</option>
                    <option value="simple">Simple</option>
                    <option value="modern">Modern</option>
                </select>
            </div>
            <div>
                <label>Tablet Theme:</label>
                <select
                    name="themes_tablet_Types"
                    value={cardData.themes_tablet_Types}
                    onChange={(e) => setCardData({ ...cardData, themes_tablet_Types: e.target.value })}
                >
                    <option value="classic">Classic</option>
                    <option value="simple">Simple</option>
                    <option value="modern">Modern</option>
                </select>
            </div>
            <div>
                <label>Mobile Theme:</label>
                <select
                    name="themes_mobile_Types"
                    value={cardData.themes_mobile_Types}
                    onChange={(e) => setCardData({ ...cardData, themes_mobile_Types: e.target.value })}
                >
                    <option value="classic">Classic</option>
                    <option value="simple">Simple</option>
                    <option value="modern">Modern</option>
                </select>
            </div>
            <div>
                <label>Is Mobile:</label>
                <input
                    type="checkbox"
                    name="is_mobile"
                    checked={cardData.is_mobile}
                    onChange={(e) => setCardData({ ...cardData, is_mobile: e.target.checked })}
                />
            </div>
            <div>
                <label>Is Tablet:</label>
                <input
                    type="checkbox"
                    name="is_tablet"
                    checked={cardData.is_tablet}
                    onChange={(e) => setCardData({ ...cardData, is_tablet: e.target.checked })}
                />
            </div>
            <div>
                <label>Is Desktop:</label>
                <input
                    type="checkbox"
                    name="is_desktop"
                    checked={cardData.is_desktop}
                    onChange={(e) => setCardData({ ...cardData, is_desktop: e.target.checked })}
                />
            </div>
            <div>
                <label>Content Title:</label>
                <input
                    type="text"
                    name="title"
                    value={content.title}
                    onChange={handleContentChange}
                />
            </div>
            <div>
                <label>Content Description:</label>
                <textarea
                    name="description"
                    value={content.description}
                    onChange={handleContentChange}
                />
            </div>
            <div>
                <label>Content Image:</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                />
            </div>
            <button type="button" onClick={addContent}>Add Content</button>
            <button type="submit">Create Card</button>
        </form>
    );
};

export default CardForm;