import React from 'react'; // Importing React for building components
import { CiFlag1 } from "react-icons/ci"; // Importing a flag icon from react-icons
import UpdateCountry from './components/Country/UpdateCountry/UpdateCountry'; // Importing UpdateCountry component for updating country details
import CreateCompany from './components/Shipping/CreateCompany/CreateCompany'; // Importing CreateCompany component for creating new shipping company
import UpdateCompany from './components/Shipping/UpdateCompany/UpdateCompany'; // Importing UpdateCompany component for updating shipping company details

export default function ShippingCard({ data, fetchCountry }) {
    // This component receives `data` and `fetchCountry` as props.
    // `data` contains the details of the country and shipping information, while `fetchCountry` is a function used to refresh country data after updates.

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
                                <CiFlag1 className='Flag' /> {/* Flag icon representing the country */}
                            </span>
                        </div>
                        {/* Shipping Information */}
                        <div className="shipping-header">
                            <div>
                                {/* Country Name */}
                                <h3 className='zone-header-h3'>{data.name} </h3>
                                {/* Tax information */}
                                <p>Tax: {data.tax || 0}</p>
                            </div>
                        </div>
                    </div>

                    {/* Button to Add New Shipping Company */}
                    <div className="card-header-add">
                        <CreateCompany item={data} fetchCompany={fetchCountry} />
                    </div>
                </div>

                {/* Table Displaying Shipping Information */}
                <div className="zone-table">
                    <table>
                        <thead>
                            {/* Table Headers */}
                            <tr>
                                <th></th> {/* Empty column for image */}
                                <th>Name</th> {/* Shipping company name */}
                                <th>Shipping price</th> {/* Shipping price */}
                                <th>Discount price</th> {/* Discount price */}
                                <th>Work days</th> {/* Shipping work days */}
                                <th>Action</th> {/* Actions (Update) */}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Loop through Shipping data and create rows for each shipping company */}
                            {data?.Shipping && data?.Shipping.map(Ship => (
                                <tr key={Ship?.id}>
                                    {/* Image column for each shipping company */}
                                    <td>
                                        <img className="table-img" src={Ship?.image} alt="Shipping Company" />
                                    </td>
                                    {/* Shipping company name */}
                                    <td>{Ship?.name}</td>
                                    {/* Shipping price */}
                                    <td>{Ship.shipping_price || 0}</td>
                                    {/* Discount price */}
                                    <td>{Ship.discount_price || 0}</td>
                                    {/* Work days */}
                                    <td>{Ship.work_days}</td>
                                    {/* Update action for each shipping company */}
                                    <td>
                                        <UpdateCompany item={Ship} fetchCompany={fetchCountry} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Divider line below the table */}
                    <div style={{ width: '100%', float: 'left', borderTop: '1px solid #ccc' }} />

                    {/* Section for updating country details */}
                    <div className="table-detils">
                        <UpdateCountry item={data} fetchCountry={fetchCountry} />
                    </div>
                </div>
            </div>
        </>
    )
}