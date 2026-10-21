

import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import Topbar from "../components/Topbar.js";
import { useCart } from "../components/CartContext.js";
import { FaShoppingCart } from "react-icons/fa";
import button from '../img/button.webp'
import logo from '../img/ActEast-Logonew.webp'

const navLinks = [
  { name: "About", path: "/about" },
  { name: "Products", path: "/shop" },
  {
    name: "Services",
    path: "#!",
    dropdown: [
      { name: "Carbon Credit", path: "/services/carbon-credit" },
      { name: "ESG", path: "/services/esg-credit" },
    ],
  },
  { name: "Recipe & Inspiration", path: "/recipes" },

   {
    name: "Gallery",
    path: "#!",
    dropdown: [
      { name: "Our Gallery", path: "/gallery/our-gallery" },
      { name: "Media Center", path: "/gallery/latest-news" },
       { name: "Gifting Solution", path: "/gallery/gifting-solution" },
    ],
  },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRefs = useRef({});
  const [openDropdown, setOpenDropdown] = useState(null);
  const { getTotalItems } = useCart();

  // Check if link or dropdown is active
  const isLinkActive = (link) => {
    if (link.path === location.pathname) return true;
    if (link.dropdown) {
      return link.dropdown.some((d) => location.pathname.startsWith(d.path));
    }
    return false;
  };

  // Scroll into view active nav item
  useEffect(() => {
    const activeElement = Object.values(navRefs.current).find((ref) =>
      ref?.classList.contains("active-nav")
    );
    if (activeElement) {
      activeElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [location.pathname]);

  // Handle scroll to expand navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Topbar />
     <nav className={`sticky top-0 z-50 bg-white shadow-lg transition-all duration-300 border-b-4 border-solid border-green-800 rounded-bl-xl rounded-br-xl ${scrolled ? "w-full pl-4" : "container mx-auto" }`} >

        <div className="flex items-center justify-between p-0 relative">
          {/* Logo Left */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex-shrink-0">
              <img src={logo}   alt="Logo" loading="lazy"  className="w-52 md:w-58 lg:w-58 xl:w-58 max-w-full" />
            </Link>
          </div>

          {/* Right Leaf Logo */}
          <img src="https://api.ecrop.co/assets/acteast/image/Bamboo-img.webp" alt="Right Leaf" loading="lazy"
            className="hidden lg:block absolute top-0 right-0 h-full max-h-[140px] pointer-events-none z-0" />

          {/* Desktop Nav Links */}
          <div className="relative max-w-[1300px] mx-auto flex items-center justify-between px-4 py-3 w-full ">
            <ul className="hidden lg:flex space-x-4 text-md font-medium justify-center flex-1 uppercase">
              {navLinks.map((link) => {
                const active = isLinkActive(link);
                return (
                  <li
                    key={link.name}
                    className={`relative group text-lg pt-5 ${
                      active ? "active-nav" : ""
                    }`}
                    ref={(el) => (navRefs.current[link.name] = el)}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`py-2 px-2 font-semibold relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-[#679926] after:transition-all after:duration-300 hover:after:w-full ${
                        active ? "bg-orange-400 rounded-md" : "text-gray-900"
                      }`}
                    >
                      {link.name}
                      {link.dropdown && (
                        <FaChevronDown className="inline ml-1" />
                      )}
                    </Link>

                    {/* Dropdown */}
                    {link.dropdown && (
                      <ul className="absolute top-full left-0 w-56 bg-white shadow-xl rounded  hidden group-hover:block z-50 border-b-4 border-lime-800">
                        {link.dropdown.map((item) => {
                          const subActive = location.pathname === item.path;
                          return (
                            <li key={item.name}>
                              <Link
                                to={item.path}
                                onClick={() => setMenuOpen(false)}
                                className={`block px-4 py-2 hover:bg-orange-300 hover:text-black ${
                                  subActive
                                    ? "bg-amber-900 text-white font-bold"
                                    : "text-gray-800"
                                }`}
                              >
                                {item.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
           

          <li className="ml-4 pt-5">
            <Link
              to="/cart"
              aria-label={`Open cart, ${getTotalItems()} items`}
              className="relative inline-flex min-h-10 items-center justify-center px-2 text-gray-800 hover:text-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-700"
            >
              <FaShoppingCart size={26} aria-hidden="true" />
              {getTotalItems() > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-xs font-bold text-white">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </li>
                
         <Link 
            to="https://a4assam.com/" target="_blank" rel="noopener noreferrer" >
            <img src={button}  alt="A4Assam" className="cursor-pointer w-full h-full object-contain"/>
          </Link>
             </ul>
            {/* Mobile Hamburger */}
            <div className="lg:hidden ml-auto">
              <button
                onClick={() => setMenuOpen(true)}
                className="text-2xl border border-gray-400 p-2 rounded-md shadow-sm hover:bg-gray-100 transition-all duration-200"
                aria-label="Open menu"
              >
                <FiMenu />
              </button>
            </div>
          </div>
        </div>

        <div
  className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
    menuOpen ? "translate-x-0" : "-translate-x-full"
  } transition-transform duration-300 ease-in-out z-50`}
>
  <div className="flex justify-between items-center px-4 py-3 border-b">
    <button
      className="text-3xl text-gray-700"
      onClick={() => setMenuOpen(false)}
    >
      <FiX />
    </button>
  </div>

  <ul className="flex flex-col mt-6 space-y-3 px-4 font-semibold text-gray-700">

    {/* 🔹 NAV LINKS */}
    {navLinks.map((link) => {
      const active = isLinkActive(link);

      return (
        <li key={link.name}>
          
          {/* Main Link */}
          <div className="flex justify-between items-center">
            <Link
              to={link.path}
              onClick={() => !link.dropdown && setMenuOpen(false)}
              className={`block py-2 px-2 w-full ${
                active
                  ? "text-white bg-green-600 rounded-md"
                  : "text-gray-800"
              }`}
            >
              {link.name}
            </Link>

            {/* Dropdown Icon */}
            {link.dropdown && (
              <button
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === link.name ? null : link.name
                  )
                }
                className="ml-2"
              >
                <FaChevronDown
                  className={`transition-transform ${
                    openDropdown === link.name ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>

          {/* Dropdown Items */}
          {link.dropdown && openDropdown === link.name && (
            <ul className="ml-4 mt-2 space-y-1">
              {link.dropdown.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 text-sm bg-gray-100 rounded hover:bg-green-100"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    })}

    <li>
      <Link to="/cart" onClick={() => setMenuOpen(false)} className="flex items-center justify-between rounded border border-green-100 px-3 py-3 text-gray-800 hover:bg-green-50">
        <span className="inline-flex items-center gap-3"><FaShoppingCart aria-hidden="true" /> Cart</span>
        <span className="rounded-full bg-orange-500 px-2 py-1 text-xs font-bold text-white">{getTotalItems()}</span>
      </Link>
    </li>

          {/* 🔹 IMAGE BUTTON */}
          <Link
            to="https://a4assam.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4"
          >
            <img
              src={button}
              alt="A4Assam"
              loading="lazy"
              className="w-full object-contain"
            />
          </Link>

        </ul>
      </div>
        {/* Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
