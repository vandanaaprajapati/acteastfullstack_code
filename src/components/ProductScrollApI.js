
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProductScrollApI({ images }) {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };
  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full sm:w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px] 
        h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden rounded-2xl group" 
        data-aos="fade-up" data-aos-duration="1000" >
      {/* Images */}
      {/* {images.map((img, index) => (
        <img key={index} src={img} alt={`Slide ${index}`}  loading="lazy" className={`absolute inset-0 w-full h-full object-contain sm:object-cover transition-opacity duration-1000 ease-in-out ${
        index === current ? "opacity-100 z-10" : "opacity-0 z-0" }`} /> ))} */}
        {images.map((img, index) => (
          <Link
            key={img}
            to="/shop"
            aria-label="Shop products"
            tabIndex={index === current ? 0 : -1}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <img
              src={img}
              alt={`Shop products - slide ${index + 1}`}
              loading="lazy"
              className="h-full w-full object-contain transition-transform duration-300 hover:scale-[1.02] lg:object-cover"
            />
          </Link>
        ))}


      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-20 hover:bg-opacity-80"
      >
        <FaChevronLeft size={16} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-20 hover:bg-opacity-80"
      >
        <FaChevronRight size={16} />
      </button>
    </div>

    </div>
  );
}

export default ProductScrollApI;
