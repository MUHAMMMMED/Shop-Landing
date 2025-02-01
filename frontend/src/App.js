
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './Authentication/Login/Login';
// import PasswordResetRequest from './Authentication/PasswordResetRequest/PasswordResetRequest';
// import ResetPassword from './Authentication/ResetPassword/ResetPassword';
// import Signup from './Authentication/Signup/Signup';
// import VerifyEmail from './Authentication/VerifyEmail/VerifyEmail';
import Success from './components/Success/Success';
import './i18n';
import CartPage from './pages/CartPage/CartPage';
import DashboardMenu from './pages/Dashboard/components/DashboardMenu/DashboardMenu';
import CategoriesList from './pages/Dashboard/pages/Categories/CategoriesList';
import CreateCategory from './pages/Dashboard/pages/Categories/components/CreateCategory/CreateCategory';
import UpdateCategory from './pages/Dashboard/pages/Categories/components/UpdateCategory/UpdateCategory';
import CustomerProfile from './pages/Dashboard/pages/CustomerProfile/CustomerProfile';
import CustomersList from './pages/Dashboard/pages/Customers/CustomersList';
import Dashboard from './pages/Dashboard/pages/Dashboard/Dashboard';
import OrderDetails from './pages/Dashboard/pages/OrderDetails/OrderDetails';
import OrdersLis from './pages/Dashboard/pages/Orders/OrdersLis';
import OurTeam from './pages/Dashboard/pages/OurTeam/OurTeam';
import PagesDetalis from './pages/Dashboard/pages/PagesDetalis/PagesDetalis';
import PagesList from './pages/Dashboard/pages/PagesList/PagesList';
import CreatePage from './pages/Dashboard/pages/PagesList/components/CreatePage/CreatePage';
import UpdatePage from './pages/Dashboard/pages/PagesList/components/UpdatePage/UpdatePage';
import ProductsList from './pages/Dashboard/pages/Products/ProductsList';
import CreateProduct from './pages/Dashboard/pages/Products/components/CreateProduct/CreateProduct';
import UpdateProduct from './pages/Dashboard/pages/Products/components/UpdateProduct/UpdateProduct';
import Profile from './pages/Dashboard/pages/Profile/Profile';
import Settings from './pages/Dashboard/pages/Settings/Settings';
import Statistics from './pages/Dashboard/pages/Statistics/Statistics';
import TabsModules from './pages/Dashboard/pages/TabsModules/TabsModules';
import CreateCard from './pages/Dashboard/pages/TabsModules/components/CardGrid/components/CreateCard/CreateCard';
import UpdateImageHight from './pages/Dashboard/pages/TabsModules/components/HeightImage/components/ UpdateImageHight/ UpdateImageHight';
import CreateImageHight from './pages/Dashboard/pages/TabsModules/components/HeightImage/components/CreateImageHight/CreateImageHight';
import CreateFeaturesCard from './pages/Dashboard/pages/TabsModules/components/ProductFeatures/components/Create/CreateFeaturesCard';
import CreateSlider from './pages/Dashboard/pages/TabsModules/components/Slider/components/CreateSlider/CreateSlider';
import UpdateSlider from './pages/Dashboard/pages/TabsModules/components/Slider/components/Update/UpdateSlider';
import CreateVideoPlayer from './pages/Dashboard/pages/TabsModules/components/VideoPlayer/components/CreateVideoPlayer/CreateVideoPlayer';
import UpdateVideoPlayer from './pages/Dashboard/pages/TabsModules/components/VideoPlayer/components/UpdateVideoPlayer/UpdateVideoPlayer';
import CreateYouTubePlayer from './pages/Dashboard/pages/TabsModules/components/YouTubePlayer/components/CreateYouTubePlayer/CreateYouTubePlayer';
import UpdateYouTubePlayer from './pages/Dashboard/pages/TabsModules/components/YouTubePlayer/components/UpdateYouTubePlayer/UpdateYouTubePlayer';
import Home from './pages/Home/Home';
import LandingPages from './pages/LandingPage/LandingPage';

const App = () => {
  return (

    <Router>
      {/* <Header /> */}
      {/* < CookieConsent /> */}
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/page/:slug/:id" element={<LandingPages />} />
        <Route path="/cart" element={<CartPage />} />
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
        <Route path="/modules/:page_id/:section_id/" element={<TabsModules />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/create-slider/:page_id/:section_id/" element={<CreateSlider />} />
        <Route path="/update-slider/:sliderId/:page_id/:section_id/" element={<UpdateSlider />} />
        <Route path="/create-video/:page_id/:section_id/" element={<CreateVideoPlayer />} />
        <Route path="/update-video/:videoId/:page_id/:section_id/" element={<UpdateVideoPlayer />} />
        <Route path="/create-youtube/:page_id/:section_id/" element={<CreateYouTubePlayer />} />
        <Route path="/update-youtube/:youtubeId/:page_id/:section_id/" element={<UpdateYouTubePlayer />} />
        <Route path="/create-image-hight/:page_id/:section_id/" element={<CreateImageHight />} />
        <Route path="/update-image-hight/:imageId/:page_id/:section_id/" element={<UpdateImageHight />} />
        <Route path="/features-card/:page_id/:section_id/" element={<CreateFeaturesCard />} />
        <Route path="/create-card/:page_id/:section_id/" element={<CreateCard />} />
        {/* <Route path="/create-faq/:page_id/:section_id/" element={<CreateFAQ />} /> */}


        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} />
        <Route path='/otp/verify' element={<VerifyEmail />} />
        <Route path='/forget-password' element={<PasswordResetRequest />} />
        <Route path="/password-reset-confirm/:uid/:token" element={<ResetPassword />} /> */}
        {/* <Route path="/Redirection" element={<Redirection />} /> */}

      </Routes>
    </Router>

  );
};

export default App;

