
// import axios from 'axios'; // Import axios
// import React from 'react';
// import { AiOutlinePlus } from "react-icons/ai";
// import { MdMinimize } from "react-icons/md";
// import Config from '../../../../components/config';

// axios.defaults.withCredentials = true; // Ensuring cookies are sent with requests

// export default function Quantity({ itemId, quantity, FetchCart }) {

//   const handleQuantityChangeUp = () => {
//     axios.put(`${Config.baseURL}/api/cart/update_quantity/${itemId}/`, {
//       itemId: itemId,
//       quantity: quantity + 1,
//     })
//       .then(response => {
//         FetchCart(); // Update the cart after successful request
//       })
//       .catch(error => {
//         console.error('Error updating quantity:', error);
//       });
//   };

//   const handleQuantityChangeDown = () => {
//     if (quantity > 1) {
//       axios.put(`${Config.baseURL}/api/cart/update_quantity/${itemId}/`, {
//         itemId: itemId,
//         quantity: quantity - 1, // Decrease quantity
//       })
//         .then(response => {
//           FetchCart(); // Update the cart after successful request
//         })
//         .catch(error => {
//           console.error('Error updating quantity:', error);
//         });
//     } else {
//       console.error('Minimum quantity reached');
//     }
//   };

//   return (
//     <div className='cartProductQuantity'>
//       <div className='Quantity'>الكمية</div>
//       <div className='Quantity'>
//         <div className='Quantity-number'>{quantity}</div>
//         <div className='Quantity-SlArrow'>
//           <div className='Quantity-SlArrow-Down' onClick={handleQuantityChangeDown}><MdMinimize /></div>
//           <div className='Quantity-SlArrow-Up' onClick={handleQuantityChangeUp}><AiOutlinePlus /></div>
//         </div>
//       </div>
//     </div>
//   );
// }





import axios from 'axios'; // Import axios
import React from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { MdMinimize } from "react-icons/md";
import axiosInstance from '../../../../Authentication/axiosInstanceCookies';

axios.defaults.withCredentials = true; // Ensuring cookies are sent with requests

const Quantity = ({ itemId, quantity, FetchCart }) => {

  // alert(quantity)
  const handleQuantityChangeUp = () => {
    axiosInstance.put(`/cart/update_quantity/${itemId}/`, {
      itemId: itemId,
      quantity: quantity + 1,
    })
      .then(response => {
        FetchCart(); // Update the cart after successful request
      })
      .catch(error => {
        console.error('Error updating quantity:', error);
      });
  };

  const handleQuantityChangeDown = () => {
    if (quantity > 1) {
      axiosInstance.put(`/cart/update_quantity/${itemId}/`, {
        itemId: itemId,
        quantity: quantity - 1, // Decrease quantity
      })
        .then(response => {
          FetchCart(); // Update the cart after successful request
        })
        .catch(error => {
          console.error('Error updating quantity:', error);
        });
    } else {
      console.error('Minimum quantity reached');
    }
  };

  return (
    <div className='cartProductQuantity'>
      <div className='Quantity'>الكمية</div>
      <div className='Quantity'>
        <div className='Quantity-number'>{quantity}</div>
        <div className='Quantity-SlArrow'>
          <div className='Quantity-SlArrow-Down' onClick={handleQuantityChangeDown}><MdMinimize /></div>
          <div className='Quantity-SlArrow-Up' onClick={handleQuantityChangeUp}><AiOutlinePlus /></div>
        </div>
      </div>
    </div>
  );
};

export default Quantity;







// import axios from 'axios';
// import React, { useCallback } from 'react';
// import { AiOutlinePlus } from "react-icons/ai";
// import { MdMinimize } from "react-icons/md";
// import Config from '../../../../components/config';

// axios.defaults.withCredentials = true; // Ensuring cookies are sent with requests
// export default function Quantity({ itemId, quantity, fetchCart }) {
//   const handleQuantityChange = useCallback((newQuantity) => {
//     axios.put(`${Config.baseURL}/api/cart/update_quantity/${itemId}/`, {
//       itemId,
//       quantity: newQuantity,
//     })
//       .then(response => fetchCart())
//       .catch(error => console.error('Error updating quantity:', error));
//   }, [itemId, fetchCart]);

//   return (
//     <div className='cartProductQuantity'>
//       <div className='Quantity'>الكمية</div>
//       <div className='Quantity'>
//         <div className='Quantity-number'>{quantity}</div>
//         <div className='Quantity-SlArrow'>
//           <div className='Quantity-SlArrow-Down' onClick={() => quantity > 1 && handleQuantityChange(quantity - 1)}><MdMinimize /></div>
//           <div className='Quantity-SlArrow-Up' onClick={() => handleQuantityChange(quantity + 1)}><AiOutlinePlus /></div>
//         </div>
//       </div>
//     </div>
//   );
// }
