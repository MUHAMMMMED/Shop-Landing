import React from 'react';
import { Link } from 'react-router-dom';
import Config from '../../../../components/config';
import Notes from '../Notes/Notes';
import RemoveItem from '../RemoveItem/RemoveItem';
import Quantity from '../quantity/Quantity';

const CartItem = ({ item, FetchCart, currency, language }) => {
  return (
    <div className="list-group-item" key={item.id}>
      <RemoveItem itemId={item.id} FetchCart={FetchCart} />
      <div className="cart-product-col-img">
        <img
          className="cart-product-image"
          src={`${Config.baseURL}${item.product.image}`}
          alt={item.product.name}
        />
      </div>
      <Link to={`/Product/${item.name}/${item.product.id}`}>
        <div className="cart-product-title">{item.name}</div>
      </Link>
      <Quantity itemId={item.id} quantity={item.quantity} FetchCart={FetchCart} />
      <div className="cart-product-price">
        <div className="price">
          {parseFloat(
            item.product.price > item.discount_price
              ? item.discount_price
              : item.product.price
          ).toFixed(2)}
          <span className="money_code">{currency}</span>
        </div>

        {/* Only show before-price if there's a discount */}
        {item?.product?.price > item?.discount_price && (
          <div className="before-price">
            {parseFloat(item?.product?.price).toFixed(2)}
            <span className="money_code">{currency}</span>
          </div>
        )}
      </div>

      {item?.product?.is_active_note && (
        <Notes item={item} quantity={item?.quantity} FetchCart={FetchCart} language={language} />
      )}
    </div>
  );
};

export default CartItem