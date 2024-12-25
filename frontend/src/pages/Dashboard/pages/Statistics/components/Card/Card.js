import React from 'react';
import { FaBed, FaBuilding, FaMapMarkerAlt, FaPhone, FaToilet, FaUtensils, FaWhatsapp } from 'react-icons/fa';
import './style.css';

export default function Card({ darkMode }) {
    return (
        <div className="Card_row">



            <div className={darkMode ? 'column  column-dark' : 'column '}>
                <div className="column-image">
                    <div className="offer-type-wrap">
                        <span className="offer-type bg-danger">للبيع</span>
                        <span className="offer-type bg-success">للايجار</span>
                    </div>
                    <img
                        src="https://www.usatoday.com/gcdn/-mm-/72d7a379e79c1e2d3c2cb6f4c6c56235a664d809/c=0-373-4032-2651/local/-/media/2017/10/25/USATODAY/USATODAY/636445260962960151-AP17270775846834.jpg"
                        alt="Image"
                        className="img-fluid"
                    />
                </div>

                <div className="column-text">
                    <h2 className="property-title">
                        <a className={darkMode ? 'column-text-dark' : 'column-text-light '} href="#">شقة للإيجار في شارع المنصوريه</a>
                    </h2>
                    <p className="property-location d-block mb-3">
                        <samp className='location-samp'> <FaMapMarkerAlt className="marker-icon" /></samp>
                        <samp className='location-samp'>  مجدده كامل بويات وسباكة وكهرباء في فيلا خاصه</samp>
                    </p>
                    <strong className="text-Card_price"> <samp>150,000 </samp><span className='currency'>ريال</span></strong>
                    <p className={darkMode ? 'text-Card_p column-text-dark' : 'text-Card_p column-text-light '}>
                        للايجار شقه في حي ظهره لبن شقة دور ثالث بدون سطح مجدده كامل بويات وسباكة وكهرباء
                        في فيلا خاصه مدخلين واحد للرجال مجلس ودورة مياه والثاني للعائلة
                        تحتوي الشقة على مجلس رجال وصالة ومطبخ وغرفتين ودورتين مياه
                    </p>

                    <table>
                        <tr>
                            <td>فيلا</td>
                            <td>3</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <th style={{ color: '#2196f3' }}>
                                <FaBuilding /> نوع العقار
                            </th>
                            <th style={{ color: '#2196f3' }}>
                                <FaBed /> الغرف
                            </th>
                            <th style={{ color: '#2196f3' }}>
                                <FaUtensils /> مطبخ
                            </th>
                            <th style={{ color: '#2196f3' }}>
                                <FaToilet /> دورات المياه
                            </th>
                        </tr>
                    </table>
                    <div className='Card_div_btn'>
                        <span className="Card_btn info">
                            <FaPhone /> اتصل بنا
                        </span>
                        <span className="Card_btn success">
                            <FaWhatsapp /> واتساب
                        </span>
                        <span className="Card_btn warning">عرض المزيد</span>
                    </div>
                </div>
            </div>



            <div className={darkMode ? 'column  column-dark' : 'column '}>
                <div className="column-image">
                    <div className="offer-type-wrap">
                        <span className="offer-type bg-danger">للبيع</span>
                        <span className="offer-type bg-success">للايجار</span>
                    </div>
                    <img
                        src="https://www.usatoday.com/gcdn/-mm-/72d7a379e79c1e2d3c2cb6f4c6c56235a664d809/c=0-373-4032-2651/local/-/media/2017/10/25/USATODAY/USATODAY/636445260962960151-AP17270775846834.jpg"
                        alt="Image"
                        className="img-fluid"
                    />
                </div>

                <div className="column-text">
                    <h2 className="property-title">
                        <a className={darkMode ? 'column-text-dark' : 'column-text-light '} href="#">شقة للإيجار في شارع المنصوريه</a>
                    </h2>
                    <p className="property-location d-block mb-3">
                        <samp className='location-samp'> <FaMapMarkerAlt className="marker-icon" /></samp>
                        <samp className='location-samp'>  مجدده كامل بويات وسباكة وكهرباء في فيلا خاصه</samp>
                    </p>
                    <strong className="text-Card_price"> <samp>150,000 </samp><span className='currency'>ريال</span></strong>
                    <p className={darkMode ? 'text-Card_p column-text-dark' : 'text-Card_p column-text-light '}>
                        للايجار شقه في حي ظهره لبن شقة دور ثالث بدون سطح مجدده كامل بويات وسباكة وكهرباء
                        في فيلا خاصه مدخلين واحد للرجال مجلس ودورة مياه والثاني للعائلة
                        تحتوي الشقة على مجلس رجال وصالة ومطبخ وغرفتين ودورتين مياه
                    </p>

                    <table>
                        <tr>
                            <td>فيلا</td>
                            <td>3</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <th style={{ color: '#2196f3' }}>
                                <FaBuilding /> نوع العقار
                            </th>
                            <th style={{ color: '#2196f3' }}>
                                <FaBed /> الغرف
                            </th>
                            <th style={{ color: '#2196f3' }}>
                                <FaUtensils /> مطبخ
                            </th>
                            <th style={{ color: '#2196f3' }}>
                                <FaToilet /> دورات المياه
                            </th>
                        </tr>
                    </table>
                    <div className='Card_div_btn'>
                        <span className="Card_btn info">
                            <FaPhone /> اتصل بنا
                        </span>
                        <span className="Card_btn success">
                            <FaWhatsapp /> واتساب
                        </span>
                        <span className="Card_btn warning">عرض المزيد</span>
                    </div>
                </div>
            </div>


            <div className={darkMode ? 'column  column-dark' : 'column '}>
                <div className="column-image">
                    <div className="offer-type-wrap">
                        <span className="offer-type bg-danger">للبيع</span>
                        <span className="offer-type bg-success">للايجار</span>
                    </div>
                    <img
                        src="https://www.usatoday.com/gcdn/-mm-/72d7a379e79c1e2d3c2cb6f4c6c56235a664d809/c=0-373-4032-2651/local/-/media/2017/10/25/USATODAY/USATODAY/636445260962960151-AP17270775846834.jpg"
                        alt="Image"
                        className="img-fluid"
                    />
                </div>

                <div className="column-text">
                    <h2 className="property-title">
                        <a className={darkMode ? 'column-text-dark' : 'column-text-light '} href="#">شقة للإيجار في شارع المنصوريه</a>
                    </h2>
                    <p className="property-location d-block mb-3">
                        <samp className='location-samp'> <FaMapMarkerAlt className="marker-icon" /></samp>
                        <samp className='location-samp'>  مجدده كامل بويات وسباكة وكهرباء في فيلا خاصه</samp>
                    </p>
                    <strong className="text-Card_price"> <samp>150,000 </samp><span className='currency'>ريال</span></strong>
                    <p className={darkMode ? 'text-Card_p column-text-dark' : 'text-Card_p column-text-light '}>
                        للايجار شقه في حي ظهره لبن شقة دور ثالث بدون سطح مجدده كامل بويات وسباكة وكهرباء
                        في فيلا خاصه مدخلين واحد للرجال مجلس ودورة مياه والثاني للعائلة
                        تحتوي الشقة على مجلس رجال وصالة ومطبخ وغرفتين ودورتين مياه
                    </p>

                    <table>
                        <tr>
                            <td>فيلا</td>
                            <td>3</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <th style={{ color: '#2196f3' }}>
                                <FaBuilding /> نوع العقار
                            </th>
                            <th style={{ color: '#2196f3' }}>
                                <FaBed /> الغرف
                            </th>
                            <th style={{ color: '#2196f3' }}>
                                <FaUtensils /> مطبخ
                            </th>
                            <th style={{ color: '#2196f3' }}>
                                <FaToilet /> دورات المياه
                            </th>
                        </tr>
                    </table>
                    <div className='Card_div_btn'>
                        <span className="Card_btn info">
                            <FaPhone /> اتصل بنا
                        </span>
                        <span className="Card_btn success">
                            <FaWhatsapp /> واتساب
                        </span>
                        <span className="Card_btn warning">عرض المزيد</span>
                    </div>
                </div>
            </div>


            <div className={darkMode ? 'column  column-dark' : 'column '}>
                <div className="column-image">
                    <div className="offer-type-wrap">
                        <span className="offer-type bg-danger">للبيع</span>
                        <span className="offer-type bg-success">للايجار</span>
                    </div>
                    <img
                        src="https://www.usatoday.com/gcdn/-mm-/72d7a379e79c1e2d3c2cb6f4c6c56235a664d809/c=0-373-4032-2651/local/-/media/2017/10/25/USATODAY/USATODAY/636445260962960151-AP17270775846834.jpg"
                        alt="Image"
                        className="img-fluid"
                    />
                </div>

                <div className="column-text">
                    <h2 className="property-title">
                        <a className={darkMode ? 'column-text-dark' : 'column-text-light '} href="#">شقة للإيجار في شارع المنصوريه</a>
                    </h2>
                    <p className="property-location d-block mb-3">
                        <samp className='location-samp'> <FaMapMarkerAlt className="marker-icon" /></samp>
                        <samp className='location-samp'>  مجدده كامل بويات وسباكة وكهرباء في فيلا خاصه</samp>
                    </p>
                    <strong className="text-Card_price"> <samp>150,000 </samp><span className='currency'>ريال</span></strong>
                    <p className={darkMode ? 'text-Card_p column-text-dark' : 'text-Card_p column-text-light '}>
                        للايجار شقه في حي ظهره لبن شقة دور ثالث بدون سطح مجدده كامل بويات وسباكة وكهرباء
                        في فيلا خاصه مدخلين واحد للرجال مجلس ودورة مياه والثاني للعائلة
                        تحتوي الشقة على مجلس رجال وصالة ومطبخ وغرفتين ودورتين مياه
                    </p>

                    <table>
                        <tr>
                            <td>فيلا</td>
                            <td>3</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <th style={{ color: '#2196f3' }}>
                                <FaBuilding /> نوع العقار
                            </th>
                            <th style={{ color: '#2196f3' }}>
                                <FaBed /> الغرف
                            </th>
                            <th style={{ color: '#2196f3' }}>
                                <FaUtensils /> مطبخ
                            </th>
                            <th style={{ color: '#2196f3' }}>
                                <FaToilet /> دورات المياه
                            </th>
                        </tr>
                    </table>
                    <div className='Card_div_btn'>
                        <span className="Card_btn info">
                            <FaPhone /> اتصل بنا
                        </span>
                        <span className="Card_btn success">
                            <FaWhatsapp /> واتساب
                        </span>
                        <span className="Card_btn warning">عرض المزيد</span>
                    </div>
                </div>
            </div>










        </div>
    );
}