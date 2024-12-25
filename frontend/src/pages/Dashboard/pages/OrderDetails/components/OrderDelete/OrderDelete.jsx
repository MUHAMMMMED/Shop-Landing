import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Config from '../../../../../../components/config';
export default function OrderDelete({ orderId }) {
    const navigate = useNavigate();
    const handleDelete = async () => {

        const isConfirmed = window.confirm('هل أنت متأكد أنك تريد حذف هذا الطلب؟');
        if (!isConfirmed) {
            return;
        }
        try {
            const response = await axios.delete(`${Config.baseURL}/api/orders/${orderId}/delete/`);
            if (response.status === 200) {
                alert('تم حذف الطلب بنجاح.')
                navigate('/orders');
            }
        } catch (error) {
            console.error('Error deleting the order:', error);
            alert('حدث خطأ أثناء محاولة حذف الطلب.');
        }
    };

    return (
        <button className="delete-order" onClick={handleDelete}>
            حذف الطلب
        </button>
    );
}