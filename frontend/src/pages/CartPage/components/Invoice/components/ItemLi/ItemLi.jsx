import React from 'react';

export default function ItemLi({ Name, Amount, }) {
    return (
        <>
            <li className="list-group-item-li">
                <span className="fw-bold text-primary">
                    {parseFloat(Amount).toFixed(2)}
                </span>
                <div className="me-auto">
                    <span>{Name}</span>
                </div>
            </li>
        </>
    );
}