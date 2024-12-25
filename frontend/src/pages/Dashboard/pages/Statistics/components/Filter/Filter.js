import React from 'react';
import './Filter.css';

export default function Filter({ darkMode }) {
    return (
        <>
            <div className='Filter'>
                <div className='Filter-center'>
                    <span className={darkMode ? 'Filter-btn-active  Filter-btn-dark  Filter-btn-active-dark ' : 'Filter-btn-active Filter-btn-light Filter-btn-active-light  '}>الجميع</span>
                    <span className={darkMode ? 'Filter-btn Filter-btn-dark ' : 'Filter-btn  Filter-btn-light'}> للبيع</span>
                    <span className={darkMode ? 'Filter-btn  Filter-btn-dark' : 'Filter-btn Filter-btn-light  '}> للايجار</span>
                </div>
            </div>

        </>
    )
}
