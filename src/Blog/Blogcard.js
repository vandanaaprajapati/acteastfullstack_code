



import React from "react";
import { Link } from "react-router-dom";
// import acteast from "../assets/logo/acteastsmall-logo.png";

const Blogcard = ({ image, title, date, author, detailPage }) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Unknown Date";


  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/150"; // Fallback image URL
  };

  return (
    <div className="relative bg-[#2d777a12] rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
      <Link to={detailPage} className="no-underline text-current">
        {/* Image Container */}
        <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden rounded-t-xl">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover rounded-md z-0"
            onError={handleImageError} // Handle image errors
          />
        </div>

        {/* Top Right Badge */}
        <span className="absolute top-2 right-2 bg-white text-black text-xs px-2 py-1 rounded-full shadow flex items-center gap-1 z-10">
          <img
            src="https://api.ecrop.co/assets/acteast/logo/acteastsmall-logo.png"
            alt="Act-East"
            loading="lazy"
            className="w-5 h-5 object-cover rounded-full"
          />
          Act East
        </span>

        {/* Content Section */}
        <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white px-5 pb-6 pt-4 z-10 text-left">
          <p className="text-sm bg-[#287073] px-2 py-1 inline-block rounded shadow text-white mb-2">
            <strong>{author}</strong> | {formattedDate}
          </p>
          <h1 className="text-white text-xl font-bold text-start leading-snug text-shadow-sm">
            {title}
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default Blogcard;






















