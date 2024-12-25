
import axios from 'axios';
import React from 'react';
import { SlTrash } from "react-icons/sl";
import Config from '../../../../components/config';

export default function RemoveItem({ itemId, FetchCart }) {

    const handleRemoveItem = async () => {
        try {

            const response = await axios.delete(`${Config.baseURL}/api/cart/delete-cart-item/${itemId}/`);
            if (response.status === 200) {
                FetchCart();
            }
        } catch (error) {
            console.error('Error deleting item from cart:', error);
        }
    };
    return (
        <div className='cartProductRemove' onClick={handleRemoveItem}>
            <SlTrash />
        </div>
    );
}