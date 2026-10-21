// components/ScrollToTopButton.jsx
import React, { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`border-2 border-white fixed bottom-4 right-4 z-50 hidden lg:flex items-center justify-center p-3 rounded-full bg-green-700 text-white shadow-lg hover:bg-green-800 transition-all duration-300 ${
      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
      }`} >
      <AiOutlineArrowUp className="text-2xl animate-bounce" />
    </button>
  );
};

export default ScrollToTopButton;
