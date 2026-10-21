


import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./Head-Foot/Navbar.js";
import Footer from "./Head-Foot/Footer.js";
import ScrollToTop from "./components/ScrolltoTop.js";
import Canonical from "./components/Canonical.js";
import LoadingLogo from "./components/LoadingLogo.js";
// import BannerModal from "./components/BannerModal.js";
// Pages
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Services from "./pages/Services.js";
import ContactUs from "./pages/ContactUs.js";
import NewsletterForm from "./components/Newsletter.js";
import RecipeAndInspiration from "./pages/RecipeAndInspiration.js";
import Gallery from "./pages/Gallery.js";
import Blog from "./Blog/Blog.js";
import BlogDetailPg from "./Blog/BlogDetailPg.js";
import ProductDisplay from "./components/ProductDisplay.js";
import Cart from "./components/Cart.js";
import CarbonCredit from "./components/CarbonCredit.js";
import EsgCredit from "./components/EsgCredit.js";
import OurCoreProductDetail from "./components/OurCoreProductDetail.js";
import SchemaInjector from "./SchemaMarkup/SchemaInjector.js";
import GiftingSection from "./components/GiftingSection.js";
import NewsletterDetailPage from "./Newsletter/NewsletterDetailPage.js";
import NewsSection from "./components/NewsSection.js";
import Magazine from "./components/Magazine.js";
import Checkout from './components/Checkout.js';
import OrderSuccess from './components/OrderSuccess.js'
import Policy from './components/Policy.js'
import NotFound from "./components/NotFound.js";
import AdminDashboard from "./pages/admin/AdminDashboard.js";
import AdminLogin from "./pages/admin/AdminLogin.js";
import StoreProductDetail from "./pages/StoreProductDetail.js";

const LegacyProductListRedirect = () => {
  const location = useLocation();
  return <Navigate to="/shop" replace state={location.state} />;
};

export const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/service", component: Services },
  { path: "/product", component: LegacyProductListRedirect },
  { path: "/cart", component: Cart },
  { path: "/services/carbon-credit", component: CarbonCredit },
  { path: "/services/esg-credit", component: EsgCredit },
  { path: "/blog", component: Blog },
  { path: "/post/:slug", component: BlogDetailPg },
  { path: "/contact", component: ContactUs },
  { path: "/shop", component: ProductDisplay },
  { path: "/displayproduct", component: LegacyProductListRedirect },
  { path: "/shop/products/:id", component: StoreProductDetail },
  { path: "/store/products/:id", component: StoreProductDetail },
  { path: "/newsletter", component: NewsletterForm },
  { path: "/products/:slug", component: OurCoreProductDetail },
  { path: "/recipes", component: RecipeAndInspiration },
  { path: "/gallery/our-gallery", component: Gallery },
  { path: "/newsletter/:id", component: NewsletterDetailPage },
  { path: "/gallery/latest-news", component: NewsSection },
  { path: "/magazines", component : Magazine },
  { path:"/gallery/gifting-solution", component : GiftingSection },
  { path:"/checkout", component : Checkout },
  { path:"/order-sucess", component : OrderSuccess },
  {path:"/policy", component : Policy },
  { path: "/admin/login", component: AdminLogin },
  { path: "/admin", component: AdminDashboard },
    // 404 Route
  { path: "*", component: NotFound },
];

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const [animateLogo, setAnimateLogo] = useState(location.pathname === "/");

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });

    if (location.pathname === "/") {
      setTimeout(() => {
        setAnimateLogo(false);
      }, 2500);
    }
  }, [location]);

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <SchemaInjector />
      <ScrollToTop />
      <Canonical />
      
      {/* Logo Animation Layer */}
      {location.pathname === "/" && animateLogo && (
        <LoadingLogo />
      )}

      {/* Main Routes */}
      <div className={`${animateLogo ? "opacity-20" : "opacity-100"} transition-opacity duration-1000`}>
        <Routes>
          {routes.map((route, index) => {
            const Component = route.component;
            return <Route key={index} path={route.path} element={<Component />} />;
          })}
        </Routes>
      </div>

      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;