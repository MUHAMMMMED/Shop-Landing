
import React from 'react';
import { BsTextareaResize } from "react-icons/bs";
import './OrderItem.css';

export default function OrderItem({ order }) {
    const calculateTotals = () => {
        if (!order || !order.order_items) return { subtotal: 0, tax: 0, total: 0, shipping: 0 };
        const tax = order?.tax || 0;

        const tax_amount = order?.tax_amount || 0;

        const shipping = order?.shipping || 0;

        const subtotal = order?.order_items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        const total = subtotal + tax_amount + shipping;

        return { subtotal, tax, total, shipping, tax_amount };
    };

    const { subtotal, tax, total, shipping, tax_amount } = calculateTotals();

    const Paid = order?.total || 0
    const discount = total - Paid


    const truncateText = (text, maxLength = 50) =>
        text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

    const handleCopy = (note) => {
        navigator.clipboard.writeText(note)
            .then(() => {
                alert(`Copied: ${truncateText(note)}`);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    };

    return (
        <div className="order-details">
            <h2>Order Details </h2>
            <table>
                <thead>
                    <tr>
                        <th scope="col">PRODUCTS</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">QTY</th>
                        <th scope="col">TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {order?.order_items?.map((item) => (
                        <React.Fragment key={item?.id}>
                            <tr>
                                <td>
                                    <span className="order-table-icon"><BsTextareaResize /></span>
                                    <span className="order-table-name"> {item?.dictionary?.name} </span>
                                </td>
                                <td>${item?.price.toFixed(2)}</td>
                                <td>{item?.quantity}</td>
                                <td>${(item?.price * item?.quantity).toFixed(2)}</td>
                            </tr>

                            {item?.notes?.map((noteItem, index) => (
                                <tr key={`${item.id}-note-${index}`} className="note-row">
                                    <td colSpan="4" className="note-cell">
                                        <div
                                            className="order-table-list_note"
                                            onClick={() => handleCopy(noteItem.note)}
                                        >
                                            <span className="list_note_number"> Note: {index + 1}</span>
                                            <span className="list_note_text">{truncateText(noteItem.note)}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

            <div className="summary">
                <div className="summary-item">
                    <span className="summary-label">Subtotal :</span>
                    <span className="summary-value">${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Tax ({tax}%) :</span>
                    <span className="summary-value">${tax_amount.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Shipping :</span>
                    <span className="summary-value">${shipping.toFixed(2)}</span>
                </div>

                <div className="summary-item total">
                    <span className="summary-label" style={{ color: '#0057ff' }}>Total :</span>
                    <span className="summary-value" style={{ color: '#0057ff' }}>${total.toFixed(2)}</span>
                </div>
                <div className="summary-item total"><br /></div>
                <div className="summary-item total">
                    <span className="summary-label" style={{ color: '#ffc700' }}>Discount :</span>
                    <span className="summary-value" style={{ color: '#ffc700' }}>${discount.toFixed(2)}</span>
                </div>

                <div className="summary-item total" style={{ paddingTop: '15px' }}>
                    <span className="summary-label" style={{ color: 'red' }}>Paid :</span>
                    <span className="summary-value" style={{ color: 'red' }}>${Paid.toFixed(2)}</span>
                </div>



            </div>
        </div>
    );
}