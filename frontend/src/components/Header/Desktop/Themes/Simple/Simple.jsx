// import React from 'react';
// import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa'; // إضافة أيقونات باستخدام React Icons
// import './Simple.css';

// export default function Simple() {
//   return (
//     <div className="header-container">
//       <header>
//         <div className="logo">
//           <h1>MyShop</h1>
//         </div>

//         <nav className="nav-links">
//           <ul>
//             <li><a href="#home">Home</a></li>
//             <li><a href="#shop">Shop</a></li>
//             <li><a href="#offers">Offers</a></li>
//             <li><a href="#contact">Contact</a></li>
//           </ul>
//         </nav>

//         <div className="search-bar">
//           <input type="text" placeholder="Search products..." />
//           <button><FaSearch /></button>
//         </div>

//         <div className="cta-buttons">
//           <button className="btn-login"><FaUser /> Login</button>
//           <button className="btn-signup">Sign Up</button>
//         </div>

//         <div className="cart-icon">
//           <button><FaShoppingCart /></button>
//         </div>
//       </header>
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import { FaBars, FaSearch, FaShoppingCart, FaUserCircle } from 'react-icons/fa'; // استخدام أيقونات
// import './Simple.css';

// const Simple = () => {
//   const [showDropdown, setShowDropdown] = useState(false); // للتحكم في ظهور القائمة المنسدلة
//   const toggleDropdown = () => setShowDropdown(!showDropdown);

//   return (
//     <header className="header-container">
//       {/* شريط التنقل العلوي */}
//       <div className="top-bar">
//         <div className="top-bar-left">
//           <a href="#language">EN</a> | <a href="#location">US</a>
//         </div>
//         <div className="top-bar-right">
//           <a href="#help">Help</a> | <a href="#login">Login</a> | <a href="#register">Register</a>
//         </div>
//       </div>

//       {/* الهيدر الرئيسي */}
//       <div className="header-main">
//         {/* الشعار */}
//         <div className="logo">
//           <h1>Alibaba</h1>
//         </div>

//         {/* قائمة التنقل الرئيسية */}
//         <nav className="nav-links">
//           <ul>
//             <li><a href="#home">Home</a></li>
//             <li className="dropdown" onClick={toggleDropdown}>
//               <a href="#categories">Categories</a>
//               {showDropdown && (
//                 <ul className="dropdown-menu">
//                   <li><a href="#electronics">Electronics</a></li>
//                   <li><a href="#fashion">Fashion</a></li>
//                   <li><a href="#home-appliances">Home Appliances</a></li>
//                   <li><a href="#toys">Toys</a></li>
//                 </ul>
//               )}
//             </li>
//             <li><a href="#offers">Offers</a></li>
//             <li><a href="#orders">Orders</a></li>
//           </ul>
//         </nav>

//         {/* شريط البحث */}
//         <div className="search-bar">
//           <input type="text" placeholder="Search for products, brands and more" />
//           <button><FaSearch /></button>
//         </div>

//         {/* أيقونات المستخدم وسلة التسوق */}
//         <div className="header-icons">
//           <button><FaShoppingCart /></button>
//           <button><FaUserCircle /></button>
//         </div>

//         {/* أيقونة القائمة الجانبية */}
//         <div className="menu-icon">
//           <FaBars />
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Simple;





// import React, { useState } from 'react';
// import { FaBars, FaShoppingCart, FaUserCircle } from 'react-icons/fa'; // استخدام أيقونات
// import './Simple.css';

// const Simple = () => {
//   const [showDropdown, setShowDropdown] = useState(false); // للتحكم في ظهور القائمة المنسدلة
//   const toggleDropdown = () => setShowDropdown(!showDropdown);

//   return (
//     <header className="header-container">
//       {/* شريط التنقل العلوي */}
//       <div className="top-bar">
//         <div className="top-bar-left">
//           <a href="#language">EN</a> | <a href="#location">US</a>
//         </div>
//         <div className="top-bar-right">
//           <a href="#help">Help</a> | <a href="#login">Login</a> | <a href="#register">Register</a>
//         </div>
//       </div>

//       {/* الهيدر الرئيسي */}
//       <div className="header-main">
//         {/* الشعار */}
//         <div className="logo">
//           <h1>Alibaba</h1>
//         </div>

//         {/* قائمة التنقل الرئيسية */}
//         <nav className="nav-links">
//           <ul>
//             <li><a href="#home">Home</a></li>
//             <li className="dropdown" onClick={toggleDropdown}>
//               <a href="#categories">Categories</a>
//               {showDropdown && (
//                 <ul className="dropdown-menu">
//                   <li className="dropdown-item">
//                     <a href="#electronics">
//                       <img src="https://via.placeholder.com/50" alt="Electronics" className="category-icon" />
//                       <h4>Electronics</h4>
//                     </a>
//                     <ul className="subcategory">
//                       <li><a href="#mobiles">Mobiles</a></li>
//                       <li><a href="#laptops">Laptops</a></li>
//                       <li><a href="#cameras">Cameras</a></li>
//                     </ul>
//                   </li>
//                   <li className="dropdown-item">
//                     <a href="#fashion">
//                       <img src="https://via.placeholder.com/50" alt="Fashion" className="category-icon" />
//                       <h4>Fashion</h4>
//                     </a>
//                     <ul className="subcategory">
//                       <li><a href="#clothing">Clothing</a></li>
//                       <li><a href="#accessories">Accessories</a></li>
//                       <li><a href="#footwear">Footwear</a></li>
//                     </ul>
//                   </li>
//                   <li className="dropdown-item">
//                     <a href="#home-appliances">
//                       <img src="https://via.placeholder.com/50" alt="Home Appliances" className="category-icon" />
//                       <h4>Home Appliances</h4>
//                     </a>
//                     <ul className="subcategory">
//                       <li><a href="#kitchen">Kitchen</a></li>
//                       <li><a href="#furniture">Furniture</a></li>
//                       <li><a href="#bedding">Bedding</a></li>
//                     </ul>
//                   </li>
//                   <li className="dropdown-item">
//                     <a href="#beauty">
//                       <img src="https://via.placeholder.com/50" alt="Beauty" className="category-icon" />
//                       <h4>Beauty</h4>
//                     </a>
//                     <ul className="subcategory">
//                       <li><a href="#makeup">Makeup</a></li>
//                       <li><a href="#skincare">Skincare</a></li>
//                       <li><a href="#haircare">Haircare</a></li>
//                     </ul>
//                   </li>
//                 </ul>
//               )}
//             </li>
//             <li><a href="#orders">Orders</a></li>
//           </ul>
//         </nav>

//         {/* أيقونات المستخدم وسلة التسوق */}
//         <div className="header-icons">
//           <button><FaShoppingCart /></button>
//           <button><FaUserCircle /></button>
//         </div>

//         {/* أيقونة القائمة الجانبية */}
//         <div className="menu-icon">
//           <FaBars />
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Simple;



import React from "react";
import { BsCurrencyDollar, BsGlobe } from "react-icons/bs";
import { FaBars, FaHeart, FaShoppingBag, FaUser } from "react-icons/fa";

import './Simple.css';

const Simple = () => {


  return (
    <header className="header">
      <div className="header-top">
        <div className="header-left">
          <button className="language">
            <BsGlobe />
            Arabic
          </button>
          <button className="currency">
            <BsCurrencyDollar />
            USD
          </button>
          <span>تسجيل الدخول | سجل</span>
        </div>
        <div className="header-right">
          <button>
            <FaUser />
          </button>
          <button className="cart">
            <FaShoppingBag />
            <span className="badge">0</span>
          </button>
          <button className="wishlist">
            <FaHeart />
            <span className="badge">1</span>
          </button>
        </div>
      </div>

      <div className="header-bottom">
        <div className="header-logo">mart<span>fury</span></div>
        <div className="header-search">
          <input type="text" placeholder="أنا أتسوق لـ..." />
          <button>بحث</button>
        </div>
        <nav className="header-nav">
          <a href="#">Home</a>
          <a href="#">Pages</a>
          <a href="#">Products</a>
          <a href="#">Stores</a>
          <a href="#">Blog</a>
          <a href="#">Contact</a>
        </nav>
        <button className="categories">
          <FaBars />
          التسوق حسب الأقسام
        </button>
      </div>
    </header>
  );
};

export default Simple;