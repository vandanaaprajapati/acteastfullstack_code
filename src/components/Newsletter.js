
import React from "react";

const NewsletterForm = () => {

  return (
   
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row py-24">
      {/* Left section */}
      <div className="flex-1 flex flex-col justify-center px-10 lg:px-20">
        <p className="text-5xl font-bold text-green-900 leading-tight mb-6">
          The Modern Recruiter Newsletter
        </p>
        <p className="text-gray-900 text-lg">
          Subscribe to our monthly newsletter for curated content and helpful
          hiring tips to keep you at the forefront of recruiting.
        </p>
      </div>

      {/* Right section */}
      <div
        className="flex-1 flex items-center justify-center px-10 lg:px-20 p-10 rounded-lg bg-[#cce5de]"
      >
        <form className="w-full max-w-md space-y-5">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500"
            />
            <p className="text-sm text-red-500 mt-1">This field is required.</p>
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Work Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Work Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select...</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Animated Subscribe Button */}
          <button
            type="submit"
            className="group relative flex items-center gap-1 px-9 py-4 border-4 border-transparent text-base font-semibold text-white rounded-full shadow-[0_0_0_2px_white] cursor-pointer overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[0_0_0_12px_transparent] hover:text-black hover:rounded-xl active:scale-95"
          >
            {/* Left Arrow */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-[-25%] w-6 fill-white z-[9] transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:left-4 group-hover:fill-[#212121]"
              viewBox="0 0 24 24"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>

            {/* Text */}
            <span className="relative z-[1] -translate-x-3 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-3">
              Subscribe
            </span>

            {/* Circle background */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100"></span>

            {/* Right Arrow */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-4 w-6 fill-white z-[9] transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:right-[-25%] group-hover:fill-[#212121]"
              viewBox="0 0 24 24"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
   
  );
};

export default NewsletterForm;
