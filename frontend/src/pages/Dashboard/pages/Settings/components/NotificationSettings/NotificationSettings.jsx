
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Config from "../../../../../../components/config";
import "./NotificationSettings.css";
const NotificationSettings = () => {
    const [data, setData] = useState([]); // Correct state initialization
    const fetchPagesList = async () => {
        try {
            const response = await axios.get(`${Config.baseURL}/api/pages/`);
            setData(response.data); // Set the state to response.data
        } catch (error) {
            console.error('Error fetching pages', error);
        }
    };
    useEffect(() => {
        fetchPagesList();
    }, []);


    return (
        <div className="notification-settings">

            <div className="category">
                <h2>Pages</h2>
                <table>
                    <thead>
                        <tr>

                            <th>Page Name</th>
                            <th style={{ textAlign: 'center' }}>Page Selected</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* 
                        <tr> <td>New customer sign up</td>
                            <td>
                                <input type="checkbox" name="1" checked='true' />
                            </td>
                        </tr>

                        <tr> <td>Customer account password reset</td>
                            <td>
                                <input type="checkbox" name="2" checked='true' />
                            </td>
                        </tr>
                        <tr> <td>Customer account invite</td>
                            <td>
                                <input type="checkbox" name="3" checked='true' />
                            </td>
                        </tr> */}



                        <tr> <td>Home  </td>
                            <td>
                                <select name="category" value={'category'}  >
                                    <option value=""> Select page </option>
                                    {data.map((item) => (
                                        <option key={item.id} value={item.id}>{item.title}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>

                        <tr> <td>About  </td>
                            <td>
                                <select name="category" value={'category'}  >
                                    <option value=""> Select page </option>
                                    {data.map((item) => (
                                        <option key={item.id} value={item.id}>{item.title}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>

                        <tr> <td>PrivacyPolicy  </td>
                            <td>
                                <select name="category" value={'category'}  >
                                    <option value=""> Select page </option>
                                    {data.map((item) => (
                                        <option key={item.id} value={item.id}>{item.title}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>

                        <tr> <td>ContactUs  </td>
                            <td>
                                <select name="category" value={'category'}  >
                                    <option value=""> Select page </option>
                                    {data.map((item) => (
                                        <option key={item.id} value={item.id}>{item.title}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            {/* <button className="buy-now-btn">Buy Now</button> */}
        </div>
    );
};

export default NotificationSettings;