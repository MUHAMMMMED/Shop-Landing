
import React, { useState } from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { HiOutlineUser } from "react-icons/hi2";
import { RiShoppingBagLine } from "react-icons/ri";
import { TbLayoutDashboard } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from '../../Authentication/AxiosInstance';
import { useCart } from '../CartProvider/CartProvider';
import './Headertop.css';
import logo from './logo.jpeg';
export default function Headertop() {
  const { cartCount } = useCart();
//   const [info, setInfo] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
//   useEffect(() => {
//     axios.get(`${Config.baseURL}/api/home/info-list/`)
//       .then(response => {
//         setInfo(response.data);
//       })

//   }, []);


  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };


  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const refresh = JSON.parse(localStorage.getItem('refresh_token'));

  const handleLogout = async () => {
    try {
      const res = await AxiosInstance.post('/logout/', { refresh_token: refresh });
      if (res.status === 204) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user'); // Remove user data
        AxiosInstance.defaults.headers.common['Authorization'] = ''; // Clear token from AxiosInstance
        navigate('/login');
        toast.warn('Logout successful');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  return (
    <>
  
      <div className='header-top-web'>
        <div className="header-top">
          <div className="header-top-right">
             
              <div className="header-top-logo">
                <Link to="/">
                  <img src= {logo}
                   alt="Logo" />

                </Link>
              </div> 

            <div className="nav-text">
              {/* <nav className="nav-menu">
                <ul>
                  <li><Link to="/">الرئيسية</Link></li>
                  <li><Link to="/All_Products">المنتجات</Link></li>
                  <li><Link to="/Categories">الفئات</Link></li>
                  <li><Link to="/offrs">العروض</Link></li>
                  <li><Link to="/order_tracking">تتبع طلبك</Link></li>
                </ul>
              </nav> */}
            </div>
          </div>
          <div className="header-top-left">
            {user ? (
              <>
                <Link onClick={handleLogout}>   <span className='header-top-cart-togg'><CiLogout /></span> </Link>
                <Link to="/dashboard">  <span className='header-top-cart-togg'><TbLayoutDashboard /></span> </Link>
              </>

            ) : (
              <>
                <Link to="/cart"> <div className="header-top-cart-icon">
                  <span className='header-top-ShoppingBag'><RiShoppingBagLine /> </span>
                  {!cartCount ? (<></>) : (<span>{cartCount}</span>)}</div> </Link>
                <Link to="/login"> <span className='header-top-cart-togg'><HiOutlineUser /></span>  </Link>
              </>)}
          </div> </div> </div>

      <div className='header-top-mbile'>
        <header className="header-top">
          <div className="header-top-right">
            <div className="header-top-logo">
              <Link to="/"> <img src= {logo} alt="Logo" />   </Link>
            </div></div>
          <div className="header-top-left">
            <Link to="/cart">
              <div className="header-top-cart-icon">
                <span className='header-top-ShoppingBag'><RiShoppingBagLine /> </span>
                {!cartCount ? (<></>) : (<span>{cartCount}</span>)}
              </div> </Link>
            <span className='header-top-cart-togg' onClick={toggleSidebar}><AiOutlineMenu /></span>
          </div>
        
        </header></div>

    </>
  );
}
