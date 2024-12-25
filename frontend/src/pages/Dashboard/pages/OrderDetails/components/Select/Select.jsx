import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Config from '../../../../../../components/config';
import OrderDelete from '../OrderDelete/OrderDelete';
import './Select.css';
export default function Select({ order, fetchOrder }) {

    const [currentStatus, setCurrentStatus] = useState(order.status);
    const [anticipation, setAnticipation] = useState(order.anticipation);
    const [package_type, setPackage_type] = useState(order.package);
    const [packageData, setPackageData] = useState([]);

    useEffect(() => {
        const handleStatusChange = async () => {
            try {
                await axios.put(`${Config.baseURL}/api/content/orders/status/${order?.id}/`, null, {
                    params: { status: currentStatus }
                });
                fetchOrder();

            } catch (error) {
                console.error('Error updating status:', error);
            }
        };

        handleStatusChange();
    }, [currentStatus, order.id]);


    useEffect(() => {
        const handleanticipationChange = async () => {
            try {
                await axios.put(`${Config.baseURL}/api/content/orders/anticipation/${order?.id}/`, null, {
                    params: { anticipation: anticipation }
                });
                fetchOrder();
            } catch (error) {
                console.error('Error updating anticipation:', error);
            }
        };

        handleanticipationChange();
    }, [anticipation, order.id]);

    useEffect(() => {
        const handlpackage_typeChange = async () => {
            try {
                await axios.put(`${Config.baseURL}/api/content/orders/package/${order?.id}/`, null, {
                    params: { package: package_type }
                });
                fetchOrder();
            } catch (error) {
                console.error('Error updating package:', error);
            }
        };

        handlpackage_typeChange();
    }, [package_type, order?.id]);


    useEffect(() => {
        fetchPackage();
    }, []);

    const fetchPackage = async () => {
        try {
            const response = await axios.get(`${Config.baseURL}/api/content/accounting/package/`);
            setPackageData(response.data.package);
        } catch (error) {
            console.error("There was an error fetching the package data!", error);
        }
    };

    return (
        <div className='select-details'>

            <div className='details_select'>
                <div >
                    <div className='select_label'><label for="" >:حدد الحاله </label>  </div>
                    <div>

                        <select id="status" value={currentStatus}
                            onChange={(e) => setCurrentStatus(e.target.value)}
                            style={{ width: '100%', textAlign: 'center' }} >
                            <option value='P'> Placed</option>
                            <option value='PU'> Pick-up  </option>
                            <option value='Di'> Dispatched  </option>
                            <option value='PA'>Package Arrived </option>
                            <option value='DFD'> Dispatched for Delivery</option>
                            <option value='D'>Delivery </option>
                            <option value='C'>Cancel </option>
                        </select>

                    </div></div></div>


            <div className='details_select'>

                <div >
                    <div className='select_label'><label for="" >:حدد وصول الشحن  </label>  </div>
                    <div>
                        <select id="anticipation" value={anticipation}
                            onChange={(e) => setAnticipation(e.target.value)}
                            style={{ width: '100%', textAlign: 'center' }} >
                            <option value="sat">السبت</option>
                            <option value="sun">الأحد</option>
                            <option value="mon">الاثنين</option>
                            <option value="tue">الثلاثاء</option>
                            <option value="wed">الأربعاء</option>
                            <option value="thu">الخميس</option>
                            <option value="fri">الجمعة</option>
                        </select>
                    </div></div> </div>


            <div className='details_select'>
                <div >
                    <div className='select_label'><label for="" >:  حدد نوع التغليف  </label>  </div>
                    <div>
                        <select id="anticipation"
                            value={package_type}
                            onChange={(e) => setPackage_type(e.target.value)}
                            style={{ width: '100%', textAlign: 'center' }} >
                            <option value=''> حدد التغليف</option>
                            {packageData.map(item => (
                                <option value={item?.id}>{item?.name}</option>))}
                        </select>
                    </div></div></div>

            <div className='details_select'>

                <OrderDelete orderId={order.id} />
            </div>

        </div>
    )
}


