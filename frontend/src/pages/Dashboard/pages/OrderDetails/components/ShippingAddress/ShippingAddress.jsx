import './ShippingAddress.css';

const ShippingAddress = ({ order }) => {
    const customer = order?.customer || {};

    return (
        <div className="shipping-address">
            <h3>Shipping Address</h3>
            <br />
            <p style={{ padding: '10px', marginTop: '10px' }}>
                {customer.street ? customer.street : 'Street information not provided'}
            </p>
            <p style={{ padding: '10px' }}>
                {customer.city ? customer.city : 'City information not provided'}
            </p>
            <p style={{ padding: '10px' }}>
                {customer.governorate || 'Governorate not provided'}
                {customer.country.name ? `, ${customer.country?.name}` : ', Country not provided'}
            </p>
        </div>
    );
};

export default ShippingAddress;