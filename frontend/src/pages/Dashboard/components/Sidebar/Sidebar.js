// // import { FaCircleUser } from "react-icons/fa6";
// // import { HiUserGroup } from "react-icons/hi";
// import React, { useContext, useEffect } from 'react';
import React, { useContext } from 'react';
import { BiSolidCategoryAlt, BiSolidUserPin } from "react-icons/bi";
import { CgWebsite } from "react-icons/cg";
import { IoMdBasket, IoMdCube } from "react-icons/io";
import { MdDashboard, MdInsertChart } from "react-icons/md";
import { RiPagesFill, RiSettings3Fill } from "react-icons/ri";
import { Link, } from 'react-router-dom';
import { UserContext } from '../../../../Authentication/UserProvider';
import './Sidebar.css';


const Sidebar = ({ language }) => {
  const isArabic = language === 'ar';
  // const navigate = useNavigate();
  const { userData } = useContext(UserContext); // Getting user data from UserContext
  // useEffect(() => {
  //   if (!userData) navigate('/login');
  // }, [userData, navigate]);

  return (
    <aside className={`sidebar ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="welcome">
        <p className="welcome-p">{isArabic ? 'مرحبًا' : 'Welcome'}</p>
        <h2>{userData?.full_name ? `Mr ${userData?.full_name}` : (isArabic ? 'ضيف' : 'Guest')}</h2>
      </div>

      <ul>
        <span className="li-span">{isArabic ? 'عام' : 'GENERAL'}</span>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <li> <CgWebsite className="icon" /><span>{isArabic ? 'الصفحة الرئيسية' : 'Home'}</span> </li>
        </Link>

        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <li> <MdDashboard className="icon" /><span>{isArabic ? 'لوحة التحكم' : 'Dashboard'}</span></li>
        </Link>

        <Link to="/orders" style={{ textDecoration: 'none', color: 'inherit' }}>
          <li> <IoMdBasket className="icon" /><span>{isArabic ? 'الطلبات' : 'Orders'}</span></li>
        </Link>

        <Link to="/pages" style={{ textDecoration: 'none', color: 'inherit' }}>
          <li> <RiPagesFill className="icon" /><span>{isArabic ? 'صفحات الهبوط' : 'LandingPages'}</span></li>
        </Link>

        <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>
          <li> <IoMdCube className="icon" /> <span>{isArabic ? 'المنتجات' : 'Products'}</span></li>
        </Link>

        <Link to="/categories" style={{ textDecoration: 'none', color: 'inherit' }}>
          <li> <BiSolidCategoryAlt className="icon" />
            <span>{isArabic ? 'الفئات' : 'Categories'}</span></li>
        </Link>

        <Link to="/customers" style={{ textDecoration: 'none', color: 'inherit' }}>
          <li> <BiSolidUserPin className="icon" />
            <span>{isArabic ? 'العملاء' : 'Customers'}</span></li>
        </Link>

        <Link to="/statistics" style={{ textDecoration: 'none', color: 'inherit' }}>
          <li> <MdInsertChart className="icon" />
            <span>{isArabic ? 'الإحصائيات' : 'Statistics'}</span>  </li>
        </Link>

        <span className="li-span">{isArabic ? 'الإعدادات' : 'SETTING'}</span>
        <Link to="/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
          <li> <RiSettings3Fill className="icon" />
            <span>{isArabic ? 'الإعدادات' : 'Settings'}</span></li>
        </Link>
        {/* <span className="li-span">{isArabic ? 'الإعدادات' : 'SETTING'}</span> */}
        {/* 
//           <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
//             <li> <FaCircleUser className="icon" />
//               <span>{isArabic ? 'الملف الشخصي' : 'Profile'}</span></li>
//           </Link>

//           <Link to="/our-team" style={{ textDecoration: 'none', color: 'inherit' }}>
//             <li><HiUserGroup className="icon" />
//               <span>{isArabic ? 'فريقنا' : 'Our Team'}</span> </li>
//           </Link> */}

      </ul>
    </aside>
  );
};

export default Sidebar;