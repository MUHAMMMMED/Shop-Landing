
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './i18n';
import DashboardMenu from './pages/Dashboard/components/DashboardMenu/DashboardMenu';
import CategoriesList from './pages/Dashboard/pages/Categories/CategoriesList';
import CustomersList from './pages/Dashboard/pages/Customers/CustomersList';
import Dashboard from './pages/Dashboard/pages/Dashboard/Dashboard';
import OrdersLis from './pages/Dashboard/pages/Orders/OrdersLis';
import OurTeam from './pages/Dashboard/pages/OurTeam/OurTeam';

import ProductsList from './pages/Dashboard/pages/Products/ProductsList';
import CreateProduct from './pages/Dashboard/pages/Products/components/CreateProduct/CreateProduct';
import Profile from './pages/Dashboard/pages/Profile/Profile';
import Statistics from './pages/Dashboard/pages/Statistics/Statistics';
import TabsModules from './pages/Dashboard/pages/TabsModules/TabsModules';
import Home from './pages/Home/Home';

import Login from './Authentication/Login/Login';
import PasswordResetRequest from './Authentication/PasswordResetRequest/PasswordResetRequest';
import ResetPassword from './Authentication/ResetPassword/ResetPassword';
import Signup from './Authentication/Signup/Signup';
import VerifyEmail from './Authentication/VerifyEmail/VerifyEmail';
import Banner from './components/Banner/Banner';
import Success from './components/Success/Success';
import CreateCategory from './pages/Dashboard/pages/Categories/components/CreateCategory/CreateCategory';
import UpdateCategory from './pages/Dashboard/pages/Categories/components/UpdateCategory/UpdateCategory';
import CustomerProfile from './pages/Dashboard/pages/CustomerProfile/CustomerProfile';
import OrderDetails from './pages/Dashboard/pages/OrderDetails/OrderDetails';
import PagesDetalis from './pages/Dashboard/pages/PagesDetalis/PagesDetalis';
import PagesList from './pages/Dashboard/pages/PagesList/PagesList';
import CreatePage from './pages/Dashboard/pages/PagesList/components/CreatePage/CreatePage';
import UpdatePage from './pages/Dashboard/pages/PagesList/components/UpdatePage/UpdatePage';
import UpdateProduct from './pages/Dashboard/pages/Products/components/UpdateProduct/UpdateProduct';
import Settings from './pages/Dashboard/pages/Settings/Settings';
import LandingPages from './pages/LandingPage/LandingPage';



const App = () => {
  return (

    <Router>
      {/* <Header /> */}
      {/* < CookieConsent /> */}
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/page/:slug/:id" element={<LandingPages />} />
        <Route path="/pages" element={<PagesList />} />
        <Route path="/success" element={<Success />} />

        <Route path="/page-edit/:id" element={<PagesDetalis />} />
        <Route path="/create-page" element={<CreatePage />} />
        <Route path="/update-page/:id" element={<UpdatePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/menu" element={<DashboardMenu />} />

        <Route path="/products" element={<ProductsList />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />

        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/update-category/:id" element={<UpdateCategory />} />

        <Route path="/orders" element={<OrdersLis />} />
        <Route path="/order/:id" element={<OrderDetails />} />

        <Route path="/customers" element={<CustomersList />} />
        <Route path="/customer/:id" element={<CustomerProfile />} />

        <Route path="/statistics" element={<Statistics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/modules/:page_id/:section_id" element={<TabsModules />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/otp/verify' element={<VerifyEmail />} />
        <Route path='/forget-password' element={<PasswordResetRequest />} />
        <Route path="/password-reset-confirm/:uid/:token" element={<ResetPassword />} />
        {/* <Route path="/Redirection" element={<Redirection />} /> */}


        <Route path='/banner' element={<Banner />} />



      </Routes>
    </Router>

    // </ThemeProvider>
  );
};

export default App;

