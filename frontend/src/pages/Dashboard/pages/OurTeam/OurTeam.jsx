import React, { useState } from 'react';
import useWindowSize from '../../../../Hooks/useWindowSize';
import DesktopTable from '../../../../dash-components/OurTeam/DesktopTable/DesktopTable';
import HeaderTable from '../../../../dash-components/OurTeam/HeaderTable/HeaderTable';
import MobileTable from '../../../../dash-components/OurTeam/MobileTable/MobileTable';
import TabletTable from '../../../../dash-components/OurTeam/TabletTable/TabletTable';
import DasHeader from '../../components/DasHeader/DasHeader';
import FooterNav from '../../components/DashFooterNav/DashFooterNav';
import Sidebar from '../../components/Sidebar/Sidebar';


export default function OurTeam() {
  const { width } = useWindowSize();
  const [language, setLanguage] = useState('en');

  const updateLanguage = (newLanguage) => setLanguage(newLanguage);

  const Data = [
    {
      id: '1',
      Name: 'Abdelghani Berhouch',
      Access: ['Admin', 'Read Data', 'Data Import'],
      Date: 'Thu Oct 17 2024',
    },
    {
      id: '2',
      Name: 'Asaad Mansour',
      Access: ['Admin', 'Read Data', 'Data Import'],
      Date: 'Thu Oct 17 2024',
    },
  ];

  const TableColumns = [
    { key: 'ID', en: 'ID', ar: 'معرف' },
    { key: 'Name', en: 'Name', ar: 'الاسم' },
    { key: 'Access', en: 'Access', ar: 'الوصول' },
    { key: 'Date', en: 'Date added', ar: 'تاريخ الإضافة' },
    { key: 'Action', en: 'Action', ar: 'إجراء' },
  ];

  return (
    <>
      <DasHeader language={language} updateLanguage={updateLanguage} />
      <div className={`dashboard ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <Sidebar language={language} />
        <main className={`content ${language === 'ar' ? 'rtl' : 'ltr'}`}>
          <HeaderTable name="OurTeam" link="/" language={language} />
          {width > 1024 ? (
            <DesktopTable language={language} tableColumns={TableColumns} data={Data} />
          ) : width > 768 ? (
            <TabletTable language={language} tableColumns={TableColumns} data={Data} />
          ) : (
            <MobileTable language={language} tableColumns={TableColumns} data={Data} />
          )}
        </main>
      </div>
      <FooterNav language={language} />
    </>
  );
}