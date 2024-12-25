import React from 'react';
import { FaInstagram, FaPhone, FaSnapchatGhost, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import './style.css';

export default function IfoCard({ darkMode }) {
    return (


        <div className={darkMode ? 'ifo-card  ifo-card-dark' : 'ifo-card ifo-card-light'}>


            <img
                src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                className="ifo-img"
                alt="Profile"
            />
            <div className="container">
                <h4 className='ifo-h4'><b>John Doe</b></h4>
                <p className='ifo-p'>Architect & Engineer</p>
            </div>
            <div className="social-icons">
                <a href="#" className="social-link fa-twitter "><FaTwitter /></a>
                <a href="#" className="social-link fa-instagram" ><FaInstagram /></a>
                <a href="#" className="social-link fa-snapchat-ghost"><FaSnapchatGhost /></a>
                <a href="#" className="social-link fa-youtube"><FaYoutube /></a>
            </div>
            <div className="contact-icons">
                <button className="label info" style={{
                    backgroundColor: '#04AA6D;'
                }}>
                    <FaPhone /> اتصل بنا
                </button>
                <button className="label success">
                    <FaWhatsapp /> واتساب
                </button>
            </div>
        </div>
    );
}