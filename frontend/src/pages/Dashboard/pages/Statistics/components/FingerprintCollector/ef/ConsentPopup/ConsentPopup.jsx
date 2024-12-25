// src/components/ConsentPopup.jsx
import React from 'react';

const ConsentPopup = ({ onClose, onConsent }) => {
    return (
        <div className="consent-popup">
            <div className="popup-content">
                <h2>جمع البيانات</h2>
                <p>هل توافق على جمع بياناتك لأغراض التحليل؟</p>
                <div className="button-container">
                    <button className="consent-button yes" onClick={() => onConsent(true)}>نعم</button>
                    <button className="consent-button no" onClick={() => onClose(false)}>لا</button>
                </div>
            </div>
            <style jsx>{`
                .consent-popup {
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    z-index: 1000;
                    width: 90%;
                    max-width: 400px;
                    animation: slide-in 0.3s ease-out;
                }

                .popup-content {
                    text-align: center;
                }

                h2 {
                    margin-bottom: 10px;
                    color: #333;
                }

                p {
                    margin: 0 0 20px;
                    color: #555;
                }

                .button-container {
                    display: flex;
                    justify-content: space-between;
                }

                .consent-button {
                    flex: 1;
                    margin: 0 5px;
                    padding: 10px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: background-color 0.3s;
                }

                .yes {
                    background-color: #4caf50;
                    color: white;
                }

                .yes:hover {
                    background-color: #45a049;
                }

                .no {
                    background-color: #f44336;
                    color: white;
                }

                .no:hover {
                    background-color: #e53935;
                }

                @keyframes slide-in {
                    from {
                        transform: translateX(-50%) translateY(20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(-50%) translateY(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};

export default ConsentPopup;