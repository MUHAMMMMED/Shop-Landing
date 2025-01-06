import React, { useState } from 'react';
import AxiosInstance from '../../../../../../../../../Authentication/AxiosInstance';
import Config from '../../../../../../../../../components/config';

const CreateFAQ = () => {
    const [questions, setQuestions] = useState([]); // Store questions as an array
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contact, setContact] = useState('');

    // Add new question-answer pair to the list
    const handleAddQuestion = () => {
        if (question && answer) {
            setQuestions([...questions, { question, answer }]);
            setQuestion(''); // Clear input fields after adding
            setAnswer('');
        } else {
            alert("Both question and answer are required.");
        }
    };

    // Delete a specific question-answer pair from the list
    const handleDeleteQuestion = (index) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title,
            description,
            contact,
            content: questions,
        };

        try {
            // Send the data to the backend API
            await AxiosInstance.post(
                `${Config.baseURL}/api/content/faq/`, data



            );
            alert('FAQ created successfully!');
            // Optionally reset the form after submission
            setTitle('');
            setDescription('');
            setContact('');
            setQuestions([]);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the FAQ.');
        }
    };

    return (
        <div className="faq-form-container" style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="mb-4">Create New FAQ</h2>
            <form onSubmit={handleSubmit}>
                {/* Title Input */}
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                {/* Description Input */}
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

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

                {/* Add Question Form */}
                <h3 className="mt-4">Add a Question</h3>
                <div className="form-group">
                    <label>Question</label>
                    <input
                        type="text"
                        className="form-control"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter question"
                    />
                </div>

                <div className="form-group">
                    <label>Answer</label>
                    <textarea
                        className="form-control"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Enter answer"
                    />
                </div>

                <button
                    type="button"
                    className="btn btn-primary mb-3"
                    onClick={handleAddQuestion}
                >
                    Add Question
                </button>

                {/* Render Questions List */}
                {questions.length > 0 && (
                    <div className="questions-list">
                        <h4>Added Questions</h4>
                        <ul className="list-group">
                            {questions.map((q, index) => (
                                <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                    <div>
                                        <strong>Q{index + 1}:</strong> {q.question}
                                        <br />
                                        <strong>A{index + 1}:</strong> {q.answer}
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteQuestion(index)}
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
                        Submit FAQ
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateFAQ;