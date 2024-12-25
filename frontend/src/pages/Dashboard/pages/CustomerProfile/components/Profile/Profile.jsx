import React from 'react';
import './Profile.css';
import ProfileInfo from './components/ProfileInfo/ProfileInfo';
import ProfileOrders from './components/ProfileOrders/ProfileOrders';
export default function Profile({ language, data }) {
    return (
        <>
            <div className='Profile-row-L'> <ProfileInfo language={language} data={data} /></div>
            <div className='Profile-row-R'><ProfileOrders language={language} data={data} /></div>
        </>
    )
}
