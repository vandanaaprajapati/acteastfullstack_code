import React from "react";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="h-[88vh] bg-gradient-to-b from-white to-orange-50 flex items-center justify-center px-6 ">
      <div className="max-w-4xl w-full text-center">
        
        {/* 404 Text */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-amber-900"> 404 </h1>

        {/* Heading */}
        <h2 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900">Page Not Found</h2>

        {/* Description */}
        <p className="mt-4 text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">Sorry, the page you are looking for does not exist or may have been moved.</p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <a href="/" className="inline-flex items-center gap-2 bg-amber-900 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-2xl transition duration-300 shadow-lg"><FaHome />Back to Home</a>     
        </div>
      </div>
    </div>
  );
};

export default NotFound;