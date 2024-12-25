import React from 'react';
import './TableRow.css';
const productData = [
  {
    rank: '#1',
    product: 'Green Elegant Glasses',
    price: '$68.66',
    category: 'Accessories',
    stock: 849,
    date: 'Thu Oct 17 2024',
    imageUrl: 'https://res.cloudinary.com/dvtpy52rw/image/upload/v1729118446/uploads/msfygr99gdq1shhbesbp.webp', // Add your image URLs here
  },
  {
    rank: '#2',
    product: 'Leather Chunky Sneakers TEST',
    price: '$77.99',
    category: 'Shoes',
    stock: 738,
    date: 'Thu Oct 17 2024',
    imageUrl: 'https://res.cloudinary.com/dvtpy52rw/image/upload/v1729118200/uploads/ul3pocbabjvelyx3uqq9.webp',
  },
  // Add more product data here...
];

const TableRow = ({ product }) => {
  return (
    <tr>
      <td>{product.rank}</td>
      <td>
        <img src={product.imageUrl} alt={product.product} style={{ width: '50px', borderRadius: '8px' }} />
        {product.product}
      </td>
      <td>{product.price}</td>
      <td>{product.category}</td>
      <td>{product.stock}</td>
      <td>{product.date}</td>
      <td>
        <button className="btn views">Views</button>
        <button className="btn edit">Edit</button>
        <button className="btn delete">Delete</button>
      </td>
    </tr>
  );
};

const ProductTable = () => {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Product</th>
          <th>Price</th>
          <th>Category</th>
          <th>Stock</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {productData.map((product, index) => (
          <TableRow key={index} product={product} />
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;