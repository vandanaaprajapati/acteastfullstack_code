
import React from "react";
import { Link } from "react-router-dom";

const GIProduct = ({ title, img, slug }) => {
  return (
    <section className="">
    <Link
      to={`/products/${slug}`}
      className="group relative block overflow-hidden shadow-lg h-64 cursor-pointer border-2 border-green-400 rounded-lg"
    >
      {/* Product Image */}
      <img
        src={img}
        alt={title}
         loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500"
      />

      {/* Static Title at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/100 to-transparent p-3 z-10">
        <h3 className="text-white font-bold text-center text-lg">{title}</h3>
      </div>

      {/* Hover Overlay - slides in from bottom */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-200 to-green-200 
        px-4 py-6 flex flex-col items-center justify-center text-center transform translate-y-full group-hover:translate-y-0 
        transition-all duration-500 ease-in-out z-20">
        <h3 className="text-lg font-bold text-gray-900 mb-2 heading-style">{title}</h3>

        <button className="text-blue-600 font-medium hover:underline">
          Read More →
        </button>
      </div>
    </Link>
    </section>
  );
};

export default GIProduct;
