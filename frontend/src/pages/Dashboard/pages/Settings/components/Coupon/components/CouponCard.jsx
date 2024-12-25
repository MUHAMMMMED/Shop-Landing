import React from 'react'; // Importing React for building components
import { RiCoupon3Fill, RiCoupon3Line } from "react-icons/ri";
import UpdateCoupon from './form/UpdateCoupon/UpdateCoupon';
export default function CouponCard({ data, fetchData }) {

    return (
        <>
            {/* Shipping Card Container */}
            <div className="zone-card">
                {/* Card Header Section */}
                <div className="zone-card-header">
                    <div>
                        {/* Avatar and Flag Icon */}
                        <div className="avatar">
                            <span role="img" aria-label="Avatar">
                                <RiCoupon3Line className='Flag' /> {/* Flag icon representing the country */}
                            </span>
                        </div>

                    </div>

                    {/* Button to Add New Shipping Company */}

                </div>

                {/* Table Displaying Shipping Information */}
                <div className="zone-table">
                    <table>
                        <thead>
                            {/* Table Headers */}

                            <tr>
                                <th></th> {/* Empty column for image */}
                                <th>Code </th> {/* Shipping company name */}
                                <th>Discount </th> {/* Shipping price */}
                                <th>Coupon usage</th> {/* Shipping work days */}
                                <th>Expiry date</th> {/* Actions (Update) */}
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Loop through Shipping data and create rows for each shipping company */}
                            {data.map(item => (
                                <tr key={item.id}>
                                    {/* Image column for each shipping company */}
                                    <td>
                                        <RiCoupon3Fill />
                                    </td>
                                    {/* Shipping company name */}
                                    <td>{item.code}</td>
                                    {/* Shipping price */}
                                    <td>{item.discount || 0}</td>
                                    {/* Discount price */}
                                    <td>{item.coupon_usage || 0}</td>
                                    {/* Work days */}
                                    <td>{item.expiryDate}</td>
                                    {/* Update action for each shipping company */}
                                    <td>
                                        <UpdateCoupon item={item} fetchData={fetchData} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Divider line below the table */}
                    <div style={{ width: '100%', float: 'left', borderTop: '1px solid #ccc' }} />

                </div>
            </div>
        </>
    )
}