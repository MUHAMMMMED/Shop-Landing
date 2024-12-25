import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";
import './CustomerDetails.css';
import avatar from './user.png';

const CustomerDetails = ({ order }) => {
    const customer = order?.customer || {};

    return (
        <>
            <div className="customer-details">
                <h3>Customer Details</h3>
                <div className="customer-details-row">

                    <div>
                        <Link to={`/customer/${customer?.id}`}>
                            <span className="UserIcon">
                                <img src={avatar} className="avatar" alt="Customer Avatar" />
                            </span>
                        </Link>
                        <span className="UserName">
                            <div>{customer?.name || 'Name not provided'}</div>
                            <div className="customer-details-row">
                                <div style={{ width: '100px', float: 'left' }}>Customer ID: </div>
                                <div style={{ float: 'left' }}>
                                    {customer?.id ? `# ${customer.id}` : 'ID not provided'}
                                </div>
                            </div>
                        </span>
                    </div>

                    <div className="customer-details-row" style={{ marginTop: '15px' }}>
                        <div style={{ float: 'left', marginLeft: '13px' }}>
                            <span className="CartIcon"><LuShoppingCart /></span>
                        </div>
                        <div style={{ float: 'left', marginTop: '9px' }}>
                            {customer?.order_count || '0'} Orders
                        </div>
                    </div>

                    <h3>Contact Info</h3>
                    <div style={{ padding: '8px' }}>
                        <div className="customer-details-row">
                            <div style={{ width: '50%', float: 'left' }}>Email:</div>
                            <div style={{ width: '50%', float: 'left' }}>
                                {customer?.email || 'Email not provided'}
                            </div>
                        </div>

                        <div className="customer-details-row">
                            <div style={{ width: '50%', float: 'left' }}>Mobile:</div>
                            <div style={{ width: '50%', float: 'left' }}>
                                {customer?.phone || 'Phone number not provided'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerDetails;