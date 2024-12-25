
import React from 'react';
import useWindowSize from '../../../../../../../../Hooks/useWindowSize';
import DesktopTable from '../../../../../../../../dash-components/Orders/DesktopTable/DesktopTable';
import MobileTable from '../../../../../../../../dash-components/Orders/MobileTable/MobileTable';
import TabletTable from '../../../../../../../../dash-components/Orders/TabletTable/TabletTable';
export default function ProfileOrders({ language, data }) {

    const { width } = useWindowSize();

    const TableColumns = [
        { key: 'id', en: 'ID', ar: 'معرف' },
        { key: 'customer_name', en: 'Customer', ar: 'العميل' },
        { key: 'order_items', en: 'Items', ar: 'البنود' },
        { key: 'total', en: 'Amount', ar: 'المبلغ' },
        { key: 'created_at', en: 'Date', ar: 'التاريخ' },
        { key: 'status', en: 'Status', ar: 'الحالة' },
        { key: 'action', en: 'Action', ar: 'إجراء' }
    ];
    return (
        <>

            {width > 1024 ? (
                <DesktopTable language={language} tableColumns={TableColumns} data={data?.orders} />
            ) : width > 768 ? (
                <TabletTable language={language} tableColumns={TableColumns} data={data?.orders} />
            ) : (
                <MobileTable language={language} tableColumns={TableColumns} data={data?.orders} />
            )}

        </>
    )
}
