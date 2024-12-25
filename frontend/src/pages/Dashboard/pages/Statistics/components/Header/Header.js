import React from 'react';
import './style.css';

export default function Header({ darkMode }) {
    return (
        <>
            <header className={darkMode ? 'header dark-header' : 'header light-header '}>
                <nav>
                    <div className="logo"> <a className={darkMode ? 'menu_a_dark' : 'menu_a_light'} href="#">Real Estat<span>e</span></a>  </div>
                    <input type="checkbox" id="menu-toggle" />
                    <span className={darkMode ? 'menu-toggle-radius toggle-radius_dark' : 'menu-toggle-radius   toggle-radius_light'}>
                        <label htmlFor="menu-toggle" className={darkMode ? 'menu-icon menu_a_dark' : 'menu-icon  menu_a_light'} >&#9776;</label>
                    </span>
                    <ul className={darkMode ? 'menu dark-header' : 'menu light-header  '}>
                        <li ><a className={darkMode ? 'menu_a_dark' : 'menu_a_light'} href="#">الصفحة الرئيسية</a></li>
                        <li ><a className={darkMode ? 'menu_a_dark' : 'menu_a_light'} href="#">بيع</a></li>
                        <li ><a className={darkMode ? 'menu_a_dark' : 'menu_a_light'} href="#">إيجار</a></li>
                        <li ><a className={darkMode ? 'menu_a_dark' : 'menu_a_light'} href="#">من نحن</a></li>
                    </ul>


                </nav>
            </header>
        </>
    );
}

