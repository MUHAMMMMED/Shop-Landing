import React, { useState } from 'react';
import DasHeader from '../../components/DasHeader/DasHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import SettingsSidebar from './components/Sidebar/Sidebar';

export default function Settings() {
    const [language, setLanguage] = useState('en');
    const updateLanguage = (newLanguage) => setLanguage(newLanguage);

    return (
        <>
            <DasHeader language={language} updateLanguage={updateLanguage} />
            <div className={`dashboard ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                <Sidebar language={language} />
                <main className={`content ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                    <SettingsSidebar />
                </main>
            </div>


        </>
    )
}
