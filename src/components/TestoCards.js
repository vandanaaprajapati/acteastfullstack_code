import React from "react";
import { FaLeaf } from "react-icons/fa"; // ESG-style icon

const TestoCards = ({ title, description }) => {
  return (
   
     <div
      className="
    group bg-white rounded-xl relative flex flex-col items-center text-center px-4 pt-12 pb-6 border-[#8EC63F] shadow-lg  hover:border-t-0 hover:border-b-4 hover:border-[#8EC63F] hover:shadow-xl
    transition-all duration-300 ease-in-out"  data-aos="fade-down" data-aos-duration="1000" >
      {/* Icon in circle */}
      <div className="absolute -top-8 w-16 h-16 rounded-full bg-white border-4 border-[#E0E0E0] hover:border-[#8EC63F]  flex items-center justify-center shadow-lg">
        <FaLeaf className="text-green-600 text-2xl" />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-[#8EC63F] mb-2">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  );
};

export default TestoCards;
