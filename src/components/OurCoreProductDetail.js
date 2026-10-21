
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { productList } from "../components/ProductOurCoreData.js";

const OurCoreProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const products = productList.find((p) => p.slug === slug);

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  if (!products) {
    return (
      <div className="inset-0 flex items-center justify-center  bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center relative">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-green-600 font-bold text-xl rounded-full hover:bg-green-100 w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
          <h2 className="text-2xl font-bold">Product Not Found</h2>
          <Link to="/" className="text-blue-600 underline mt-4 inline-block">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-7xl w-full flex flex-col md:flex-row gap-8 relative p-6">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-green-600 font-bold text-xl rounded-full hover:bg-green-100 w-10 h-10 flex items-center justify-center"
        >
          ×
        </button>

        {/* Image Section */}
        <div className="flex-1">
          <img
            src={products.fullImage || products.img}
            alt={products.title}  loading="lazy"
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-5xl font-bold mb-4 heading-style">{products.title}</h3>
          <p className="text-lg mb-6">{products.desc}</p>

        </div>
      </div>
    </div>
  );
};

export default OurCoreProductDetail;
