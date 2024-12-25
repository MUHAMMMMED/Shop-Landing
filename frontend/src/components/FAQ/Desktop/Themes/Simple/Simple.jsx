import React, { useState } from "react";
import './Simple.css';

export default function Simple({ data, language }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <div style={{ float: 'right', width: '100%', marginBottom: '20px' }}>
      <div className='faq'>
        <div className='Faq-div-title' >
          <h2 className={`faq-title${language === 'ar' ? 'rtl' : 'ltr'}`}> {language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}</h2>
        </div>

        <div className={`faq-container ${language === 'ar' ? 'rtl' : 'ltr'}`}>
          {/* FAQ Section */}
          <div className="faq-section" >
            {data?.content.map((item, index) => (
              <div className="faq-item" key={index}>
                <button
                  className={`faq-question ${activeIndex === index ? "active" : ""}`}
                  onClick={() => toggleFAQ(index)} >
                  {item?.question}
                </button>
                {activeIndex === index && (
                  <p className="faq-answer">{item?.answer}</p>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="contact-section">
            <h2>{data?.title}</h2>
            <p>{data?.description}</p>
            {data?.contact && (
              <a href={data?.contact}>
                <button className="contact-button">
                  {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}